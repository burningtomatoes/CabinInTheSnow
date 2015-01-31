$(document).ready(function() {
    // This is a badass ASCII banner. It looks better in your console. :-)
    console.log(" _____       _     _         _____        _____ _            _____                     ");
    console.log("/  __ \\     | |   (_)       |_   _|      |_   _| |          /  ___|                    ");
    console.log("| /  \\/ __ _| |__  _ _ __     | | _ __     | | | |__   ___  \\ `--. _ __   _____      __");
    console.log("| |    / _` | '_ \\| | '_ \\    | || '_ \\    | | | '_ \\ / _ \\  `--. \\ '_ \\ / _ \\ \\ /\\ / /");
    console.log("| \\__/\\ (_| | |_) | | | | |  _| || | | |   | | | | | |  __/ /\\__/ / | | | (_) \\ V  V / ");
    console.log(" \\____/\\__,_|_.__/|_|_| |_|  \\___/_| |_|   \\_/ |_| |_|\\___| \\____/|_| |_|\\___/ \\_/\\_/  ");
    console.log('');
    console.log('   "Wow. Much cold. Very cabin."');
    console.log('');

    // Initialize canvas rendering
    Game.initialize();

    // Begin preloading audio and textures
    Sfx.preload();
    Gfx.preload();

    // Show boot logo (a burning tomato) if it is enabled, then start the game
    var startGame = function () {
        Game.start();
    };

    if (!Settings.skipBootLogo) {
        BootLogo.show(startGame);
    } else {
        startGame();
    }
});