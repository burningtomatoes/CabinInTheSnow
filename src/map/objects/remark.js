/**
 * Pre-defined remark zones:
 * When the player enters the zone, a dialogue message will pop up.
 */
window.mapObjects['remark'] = MapObject.extend({
    wasSeen: false,

    init: function (data) {
        this._super(data);
        this.wasSeen = false;
        this.interactionType = ObjectInteractionType.AREA;
    },

    trigger: function (player) {
        if (!this.canTrigger()) {
            return;
        }

        this.wasSeen = true;

        var dConfig = [{
            text: this.text
        }];

        console.log(dConfig);

        Dialogue.prepare(dConfig);
        Dialogue.show();
    },

    canTrigger: function () {
        return !this.wasSeen && !Dialogue.running;
    }
});