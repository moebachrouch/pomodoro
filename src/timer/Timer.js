import React, { useState, useEffect } from "react";

const TIME_INTERVAL = 1000;
const WORK_CYCLES = 4;
const WORK_TIME = 25;
const BREAK_TIME = 5;
const LONG_BREAK_TIME = 25;

let TEMP_WORK_CYCLES = WORK_CYCLES;
let TEMP_WORK_TIME = WORK_TIME;
let TEMP_BREAK_TIME = BREAK_TIME;
let TEMP_LONG_BREAK_TIME = LONG_BREAK_TIME;

const Timer = (props) => {
  const [workCycles, setWorkCycles] = useState(WORK_CYCLES);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [isLongBreakTime, setIsLongBreakTime] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [workSeconds, setWorkSeconds] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(WORK_TIME);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(BREAK_TIME);
  const [longBreakSeconds, setLongBreakSeconds] = useState(0);
  const [longBreakMinutes, setLongBreakMinutes] = useState(LONG_BREAK_TIME);

  const updateWorkMinutes = (min) => {
    TEMP_WORK_TIME = min.target.value;

    setWorkMinutes(TEMP_WORK_TIME);
    setWorkSeconds(0);
  };

  const updateBreakMinutes = (min) => {
    TEMP_BREAK_TIME = min.target.value;

    setBreakMinutes(TEMP_BREAK_TIME);
    setBreakSeconds(0);
  };

  const updateLongBreakMinutes = (min) => {
    TEMP_LONG_BREAK_TIME = min.target.value;

    setLongBreakMinutes(TEMP_LONG_BREAK_TIME);
    setLongBreakSeconds(0);
  };

  const updateWorkCycles = (cycles) => {
    TEMP_WORK_CYCLES = cycles.target.value;

    setWorkCycles(TEMP_WORK_CYCLES);
  };

  const resetTimer = () => {
    setIsPaused(true);
    setWorkCycles(TEMP_WORK_CYCLES);

    setWorkSeconds(0);
    setWorkMinutes(TEMP_WORK_TIME);

    setBreakSeconds(0);
    setBreakMinutes(TEMP_BREAK_TIME);

    setLongBreakSeconds(0);
    setLongBreakMinutes(TEMP_LONG_BREAK_TIME);

    clearAllTimers();
  };

  const resetApp = () => {
    TEMP_WORK_CYCLES = WORK_CYCLES;
    TEMP_WORK_TIME = WORK_TIME;
    TEMP_BREAK_TIME = BREAK_TIME;
    TEMP_LONG_BREAK_TIME = LONG_BREAK_TIME;

    setWorkCycles(TEMP_WORK_CYCLES);
    setIsWorkTime(true);
    setIsLongBreakTime(false);
    setIsPaused(true);

    setWorkSeconds(0);
    setWorkMinutes(WORK_TIME);

    setBreakSeconds(0);
    setBreakMinutes(BREAK_TIME);

    setLongBreakSeconds(0);
    setLongBreakMinutes(LONG_BREAK_TIME);

    clearAllTimers();
  };

  const startWorkTimer = () => {
    clearInterval(workTimerInterval);
    unpauseTimer();
    workTimerInterval = setInterval(() => {
      if (!isPaused) {
        // When there are no seconds left
        // but as long as there are minutes left
        if (workMinutes > 0 && workSeconds === 0) {
          resetWorkSeconds();
          decrementWorkMinutes();

          // As long as there are seconds and minutes left
        } else if (workMinutes >= 0 && workSeconds > 0) {
          decrementWorkSeconds();

          // When the timer ends, switch to break timer
        } else if (workCycles > 1) {
          startBreak();
        } else {
          startLongBreak();
        }
      }
    }, TIME_INTERVAL);
  };

  const startBreakTimer = () => {
    clearInterval(breakTimerInterval);
    unpauseTimer();
    breakTimerInterval = setInterval(() => {
      if (!isPaused) {
        // When there are no seconds left
        // but as long as there are minutes left
        if (breakMinutes > 0 && breakSeconds === 0) {
          resetBreakSeconds();
          decrementBreakMinutes();

          // As long as there are seconds and minutes left
        } else if (breakMinutes >= 0 && breakSeconds > 0) {
          decrementBreakSeconds();

          // When the timer ends, switch to work timer
        } else {
          startWork();
        }
      }
    }, TIME_INTERVAL);
  };

  const startLongBreakTimer = () => {
    clearInterval(longBreakTimeInterval);
    unpauseTimer();
    longBreakTimeInterval = setInterval(() => {
      if (!isPaused) {
        // When there are no seconds left
        // but as long as there are minutes left
        if (longBreakMinutes > 0 && longBreakSeconds === 0) {
          resetLongBreakSeconds();
          decrementLongBreakMinutes();

          // As long as there are seconds and minutes left
        } else if (longBreakMinutes >= 0 && longBreakSeconds > 0) {
          decrementLongBreakSeconds();

          // When the timer ends, switch to work timer
        } else {
          resetApp();
          startWork();
        }
      }
    }, TIME_INTERVAL);
  };

  const decrementWorkCycles = () => {
    setWorkCycles(workCycles - 1);
  };

  const unpauseTimer = () => {
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
    clearAllTimers();
  };

  const clearAllTimers = () => {
    clearInterval(longBreakTimeInterval);
    clearInterval(breakTimerInterval);
    clearInterval(workTimerInterval);
  };

  const resetWorkSeconds = () => {
    if (workSeconds === 0) {
      setWorkSeconds(59);
    }
  };

  const resetBreakSeconds = () => {
    if (breakSeconds === 0) {
      setBreakSeconds(59);
    }
  };

  const resetLongBreakSeconds = () => {
    if (breakSeconds === 0) {
      setLongBreakSeconds(59);
    }
  };

  const decrementWorkSeconds = () => {
    setWorkSeconds(workSeconds - 1);
  };

  const decrementLongBreakSeconds = () => {
    setLongBreakSeconds(longBreakSeconds - 1);
  };

  const decrementBreakSeconds = () => {
    setBreakSeconds(breakSeconds - 1);
  };

  const decrementWorkMinutes = () => {
    setWorkMinutes(workMinutes - 1);
  };

  const decrementBreakMinutes = () => {
    setBreakMinutes(breakMinutes - 1);
  };

  const decrementLongBreakMinutes = () => {
    setLongBreakMinutes(longBreakMinutes - 1);
  };

  const adjustDigitsFormat = (num) => {
    let format = num > 9 ? num : "0" + num;
    return format;
  };

  const startWork = () => {
    setIsWorkTime(true);
    setIsLongBreakTime(false);
    setIsPaused(true);

    setWorkSeconds(0);
    setWorkMinutes(WORK_TIME);

    setBreakSeconds(0);
    setBreakMinutes(BREAK_TIME);

    setLongBreakSeconds(0);
    setLongBreakMinutes(LONG_BREAK_TIME);

    clearAllTimers();
    startWorkTimer();
  };

  const startBreak = () => {
    decrementWorkCycles();

    setIsWorkTime(false);
    setIsLongBreakTime(false);
    setIsPaused(true);

    setWorkSeconds(0);
    setWorkMinutes(WORK_TIME);

    setBreakSeconds(0);
    setBreakMinutes(BREAK_TIME);

    setLongBreakSeconds(0);
    setLongBreakMinutes(LONG_BREAK_TIME);

    clearAllTimers();
    startBreakTimer();
  };

  const startLongBreak = () => {
    setIsWorkTime(false);
    setIsLongBreakTime(true);
    setIsPaused(true);

    setWorkSeconds(0);
    setWorkMinutes(WORK_TIME);

    setBreakSeconds(0);
    setBreakMinutes(BREAK_TIME);

    setLongBreakSeconds(0);
    setLongBreakMinutes(LONG_BREAK_TIME);

    setWorkCycles(WORK_CYCLES); // reset the number of work cycles

    clearAllTimers();
    startLongBreakTimer();
  };

  const startLongBreakAndPause = () => {
    resetTimer();

    setIsWorkTime(false);
    setIsLongBreakTime(true);
  };

  const startWorkAndPause = () => {
    resetTimer();

    setIsWorkTime(true);
    setIsLongBreakTime(false);
    clearAllTimers();
  };

  const startBreakAndPause = () => {
    resetTimer();

    setIsWorkTime(false);
    clearAllTimers();
  };

  let minutesToDisplay;
  let secondsToDisplay;
  if (!isLongBreakTime && isWorkTime) {
    minutesToDisplay = adjustDigitsFormat(workMinutes);
    secondsToDisplay = this.adjustDigitsFormat(workSeconds);
  } else if (!isLongBreakTime && !isWorkTime) {
    minutesToDisplay = this.adjustDigitsFormat(breakMinutes);
    secondsToDisplay = this.adjustDigitsFormat(breakSeconds);
  } else {
    minutesToDisplay = this.adjustDigitsFormat(longBreakMinutes);
    secondsToDisplay = this.adjustDigitsFormat(longBreakSeconds);
  }

  let startButton;
  if (isPaused) {
    startButton = (
      <button
        onClick={() => {
          if (!isLongBreakTime && isWorkTime) {
            this.startWorkTimer();
          } else if (!isLongBreakTime && !isWorkTime) {
            this.startBreakTimer();
          } else {
            this.startLongBreakTimer();
          }
        }}
      >
        Start
      </button>
    );
  } else {
    startButton = <button onClick={this.pauseTimer}>Pause</button>;
  }

  let workButton;
  if (!isLongBreakTime && isWorkTime) {
    workButton = (
      <button
        onClick={() => {
          this.startBreakAndPause();
        }}
      >
        Short Break
      </button>
    );
  } else if (!isLongBreakTime && !isWorkTime) {
    workButton = (
      <button
        onClick={() => {
          this.startWorkAndPause();
        }}
      >
        Work
      </button>
    );
  } else {
    workButton = (
      <button
        onClick={() => {
          this.startWorkAndPause();
        }}
      >
        Work
      </button>
    );
  }

  let displayColour;
  if (!isLongBreakTime && isWorkTime) {
    displayColour = "#9c1c00";
  } else if (!isLongBreakTime && !isWorkTime) {
    displayColour = "#039054";
  } else {
    displayColour = "#003eb3";
  }

  let isNotPaused = !isPaused;

  return (
    <div>
      <div></div>
      <div>
        <h1 key={this.props.workMinutes} style={{ color: displayColour }}>
          {minutesToDisplay}:{secondsToDisplay}
        </h1>
      </div>
      <div>
        {startButton}

        <button onClick={this.resetTimer}>Reset Time</button>

        {workButton}

        <button
          onClick={() => {
            this.startLongBreakAndPause();
          }}
        >
          Long Break
        </button>
      </div>
      <div>
        <button onClick={this.resetApp}>Reset Pomodoro</button>
      </div>

      <div>
        {!isLongBreakTime ? (
          <h1>
            {workCycles} / {TEMP_WORK_CYCLES}
          </h1>
        ) : (
          <h1>Time for a long break!</h1>
        )}
      </div>

      <div>
        <h2>Settings:</h2>
      </div>

      <div>
        <div>
          <div>
            <div>
              <form>
                <label>Work interval duration: </label>
                <select
                  disabled={isNotPaused}
                  onChange={this.updateWorkMinutes}
                >
                  <option defaultValue="selected" value="25">
                    25 minutes
                  </option>
                  <option value="30">30 minutes</option>
                  <option value="35">35 minutes</option>
                  <option value="40">40 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="50">50 minutes</option>
                  <option value="55">55 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </form>
            </div>
            <div>
              <form>
                <label>Short break duration: </label>
                <select
                  onChange={this.updateBreakMinutes}
                  disabled={isNotPaused}
                >
                  <option defaultValue="selected" value="5">
                    5 minutes
                  </option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                </select>
              </form>
            </div>

            <div>
              <label>Long break duration: </label>
              <select
                onChange={this.updateLongBreakMinutes}
                disabled={isNotPaused}
              >
                <option defaultValue="selected" value="15">
                  15 minutes
                </option>
                <option value="20">20 minutes</option>
                <option value="25">25 minutes</option>
                <option value="30">30 minutes</option>
              </select>
            </div>

            <div>
              <label>Long break after: </label>
              <select onChange={this.updateWorkCycles} disabled={isNotPaused}>
                <option defaultValue="selected" value="4">
                  4 pomodoros
                </option>
                <option value="3">3 pomodoros</option>
                <option value="1">2 pomodoros</option>
                <option value="1">1 pomodoro</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
