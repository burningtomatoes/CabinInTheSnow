/**
 * Fireplace script in the cabin.
 */
window.mapObjects['fireplace'] = MapObject.extend({
    trigger: function (player) {
        var hasWood = Inventory.getItemQty(ItemTypes.FIRE_WOOD) >= 1;
        var hasMatches = Inventory.getItemQty(ItemTypes.MATCH_BOX) >= 1;

        if (hasWood && hasMatches) {
            Dialogue.prepare([{
                text: "I have wood and matches. Should I try to light a fire?",
                options: [
                    "Yes",
                    "No"
                ]
            }]);
        } else {
            Dialogue.prepare([{
                text: "It's a fireplace. I need to find some wood and a way to light it, or I'll freeze to death."
            }]);
        }

        Dialogue.show();
    }
});