/*=========================================================
    js/ui.js
    Part 1
    Typing Render + Live Stats + Timer + Progress
=========================================================*/


/*=========================================================
    ELEMENTS
=========================================================*/

const typingTextEl =
document.getElementById("typingText");

const wpmEl =
document.getElementById("liveWPM");

const accuracyEl =
document.getElementById("liveAccuracy");

const errorsEl =
document.getElementById("liveErrors");

const charsEl =
document.getElementById("liveCharacters");

const timerEl =
document.getElementById("timerDisplay");

const progressFill =
document.getElementById("progressFill");


/*=========================================================
    RENDER TEXT
=========================================================*/

function uiRenderText(

    text,
    currentIndex,
    errors=[]

){

    let html="";

    for(let i=0;i<text.length;i++){

        let cls="char ";

        if(i<currentIndex){

            cls+=errors.includes(i)

                ?"wrong"
                :"correct";

        }

        else if(i===currentIndex){

            cls+="current";

        }

        else{

            cls+="upcoming";

        }

        const ch =

            text[i]===" "

            ? "&nbsp;"

            : text[i];

        html +=

        `<span class="${cls}">${ch}</span>`;

    }

    typingTextEl.innerHTML=html;

}


/*=========================================================
    LIVE STATS
=========================================================*/

function uiUpdateLiveStats(

    wpm,
    accuracy,
    errors,
    progress

){

    uiAnimateNumber(

        wpmEl,

        Number(wpm)

    );

    accuracyEl.textContent=

        accuracy+"%";

    errorsEl.textContent=

        errors;

    if(charsEl){

        charsEl.textContent=

        engineGetState().charsTyped;

    }

    progressFill.style.width=

        progress+"%";

}


/*=========================================================
    TIMER
=========================================================*/

function uiUpdateTimer(value){

    timerEl.textContent=value;

}


/*=========================================================
    RESET
=========================================================*/

function uiResetLive(){

    wpmEl.textContent="0";

    accuracyEl.textContent="100%";

    errorsEl.textContent="0";

    charsEl.textContent="0";

    timerEl.textContent="1:00";

    progressFill.style.width="0%";

}


/*=========================================================
    NUMBER ANIMATION
=========================================================*/

function uiAnimateNumber(

    element,

    target

){

    const start =

        Number(

            element.textContent

        ) || 0;

    const duration=250;

    const startTime=

        performance.now();

    function animate(now){

        const progress=

        Math.min(

            (now-startTime)

            /duration,

            1

        );

        element.textContent=

        Math.round(

            start+

            (target-start)

            *progress

        );

        if(progress<1){

            requestAnimationFrame(

                animate

            );

        }

    }

    requestAnimationFrame(

        animate

    );

}


/*=========================================================
    PROGRESS
=========================================================*/

function uiUpdateProgress(value){

    progressFill.style.width=

        value+"%";

}


/*=========================================================
    LOADING
=========================================================*/

function uiShowLoadingPulse(){

    typingTextEl.classList.add(

        "typing-loading"

    );

}

function uiHideLoadingPulse(){

    typingTextEl.classList.remove(

        "typing-loading"

    );

}


/*=========================================================
    AUTO SCROLL
=========================================================*/

function uiScrollToCurrentWord(){

    const current=

        document.querySelector(

            ".char.current"

        );

    if(current){

        current.scrollIntoView({

            behavior:"smooth",

            block:"center",

            inline:"nearest"

        });

    }

}


/*=========================================================
    EXPORT
=========================================================*/

window.uiRenderText=
uiRenderText;

window.uiUpdateLiveStats=
uiUpdateLiveStats;

window.uiUpdateTimer=
uiUpdateTimer;

window.uiResetLive=
uiResetLive;

window.uiAnimateNumber=
uiAnimateNumber;

window.uiUpdateProgress=
uiUpdateProgress;

window.uiShowLoadingPulse=
uiShowLoadingPulse;

window.uiHideLoadingPulse=
uiHideLoadingPulse;

window.uiScrollToCurrentWord=
uiScrollToCurrentWord;


/*=========================================================
    js/ui.js
    Part 2
    Results + Keyboard + Toast + Panels
=========================================================*/


/*=========================================================
    RESULTS
=========================================================*/

function uiShowResults(stats){

    document
        .getElementById("resultsScreen")
        .classList.remove("hidden");

    uiAnimateNumber(

        document.getElementById("finalWPM"),
        stats.wpm

    );

    uiAnimateNumber(

        document.getElementById("finalCPM"),
        stats.cpm

    );

    uiAnimateNumber(

        document.getElementById("finalErrors"),
        stats.errors

    );

    document.getElementById(
        "finalAccuracy"
    ).textContent=

        stats.accuracy+"%";

    document.getElementById(
        "finalConsistency"
    ).textContent=

        stats.consistency+"%";

    document.getElementById(
        "finalTime"
    ).textContent=

        stats.duration+"s";

    uiRenderStars(

        stats.stars

    );

    document.getElementById(
        "motivationMessage"
    ).textContent=

        stats.message;

    statsDrawWPMChart(

        document.getElementById("wpmChart"),

        stats.wpmHistory

    );

    statsDrawAccuracyBars(

        document.getElementById("accuracyChart"),

        stats.wordAccuracy || []

    );

    uiRenderKeyboard(

        stats.keyErrors

    );

    uiRenderMissedKeys(

        stats.missed

    );

}


/*=========================================================
    HIDE RESULTS
=========================================================*/

function uiHideResults(){

    document
        .getElementById("resultsScreen")
        .classList.add("hidden");

}


/*=========================================================
    STARS
=========================================================*/

function uiRenderStars(count){

    const box=

        document.getElementById(
            "starRating"
        );

    box.innerHTML="";

    for(let i=1;i<=5;i++){

        box.innerHTML+=`

        <i class="fa-solid fa-star
        ${i<=count ? "" : "opacity-50"}">
        </i>`;

    }

}


/*=========================================================
    MISSED KEYS
=========================================================*/

function uiRenderMissedKeys(keys){

    const list=

        document.getElementById(
            "missedKeys"
        );

    list.innerHTML="";

    keys.forEach(item=>{

        list.innerHTML+=`

        <li>

            ${item.key}

            (${item.count})

        </li>`;

    });

}


/*=========================================================
    KEYBOARD
=========================================================*/

function uiRenderKeyboard(keyErrors){

    const rows=[

        ["1","2","3","4","5","6","7","8","9","0"],

        ["Q","W","E","R","T","Y","U","I","O","P"],

        ["A","S","D","F","G","H","J","K","L"],

        ["Z","X","C","V","B","N","M"]

    ];

    const box=

        document.getElementById(
            "keyboardHeatmap"
        );

    box.innerHTML="";

    rows.forEach(row=>{

        const div=

            document.createElement("div");

        div.className="keyboard-row";

        row.forEach(letter=>{

            const key=

                document.createElement("div");

            const info=

                statsKeyInfo(

                    letter.toLowerCase(),

                    keyErrors

                );

            key.className=

                "key "+info.color;

            key.textContent=

                letter;

            key.title=

`${letter}
Errors: ${info.errors}`;

            div.appendChild(key);

        });

        box.appendChild(div);

    });

}


/*=========================================================
    TOAST
=========================================================*/

function uiShowToast(

    message,

    type="info"

){

    const toast=

        document.getElementById(
            "toast"
        );

    toast.className=

        type+" show";

    toast.textContent=

        message;

    clearTimeout(

        toast.timer

    );

    toast.timer=

        setTimeout(()=>{

            toast.className="";

        },2500);

}


/*=========================================================
    PANELS
=========================================================*/

function uiOpenPanel(id){

    document
        .getElementById(id)
        .classList.add("active");

}

function uiClosePanel(id){

    document
        .getElementById(id)
        .classList.remove("active");

}

function uiCloseAllPanels(){

    document

    .querySelectorAll(".side-panel")

    .forEach(panel=>{

        panel.classList.remove(

            "active"

        );

    });

}


/*=========================================================
    EXPORT
=========================================================*/

window.uiShowResults=
uiShowResults;

window.uiHideResults=
uiHideResults;

window.uiRenderStars=
uiRenderStars;

window.uiRenderKeyboard=
uiRenderKeyboard;

window.uiRenderMissedKeys=
uiRenderMissedKeys;

window.uiShowToast=
uiShowToast;

window.uiOpenPanel=
uiOpenPanel;

window.uiClosePanel=
uiClosePanel;

window.uiCloseAllPanels=
uiCloseAllPanels;



/*=========================================================
    TASKS
=========================================================*/

function uiRenderTasks(tasks){

    const container = document.getElementById("taskContainer");

    if(!container) return;

    container.innerHTML = "";

    tasks.forEach(task=>{

        const percent = Math.min(
            100,
            (task.progress / task.total) * 100
        );

        container.innerHTML += `
        <div class="task">

            <div class="task-title">
                <h4>${task.title}</h4>
                <span>${task.progress}/${task.total}</span>
            </div>

            <div class="task-progress">
                <div
                    class="task-progress-fill"
                    style="width:${percent}%">
                </div>
            </div>

        </div>
        `;

    });

}


/*=========================================================
    BADGES
=========================================================*/

function uiRenderBadges(badges){

    const container = document.getElementById("badgeContainer");

    if(!container) return;

    container.innerHTML = "";

    badges.forEach(badge=>{

        container.innerHTML += `
        <div class="badge-card ${badge.locked ? "locked" : "unlocked"}">

            <div class="badge-icon">
                ${badge.icon}
            </div>

            <div class="badge-name">
                ${badge.name}
            </div>

        </div>
        `;

    });

}


/*=========================================================
    EXPORT
=========================================================*/

window.uiRenderTasks = uiRenderTasks;
window.uiRenderBadges = uiRenderBadges;