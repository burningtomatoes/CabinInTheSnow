var BurningFirePlace = Entity.extend({
    HOURS_PER_LIGHTING: 6,

    timeStarted: 0,

    init: function () {
        this._super();

        this.width = 96;
        this.height = 60;

        this.causesCollision = false;

        this.spriteHead = new Animation('fireplace_lit', this.width, this.height, 10, 3, true);
        this.direction = Direction.UP;

        this.timeStarted = Time.timer + (Time.day * Time.SECONDS_PER_DAY);

        this.setCoord(10, 11);
        this.posY -= 18;
    },

    update: function () {
        this._super();

        var curTime = Time.timer + (Time.day * Time.SECONDS_PER_DAY);
        var timeSince = curTime - this.timeStarted;
        var hoursSince = Math.floor(timeSince / Time.SECONDS_PER_HOUR);

        if (hoursSince >= this.HOURS_PER_LIGHTING) {
            this.map.remove(this);
            this.map.fireplaceLit = false;
            this.map = null;
        }
    }
});