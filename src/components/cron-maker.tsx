import React, { useState, useEffect, ReactElement } from 'react';
import styles from './cron-maker.module.css';

interface CronParts {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

interface Preset {
  label: string;
  value: CronParts;
  description: string;
}

const PRESETS: Preset[] = [
  {
    label: 'Every Minute',
    value: { minute: '*', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' },
    description: 'Run every minute'
  },
  {
    label: 'Hourly',
    value: { minute: '0', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' },
    description: 'Run at the start of every hour'
  },
  {
    label: 'Daily at Midnight',
    value: { minute: '0', hour: '0', dayOfMonth: '*', month: '*', dayOfWeek: '*' },
    description: 'Run every day at 12:00 AM'
  },
  {
    label: 'Weekly on Sunday',
    value: { minute: '0', hour: '0', dayOfMonth: '*', month: '*', dayOfWeek: '0' },
    description: 'Run every Sunday at 12:00 AM'
  },
  {
    label: 'Monthly (1st of month)',
    value: { minute: '0', hour: '0', dayOfMonth: '1', month: '*', dayOfWeek: '*' },
    description: 'Run on the 1st of every month at 12:00 AM'
  }
];

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const DAYS_OF_MONTH = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
];
const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' }
];

export default function CronMaker(): ReactElement {
  const [cronParts, setCronParts] = useState<CronParts>({
    minute: '*',
    hour: '*',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*'
  });
  const [nextRuns, setNextRuns] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const updateCronPart = (part: keyof CronParts, value: string) => {
    setCronParts(prev => ({
      ...prev,
      [part]: value
    }));
  };

  const getCronExpression = (): string => {
    return `${cronParts.minute} ${cronParts.hour} ${cronParts.dayOfMonth} ${cronParts.month} ${cronParts.dayOfWeek}`;
  };

  const getDescription = (): string => {
    const preset = PRESETS.find(p => 
      Object.entries(p.value).every(([key, value]) => 
        cronParts[key as keyof CronParts] === value
      )
    );

    if (preset) return preset.description;

    const parts: string[] = [];
    
    if (cronParts.minute === '*') parts.push('every minute');
    else parts.push(`at minute ${cronParts.minute}`);

    if (cronParts.hour === '*') parts.push('of every hour');
    else parts.push(`at ${parseInt(cronParts.hour)}:${cronParts.minute.padStart(2, '0')}`);

    if (cronParts.dayOfMonth !== '*') parts.push(`on day ${cronParts.dayOfMonth}`);
    if (cronParts.month !== '*') {
      const monthName = MONTHS.find(m => m.value.toString() === cronParts.month)?.label;
      parts.push(`in ${monthName}`);
    }
    if (cronParts.dayOfWeek !== '*') {
      const dayName = DAYS_OF_WEEK.find(d => d.value.toString() === cronParts.dayOfWeek)?.label;
      parts.push(`on ${dayName}`);
    }

    return `Runs ${parts.join(' ')}`;
  };

  const calculateNextRuns = () => {
    const now = new Date();
    const next: Date[] = [];
    let current = new Date(now);

    // Helper function to check if a date matches the cron pattern
    const matchesCronPattern = (date: Date): boolean => {
      const minute = date.getMinutes();
      const hour = date.getHours();
      const dayOfMonth = date.getDate();
      const month = date.getMonth() + 1; // JavaScript months are 0-based
      const dayOfWeek = date.getDay();

      const matchesMinute = cronParts.minute === '*' || minute === parseInt(cronParts.minute);
      const matchesHour = cronParts.hour === '*' || hour === parseInt(cronParts.hour);
      const matchesDayOfMonth = cronParts.dayOfMonth === '*' || dayOfMonth === parseInt(cronParts.dayOfMonth);
      const matchesMonth = cronParts.month === '*' || month === parseInt(cronParts.month);
      const matchesDayOfWeek = cronParts.dayOfWeek === '*' || dayOfWeek === parseInt(cronParts.dayOfWeek);

      return matchesMinute && matchesHour && matchesDayOfMonth && matchesMonth && matchesDayOfWeek;
    };

    // Find the next 5 matching dates
    while (next.length < 5) {
      // If we're looking at a time in the past, move to the next minute
      if (current <= now) {
        current.setMinutes(current.getMinutes() + 1);
        continue;
      }

      if (matchesCronPattern(current)) {
        next.push(new Date(current));
      }
      current.setMinutes(current.getMinutes() + 1);
    }

    setNextRuns(next.map(date => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      return date.toLocaleString(undefined, options);
    }));
  };

  useEffect(() => {
    calculateNextRuns();
  }, [cronParts]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(getCronExpression());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (preset: Preset) => {
    setCronParts(preset.value);
  };

  return (
    <div className={styles.cronMaker}>
      <div className={styles.presets}>
        <h3>Quick Schedules</h3>
        <div className={styles.presetButtons}>
          {PRESETS.map((preset, index) => (
            <button
              key={index}
              className={styles.presetButton}
              onClick={() => applyPreset(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.inputs}>
        <div className={styles.field}>
          <label>Minute:</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={cronParts.minute}
              onChange={(e) => updateCronPart('minute', e.target.value)}
              placeholder="*"
            />
            <select
              value={cronParts.minute}
              onChange={(e) => updateCronPart('minute', e.target.value)}
            >
              <option value="*">Every minute</option>
              {MINUTES.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label>Hour:</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={cronParts.hour}
              onChange={(e) => updateCronPart('hour', e.target.value)}
              placeholder="*"
            />
            <select
              value={cronParts.hour}
              onChange={(e) => updateCronPart('hour', e.target.value)}
            >
              <option value="*">Every hour</option>
              {HOURS.map(h => (
                <option key={h} value={h}>{h}:00</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label>Day of Month:</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={cronParts.dayOfMonth}
              onChange={(e) => updateCronPart('dayOfMonth', e.target.value)}
              placeholder="*"
            />
            <select
              value={cronParts.dayOfMonth}
              onChange={(e) => updateCronPart('dayOfMonth', e.target.value)}
            >
              <option value="*">Every day</option>
              {DAYS_OF_MONTH.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label>Month:</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={cronParts.month}
              onChange={(e) => updateCronPart('month', e.target.value)}
              placeholder="*"
            />
            <select
              value={cronParts.month}
              onChange={(e) => updateCronPart('month', e.target.value)}
            >
              <option value="*">Every month</option>
              {MONTHS.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label>Day of Week:</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={cronParts.dayOfWeek}
              onChange={(e) => updateCronPart('dayOfWeek', e.target.value)}
              placeholder="*"
            />
            <select
              value={cronParts.dayOfWeek}
              onChange={(e) => updateCronPart('dayOfWeek', e.target.value)}
            >
              <option value="*">Every day</option>
              {DAYS_OF_WEEK.map(d => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.result}>
        <div className={styles.expressionHeader}>
          <h3>Generated Cron Expression:</h3>
          <button 
            className={styles.copyButton}
            onClick={copyToClipboard}
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
        <code>{getCronExpression()}</code>
        <p className={styles.description}>{getDescription()}</p>
        
        <div className={styles.nextRuns}>
          <h4>Next 5 runs:</h4>
          <ul>
            {nextRuns.map((run, index) => (
              <li key={index}>{run}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 