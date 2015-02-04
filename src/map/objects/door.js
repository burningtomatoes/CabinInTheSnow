/**
 * Door transport script.
 */
window.mapObjects['door'] = MapObject.extend({
    busy: false,

    trigger: function (player) {
        if (this.busy) {
            return;
        }

        this.busy = true;
        this.doTeleport(player);
    },

    doTeleport: function () {
        Game.loadMap(this.target, function () {
            this.busy = false;
        }.bind(this));
        Sfx.play('door_closing.wav');
    }
});