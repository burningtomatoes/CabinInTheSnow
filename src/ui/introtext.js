var IntroText = {
    running: false,

    run: function (data, cb) {
        Game.map.pause();

        this.running = true;

        var $text = $('#text');
        var $textOverlay = $('#textoverlay');
        var $h1 = $text.find('h1');
        var $h2 = $text.find('h2');
        var $h3 = $text.find('h3');

        $h2.text(data.prefix);
        $h1.text(data.text);
        $h3.text(data.suffix);

        $textOverlay.show();
        $h3.hide();
        $text.delay(500).fadeIn('fast', function () {
            Sfx.play('boom.wav', 1);
            $h3.delay(1000).fadeIn('slow', function () {
                $text.delay(1000).fadeOut('slow', function () {
                    Game.map.resume();
                    $textOverlay.fadeOut(2000, function () {
                        IntroText.running = false;
                        if (cb) {
                            cb();
                        }
                    });
                });
            });
        })
    }
};