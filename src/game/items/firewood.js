window.Items['firewood'] = Item.extend({
    init: function () {
        this._super();

        this.type = ItemTypes.FIRE_WOOD;
    }
});