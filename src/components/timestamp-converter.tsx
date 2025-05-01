import React, { useState, useEffect } from "react";
import styles from "./timestamp-converter.module.css";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import {
  formatRelativeTime,
  getCurrentTimestamp,
  convertTimestampToDate,
  convertDateToTimestamp,
  convertTimestampUnits,
} from "../common/utils";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showMilliseconds, setShowMilliseconds] = useState<boolean>(false);
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(
    getCurrentTimestamp(showMilliseconds)
  );
  const [relativeTime, setRelativeTime] = useState<string>("");

  useEffect(() => {
    // Update current timestamp every 100ms
    const interval = setInterval(() => {
      setCurrentTimestamp(getCurrentTimestamp(showMilliseconds));
    }, 100);

    return () => clearInterval(interval);
  }, [showMilliseconds]);

  useEffect(() => {
    if (timestamp && !error) {
      const updateRelativeTime = () => {
        const timestampNum = parseInt(timestamp);
        const now = getCurrentTimestamp(showMilliseconds);
        const diff = timestampNum - now;

        if (diff === 0) {
          setRelativeTime("now");
        } else if (diff > 0) {
          setRelativeTime(`in ${formatRelativeTime(diff, showMilliseconds)}`);
        } else {
          setRelativeTime(
            `${formatRelativeTime(Math.abs(diff), showMilliseconds)} ago`
          );
        }
      };

      updateRelativeTime();
      const interval = setInterval(updateRelativeTime, 100);
      return () => clearInterval(interval);
    } else {
      setRelativeTime("");
    }
  }, [timestamp, error, showMilliseconds]);

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimestamp(value);
    setError("");

    if (value) {
      try {
        const timestampNum = parseInt(value);
        if (isNaN(timestampNum)) {
          setError("Invalid timestamp");
          return;
        }
        const dateObj = convertTimestampToDate(timestampNum, showMilliseconds);
        setDate(dateObj.toISOString());
      } catch (err) {
        setError("Invalid timestamp");
      }
    } else {
      setDate("");
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDate(value);
    setError("");

    if (value) {
      try {
        const dateObj = new Date(value);
        if (isNaN(dateObj.getTime())) {
          setError("Invalid date");
          return;
        }
        setTimestamp(
          convertDateToTimestamp(dateObj, showMilliseconds).toString()
        );
      } catch (err) {
        setError("Invalid date");
      }
    } else {
      setTimestamp("");
    }
  };

  const copyCurrentTimestamp = () => {
    navigator.clipboard.writeText(currentTimestamp.toString());
  };

  const toggleMilliseconds = () => {
    setShowMilliseconds(!showMilliseconds);
    if (timestamp) {
      const timestampNum = parseInt(timestamp);
      setTimestamp(
        convertTimestampUnits(
          timestampNum,
          showMilliseconds,
          !showMilliseconds
        ).toString()
      );
    }
  };

  return (
    <Container>
      <div className={styles.currentTimestamp}>
        <h3>Current Unix Timestamp:</h3>
        <div className={styles.timestampDisplay}>
          <span>{currentTimestamp}</span>
          <Button
            variant="primary"
            size="small"
            onClick={copyCurrentTimestamp}
          >
            Copy
          </Button>
        </div>
        <div className={styles.toggleContainer}>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={showMilliseconds}
              onChange={toggleMilliseconds}
            />
            <span className={styles.toggleSlider}></span>
            <span className={styles.toggleLabel}>Milliseconds</span>
          </label>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="timestamp">Enter Unix Timestamp:</label>
        <Input
          id="timestamp"
          value={timestamp}
          onChange={handleTimestampChange}
          placeholder="Paste timestamp here"
          error={error}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="date">Or select a date:</label>
        <Input
          id="date"
          type="datetime-local"
          value={date}
          onChange={handleDateChange}
          error={error}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {timestamp && !error && (
        <div className={styles.results}>
          <h3>Results:</h3>
          <p>Unix Timestamp: {timestamp}</p>
          <p>ISO Date: {date}</p>
          <p>
            Local Date:{" "}
            {convertTimestampToDate(
              parseInt(timestamp),
              showMilliseconds
            ).toLocaleString()}
          </p>
          <p>
            UTC Date:{" "}
            {convertTimestampToDate(
              parseInt(timestamp),
              showMilliseconds
            ).toUTCString()}
          </p>
          <p className={styles.relativeTime}>Relative Time: {relativeTime}</p>
        </div>
      )}
    </Container>
  );
}
