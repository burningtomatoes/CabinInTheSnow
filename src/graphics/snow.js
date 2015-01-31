var Snow = Class.extend({
    amount: 0,
    entities: [],
    angle: 0.7,

    init: function (amount) {
        this.amount = amount;
        this.entities = [];

        this.generateSnowflakes(true);
    },

    generateSnowflakes: function (free) {
        var flakesToCreate = this.amount - this.entities.length;

        if (flakesToCreate > 0) {
            for (; flakesToCreate > 0; flakesToCreate--) {
                var flake = {
                    w: 8,
                    h: 8,
                    x: 0,
                    y: 0,
                    s: 0,
                    d: 0
                };

                var enteringFromTop = chance.bool();

                // X Pos
                if (free || enteringFromTop) {
                    flake.x = chance.integer({
                        min: 0,
                        max: Canvas.canvas.width
                    });
                } else {
                    flake.x = -flake.w;
                }

                // Y Pos
                if (free || !enteringFromTop) {
                    flake.y = chance.integer({
                        min: 0,
                        max: Canvas.canvas.height
                    });
                } else {
                    flake.y = -flake.h;
                }

                // Scale
                flake.s = chance.floating({
                    min: 0.5,
                    max: 0.75,
                    fixed: 3
                });

                // Density (so we can give each flake its own movement pattern)
                flake.d = chance.floating({
                    min: 0,
                    max: this.amount
                });

                this.entities.push(flake);
            }
        }
    },

    update: function () {
        var toRemove = [];

        this.angle += 0.01;

        for (var i = 0; i < this.entities.length; i++) {
            var flake = this.entities[i];

            if (flake.y > Canvas.canvas.height || flake.x > Canvas.canvas.width || flake.y < -32 || flake.x < -32) {
                toRemove.push(flake);
                continue;
            }

            flake.y += Math.cos(this.angle + flake.d) + 1 + -flake.s / 2;
            flake.x += Math.sin(this.angle) * 2;
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