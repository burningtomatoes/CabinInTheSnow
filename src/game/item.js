window.Items = { };

window.ItemTypes = {
    FIRE_WOOD: 'firewood',
    MATCH_BOX: 'matchbox',
    AXE: 'axe'
};

var Item = Class.extend({
    type: 'item',

    init: function () {

    },

    getIcon: function () {
        return this.type + '.png';
    }
});