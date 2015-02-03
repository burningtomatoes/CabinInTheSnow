window.Items = { };

window.ItemTypes = {
    FIRE_WOOD: 'firewood'
};

var Item = Class.extend({
    type: 'item',

    init: function () {

    },

    getIcon: function () {
        return this.type + '.png';
    }
});