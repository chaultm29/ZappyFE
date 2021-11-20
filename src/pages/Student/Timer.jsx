
import React from 'react'
import { useState, useEffect } from 'react';

const Timer = ({ minutes, setMinutes, seconds, setSeconds, onTimeUp }) => {
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    onTimeUp();
                    clearInterval(myInterval);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <div>
            {minutes === 0 && seconds === 0
                ? <span class="text-danger">Hết thời gian</span>
                : <h4> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h4>
            }
        </div>
    )
}

export default Timer;