/**
 * Bed script in the cabin.
 */
window.mapObjects['bed'] = MapObject.extend({
    trigger: function (player) {
        // TODO query user inventory
        Dialogue.prepare([{
            text: "It's a bed. Once I find a way to warm up this cabin I may be able to get some rest here."
        }]);
        Dialogue.show();
    }
});