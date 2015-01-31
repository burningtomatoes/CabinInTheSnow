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

    update: function() {
        if (this.velocityX != 0 || this.velocityY != 0) {
            if (this.footstepDelayer > 0) {
                this.footstepDelayer--;
            }

            if (this.footstepDelayer == 0) {
                Sfx.play('footstep.wav', 0.25);
                this.footstepDelayer = 20;
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