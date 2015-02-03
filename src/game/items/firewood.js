window.Items['firewood'] = Item.extend({
    init: function () {
        this._super();

        this.type = ItemTypes.FIRE_WOOD;
    },

    getName: function () {
        return 'Wood log';
    },

    getDescription: function () {
        return 'I can use this in the fireplace.'
    }
});