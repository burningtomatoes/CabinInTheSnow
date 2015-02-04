/**
 * Teleport to map.
 */
window.mapObjects['teleport'] = MapObject.extend({
    busy: false,

    init: function (data) {
        this._super(data);

        this.interactionType = ObjectInteractionType.AREA;
        this.busy = false;
    },

    trigger: function (player) {
        if (this.busy) {
            return;
        }

        this.busy = true;

        player.velocityX = 0;
        player.velocityY = 0;

        Game.loadMap(this.target, function () {
            this.busy = false;

            if (player.direction == Direction.DOWN) {
                player.posY -= 64;
                player.direction = Direction.UP;
            }
            else if (player.direction == Direction.UP) {
                player.posY += 64;
                player.direction = Direction.DOWN;
            }

            player.velocityX = 0;
            player.velocityY = 0;

            Game.map.player.velocityX = 0;
            Game.map.player.velocityY = 0;
        }.bind(this));
    },

    canTrigger: function () {
        return !this.busy;
    }
});