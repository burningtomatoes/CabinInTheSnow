var Game = {
    map: null,
    maps: [],
    lastMapId: null,
    resetting: false,

    initialize: function () {
        Canvas.initialize();
        Keyboard.bind();
    },

    start: function () {
        Canvas.$canvas.hide();

        console.info('[Game] Starting game...');

        // Clear out the persistent map cache so the entire game world is reset.
        this.maps = [];
        this.lastMapId = null;

        // Clear game state
        Time.reset();

        // Load up the game starting position
        this.loadMap('forest_1');
    },

    reset: function (callback) {
        if (this.resetting) {
            return;
        }

        if (callback == null) {
            callback = function() { };
        }

        console.info('[Game] Resetting game...');

        this.resetting = true;

        Dialogue.hide();
        $('#hud').hide();

        if (this.map != null) {
            this.map.pause();
        }

        var completeReset = function() {
            this.map = null;
            this.start();
            this.resetting = false;
        }.bind(this);

        Canvas.$canvas.fadeOut(3000, function() {
            Music.stopAll();
            window.setTimeout(completeReset, 1000);
        });
    },

    loadMap: function (id, loadCallback) {
        if (loadCallback == null) {
            loadCallback = function () { };
        }

        var mapReady = function () {
            loadCallback(this.map);

            Canvas.$canvas.fadeIn(this.lastMapId == null ? 2000 : 'fast');
            this.lastMapId = id;

            Camera.onMapLoaded();
        }.bind(this);

        var execLoad = function() {
            if (typeof this.maps[id] == 'undefined') {
                this.map = new Map();
                this.maps[id] = this.map;
                this.map.load(id, function (okay) {
                    if (!okay) {
                        alert('Something went wrong, could not load the next part of the game.');
                        return;
                    }

                    if (!this.map.paused) {
                        $('#hud').show();
                    }

                    mapReady();
                }.bind(this));
            } else {
                this.map = this.maps[id];
                this.map.redeploy();
                mapReady();
            }
        }.bind(this);

        if (!Canvas.$canvas.is(':visible')) {
            execLoad();
        } else {
            Canvas.$canvas.fadeOut('fast', execLoad);
        }
    },

    draw: function (ctx) {
        if (this.map != null) {
            this.map.draw(ctx);
        }

        Time.draw(ctx);
    },

    update: function () {
        if (this.map != null) {
            this.map.update();
        }

        Dialogue.update();
        Keyboard.update();
        Camera.update();
        Time.update();
    }
};