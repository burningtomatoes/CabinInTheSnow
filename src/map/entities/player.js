var Player = Entity.extend({
    isPlayer: true,
    canControl: true,
    chopTimer: 0,

    init: function() {
        this._super();

        this.width = 40;
        this.height = 24;

        this.spriteHead = Gfx.load('adventurer_head');
        this.spriteBody = Gfx.load('adventurer_body');

        this.chopTimer = 0;
    },

    footstepDelayer: 0,
    footstepFoot: 0,
    lastFootstepSound: 0,
    isMoving: false,

    update: function() {
        if (this.chopTimer > 0) {
            this.chopTimer--;
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

        if (this.canControl) {
            if (Keyboard.isKeyDown(KeyCode.LEFT) || Keyboard.isKeyDown(KeyCode.A)) {
                this.velocityX = -this.movementSpeed;
                this.direction = Direction.LEFT;
            } else if (Keyboard.isKeyDown(KeyCode.RIGHT) || Keyboard.isKeyDown(KeyCode.D)) {
                this.velocityX = +this.movementSpeed;
                this.direction = Direction.RIGHT;
            } else {
                this.velocityX = 0;
            }
            if (Keyboard.isKeyDown(KeyCode.UP) || Keyboard.isKeyDown(KeyCode.W)) {
                this.velocityY = -this.movementSpeed;
                this.direction = Direction.UP;
            } else if (Keyboard.isKeyDown(KeyCode.DOWN) || Keyboard.isKeyDown(KeyCode.S)) {
                this.velocityY = +this.movementSpeed;
                this.direction = Direction.DOWN;
            } else {
                this.velocityY = 0;
            }

            if (Keyboard.wasKeyPressed(KeyCode.SPACE) && !Dialogue.running) {
                var didInteract = this.map.doInteract(this);
                this.velocityX = 0;
                this.velocityY = 0;

                if (!didInteract && Inventory.getItemQty(ItemTypes.AXE) && this.chopTimer == 0) {
                    var entities = this.map.entities;
                    var ourRect = this.getInteractRadius();

                    for (var i = 0; i < entities.length; i++) {
                        var e = entities[i];

                        if (!e.isTree) {
                            continue;
                        }

                        var eRect = e.getRect();

                        if (Utils.rectIntersects(ourRect, eRect)) {
                            e.chop(this);
                            Sfx.play('chop.wav');
                            this.chopTimer = 30;
                            break;
                        }
                    }
                }
            }
        }

        this.map.checkZones(this);

        this._super();
    }
});