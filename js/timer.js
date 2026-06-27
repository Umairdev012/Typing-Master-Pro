/*=========================================================
    js/timer.js
    Part 1
    Timer Core
=========================================================*/

const Timer = {

    mode: "countdown",

    duration: 60,

    remaining: 60,

    elapsed: 0,

    interval: null,

    running: false,

    tickCallbacks: [],

    completeCallbacks: []

};


/*=========================================================
    INIT
=========================================================*/

function timerInit(mode = "countdown", duration = 60){

    timerStop();

    Timer.mode = mode;

    Timer.duration = duration;

    Timer.remaining = duration;

    Timer.elapsed = 0;

    Timer.running = false;

}


/*=========================================================
    START
=========================================================*/

function timerStart(){

    if(Timer.running) return;

    Timer.running = true;

    Timer.interval = setInterval(timerTick,1000);

}


/*=========================================================
    STOP
=========================================================*/

function timerStop(){

    clearInterval(Timer.interval);

    Timer.interval = null;

    Timer.running = false;

}


/*=========================================================
    RESET
=========================================================*/

function timerReset(){

    timerStop();

    Timer.remaining = Timer.duration;

    Timer.elapsed = 0;

}


/*=========================================================
    TICK
=========================================================*/

function timerTick(){

    if(!Timer.running) return;

    if(Timer.mode === "countdown"){

        Timer.remaining--;

        Timer.elapsed++;

        timerFireTick();

        if(Timer.remaining <= 0){

            Timer.remaining = 0;

            timerStop();

            timerFireComplete();

        }

    }else{

        Timer.elapsed++;

        timerFireTick();

    }

}


/*=========================================================
    ELAPSED
=========================================================*/

function timerGetElapsed(){

    return Timer.elapsed;

}


/*=========================================================
    REMAINING
=========================================================*/

function timerGetRemaining(){

    return Timer.remaining;

}


/*=========================================================
    FORMAT
=========================================================*/

function timerFormat(seconds){

    const min = Math.floor(seconds / 60);

    const sec = seconds % 60;

    return `${min}:${String(sec).padStart(2,"0")}`;

}


/*=========================================================
    IS RUNNING
=========================================================*/

function timerIsRunning(){

    return Timer.running;

}



/*=========================================================
    js/timer.js
    Part 2
    Callbacks + UI + Exports
=========================================================*/


/*=========================================================
    ON TICK
=========================================================*/

function timerOnTick(callback){

    if(typeof callback === "function"){

        Timer.tickCallbacks.push(callback);

    }

}


/*=========================================================
    ON COMPLETE
=========================================================*/

function timerOnComplete(callback){

    if(typeof callback === "function"){

        Timer.completeCallbacks.push(callback);

    }

}


/*=========================================================
    FIRE TICK
=========================================================*/

function timerFireTick(){

    const display =

        Timer.mode === "countdown"

        ? timerFormat(Timer.remaining)

        : timerFormat(Timer.elapsed);


    /* Update Timer UI */

    if(

        typeof uiUpdateTimer === "function"

    ){

        uiUpdateTimer(display);

    }


    /* Save WPM History */

    if(

        typeof enginePushWPM === "function"

    ){

        enginePushWPM();

    }


    /* Live Stats */

    if(

        typeof engineGetLiveStats === "function" &&
        typeof uiUpdateLiveStats === "function"

    ){

        const stats =

            engineGetLiveStats();

        uiUpdateLiveStats(

            stats.wpm,
            stats.accuracy,
            stats.errors,
            stats.progress

        );

    }


    /* Custom Events */

    Timer.tickCallbacks.forEach(callback=>{

        callback({

            elapsed:Timer.elapsed,

            remaining:Timer.remaining,

            display

        });

    });

}


/*=========================================================
    FIRE COMPLETE
=========================================================*/

function timerFireComplete(){

    Timer.completeCallbacks.forEach(callback=>{

        callback();

    });

}


/*=========================================================
    DESTROY
=========================================================*/

function timerDestroy(){

    timerStop();

    Timer.tickCallbacks=[];

    Timer.completeCallbacks=[];

}


/*=========================================================
    EXPORT
=========================================================*/

window.Timer = Timer;

window.timerInit = timerInit;

window.timerStart = timerStart;

window.timerStop = timerStop;

window.timerReset = timerReset;

window.timerTick = timerTick;

window.timerGetElapsed = timerGetElapsed;

window.timerGetRemaining = timerGetRemaining;

window.timerFormat = timerFormat;

window.timerIsRunning = timerIsRunning;

window.timerOnTick = timerOnTick;

window.timerOnComplete = timerOnComplete;

window.timerDestroy = timerDestroy;
