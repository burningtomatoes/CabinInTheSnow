var Inventory = {
    items: [],

    clear: function () {
        this.items = [];

        if (Settings.spawnWithItems) {
            this.createAndAdd(ItemTypes.FIRE_WOOD, 25);
            this.createAndAdd(ItemTypes.MATCH_BOX, 1);
            this.createAndAdd(ItemTypes.AXE, 1);
        } else {
            // Give the user a match box for now...
            this.createAndAdd(ItemTypes.MATCH_BOX, 1);
        }

        this.syncUi();
    },

    add: function (item) {
        this.items.push(item);
        this.syncUi();
    },

    create: function (itemTypeId) {
        if (typeof window.Items[itemTypeId] === 'undefined') {
            return false;
        }

        var itemClass = window.Items[itemTypeId];
        var itemObj = new itemClass();
        return itemObj;
    },

    createAndAdd: function (itemTypeId, amount) {
        for (var i = 0; i < amount; i++) {
            var item = this.create(itemTypeId);
            this.items.push(item);
        }

        this.syncUi();
    },

    getItemQty: function (itemTypeId) {
        var amt = 0;

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];

            if (item.type === itemTypeId) {
                amt++;
            }
        }

        return amt;
    },

    removeItems: function (itemTypeId, amount) {
        var toDelete = [];

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];

            if (item.type === itemTypeId) {
                toDelete.push(item);
                amount--;

                if (amount <= 0) {
                    break;
                }
            }
        }

        for (var j = 0; j < toDelete.length; j++) {
            var deleteItem = toDelete[i];
            var idx = this.items.indexOf(deleteItem);

            if (idx >= 0) {
                this.items.splice(idx, 1);
            }
        }

        this.syncUi();
    },

    syncUi: function () {
        $ui = $('#inventory');
        $ui.html('');

        var itemsCreated = [];

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];

            var $elem = $ui.find('.item.' + item.type);

            if ($elem.length == 0) {
                $elem = $('<div />')
                    .addClass('item')
                    .addClass(item.type)
                    .appendTo($ui);

                var $img = $('<img />')
                    .attr('src', 'assets/images/items/' + item.getIcon())
                    .appendTo($elem);

                var $count = $('<div />')
                    .addClass('count')
                    .attr('data-count', 1)
                    .text('x1')
                    .appendTo($elem);
            } else {
                var $count = $elem.find('.count');
                var curAmount = parseInt($count.attr('data-count'));

                curAmount++;

                $count.attr('data-count', curAmount);
                $count.text('x' + curAmount)
            }
        }
    }

    ,
};