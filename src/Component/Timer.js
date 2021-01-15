import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';

export default function Timer({ id, timeStart, autoStart, step }) {
    const [time, setTime] = useState(timeStart);
    const [timerPlay, setTimerPlay] = useState(false);
    const [counting, setCounting] = useState(false);
    const [width, setWidth] = useState(100);

    const onTick = (time) => console.log(`Таймер № ${id} Залишилось часу:  ${time}`);
    const onTimeEnd = () => {
        console.log(`Таймер № ${id} Час вийшов!`);
        onTimeStart();
        setWidth(100);
        setTime(timeStart);
    }
    const onTimeStart = () => console.log(`Таймер № ${id} запущено!`);
    const onTimePause = () => console.log(`Таймер № ${id} на паузі!`);

    useEffect(() => {
        if (autoStart) {
            setTimerPlay(true);
        }
    }, [autoStart])

    useEffect(() => {
        if (counting) {
            onTick(time);
        }
    }, [counting, time])

    useEffect(() => {
        if (timerPlay) {
            onTimeStart();
        } else if (!timerPlay && time > 0) {
            onTimePause();
        }
    }, [timerPlay])

    useEffect(() => {
        if (time === 0) {
            onTimeEnd();
        }
    })

    useEffect(() => {
        let idTimer = setInterval(() => {
            if (time !== 0 && timerPlay) {
                setWidth((time - (step / 1000)) / timeStart * 100);
                setTime(time - (step / 1000));
            }
        }, [step])

        return () => {
            clearInterval(idTimer);
        }
    })
    
    const style = { width: width + "%" }
    return (
        <div className="timer">
            <div className="time" style={style}>{time}</div>
            <div className="button">
                <Button variant="contained" color="primary" id="start" onClick={() => setTimerPlay(true)}>Start</Button>
                <Button variant="contained" onClick={() => !counting ? setCounting(true) : setCounting(false)}>onTick</Button>
                <Button id="pause" variant="contained" color="secondary" onClick={() => setTimerPlay(false)}>Pause</Button>
            </div>
        </div >
    )
}
