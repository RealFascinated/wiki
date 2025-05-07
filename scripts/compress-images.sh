#!/bin/bash

# Default configuration
QUALITY=85
THRESHOLD=10
TARGET_DIR="./docs"
TEMP_DIR="temp"
VERBOSE=false
SUMMARY_FILE="$TEMP_DIR/compression_summary.txt"

# Parse command line arguments
while getopts "q:t:d:vh" opt; do
    case $opt in
        q) QUALITY="$OPTARG" ;;
        t) THRESHOLD="$OPTARG" ;;
        d) TARGET_DIR="$OPTARG" ;;
        v) VERBOSE=true ;;
        h)
            echo "Usage: $0 [options]"
            echo "Options:"
            echo "  -q QUALITY    Compression quality (1-100, default: 85)"
            echo "  -t THRESHOLD  Minimum compression percentage to keep (default: 10)"
            echo "  -d DIR        Target directory to process (default: ./docs)"
            echo "  -v           Verbose output"
            echo "  -h           Show this help message"
            exit 0
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
            ;;
    esac
done

# Validate quality
if ! [[ "$QUALITY" =~ ^[0-9]+$ ]] || [ "$QUALITY" -lt 1 ] || [ "$QUALITY" -gt 100 ]; then
    echo "Error: Quality must be a number between 1 and 100"
    exit 1
fi

# Validate threshold
if ! [[ "$THRESHOLD" =~ ^[0-9]+$ ]] || [ "$THRESHOLD" -lt 0 ] || [ "$THRESHOLD" -gt 100 ]; then
    echo "Error: Threshold must be a number between 0 and 100"
    exit 1
fi

# Check for required dependencies
check_dependency() {
    if ! command -v "$1" &> /dev/null; then
        echo "Error: $1 is not installed. Please install it first."
        exit 1
    fi
}

# Check required tools
check_dependency "magick"
check_dependency "cwebp"

# Create temp directory if it doesn't exist
mkdir -p "$TEMP_DIR"

# Function to get file size in bytes
get_file_size() {
    wc -c < "$1"
}

# Function to format file size
format_size() {
    local size=$1
    if [ $size -gt 1048576 ]; then
        echo "$(printf "%.2f" $(echo "scale=2; $size/1048576" | bc)) MB"
    elif [ $size -gt 1024 ]; then
        echo "$(printf "%.2f" $(echo "scale=2; $size/1024" | bc)) KB"
    else
        echo "${size} B"
    fi
}

# Function to calculate compression percentage
calculate_compression() {
    local original_size=$1
    local compressed_size=$2
    local compression_percent=$(( (original_size - compressed_size) * 100 / original_size ))
    echo $compression_percent
}

# Function to print a horizontal line
print_line() {
    printf '%*s\n' "${COLUMNS:-80}" '' | tr ' ' '='
}

# Function to print centered text
print_center() {
    local text="$1"
    local width="${COLUMNS:-80}"
    local padding=$(( (width - ${#text}) / 2 ))
    printf '%*s%s%*s\n' $padding '' "$text" $padding ''
}

# Print header
echo
print_center "Image Compression Report"
print_line
printf "Directory: %s\n" "$TARGET_DIR"
printf "Settings: Quality %d%% | Threshold %d%%\n" "$QUALITY" "$THRESHOLD"
print_line
echo

# Initialize summary file and counter
echo "File,Original Size,Compressed Size,Reduction" > "$SUMMARY_FILE"
compressed_count=0

# Create a temporary file to track compressed count
echo "0" > "$TEMP_DIR/compressed_count"

# Find all image files in target directory
find "$TARGET_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.webp" \) | while read -r image; do
    # Skip files in temp directory
    if [[ "$image" == *"$TEMP_DIR"* ]]; then
        continue
    fi

    # Get original file size
    original_size=$(get_file_size "$image")
    
    # Create temp file path
    temp_file="$TEMP_DIR/$(basename "$image")"
    
    # Compress based on file extension
    case "${image,,}" in
        *.png)
            # Preserve PNG colors and transparency
            magick "$image" -strip -define png:compression-level=9 -define png:compression-strategy=0 -define png:exclude-chunk=all -quality "$QUALITY" "$temp_file" 2>/dev/null
            ;;
        *.jpg|*.jpeg)
            # Preserve original colors and use better JPEG compression
            magick "$image" -strip -define jpeg:fancy-upsampling=off -define png:compression-level=9 -define png:compression-strategy=0 -quality "$QUALITY" "$temp_file" 2>/dev/null
            ;;
        *.webp)
            # Use lossless compression for WebP if quality is high
            if [ "$QUALITY" -gt 90 ]; then
                cwebp -lossless "$image" -o "$temp_file" 2>/dev/null
            else
                cwebp -q "$QUALITY" -m 6 -sharp_yuv "$image" -o "$temp_file" 2>/dev/null
            fi
            ;;
    esac
    
    # Check if compression was successful
    if [ ! -f "$temp_file" ]; then
        echo "Error: Failed to compress $image"
        continue
    fi
    
    # Get compressed file size
    compressed_size=$(get_file_size "$temp_file")
    
    # Calculate compression percentage
    compression_percent=$(calculate_compression "$original_size" "$compressed_size")
    
    # Print status based on compression result
    if [ "$compressed_size" -eq "$original_size" ]; then
        printf "= %s\n" "$image"
    elif [ "$compressed_size" -gt "$original_size" ]; then
        printf "× %s\n" "$image"
    else
        printf "✓ %s\n" "$image"
        printf "  %s → %s (%d%% reduction)\n" "$(format_size $original_size)" "$(format_size $compressed_size)" "$compression_percent"
    fi
    
    # Only keep if compression meets threshold
    if [ "$compression_percent" -gt "$THRESHOLD" ]; then
        mv "$temp_file" "$image"
        echo "$image,$(format_size $original_size),$(format_size $compressed_size),$compression_percent%" >> "$SUMMARY_FILE"
        # Increment compressed count in the temp file
        echo $(( $(cat "$TEMP_DIR/compressed_count") + 1 )) > "$TEMP_DIR/compressed_count"
    else
        rm "$temp_file"
    fi
done

# Get the final compressed count
compressed_count=$(cat "$TEMP_DIR/compressed_count")

# Print summary if we have any compressed files
if [ "$compressed_count" -gt 0 ]; then
    echo
    print_center "Compression Summary"
    print_line
    column -t -s, "$SUMMARY_FILE"
    print_line
    echo
else
    echo
    print_center "No Changes"
    print_line
    printf "No images were compressed (threshold: %d%%)\n" "$THRESHOLD"
    print_line
    echo
fi

# Clean up temp directory
rm -rf "$TEMP_DIR"
