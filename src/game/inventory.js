var Inventory = {
    items: [],

    clear: function () {
        this.items = [];
    },

    add: function (item) {
        this.items.push(item);
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
            this.add(item);
        }
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
    }
};