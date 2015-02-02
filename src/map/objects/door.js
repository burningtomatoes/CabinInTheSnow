/**
 * Door transport script.
 */
window.mapObjects['door'] = MapObject.extend({
    trigger: function (player) {
        this.doTeleport(player);
    },

    doTeleport: function () {
        Game.loadMap(this.target);
        Sfx.play('door_closing.wav');
    }
});