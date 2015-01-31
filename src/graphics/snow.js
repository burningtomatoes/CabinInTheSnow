var Snow = Class.extend({
    amount: 0,
    entities: [],

    init: function (amount) {
        this.amount = amount;
        this.entities = [];

        this.generateSnowflakes(true);
    },

    generateSnowflakes: function (freeY) {
        var flakesToCreate = this.amount - this.entities.length;

        if (flakesToCreate > 0) {
            for (; flakesToCreate > 0; flakesToCreate--) {
                var flake = {
                    w: 8,
                    h: 8,
                    x: 0,
                    y: 0,
                    s: 0
                };

                // X Pos
                flake.x = chance.integer({
                    min: 0,
                    max: Canvas.canvas.width
                });

                // Y Pos
                if (freeY) {
                    flake.y = chance.integer({
                        min: 0,
                        max: Canvas.canvas.height
                    });
                } else {
                    flake.y = -flake.y;
                }

                // Scale
                flake.s = chance.floating({
                    min: 0.5,
                    max: 0.75,
                    fixed: 3
                });

                this.entities.push(flake);
            }
        }
    },

    update: function () {
        var toRemove = [];

        for (var i = 0; i < this.entities.length; i++) {
            var flake = this.entities[i];

            if (flake.y > Canvas.canvas.height) {
                toRemove.push(flake);
                continue;
            }

            flake.y++;
            flake.y++;
        }

        for (var i = 0; i < toRemove.length; i++) {
            var deadFlake = toRemove[i];
            var flakeIdx = this.entities.indexOf(deadFlake);

            if (flakeIdx >= 0) {
                this.entities.splice(flakeIdx, 1);
            }
        }

        this.generateSnowflakes();
    },

    draw: function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

        for (var i = 0; i < this.entities.length; i++) {
            var flake = this.entities[i];

            ctx.moveTo(flake.x, flake.y);
            //ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI*2, true);
            ctx.rect(flake.x, flake.y, flake.w * flake.s, flake.h * flake.s);
        }

        ctx.fill();
    }
});