import Cookies from '/lib/js-cookie.js'

var currentTheme = undefined

function initializeTheme() {
    let theme = Cookies.get('sessionTheme');

    if (theme === undefined) {
        setLightTheme();
    }
    else {
        setTheme(theme);
    }
}

function toggleTheme() {
    if (currentTheme == "light-theme") {
        setDarkTheme();
    }
    else {
        setLightTheme();
    }
}

function setDarkTheme() {
    setTheme("dark-theme");
}

function setLightTheme() {
    setTheme("light-theme");
}

function getTheme() {
    return currentTheme;
}

function setTheme(theme) {
    if (currentTheme != theme) {
        document.body.classList.remove(currentTheme);
        Cookies.set('sessionTheme', theme);
        currentTheme = theme;
        document.body.classList.add(currentTheme);

        var metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", getComputedStyle(document.body).getPropertyValue('--theme-background'));
    }
}

export {
    initializeTheme,
    toggleTheme,
    getTheme,
};
