var SmallTree = Entity.extend({
    isTree: true,
    chopTextX: 0,
    chopTextY: 0,
    chopTimer: 0,
    lifeLeft: 5,

    init: function () {
        this.height = 48;
        this.width = 48;
        this.chopTextX = 0;
        this.chopTextY = 0;
        this.chopTimer = 0;

        this.spriteBody = Gfx.load('smalltree');
    },

    chop: function (player) {
        this.chopTimer = 30;
        this.chopTextX = Math.random() * 30 - 5;
        this.chopTextY = Math.random() * 30 - 5;

        this.lifeLeft--;

        if (this.lifeLeft <= 0) {
            this.map.remove(this);
            Inventory.createAndAdd(ItemTypes.FIRE_WOOD, 1);
            Sfx.play('knock.wav');
            return;
        }
    },

    update: function () {
        if (this.chopTimer >0) {
            this.chopTimer--;
        }
    },

    drawAddons: function (ctx) {
        if (this.chopTimer > 0) {
            var textPosX = this.chopTextX;
            var textPosY = this.chopTextY;

            ctx.font = '24px 04b03';
            ctx.fillStyle = '#000';
            ctx.fillText("Chop!", textPosX + 1, textPosY + 1); // shadow
            ctx.fillStyle = 'yellow';
            ctx.fillText("Chop!", textPosX, textPosY);
        }

    }
});