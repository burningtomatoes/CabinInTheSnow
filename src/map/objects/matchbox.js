/**
 * Bed script in the cabin.
 */
window.mapObjects['matchbox'] = MapObject.extend({
    matchBoxEntity: null,

    init: function (map) {
        this._super(map);

        this.matchBoxEntity = new Matches();
        this.matchBoxEntity.posX = this.x;
        this.matchBoxEntity.posY = this.y;

        this.map.add(this.matchBoxEntity);
    },

    trigger: function (player) {
        player.canControl = false;

        Dialogue.prepare([{
            text: "It's a matchbox. This will be useful."
        }], function (data) {
            Inventory.createAndAdd(ItemTypes.MATCH_BOX, 1);
            this.map.remove(this.matchBoxEntity);
            player.canControl = true;
        }.bind(this));

        Dialogue.show();
    }
});