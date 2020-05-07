import Cookies from '/lib/js-cookie.js'

var currentTheme = undefined

function initializeTheme() {
    let theme = Cookies.get('user-theme');

    if (theme === undefined)
    {
        setLightTheme();
    }
    else
    {
        setTheme(theme);
    }
}

function toggleTheme() {
    if (currentTheme == "light-theme")
    {
        setDarkTheme();
    }
    else
    {
        setLightTheme();
    }
}

function setDarkTheme()
{
    setTheme("dark-theme");
}

function setLightTheme()
{
    setTheme("light-theme");
}

function getTheme()
{
    return currentTheme;
}

function setTheme(theme) {
    if (currentTheme != theme)
    {
        document.body.classList.remove(currentTheme);
        Cookies.set('user-theme', theme);
        currentTheme = theme;
        document.body.classList.add(currentTheme);
    }
}

export {
    initializeTheme,
    toggleTheme,
    getTheme,
};
