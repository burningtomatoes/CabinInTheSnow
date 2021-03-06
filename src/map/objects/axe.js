/**
 * Bed script in the cabin.
 */
window.mapObjects['axe'] = MapObject.extend({
    matchBoxEntity: null,

    init: function (map) {
        this._super(map);

        this.matchBoxEntity = new Axe();
        this.matchBoxEntity.posX = this.x;
        this.matchBoxEntity.posY = this.y;

        this.map.add(this.matchBoxEntity);
    },

    trigger: function (player) {
        player.canControl = false;

        Dialogue.prepare([{
            text: "It's an axe. I might be able to cut down some of the smaller trees with this to get wood."
        },{
            text: "Though I'm afraid to think what its previous owner used it for..."
        }, {
            text: "Should I pick it up?",
            options: [
                "Yes",
                "No"
            ]
        }], function (data) {
            if (data.option == 1) {
                Inventory.createAndAdd(ItemTypes.AXE, 1);
                this.map.remove(this.matchBoxEntity);
                this.matchBoxEntity = null;
            }

            player.canControl = true;
        }.bind(this));

        Dialogue.show();
    },

    canTrigger: function () {
        return this.matchBoxEntity != null;
    }
});