/**
 * The object script for the cabin's exterior door.
 */
window.mapObjects['cabindoor'] = MapObject.extend({
    didKnock: false,

    init: function (data) {
        this._super(data);
        this.didKnock = false;
    },

    trigger: function (player) {
        if (!this.didKnock) {
            this.doKnockScene(player);
            this.didKnock = true;
        }
    },

    doKnockScene: function (player) {
        player.canControl = false;

        var afterKnock = function () {

        };

        Sfx.play('knock.wav');

        Dialogue.prepare([{
            text: '     Knock....knock....'
        }], afterKnock);

        Dialogue.show();
    },

    canTrigger: function () {
        return true;
    }
});