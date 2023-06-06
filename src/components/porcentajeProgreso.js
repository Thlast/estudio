import React, { useEffect, useRef } from 'react';

export function ProgressCircle({ progress }) {
  const progressRef = useRef(null);
  const progressTextRef = useRef(null);

  useEffect(() => {
    const circumference = 2 * Math.PI * progressRef.current.r.baseVal.value;
    const offset = circumference - (progress / 100) * circumference;

    progressRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
    progressRef.current.style.strokeDashoffset = offset;
    progressTextRef.current.textContent = `${progress}%`;
  }, [progress]);

  return (
    <svg className="progress-circle" viewBox="0 0 100 100">
      <circle
        className="progress-circle-background"
        cx="50"
        cy="50"
        r="45"
      />
      <circle
        ref={progressRef}
        className="progress-circle-progress"
        cx="50"
        cy="50"
        r="45"
      />
      <text ref={progressTextRef} className="progress-circle-text" x="50" y="50">
        {progress}%
      </text>
    </svg>
  );
};