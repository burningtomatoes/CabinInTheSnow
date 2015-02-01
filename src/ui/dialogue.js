var Dialogue = {
    running: false,
    pages: null,
    currentPage: null,
    currentPageIdx: 0,
    currentTickerIdx: 0,
    typeDelay: 0,
    fastMode: false,
    dialogueCallback: null,
    nextPageTimer: 0,

    prepare: function(data, callback) {
        this.pages = data;
        this.currentPage = data[0];
        this.currentPageIdx = 0;
        this.currentTickerIdx = 0;
        this.typeDelay = 30;
        this.fastMode = false;
        this.dialogueCallback = callback;
        this.optionHooks = [];

        if (this.dialogueCallback == null) {
            this.dialogueCallback = function() { };
        }

        this.nextPageTimer = 0;
    },

    show: function() {
        if (this.running) {
            return;
        }

        $('.dialogue').delay(100).fadeIn('fast').find('.content').html('');
        $('.dialogue .next').remove();
        $('.dialogue .name').text(this.pages[0].name);

        this.running = true;
    },

    hide: function(payload) {
        if (!this.running) {
            return;
        }

        $('.dialogue').fadeOut('fast');
        this.running = false;
        this.dialogueCallback(payload);
    },

    optionHooks: [],

    update: function() {
        if (!this.running) {
            return;
        }

        if (this.typeDelay > 0) {
            this.typeDelay--;
        }

        var currentText = this.currentPage.text;
        var anyLeft = currentText.length > this.currentTickerIdx;

        for (var i = 0; i < this.optionHooks.length; i++) {
            var number = this.optionHooks[i];

            if (Keyboard.wasKeyPressed(KeyCode[number])) {
                this.hide(number);
                return;
            }
        }

        if (this.typeDelay <= 0) {
            if (anyLeft) {
                this.currentTickerIdx++;

                Sfx.play('dialogue_tick.wav');

                var textWritten = currentText.substr(0, this.currentTickerIdx);

                var $dialogue = $('.dialogue');
                $dialogue.find('.options').hide();
                var $content = $dialogue.find('.content');
                var $textSpan = $('<span />');

                var $name = $dialogue.find('.name');
                $name.text(this.currentPage.name);

                $content.html('');
                $dialogue.find('.next').remove();
                $textSpan.text(textWritten);
                $textSpan.appendTo($content);

                if (this.currentPage.player) {
                    $dialogue.css('color', '#5882FA');
                    $dialogue.css('text-align', 'center');
                } else if (this.currentPage.evil) {
                    $dialogue.css('color', '#DF0101');
                    $dialogue.css('text-align', 'center');
                } else {
                    $dialogue.css('color', '#fff');
                    $dialogue.css('text-align', 'left');
                }

                anyLeft = currentText.length > this.currentTickerIdx;

                if (!anyLeft) {
                    if (this.currentPage.options != null) {
                        var $options = $dialogue.find('.options');
                        $options.html('');
                        $options.show();

                        var idx = 0;
                        this.optionHooks = [];

                        for (var i = 0; i < this.currentPage.options.length; i++) {
                            var option = this.currentPage.options[i];

                            idx++;

                            var $option = $('<div />')
                                .addClass('option')
                                .text('[Press ' + idx + '] ' + option)
                                .appendTo($options);

                            this.optionHooks.push(idx);
                        }
                    } else {
                        //$('<div />')
                        //    .addClass('next')
                        //    .text('Space')
                        //    .appendTo($dialogue);
                    }
                }
            }

            this.typeDelay = this.fastMode ? 1 : 4;
        }

        if (!anyLeft) {
            this.nextPageTimer++;

            if (this.nextPageTimer >= 120) {
                var isLastPage = this.currentPageIdx >= this.pages.length - 1;

                if (isLastPage) {
                    this.hide();
                } else {
                    this.currentTickerIdx = 0;
                    this.currentPage = this.pages[++this.currentPageIdx];
                    this.typeDelay = 10;
                    this.nextPageTimer = 0;
                }
            }
        }
    }
};