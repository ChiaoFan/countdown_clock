import React, { Fragment, useState, useEffect } from 'react';

const CountdownClock = React.memo((props) => {
    const [minutesInput, setMinutesInput] = useState(0);
    const [secondsInput, setSecondsInput] = useState(0);
    const [countdownTimeInSecond, setCountDownTimeInSecond] = useState(0);
    const [startTimer, setStartTimer] = useState(false);

    console.log(countdownTimeInSecond);
    

    useEffect(() => {
        if(startTimer){
          const interval = setInterval(()=> {
            if(countdownTimeInSecond > 0){
                setCountDownTimeInSecond(countdownTimeInSecond - 1);
            }
          },1000);
          return () => clearInterval(interval);
        }
     
    },[countdownTimeInSecond, startTimer]);

    const startEventHandler = (event) => {
        event.preventDefault();
        setCountDownTimeInSecond(parseInt(minutesInput) * 60 + parseInt(secondsInput));
        setStartTimer(true);
    }

    const pauseEventHandler = (event) => {
        event.preventDefault();
        setStartTimer(!startTimer);
    }

    const resetEventHandler = (event) => {
        event.preventDefault();
        setCountDownTimeInSecond(0);
        setStartTimer(false);
        setMinutesInput(0);
        setSecondsInput(0);
    }

    return (
        <Fragment>
          <label>
            <input id="minutes" type="number" value={minutesInput} onChange={e => setMinutesInput(e.target.value)}/>
            Minutes
          </label>
          <label>
            <input id="seconds" type="number" value={secondsInput} onChange={e => setSecondsInput(e.target.value)}/>
            Seconds
          </label>
    
          <button onClick={startEventHandler}>START</button>
          <button onClick={pauseEventHandler}>PAUSE / RESUME</button>
          <button onClick={resetEventHandler}>RESET</button>
          <h1 data-testid="running-clock">{Math.floor(countdownTimeInSecond / 60).toString().padStart(2, '0')} : {(countdownTimeInSecond % 60).toString().padStart(2, '0')}</h1>
          
        </Fragment>
      );
});



export default CountdownClock;