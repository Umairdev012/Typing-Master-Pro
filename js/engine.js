/*=========================================================
    js/engine.js
    Part 1
    Engine State + Init + Reset + Pause
=========================================================*/

const Engine = {

    state:{

        text:"",
        typed:"",
        currentIndex:0,

        errors:[],
        errorCount:0,

        correctChars:0,
        wrongChars:0,

        isStarted:false,
        isFinished:false,
        isPaused:false,

        startTime:null,
        finishTime:null,

        currentWord:0,

        wpmHistory:[],
        wordTimings:[],
        keyErrors:{},

        charsTyped:0,

        lastWordTime:null

    }

};


/*=========================================================
    GET STATE
=========================================================*/

function engineGetState(){

    return Engine.state;

}


/*=========================================================
    INIT
=========================================================*/

function engineInit(text){

    Engine.state.text=text;

    Engine.state.typed="";

    Engine.state.currentIndex=0;

    Engine.state.errors=[];

    Engine.state.errorCount=0;

    Engine.state.correctChars=0;

    Engine.state.wrongChars=0;

    Engine.state.isStarted=false;

    Engine.state.isFinished=false;

    Engine.state.isPaused=false;

    Engine.state.startTime=null;

    Engine.state.finishTime=null;

    Engine.state.currentWord=0;

    Engine.state.wpmHistory=[];

    Engine.state.wordTimings=[];

    Engine.state.keyErrors={};

    Engine.state.charsTyped=0;

    Engine.state.lastWordTime=null;

}


/*=========================================================
    RESET
=========================================================*/

function engineReset(){

    engineInit(
        Engine.state.text
    );

}


/*=========================================================
    START
=========================================================*/

function engineStart(){

    if(Engine.state.isStarted) return;

    Engine.state.isStarted=true;

    Engine.state.startTime=Date.now();

    Engine.state.lastWordTime=Date.now();

}


/*=========================================================
    PAUSE
=========================================================*/

function enginePause(){

    Engine.state.isPaused=true;

}


/*=========================================================
    RESUME
=========================================================*/

function engineResume(){

    Engine.state.isPaused=false;

}


/*=========================================================
    FINISH
=========================================================*/

function engineFinish(){

    Engine.state.finishTime=Date.now();

    Engine.state.isFinished=true;

}


/*=========================================================
    WORD COUNT
=========================================================*/

function engineCountWords(){

    return Engine.state.text
        .trim()
        .split(/\s+/).length;

}


/*=========================================================
    CURRENT CHARACTER
=========================================================*/

function engineCurrentChar(){

    return Engine.state.text[
        Engine.state.currentIndex
    ];

}


/*=========================================================
    IS FINISHED
=========================================================*/

function engineIsFinished(){

    return Engine.state.currentIndex>=
        Engine.state.text.length;

}


/*=========================================================
    TOTAL CHARS
=========================================================*/

function engineTotalCharacters(){

    return Engine.state.text.length;

}


/*=========================================================
    PROGRESS
=========================================================*/

function engineProgress(){

    return Math.min(

        100,

        (
            Engine.state.currentIndex
            /
            Engine.state.text.length
        )*100

    );

}


/*=========================================================
    EXPORT
=========================================================*/

window.Engine=Engine;

window.engineInit=engineInit;

window.engineReset=engineReset;

window.enginePause=enginePause;

window.engineResume=engineResume;

window.engineStart=engineStart;

window.engineFinish=engineFinish;

window.engineCurrentChar=engineCurrentChar;

window.engineCountWords=engineCountWords;

window.engineProgress=engineProgress;

window.engineGetState=engineGetState;

window.engineIsFinished=engineIsFinished;

window.engineTotalCharacters=engineTotalCharacters;




/*=========================================================
    js/engine.js
    Part 2
    Typing Logic + Error Tracking + Live Stats
=========================================================*/


/*=========================================================
    HANDLE KEYPRESS
=========================================================*/

function engineHandleKeypress(key){

    const state = Engine.state;

    if(state.isFinished || state.isPaused){

        return false;

    }

    if(!state.isStarted){

        engineStart();

    }

    /* ESC = Restart */

    if(key === "Escape"){

        engineReset();

        return false;

    }

    /* Ignore Modifier Keys */

    const ignoreKeys = [
        "Shift","Control","Alt","Meta",
        "CapsLock","Tab","ArrowLeft",
        "ArrowRight","ArrowUp","ArrowDown"
    ];

    if(ignoreKeys.includes(key)){

        return false;

    }

    /*====================
        BACKSPACE
    ====================*/

    if(key === "Backspace"){

        if(state.currentIndex <= 0){

            return false;

        }

        state.currentIndex--;

        state.typed =
            state.typed.slice(0,-1);

        state.charsTyped =
            Math.max(0,state.charsTyped-1);

        return true;

    }

    const expected =
        state.text[state.currentIndex];

    state.typed += key;

    state.charsTyped++;

    /*====================
        CORRECT
    ====================*/

    if(key === expected){

        state.correctChars++;

        state.currentIndex++;

    }

    /*====================
        WRONG
    ====================*/

    else{

        state.errorCount++;

        state.wrongChars++;

        state.errors.push(
            state.currentIndex
        );

        state.keyErrors[key] =
            (state.keyErrors[key] || 0) + 1;

        state.currentIndex++;

    }

    /*====================
        WORD TIMING
    ====================*/

    if(expected === " "){

        const now = Date.now();

        state.wordTimings.push(

            now - state.lastWordTime

        );

        state.lastWordTime = now;

    }

    /*====================
        COMPLETE
    ====================*/

    if(

        state.currentIndex >=
        state.text.length

    ){

        engineFinish();

    }

    return true;

}


/*=========================================================
    LIVE STATS
=========================================================*/

function engineGetLiveStats(){

    const state = Engine.state;

    const elapsed =

        Math.max(

            1,

            (Date.now()-state.startTime)/1000

        );

    const wpm =

        engineCalcWPM(

            state.correctChars,

            elapsed

        );

    const accuracy =

        engineCalcAccuracy();

    return{

        wpm,

        accuracy,

        errors:state.errorCount,

        chars:state.charsTyped,

        progress:engineProgress()

    };

}


/*=========================================================
    WPM
=========================================================*/

function engineCalcWPM(chars,seconds){

    if(seconds<=0){

        return 0;

    }

    return Math.round(

        (chars/5) /

        (seconds/60)

    );

}


/*=========================================================
    ACCURACY
=========================================================*/

function engineCalcAccuracy(){

    const state = Engine.state;

    if(state.charsTyped===0){

        return 100;

    }

    return Number(

        (

            (state.correctChars/state.charsTyped)

            *100

        ).toFixed(1)

    );

}


/*=========================================================
    CONSISTENCY
=========================================================*/

function engineCalcConsistency(){

    const arr =

        Engine.state.wpmHistory;

    if(arr.length<2){

        return 100;

    }

    const avg =

        arr.reduce((a,b)=>a+b,0)

        / arr.length;

    let variance = 0;

    arr.forEach(value=>{

        variance +=

            Math.pow(

                value-avg,

                2

            );

    });

    variance /= arr.length;

    const deviation =

        Math.sqrt(variance);

    return Math.max(

        0,

        Math.round(

            100 -

            ((deviation/avg)*100)

        )

    );

}


/*=========================================================
    PUSH WPM
=========================================================*/

function enginePushWPM(){

    const stats =

        engineGetLiveStats();

    Engine.state.wpmHistory.push(

        stats.wpm

    );

}


/*=========================================================
    EXPORT
=========================================================*/

window.engineHandleKeypress =
    engineHandleKeypress;

window.engineGetLiveStats =
    engineGetLiveStats;

window.engineCalcAccuracy =
    engineCalcAccuracy;

window.engineCalcConsistency =
    engineCalcConsistency;

window.engineCalcWPM =
    engineCalcWPM;

window.enginePushWPM =
    enginePushWPM;


    /*=========================================================
    js/engine.js
    Part 3
    Skip Word + Final Result + Helpers
=========================================================*/


/*=========================================================
    SKIP CURRENT WORD
=========================================================*/

function engineSkipWord(){

    const state = Engine.state;

    if(state.isFinished) return;

    while(

        state.currentIndex < state.text.length &&
        state.text[state.currentIndex] !== " "

    ){

        state.errors.push(state.currentIndex);

        state.errorCount++;
        state.wrongChars++;

        state.currentIndex++;

    }

    if(state.text[state.currentIndex] === " "){

        state.currentIndex++;

    }

}


/*=========================================================
    CORRECT CHARACTERS
=========================================================*/

function engineCorrectCharacters(){

    return Engine.state.correctChars;

}


/*=========================================================
    WRONG CHARACTERS
=========================================================*/

function engineWrongCharacters(){

    return Engine.state.wrongChars;

}


/*=========================================================
    MISSED KEYS
=========================================================*/

function engineMostMissedKeys(limit=5){

    return Object.entries(
        Engine.state.keyErrors
    )

    .sort((a,b)=>b[1]-a[1])

    .slice(0,limit)

    .map(item=>({

        key:item[0],
        count:item[1]

    }));

}


/*=========================================================
    FINAL RESULT
=========================================================*/

function engineGetResult(){

    const state = Engine.state;

    const seconds =

        Math.max(

            1,

            (state.finishTime-state.startTime)/1000

        );

    const wpm =

        engineCalcWPM(

            state.correctChars,

            seconds

        );

    const accuracy =

        engineCalcAccuracy();

    const cpm =

        Math.round(

            (state.correctChars/seconds)*60

        );

    return{

        text:state.text,

        typed:state.typed,

        duration:Math.round(seconds),

        wpm,

        accuracy,

        cpm,

        progress:100,

        chars:state.charsTyped,

        correct:state.correctChars,

        wrong:state.wrongChars,

        errors:state.errorCount,

        consistency:

            engineCalcConsistency(),

        keyErrors:{

            ...state.keyErrors

        },

        missed:

            engineMostMissedKeys(),

        wpmHistory:[

            ...state.wpmHistory

        ],

        wordTimings:[

            ...state.wordTimings

        ]

    };

}


/*=========================================================
    RESTART
=========================================================*/

function engineRestart(){

    const text =

        Engine.state.text;

    engineInit(text);

}


/*=========================================================
    GET CURRENT WORD
=========================================================*/

function engineCurrentWord(){

    const before =

        Engine.state.text

        .substring(

            0,

            Engine.state.currentIndex

        );

    return before

        .trim()

        .split(/\s+/)

        .length;

}


/*=========================================================
    REMAINING CHARS
=========================================================*/

function engineRemainingCharacters(){

    return Math.max(

        0,

        Engine.state.text.length -

        Engine.state.currentIndex

    );

}


/*=========================================================
    REMAINING WORDS
=========================================================*/

function engineRemainingWords(){

    return Math.max(

        0,

        engineCountWords() -

        engineCurrentWord()

    );

}


/*=========================================================
    EXPORTS
=========================================================*/

window.engineSkipWord =
    engineSkipWord;

window.engineCorrectCharacters =
    engineCorrectCharacters;

window.engineWrongCharacters =
    engineWrongCharacters;

window.engineMostMissedKeys =
    engineMostMissedKeys;

window.engineGetResult =
    engineGetResult;

window.engineRestart =
    engineRestart;

window.engineCurrentWord =
    engineCurrentWord;

window.engineRemainingCharacters =
    engineRemainingCharacters;

window.engineRemainingWords =
    engineRemainingWords;

    