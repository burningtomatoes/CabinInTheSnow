/**
 * Bed script in the cabin.
 */
window.mapObjects['axe'] = MapObject.extend({
    axeEntity: null,

    init: function (map) {
        this._super(map);

        this.axeEntity = new Axe();
        this.axeEntity.posX = this.x;
        this.axeEntity.posY = this.y;

        this.map.add(this.axeEntity);
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
                this.map.remove(this.axeEntity);
            }

            player.canControl = true;
        }.bind(this));

        Dialogue.show();
    }
});