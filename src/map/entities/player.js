var Player = Entity.extend({
    isTeleporting: false,
    teleportTo: null,
    teleportTimer: 0,

    isPlayer: true,

    canControl: true,

    init: function() {
        this._super();

        this.width = 40;
        this.height = 23;

        this.spriteHead = Gfx.load('adventurer_head');
        this.spriteBody = Gfx.load('adventurer_body');
    },

    getDisplayName: function () {
        return 'You';
    },

    footstepDelayer: 0,
    footstepFoot: 0,
    lastFootstepSound: 0,

    update: function() {
        if (this.velocityX != 0 || this.velocityY != 0) {
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

                Sfx.play('footstep_snow_' + footstepSound + '.wav', 0.25);

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
        }

        if (!this.isTeleporting && this.canControl) {
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

            if (Keyboard.wasKeyPressed(KeyCode.SPACE)) {
                var interactRect = this.getInteractRadius();

                var entities = this.map.getEntitiesInRect(interactRect, this);
                var entity = entities.length > 0 ? entities[0] : null;

                if (entity != null) {
                    entity.interact(this);
                    return;
                }

                var teleport = this.map.getTeleport(interactRect);

                if (teleport != null) {
                    this.isTeleporting = true;
                    Game.loadMap(teleport);
                    this.map.remove(this);
                    Sfx.play('door_closing.wav');
                    return;
                }
            }
        }

        this._super();
    }
});