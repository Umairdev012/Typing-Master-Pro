const HISTORY_KEY = "typingmaster_history";
const HISTORY_LIMIT = 50;

function historyLoad() {

    try {

        const data = localStorage.getItem(HISTORY_KEY);

        return data ? JSON.parse(data) : [];

    } catch (e) {

        console.error(e);

        return [];

    }

}

function historySave(history) {

    localStorage.setItem(

        HISTORY_KEY,

        JSON.stringify(history)

    );

}



/*=========================================================
    js/stats.js
    Part 2
    Canvas Charts + Keyboard Heatmap Helpers
=========================================================*/


/*=========================================================
    DRAW WPM CHART
=========================================================*/

function statsDrawWPMChart(canvas, wpmHistory){

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0,0,width,height);

    if(!wpmHistory || wpmHistory.length===0){

        ctx.fillStyle="#94A3B8";
        ctx.font="16px Inter";
        ctx.textAlign="center";
        ctx.fillText("No WPM Data",width/2,height/2);

        return;

    }

    const padding=40;

    const graphWidth=width-padding*2;
    const graphHeight=height-padding*2;

    const max=Math.max(...wpmHistory,10);

    /* Grid */

    ctx.strokeStyle="#E4E7EF";
    ctx.lineWidth=1;

    for(let i=0;i<=5;i++){

        const y=

            padding+

            (graphHeight/5)*i;

        ctx.beginPath();

        ctx.moveTo(padding,y);

        ctx.lineTo(width-padding,y);

        ctx.stroke();

    }

    /* Area */

    ctx.beginPath();

    ctx.moveTo(padding,height-padding);

    wpmHistory.forEach((value,index)=>{

        const x=

            padding+

            (index/(wpmHistory.length-1||1))

            *graphWidth;

        const y=

            height-padding-

            (value/max)

            *graphHeight;

        ctx.lineTo(x,y);

    });

    ctx.lineTo(width-padding,height-padding);

    ctx.closePath();

    ctx.fillStyle="rgba(79,70,229,.15)";
    ctx.fill();

    /* Line */

    ctx.beginPath();

    wpmHistory.forEach((value,index)=>{

        const x=

            padding+

            (index/(wpmHistory.length-1||1))

            *graphWidth;

        const y=

            height-padding-

            (value/max)

            *graphHeight;

        if(index===0){

            ctx.moveTo(x,y);

        }else{

            ctx.lineTo(x,y);

        }

    });

    ctx.strokeStyle="#4F46E5";
    ctx.lineWidth=3;
    ctx.stroke();

    /* Points */

    ctx.fillStyle="#4F46E5";

    wpmHistory.forEach((value,index)=>{

        const x=

            padding+

            (index/(wpmHistory.length-1||1))

            *graphWidth;

        const y=

            height-padding-

            (value/max)

            *graphHeight;

        ctx.beginPath();

        ctx.arc(x,y,4,0,Math.PI*2);

        ctx.fill();

    });

}


/*=========================================================
    DRAW ACCURACY BARS
=========================================================*/

function statsDrawAccuracyBars(canvas,data){

    if(!canvas) return;

    const ctx=canvas.getContext("2d");

    const w=canvas.width;
    const h=canvas.height;

    ctx.clearRect(0,0,w,h);

    if(!data || data.length===0){

        ctx.fillStyle="#94A3B8";
        ctx.font="16px Inter";
        ctx.textAlign="center";
        ctx.fillText("No Accuracy Data",w/2,h/2);

        return;

    }

    const padding=40;

    const barWidth=

        (w-padding*2)/data.length;

    data.forEach((value,index)=>{

        const barHeight=

            ((value||0)/100)

            *(h-padding*2);

        const x=

            padding+

            index*barWidth+6;

        const y=

            h-padding-barHeight;

        ctx.fillStyle="#4F46E5";

        ctx.fillRect(

            x,
            y,
            barWidth-12,
            barHeight

        );

    });

}


/*=========================================================
    HEATMAP COLORS
=========================================================*/

function statsHeatColor(errors){

    if(errors===0)

        return "safe";

    if(errors<=2)

        return "low";

    if(errors<=5)

        return "medium";

    if(errors<=8)

        return "high";

    return "extreme";

}


/*=========================================================
    KEY STATS
=========================================================*/

function statsKeyInfo(key,keyErrors){

    const count=

        keyErrors[key]||0;

    return{

        key,

        errors:count,

        color:

            statsHeatColor(count)

    };

}


/*=========================================================
    EXPORT
=========================================================*/

window.statsDrawWPMChart=
statsDrawWPMChart;

window.statsDrawAccuracyBars=
statsDrawAccuracyBars;

window.statsHeatColor=
statsHeatColor;

window.statsKeyInfo=
statsKeyInfo;



/*=========================================================
    js/history.js
    Part 2
    Personal Best + Render + CSV + Streak
=========================================================*/


/*=========================================================
    PERSONAL BEST
=========================================================*/

function historyGetPersonalBest(){

    const history = historyLoad();

    if(history.length === 0){

        return{

            bestWPM:0,
            bestAccuracy:0,
            totalTests:0,
            totalTime:0,
            avgWPM:0

        };

    }

    const bestWPM = Math.max(

        ...history.map(item=>item.wpm)

    );

    const bestAccuracy = Math.max(

        ...history.map(item=>Number(item.accuracy))

    );

    const totalTests = history.length;

    const totalTime = history.reduce(

        (sum,item)=>sum+item.duration,

        0

    );

    const lastTen = history.slice(0,10);

    const avgWPM = Math.round(

        lastTen.reduce(

            (sum,item)=>sum+item.wpm,

            0

        ) / lastTen.length

    );

    return{

        bestWPM,
        bestAccuracy,
        totalTests,
        totalTime,
        avgWPM

    };

}


/*=========================================================
    RENDER HISTORY
=========================================================*/

function historyRender(){

    const container =

        document.getElementById("historyList");

    if(!container) return;

    const history = historyLoad();

    if(history.length===0){

        container.innerHTML =

        `<div class="empty-state">

            <i class="fa-solid fa-clock-rotate-left"></i>

            <p>No history found.</p>

        </div>`;

        return;

    }

    container.innerHTML =

        history.map(item=>`

        <div class="history-item">

            <div class="history-top">

                <span class="history-date">

                    ${new Date(item.date).toLocaleString()}

                </span>

                <span class="history-mode">

                    ${item.mode}

                </span>

            </div>

            <div class="history-stats">

                <div class="history-stat">

                    <span>WPM</span>

                    <strong>${item.wpm}</strong>

                </div>

                <div class="history-stat">

                    <span>ACC</span>

                    <strong>${item.accuracy}%</strong>

                </div>

                <div class="history-stat">

                    <span>Time</span>

                    <strong>${item.duration}s</strong>

                </div>

                <div class="history-stat">

                    <span>Stars</span>

                    <strong>${item.stars} ⭐</strong>

                </div>

            </div>

        </div>

    `).join("");

}


/*=========================================================
    EXPORT CSV
=========================================================*/

function historyExportCSV(){

    const history = historyLoad();

    if(history.length===0){

        alert("No history available.");

        return;

    }

    let csv =

`Date,Mode,Difficulty,WPM,Accuracy,CPM,Errors,Duration,Consistency,Stars,Length
`;

    history.forEach(item=>{

        csv +=

`${item.date},
${item.mode},
${item.difficulty},
${item.wpm},
${item.accuracy},
${item.cpm},
${item.errors},
${item.duration},
${item.consistency},
${item.stars},
${item.text_length}
`;

    });

    const blob =

        new Blob(

            [csv],

            {type:"text/csv"}

        );

    const url =

        URL.createObjectURL(blob);

    const a =

        document.createElement("a");

    a.href = url;

    a.download =

        "typing-history.csv";

    a.click();

    URL.revokeObjectURL(url);

}


/*=========================================================
    STREAK
=========================================================*/

function historyGetStreak(){

    const history = historyLoad();

    if(history.length===0){

        return 0;

    }

    const dates =

        [...new Set(

            history.map(item=>

                item.date.slice(0,10)

            )

        )].sort().reverse();

    let streak = 1;

    for(let i=1;i<dates.length;i++){

        const prev =

            new Date(dates[i-1]);

        const curr =

            new Date(dates[i]);

        const diff =

            (prev-curr)/86400000;

        if(diff===1){

            streak++;

        }else{

            break;

        }

    }

    return streak;

}


/*=========================================================
    TOP BAR
=========================================================*/

function historyRenderBar(){

    const stats =

        historyGetPersonalBest();

    document.getElementById("bestWPM").textContent =
        stats.bestWPM;

    document.getElementById("bestAccuracy").textContent =
        stats.bestAccuracy + "%";

    document.getElementById("totalTests").textContent =
        stats.totalTests;

    document.getElementById("totalPractice").textContent =
        Math.round(stats.totalTime/60) + "m";

}


/*=========================================================
    EXPORT
=========================================================*/

window.historyGetPersonalBest =
historyGetPersonalBest;

window.historyRender =
historyRender;

window.historyExportCSV =
historyExportCSV;

window.historyGetStreak =
historyGetStreak;

window.historyRenderBar =
historyRenderBar;



window.historyLoad = historyLoad;
window.historySave = historySave;