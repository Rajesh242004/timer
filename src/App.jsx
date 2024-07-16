import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const startPauseButtonText = isRunning ? 'Pause' : 'Start';

  useEffect(() => {
    return () => clearInterval(intervalRef.current);  
  }, []);

  const startPauseHandler = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const resetHandler = () => {
    clearInterval(intervalRef.current);
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stop Watch</h1>
      <div className="elapsed-time">{formatTime(elapsedTime)}</div>
      <div className="controls">
      
        <button onClick={startPauseHandler}>{startPauseButtonText}</button>
        <button onClick={resetHandler} disabled={isRunning}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;