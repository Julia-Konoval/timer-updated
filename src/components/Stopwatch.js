import React, { useState, useEffect } from 'react';
import db from '../firebase';

const Stopwatch = ({ view, start, uid }) => {
  const [timer, setTimer] = useState('');
  const [seconds, setSeconds] = useState(0);
  const dbRef = db.ref(`users/${uid}/${view}/seconds`);

  const formatTime = (seconds) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  useEffect(() => {
    if (start) {
      dbRef.once('value', (snapshot) => {
        if (!snapshot.val()) {
          dbRef.set(0);
        } else {
          setSeconds(snapshot.val());
        }
      });

      dbRef.on('value', (snapshot) => {
        setTimer(formatTime(snapshot.val()));
      });
    } else {
      dbRef.on('value', (snapshot) => {
        if (!snapshot.val()) {
          setTimer('00:00:00');
        } else {
          setTimer(formatTime(snapshot.val()));
        }
      });
    }
  }, []);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        dbRef.set(seconds);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);

  return (
    <div className="app">
      <h3>{view} Stopwatch</h3>
      <div className="stopwatch-card">
        <p>{timer}</p>
      </div>
    </div>
  );
};

export default Stopwatch;
