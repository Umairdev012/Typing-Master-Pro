/*=========================================================
    js/theme.js
    Complete
=========================================================*/

const THEME_KEY = "typingmaster_theme";

/*=========================================================
    INIT
=========================================================*/

function themeInit(){

    const savedTheme = localStorage.getItem(THEME_KEY);

    if(savedTheme){

        themeApply(savedTheme);

        return;
    }

    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    themeApply(
        prefersDark ? "dark" : "light"
    );

}


/*=========================================================
    APPLY
=========================================================*/

function themeApply(theme){

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );

    localStorage.setItem(
        THEME_KEY,
        theme
    );

    updateThemeIcon(theme);

}


/*=========================================================
    TOGGLE
=========================================================*/

function themeToggle(){

    const current =

        document.documentElement.getAttribute(
            "data-theme"
        ) || "light";

    const next =

        current === "dark"
            ? "light"
            : "dark";

    themeApply(next);

}


/*=========================================================
    CURRENT
=========================================================*/

function themeCurrent(){

    return document.documentElement.getAttribute(
        "data-theme"
    ) || "light";

}


/*=========================================================
    ICON
=========================================================*/

function updateThemeIcon(theme){

    const btn = document.getElementById("themeToggle");

    if(!btn) return;

    const icon = btn.querySelector("i");

    if(!icon) return;

    icon.className =

        theme === "dark"

        ? "fa-solid fa-sun"

        : "fa-solid fa-moon";

}


/*=========================================================
    LISTENER
=========================================================*/

window.matchMedia("(prefers-color-scheme: dark)")
.addEventListener("change",(event)=>{

    if(

        localStorage.getItem(THEME_KEY)

    ) return;

    themeApply(

        event.matches

        ? "dark"

        : "light"

    );

});


/*=========================================================
    EXPORT
=========================================================*/

window.themeInit = themeInit;

window.themeApply = themeApply;

window.themeToggle = themeToggle;

window.themeCurrent = themeCurrent;