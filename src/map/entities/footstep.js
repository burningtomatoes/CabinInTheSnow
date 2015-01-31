var Footstep = Entity.extend({

    init: function (x, y, d) {
        this.posX = x + chance.integer({
            min: -2,
            max: +2
        });
        this.posY = y + chance.integer({
            min: -2,
            max: +2
        });
        this.direction = d;
        this.width = 7;
        this.height = 11;
        this.spriteBody = Gfx.load('footstep');
        this.clipping = false;
        this.causesCollision = false;
    }
});