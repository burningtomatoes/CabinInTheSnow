window.mapObjects = { };

var MapObject = Class.extend({
    map: null,
    name: null,
    type: null,
    interactionType: -1,
    x: 0,
    y: 0,
    h: 0,
    w: 0,

    init: function (data) {
        this.map = data.map;
        this.name = data.name;
        this.type = data.type;
        this.x = data.x;
        this.y = data.y;
        this.h = data.h;
        this.w = data.w;

        if (data.properties) {
            for (var propName in data.properties) {
                var propVal = data.properties[propName];
                this[propName] = propVal;
            }
        }

        this.interactionType = ObjectInteractionType.TRIGGER;
    },

    canTrigger: function () {
        // Could be implemented by child objects
        return true;
    },

    trigger: function (player) {
        // Must be implemented by child objects
    },

    getRect: function () {
        var rect = {
            top: this.y,
            left: this.x,
            width: this.w,
            height: this.h
        };

        rect.bottom = rect.top + rect.height;
        rect.right = rect.left + rect.width;
        return rect;
    }
});

var ObjectInteractionType = {
    TRIGGER: 0,
    AREA: 1
};