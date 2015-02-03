window.Items = { };

window.ItemTypes = {
    FIRE_WOOD: 'firewood'
};

var Item = Class.extend({
    type: 'item',

    init: function () {

    },

    getName: function () {
        return '???';
    },

    getDescription: function () {
        return 'I have no idea what this is.';
    },

    getIcon: function () {
        return this.type + '.png';
    }
});