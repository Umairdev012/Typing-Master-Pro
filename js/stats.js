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


window.statsGetStarRating = statsGetStarRating;
window.statsGetMotivation = statsGetMotivation;