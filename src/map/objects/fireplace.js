/**
 * Fireplace script in the cabin.
 */
window.mapObjects['fireplace'] = MapObject.extend({
    trigger: function (player) {
        // TODO query user inventory
        Dialogue.prepare([{
            text: "It's a fireplace. I need to find some wood and a way to light it before nightfall, or I'll freeze to death."
        }]);
        Dialogue.show();
    }
});