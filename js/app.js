/*=========================================================
    js/app.js
    Part 1
    Main Controller + App State + Initialization
=========================================================*/

const App={

    mode:"time",

    timeLimit:60,

    wordCount:50,

    quoteLength:"medium",

    difficulty:"medium",

    currentText:"",

    isTestActive:false,

    settings:{

        fontSize:"medium",

        fontFamily:"JetBrains Mono",

        showWPM:true,

        showAccuracy:true,

        showTimer:true,

        showProgress:true,

        sound:false,

        caretStyle:"line",

        caretColor:"#4F46E5"

    }

};


/*=========================================================
    INIT
=========================================================*/

function appInit(){


appLoadTasks();
appLoadBadges();

    appLoadTasks();

appLoadBadges();


    themeInit();

    appLoadSettings();

    historyRenderBar();

    historyRender();

    appGenerateText();

    appBindEvents();

    uiResetLive();

    uiRenderText(

        App.currentText,

        0,

        []

    );

    document

    .getElementById("typingInput")

    .focus();

}


/*=========================================================
    GENERATE TEXT
=========================================================*/

function appGenerateText(){

    switch(App.mode){

        case "time":

            App.currentText=

            getRandomText(

                "time",

                App.difficulty

            );

        break;

        case "words":

            App.currentText=

            getWordList(

                App.wordCount,

                App.difficulty

            );

        break;

        case "quote":

            App.currentText=

            getQuote(

                App.quoteLength

            );

        break;

        case "custom":

            App.currentText=

            document

            .getElementById("customText")

            .value

            ||

            getRandomText(

                "time",

                App.difficulty

            );

        break;

        case "zen":

            App.currentText=

            getRandomText(

                "time",

                App.difficulty

            );

        break;

    }

}


/*=========================================================
    START TEST
=========================================================*/

function appStartTest(){

    App.isTestActive=true;

    engineInit(

        App.currentText

    );

    timerInit(

        App.mode==="time"

            ?"countdown"

            :"stopwatch",

        App.timeLimit

    );

    uiRenderText(

        App.currentText,

        0,

        []

    );

    document

    .getElementById("typingInput")

    .focus();

}


/*=========================================================
    NEW TEST
=========================================================*/

function appNewTest(){

    timerStop();

    appGenerateText();

    appStartTest();

}


/*=========================================================
    RESTART
=========================================================*/

function appRestartTest(){

    timerReset();

    engineRestart();

    uiResetLive();

    uiRenderText(

        App.currentText,

        0,

        []

    );

}


/*=========================================================
    SETTINGS
=========================================================*/

function appLoadSettings(){

    const saved=

    localStorage.getItem(

        "typingmaster_settings"

    );

    if(saved){

        App.settings=

        JSON.parse(saved);

    }

}

function appSaveSettings(){

    localStorage.setItem(

        "typingmaster_settings",

        JSON.stringify(

            App.settings

        )

    );

}



/*=========================================================
    js/app.js
    Part 2
    Typing Handler + End Test + Events
=========================================================*/


/*=========================================================
    HANDLE TYPING
=========================================================*/

function appHandleTyping(event){

    if(!App.isTestActive){

        appStartTest();

        timerStart();

    }

    const handled = engineHandleKeypress(event.key);

    if(!handled) return;

    const state = engineGetState();

    const stats = engineGetLiveStats();

    uiRenderText(

        state.text,

        state.currentIndex,

        state.errors

    );

    uiUpdateLiveStats(

        stats.wpm,

        stats.accuracy,

        stats.errors,

        stats.progress

    );

    uiScrollToCurrentWord();

    if(engineIsFinished()){

        appEndTest();

    }

}


/*=========================================================
    END TEST
=========================================================*/

function appEndTest(){

    timerStop();

    App.isTestActive = false;

    const result = engineGetResult();

    result.mode = App.mode;

    result.difficulty = App.difficulty;

    result.stars = statsGetStarRating(

        result.wpm,

        result.accuracy

    );

    result.message = statsGetMotivation(

        result.wpm,

        result.accuracy

    );

    historyAdd(result);

    historyRender();

    historyRenderBar();

    uiShowResults(result);

    checkAchievements(result);

    updateDailyTasks(result);

}


/*=========================================================
    ACHIEVEMENTS
=========================================================*/

function checkAchievements(result){

    const unlocked = [];

    if(result.wpm >= 60)
        unlocked.push("🚀 Speed Demon");

    if(result.wpm >= 80)
        unlocked.push("⚡ Lightning");

    if(result.wpm >= 100)
        unlocked.push("💎 Diamond Fingers");

    if(result.accuracy >= 99)
        unlocked.push("🎯 Sharp Shooter");

    if(result.accuracy === 100)
        unlocked.push("💯 Perfectionist");

    unlocked.forEach(item=>{

        uiShowToast(

            `${item} Unlocked`,

            "success"

        );

    });

}


/*=========================================================
    DAILY TASKS
=========================================================*/

function updateDailyTasks(result){

    const key = "typingmaster_tasks";

    let tasks = JSON.parse(

        localStorage.getItem(key)

        || "{}"

    );

    tasks.tests = (tasks.tests || 0) + 1;

    tasks.practice =

        (tasks.practice || 0)

        + result.duration;

    if(result.wpm >= 50){

        tasks.speed = true;

    }

    if(result.accuracy >= 95){

        tasks.accuracy = true;

    }

    if(result.duration >= 60){

        tasks.sixty = true;

    }

    localStorage.setItem(

        key,

        JSON.stringify(tasks)

    );

}


/*=========================================================
    EVENTS
=========================================================*/

function appBindEvents(){

    /* Typing */

    document

    .getElementById("typingInput")

    .addEventListener(

        "keydown",

        appHandleTyping

    );

    document

    .getElementById("typingArea")

    .addEventListener(

        "click",

        ()=>{

            document

            .getElementById("typingInput")

            .focus();

        }

    );

    /* Restart */

    document

    .getElementById("restartBtn")

    .addEventListener(

        "click",

        appRestartTest

    );

    /* Retry */

    document

    .getElementById("retryBtn")

    .addEventListener(

        "click",

        ()=>{

            uiHideResults();

            appRestartTest();

        }

    );

    /* New */

    document

    .getElementById("newTestBtn")

    .addEventListener(

        "click",

        ()=>{

            uiHideResults();

            appNewTest();

        }

    );

    /* Theme */

    document

    .getElementById("themeToggle")

    .addEventListener(

        "click",

        themeToggle

    );

    /* History */

    document

    .getElementById("historyBtn")

    .addEventListener(

        "click",

        ()=>uiOpenPanel("historyPanel")

    );

    /* Tasks */

    document

    .getElementById("tasksBtn")

    .addEventListener(

        "click",

        ()=>uiOpenPanel("taskPanel")

    );

    /* Settings */

    document

    .getElementById("settingsBtn")

    .addEventListener(

        "click",

        ()=>uiOpenPanel("settingsPanel")

    );

    /* Close Panels */

    document

    .querySelectorAll(".close-panel")

    .forEach(btn=>{

        btn.addEventListener(

            "click",

            uiCloseAllPanels

        );

    });

    /* Export CSV */

    document

    .getElementById("exportHistory")

    .addEventListener(

        "click",

        historyExportCSV

    );

    /* Clear History */

    document

    .getElementById("clearHistory")

    .addEventListener(

        "click",

        ()=>{

            historyClear();

            historyRender();

            historyRenderBar();

        }

    );

    /* Keyboard Shortcuts */

    document.addEventListener(

        "keydown",

        e=>{

            if(e.key==="Tab"){

                e.preventDefault();

                appRestartTest();

            }

            if(e.key==="F1"){

                e.preventDefault();

                document.body.classList.toggle(

                    "focus-mode"

                );

            }

            if(e.key==="Escape"){

                uiCloseAllPanels();

            }

        }

    );

}


/*=========================================================
    START APP
=========================================================*/

window.addEventListener(

    "DOMContentLoaded",

    appInit

);


function appLoadTasks() {

    const tasks = [

        { title: "Complete 3 typing tests", progress: 0, total: 3 },

        { title: "Achieve 50+ WPM", progress: 0, total: 1 },

        { title: "Get 95% Accuracy", progress: 0, total: 1 },

        { title: "Practice 10 Minutes", progress: 0, total: 600 },

        { title: "Complete 60 Second Test", progress: 0, total: 1 }

    ];

    uiRenderTasks(tasks);

}



function appLoadBadges() {

    const badges = [

        { icon:"🚀",name:"Speed Demon",locked:true },

        { icon:"🎯",name:"Sharp Shooter",locked:true },

        { icon:"🔥",name:"On Fire",locked:true },

        { icon:"⚡",name:"Lightning",locked:true },

        { icon:"💎",name:"Diamond Fingers",locked:true },

        { icon:"🏆",name:"Champion",locked:true },

        { icon:"📚",name:"Bookworm",locked:true },

        { icon:"🌙",name:"Night Owl",locked:true },

        { icon:"🎮",name:"Gamer",locked:true },

        { icon:"💯",name:"Perfectionist",locked:true }

    ];

    uiRenderBadges(badges);

}