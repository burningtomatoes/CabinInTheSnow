var NeedsChange = {
    LOSING_FAST: 'down_fast',
    LOSING: 'down_normal',
    GAINING: 'up_normal',
    GAINING_FAST: 'up_fast'
};

var NeedType = {
    HUNGER: 'hunger',
    SLEEP: 'sleep',
    COLD: 'cold'
};

var Need = Class.extend({
    id: null,
    name: null,
    currentValue: 0,
    maxValue: 100,
    currentSpeed: NeedsChange.LOSING,

    init: function (id, name, startValue) {
        this.id = id;
        this.name = name;
        this.currentValue = startValue;
        this.currentSpeed = NeedsChange.LOSING;
    },

    getPercentage: function () {
        return (this.currentValue / this.maxValue) * 100;
    },

    determineSpeed: function () {
        switch (this.id) {
            case NeedType.COLD:
                if (Game.map.fireplaceLit) {
                    this.currentSpeed = NeedsChange.GAINING;
                } else if (Game.map.isInterior()) {
                    this.currentSpeed = NeedsChange.LOSING;
                } else if ((Time.getHour() <= 6 || Time.getHour() >= 18) && Game.map.isExterior()) {
                    this.currentSpeed = NeedsChange.LOSING_FAST;
                } else {
                    this.currentSpeed = NeedsChange.LOSING;
                }
                break;
        }
    }
});

var Needs = {
    needs: [],

    clear: function () {
        this.needs = [];

        this.needs.push(new Need(NeedType.HUNGER, 'Hunger', 40));
        this.needs.push(new Need(NeedType.COLD, 'Cold', 30));
        this.needs.push(new Need(NeedType.SLEEP, 'Sleep', 10));

        this.setupUi();
    },

    uiSyncTimer: 0,

    setupUi: function () {
        var $uiNeeds = $('#needs');
        $uiNeeds.html('');

        for (var i = 0; i < this.needs.length; i++) {
            var need = this.needs[i];

            var $div = $('<div />')
                .addClass('need')
                .addClass(need.id)
                .appendTo($uiNeeds);

            $div.append(need.name);

            var $statusImg = $('<img />')
                .addClass('progress_speed')
                .addClass(need.id)
                .appendTo($div);

            var $progressBar = $('<div />')
                .addClass('progress')
                .addClass(need.id)
                .appendTo($div);

            var $progressInner = $('<div />')
                .addClass('inner')
                .appendTo($progressBar);
        }

        this.syncUi();
    },

    syncUi: function () {
        var $uiNeeds = $('#needs');

        for (var i = 0; i < this.needs.length; i++) {
            var need = this.needs[i];

            var $div = $('.need.' + need.id);
            var $img = $div.find('.progress_speed');
            var $progressInner = $div.find('.progress .inner');

            $img.attr('src', 'assets/images/progress_' + need.currentSpeed + '.png');
            $progressInner.css('width', need.getPercentage() + '%');
        }
    },

    die: function () {
        alert('U DED');
        // TODO death
    },

    update: function () {
        if (this.uiSyncTimer > 0) {
            this.uiSyncTimer--;
        }

        if (this.uiSyncTimer <= 0) {
            this.syncUi();
            this.uiSyncTimer = 60;
        }

        for (var i = 0; i < this.needs.length; i++) {
            var need = this.needs[i];

            need.determineSpeed();

            switch (need.currentSpeed) {
                case NeedsChange.GAINING:
                    need.currentValue -= 0.005;
                    break;
                case NeedsChange.GAINING_FAST:
                    need.currentValue -= 0.01;
                    break;
                case NeedsChange.LOSING_FAST:
                    need.currentValue += 0.01;
                    break;
                case NeedsChange.LOSING:
                    need.currentValue += 0.005;
                    break;
            }

            if (need.currentValue < 0) {
                need.currentValue = 0;
            }

            if (need.currentValue > need.maxValue) {
                this.die();
                return;
            }
        }
    }
};