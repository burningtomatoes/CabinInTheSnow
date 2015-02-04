var Friend = Entity.extend({
    init: function() {
        this._super();

        this.width = 40;
        this.height = 24;

        this.spriteHead = Gfx.load('friend_head');
        this.spriteBody = Gfx.load('friend_body');

        Dialogue.prepare([{
            text: "!!!"
        }], function () {
            this.velocityY -= this.movementSpeed;
        }.bind(this));
        Dialogue.show();

        this.movementSpeed *= 2;
        this.didFinals = false;
    },

    footstepDelayer: 0,
    footstepFoot: 0,
    lastFootstepSound: 0,
    isMoving: false,

    didFinals: false,

    update: function() {
        if (this.didFinals) {
            return;
        }

        if (this.posY <= 480) {
            this.velocityY = 0;
            this.didFinals = true;

            Dialogue.prepare([{
                text: "Dude! We've been looking for you for days!!!"
            }, {
                text: "Holy shit...a-are you okay!? We were terrified you'd be dead by now."
            }, {
                text: "We started fearing the worst. They say there's a murderer that lives in a cabin nearby."
            }, {
                text: "Come on, let's go find the others. We've set up camp nearby."
            }], function () {
                Game.win();
            }.bind(this));
            Dialogue.show();
        }

        if (this.velocityX != 0 || this.velocityY != 0) {
            this.isMoving = true;

            if (this.footstepDelayer > 0) {
                this.footstepDelayer--;
            }

            if (this.footstepDelayer == 0) {
                this.footstepDelayer = 20;
                this.footstepFoot = (this.footstepFoot == 1) ? 0 : 1;

                var footstepSound = 0;

                do {
                    footstepSound = chance.integer({ min: 1, max: 4 });
                }
                while (footstepSound == this.lastFootstepSound);

                this.lastFootstepSound = footstepSound;

                var footstepType = this.map.isExterior() ? 'snow' : 'wood';
                Sfx.play('footstep_' + footstepType + '_' + footstepSound + '.wav', 0.25);

                if (this.direction == Direction.UP) {
                    if (this.footstepFoot == 1) this.map.add(new Footstep(this.posX, this.posY, this.direction));
                    if (this.footstepFoot == 0) this.map.add(new Footstep(this.posX + this.width - 7, this.posY, this.direction));
                } else if (this.direction == Direction.DOWN) {
                    if (this.footstepFoot == 1) this.map.add(new Footstep(this.posX, this.posY + 7, this.direction));
                    if (this.footstepFoot == 0) this.map.add(new Footstep(this.posX + this.width - 7, this.posY + 7, this.direction));
                } else if (this.direction == Direction.LEFT) {
                    if (this.footstepFoot == 1) this.map.add(new Footstep(this.posX  , this.posY, this.direction));
                    if (this.footstepFoot == 0) this.map.add(new Footstep(this.posX , this.posY + this.height, this.direction));
                } else if (this.direction == Direction.RIGHT) {
                    if (this.footstepFoot == 1) this.map.add(new Footstep(this.posX + this.width - 7, this.posY, this.direction));
                    if (this.footstepFoot == 0) this.map.add(new Footstep(this.posX + this.width - 7, this.posY + this.height, this.direction));
                }

                this.headBobTimer = 99;
                this.headBob = this.footstepFoot;
            }
        } else {
            this.isMoving = false;
        }

        this._super();
    }
});