/**
 * Bed script in the cabin.
 */
window.mapObjects['win'] = MapObject.extend({
    wasTriggered: false,

    init: function (map) {
        this._super(map);

        this.wasTriggered = false;
        this.interactionType = ObjectInteractionType.AREA;
    },

    canTrigger: function () {
        return !this.wasTriggered;
    },

    trigger: function (player) {
        this.wasTriggered = true;

        $('#hud').hide();

        player.canControl = false;

        this.friend = new Friend();
        this.friend.posX = player.posX;
        this.friend.posY = player.posY + (10 * Settings.tileSize);
        this.friend.direction = Direction.UP;
        this.map.add(this.friend);

        Camera.followEntity(this.friend, true);
    }
});