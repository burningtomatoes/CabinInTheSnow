var Time = {
    SECONDS_PER_MINUTE: 0.5,
    SECONDS_PER_HOUR: 0,
    SECONDS_PER_DAY: 0,

    DAYS_UNTIL_WIN: 3,

    $time: $('#time'),
    day: 1,
    timer: 0,
    clockTimer: 0,
    darkness: null,
    announcedMorning: false,
    announcedNightfall: false,
    didWin: false,

    reset: function () {
        this.SECONDS_PER_HOUR = (this.SECONDS_PER_MINUTE * 60);
        this.SECONDS_PER_DAY = (this.SECONDS_PER_HOUR * 24);

        this.day = 1;
        this.timer = (this.SECONDS_PER_HOUR * 6) + (this.SECONDS_PER_MINUTE * 48);
        this.clockTimer = (60 * this.SECONDS_PER_MINUTE);

        this.darkness = Gfx.load('darkness');

        this.announcedMorning = false;
        this.announcedNightfall = false;

        this.didWin = false;
    },

    addTime: function (time) {
        this.timer += time;

        while (this.timer >= this.SECONDS_PER_DAY) {
            this.day++;
            this.timer -= this.SECONDS_PER_DAY;
        }
    },

    addHours: function (hrs) {
        this.addTime(hrs * this.SECONDS_PER_HOUR);
    },

    update: function () {
        if (this.didWin) {
            return;
        }

        if (this.clockTimer > 0) {
            this.clockTimer--;
        }

        if (this.clockTimer <= 0) {
            this.timer++;
            this.clockTimer = (60 * this.SECONDS_PER_MINUTE);
        }

        if (this.timer >= this.SECONDS_PER_DAY) {
            this.day++;
            this.timer = 0;
        }

        if (this.day >= this.DAYS_UNTIL_WIN && this.getHour() >= 12) {
            $('#hud').hide();
            this.didWin = true;
            Game.loadMap('win');
            Needs.needs = [];
            return;
        }

        var isDaytime = this.isDaytime();
        var hrs = this.getHour();

        this.$time.find('span').text('Day ' + this.day + ', ' + this.formatTime());
        this.$time.find('img').attr('src', 'assets/images/' + (isDaytime ? 'daytime' : 'nighttime') + '.png');
        $('#hud').css('color', isDaytime && Game.map.isExterior() ? '#000' : '#FFF');

        if (!Settings.skipTimeCallouts) {
            if (hrs >= 6 && hrs <= 8 && !this.announcedMorning) {
                IntroText.run({
                    prefix: "Dawn of",
                    text: "Day " + this.day,
                    suffix: "- Survived for " + this.getTotalHoursSurvived() + " hours -"
                });

                this.announcedMorning = true;
                this.announcedNightfall = false;
            }

            if (hrs >= 18 && hrs <= 20 && !this.announcedNightfall) {
                IntroText.run({
                    prefix: "Night of",
                    text: "Day " + this.day,
                    suffix: "- Survived for " + this.getTotalHoursSurvived() + " hours -"
                });

                this.announcedMorning = false;
                this.announcedNightfall = true;
            }
        }
    },

    isDaytime: function () {
        var hrs = this.getHour();
        return hrs >= 6 && hrs <= 18;
    },

    draw: function (ctx) {
        if (this.darkness == null) {
            return;
        }

        var darkness = 0.0;
        var hour = this.getHourRaw();

        if (hour > 16 && hour <= 24) {
            darkness = (hour - 16) / 8;
        } else if (hour >= 0 && hour < 8) {
            darkness = -(hour - 8) / 8;
        }

        if (Game.map.isInterior() && Game.map.fireplaceLit && darkness > 0.35) {
            // Clamp darkness as long as the fireplace is lit
            darkness = 0.35;
        }

        ctx.save();
        ctx.globalAlpha = 0.75 * darkness;
        ctx.drawImage(this.darkness, 0, 0, Canvas.canvas.width, Canvas.canvas.height, 0, 0, Canvas.canvas.width, Canvas.canvas.height);
        ctx.restore();
    },

    getDayProgress: function () {
        return this.timer / this.SECONDS_PER_DAY;
    },

    getHourRaw: function () {
        return this.timer / this.SECONDS_PER_HOUR;
    },

    getHour: function () {
        var hourProgress = this.timer / this.SECONDS_PER_HOUR;
        var hours = Math.floor(hourProgress);

        return hours;
    },

    getTotalHoursSurvived: function () {
        return (this.day - 1) * 24 + (this.getHour());
    },

    formatTime: function () {
        var hours = this.getHour();
        var suffix = 'am';

        if (hours > 12) {
            hours -= 12;
            suffix = 'pm';
        }

        return hours + suffix;
    }
};