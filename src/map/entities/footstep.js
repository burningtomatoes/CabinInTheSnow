var Footstep = Entity.extend({
    alpha: 0.5,

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
        this.alpha = 0.5;
    },

    applyDrawTranslations: function (ctx) {
        ctx.globalAlpha = this.alpha;
    },

    update: function () {
        if (this.alpha > 0) {
            this.alpha -= 0.0005;
        }

        if (this.alpha <= 0) {
            this.map.remove(this);
        }
    }
});