/**
 * The object script for the cabin's exterior door.
 */
window.mapObjects['cabindoor'] = MapObject.extend({
    didKnock: false,
    didOpen: false,

    init: function (data) {
        this._super(data);

        this.didKnock = false;
        this.didOpen = false;
    },

    trigger: function (player) {
        if (!this.didKnock) {
            this.doKnockScene(player);
            this.didKnock = true;
            return;
        }

        if (!this.didOpen) {
            this.doOpenScene(player);
            this.didOpen = true;
            return;
        }

        this.doTeleport(player);
    },

    doTeleport: function () {
        Game.loadMap('cabin');
        Sfx.play('door_closing.wav');
    },

    doOpenScene: function (player) {
        player.canControl = false;

        Sfx.play('door_unlocked.wav', 1.0);

        Dialogue.prepare([{
            text: "It's open... Here goes..."
        }], function () {
            this.doTeleport();
        }.bind(this));
        Dialogue.show();
    },

    doKnockScene: function (player) {
        player.canControl = false;

        var afterKnock = function () {
            Dialogue.prepare([{
                text: "It doesn't look like anyone is around in the creepy cabin. Great."
            }, {
                text: "But I'm desperate. I'm going to freeze to death if I don't find shelter. I wonder if the door is open..."
            }], function () {
                player.canControl = true;
            });
            Dialogue.show();
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