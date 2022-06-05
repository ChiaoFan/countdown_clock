import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import Fireworks from './fireworks.gif';

const Button = styled.button`
    background: ${props => props.primary ? "palevioletred" : "white"};
    color: ${props => props.primary ? "white" : "palevioletred"};
    cursor: pointer;
    font-size: 14px;
    margin: 10px;
    padding: 5px;
    border: 2px solid palevioletred;
    border-radius: 3px;
`;

const Input = styled.input`
    padding: 5px;
    margin: 5px;
    color: black;
    background: white;
    border-radius: 3px;
    
`;

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
        if(minutesInput || secondsInput){
            setCountDownTimeInSecond(parseInt(minutesInput) * 60 + parseInt(secondsInput));
            setStartTimer(true);
        }
        

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
            <Input id="minutes" type="number" value={minutesInput} onChange={e => setMinutesInput(e.target.value)}/>
            Minutes
          </label>
          <label>
            <Input id="seconds" type="number" value={secondsInput} onChange={e => setSecondsInput(e.target.value)}/>
            Seconds
          </label>
        <div>
          <Button primary onClick={startEventHandler}>START</Button>
          <Button onClick={pauseEventHandler}>PAUSE / RESUME</Button>
          <Button onClick={resetEventHandler}>RESET</Button>
          <h1 data-testid="running-clock">{Math.floor(countdownTimeInSecond / 60).toString().padStart(2, '0')} : {(countdownTimeInSecond % 60).toString().padStart(2, '0')}</h1>
        </div>
         {countdownTimeInSecond === 0 && startTimer && <img src={Fireworks} alt="fireworks"/>}
        </Fragment>
      
      );
});



export default CountdownClock;