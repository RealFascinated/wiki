import React, { useState, useCallback } from 'react';
import styles from './exif-data-viewer.module.css';
import exifr from 'exifr';

interface ExifData {
  make?: string;
  model?: string;
  software?: string;
  createDate?: string;
  modifyDate?: string;
  gps?: {
    latitude?: number | string;
    longitude?: number | string;
    altitude?: number | string;
  };
  exposureTime?: string;
  fNumber?: number;
  iso?: number;
  focalLength?: number;
  lensModel?: string;
}

const ExifDataViewer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setError(null);
        setExifData(null);
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

  const formatGpsCoordinate = (coord: number | string | undefined): string => {
    if (coord === undefined) return '';
    if (typeof coord === 'string') return coord;
    return coord.toString();
  };

  const parseExifData = useCallback(async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await exifr.parse(file);
      
      if (!data) {
        setError('No EXIF data found in this image');
        return;
      }

      const formattedData: ExifData = {
        make: data.Make,
        model: data.Model,
        software: data.Software,
        createDate: data.CreateDate,
        modifyDate: data.ModifyDate,
        gps: data.GPSLatitude && data.GPSLongitude ? {
          latitude: data.GPSLatitude,
          longitude: data.GPSLongitude,
          altitude: data.GPSAltitude
        } : undefined,
        exposureTime: data.ExposureTime,
        fNumber: data.FNumber,
        iso: data.ISO,
        focalLength: data.FocalLength,
        lensModel: data.LensModel
      };

      setExifData(formattedData);
    } catch (err) {
      setError('Failed to read EXIF data. Please try again.');
    } finally {
      setIsLoading(false);
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
          <img src={previewUrl} alt="Preview" className={styles.previewImage} />
        </div>
      )}

      {file && !exifData && (
        <div className={styles.fileInfo}>
          <h3>Selected File</h3>
          <p>{file.name}</p>
          <button
            className={styles.processButton}
            onClick={parseExifData}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className={styles.loadingSpinner} />
                Reading EXIF Data...
              </>
            ) : (
              'Read EXIF Data'
            )}
          </button>
        </div>
      )}

      {exifData && (
        <div className={styles.results}>
          <h3>EXIF Data</h3>
          <div className={styles.exifGrid}>
            {exifData.make && (
              <div className={styles.exifItem}>
                <span className={styles.exifLabel}>Camera Make:</span>
                <span className={styles.exifValue}>{exifData.make}</span>
              </div>
            )}
            {exifData.model && (
              <div className={styles.exifItem}>
                <span className={styles.exifLabel}>Camera Model:</span>
                <span className={styles.exifValue}>{exifData.model}</span>
              </div>
            )}
            {exifData.software && (
              <div className={styles.exifItem}>
                <span className={styles.exifLabel}>Software:</span>
                <span className={styles.exifValue}>{exifData.software}</span>
              </div>
            )}
            {exifData.createDate && (
              <div className={styles.exifItem}>
                <span className={styles.exifLabel}>Creation Date:</span>
                <span className={styles.exifValue}>{new Date(exifData.createDate).toLocaleString()}</span>
              </div>
            )}
            {exifData.modifyDate && (
              <div className={styles.exifItem}>
                <span className={styles.exifLabel}>Modification Date:</span>
                <span className={styles.exifValue}>{new Date(exifData.modifyDate).toLocaleString()}</span>
              </div>
            )}
            {exifData.gps && (
              <>
                <div className={styles.exifItem}>
                  <span className={styles.exifLabel}>GPS Coordinates:</span>
                  <span className={styles.exifValue}>
                    {formatGpsCoordinate(exifData.gps.latitude)}, {formatGpsCoordinate(exifData.gps.longitude)}
                  </span>
                </div>
                {exifData.gps.altitude && (
                  <div className={styles.exifItem}>
                    <span className={styles.exifLabel}>Altitude:</span>
                    <span className={styles.exifValue}>{formatGpsCoordinate(exifData.gps.altitude)}m</span>
                  </div>
                )}
              </>
            )}
            {exifData.exposureTime && (
              <div className={styles.exifItem}>
                <span className={styles.exifLabel}>Exposure Time:</span>
                <span className={styles.exifValue}>{exifData.exposureTime}s</span>
              </div>
            )}
            {exifData.fNumber && (
              <div className={styles.exifItem}>
                <span className={styles.exifLabel}>Aperture:</span>
                <span className={styles.exifValue}>f/{exifData.fNumber}</span>
              </div>
            )}
            {exifData.iso && (
              <div className={styles.exifItem}>
                <span className={styles.exifLabel}>ISO:</span>
                <span className={styles.exifValue}>{exifData.iso}</span>
              </div>
            )}
            {exifData.focalLength && (
              <div className={styles.exifItem}>
                <span className={styles.exifLabel}>Focal Length:</span>
                <span className={styles.exifValue}>{exifData.focalLength}mm</span>
              </div>
            )}
            {exifData.lensModel && (
              <div className={styles.exifItem}>
                <span className={styles.exifLabel}>Lens Model:</span>
                <span className={styles.exifValue}>{exifData.lensModel}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExifDataViewer; 