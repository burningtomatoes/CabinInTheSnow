var Dialogue = {
    running: false,
    pages: null,
    currentPage: null,
    currentPageIdx: 0,
    currentTickerIdx: 0,
    typeDelay: 0,
    fastMode: true,
    dialogueCallback: null,
    nextPageTimer: 0,

    prepare: function(data, callback) {
        this.pages = data;
        this.currentPage = data[0];
        this.currentPageIdx = 0;
        this.currentTickerIdx = 0;
        this.typeDelay = 30;
        this.fastMode = true;
        this.dialogueCallback = callback;
        this.optionHooks = [];

        if (this.dialogueCallback == null) {
            this.dialogueCallback = function() { };
        }

        this.nextPageTimer = 0;
        this.awaitingOption = false;

        $('.dialogue .options').hide();
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

    hide: function() {
        if (!this.running) {
            return;
        }

        var payload = {
            option: this.optionIdx
        };

        $('.dialogue').fadeOut('fast');
        this.running = false;
        this.dialogueCallback(payload);
    },

    optionHooks: [],
    awaitingOption: false,
    optionIdx: 0,

    update: function() {
        if (!this.running) {
            return;
        }

        if (this.typeDelay > 0) {
            this.typeDelay--;
        }

        var currentText = this.currentPage.text;
        var anyLeft = currentText.length > this.currentTickerIdx;

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
                                .text(option)
                                .addClass(idx == 1 ? 'selected' : null)
                                .addClass('idx_' + idx)
                                .appendTo($options);
                            this.optionHooks.push(idx);
                        }

                        this.awaitingOption = true;
                        this.optionIdx = 1;
                    }
                }
            }

            this.typeDelay = this.fastMode ? 1 : 4;
        }

        var completePage = false;

        if (this.awaitingOption) {
            var targetIdx = this.optionIdx;
            var targetChanged = false;

            if (Keyboard.wasKeyPressed(KeyCode.DOWN) || Keyboard.wasKeyPressed(KeyCode.S)) {
                targetIdx++;
                targetChanged = true;
            } else if (Keyboard.wasKeyPressed(KeyCode.UP) || Keyboard.wasKeyPressed(KeyCode.W)) {
                targetIdx--;
                targetChanged = true;
            }

            if (targetChanged) {
                Sfx.play('dialogue_tick.wav');

                if (targetIdx < 1) {
                    targetIdx = this.optionHooks.length;
                }

                if (targetIdx > this.optionHooks.length) {
                    targetIdx = 1;
                }

                $('.dialogue .option').removeClass('selected');
                $('.dialogue .option.idx_' + targetIdx).addClass('selected');

                Dialogue.optionIdx = targetIdx;

                console.info(targetIdx);
            }

            if (Keyboard.wasKeyPressed(KeyCode.ENTER) || Keyboard.wasKeyPressed(KeyCode.SPACE)) {
                Sfx.play('dialogue_tick.wav');
                completePage = true;
            }
        }

        if (!anyLeft && !this.awaitingOption) {
            this.nextPageTimer++;

            if (this.nextPageTimer >= 120) {
                completePage = true;
            }
        }

        if (completePage) {
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
};