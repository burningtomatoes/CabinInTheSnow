/**
 * Fireplace script in the cabin.
 */
window.mapObjects['fireplace'] = MapObject.extend({
    WOOD_COST_PER_LIGHTING: 1,

    trigger: function (player) {
        var hasWood = Inventory.getItemQty(ItemTypes.FIRE_WOOD) >= this.WOOD_COST_PER_LIGHTING;
        var hasMatches = Inventory.getItemQty(ItemTypes.MATCH_BOX) >= 1;

        if (hasWood && hasMatches) {
            player.canControl = false;
            Dialogue.prepare([{
                text: "I have wood and matches. Should I try to light a fire?",
                options: [
                    "Yes (-" + this.WOOD_COST_PER_LIGHTING + " wood)",
                    "No"
                ]
            }], function(result) {
                if (result.option == 1) {
                    // Light the fire.
                    Inventory.removeItems(ItemTypes.FIRE_WOOD, this.WOOD_COST_PER_LIGHTING);
                } else {
                    // Do nothing.
                    player.canControl = true;
                }
            }.bind(this));
        } else {
            Dialogue.prepare([{
                text: "It's a fireplace. I need to find some wood and a way to light it, or I'll freeze to death."
            }]);
        }

        Dialogue.show();
    }
});