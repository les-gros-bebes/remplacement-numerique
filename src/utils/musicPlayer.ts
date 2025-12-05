let mainTheme: HTMLAudioElement;

export function tearUpMainTheme() {
    mainTheme = new Audio("assets/sounds/theme.ogg");
    mainTheme.volume = 0.3;
    mainTheme.loop = true;
}

export function playMainTheme() {
    if(mainTheme.paused)
        mainTheme.play();
    else
    {
        console.log("mainTheme");
    }
}
