import React, { useState, useCallback } from 'react';
import styles from './exif-data-remover.module.css';

const ExifDataRemover: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setError(null);
        setDownloadUrl(null);
        setProcessingStep(null);
        // Create preview URL
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      } else {
        setError('Please select an image file');
        setFile(null);
        setPreviewUrl(null);
      }
    }
  };

  const removeExifData = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setProcessingStep('Loading image...');

    try {
      // Create a canvas to redraw the image without EXIF data
      const img = new Image();
      img.src = URL.createObjectURL(file);

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      setProcessingStep('Processing image...');

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      setProcessingStep('Preparing download...');

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setProcessingStep(null);
        }
      }, file.type);

    } catch (err) {
      setError('Failed to process image. Please try again.');
      setProcessingStep(null);
    } finally {
      setIsProcessing(false);
    }
  }, [file]);

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label htmlFor="file-upload">Select Image</label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {previewUrl && (
        <div className={styles.previewContainer}>
          <div>
            <img src={previewUrl} alt="Original" className={styles.previewImage} />
            <div className={styles.previewLabel}>Original Image</div>
          </div>
          {downloadUrl && (
            <div>
              <img src={downloadUrl} alt="Processed" className={styles.previewImage} />
              <div className={styles.previewLabel}>Processed Image</div>
            </div>
          )}
        </div>
      )}

      {file && (
        <div className={styles.fileInfo}>
          <h3>Selected File</h3>
          <p>{file.name}</p>
          <button
            className={styles.processButton}
            onClick={removeExifData}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className={styles.loadingSpinner} />
                Processing...
              </>
            ) : (
              'Remove EXIF Data'
            )}
          </button>
        </div>
      )}

      {processingStep && (
        <div className={styles.processingStatus}>
          <div className={styles.loadingSpinner} />
          {processingStep}
        </div>
      )}

      {downloadUrl && (
        <div className={styles.results}>
          <h3>Processed Image</h3>
          <p>Your image has been processed and is ready to download.</p>
          <a
            href={downloadUrl}
            download={`${file?.name.split('.')[0]}_no_exif.${file?.name.split('.')[1]}`}
            className={styles.downloadButton}
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ExifDataRemover;
