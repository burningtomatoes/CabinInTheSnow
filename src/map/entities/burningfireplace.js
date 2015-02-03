var BurningFirePlace = Entity.extend({
    init: function () {
        this._super();

        this.width = 96;
        this.height = 60;

        this.causesCollision = false;

        this.spriteHead = new Animation('fireplace_lit', this.width, this.height, 10, 3, true);
        this.direction = Direction.UP;

        this.setCoord(10, 11);
        this.posY -= 18;
    }
});