/**
 * Bed script in the cabin.
 */
window.mapObjects['bed'] = MapObject.extend({
    trigger: function (player) {
        if (this.map.fireplaceLit) {
            player.canControl = false;

            Dialogue.prepare([{
                text: "The cabin is warm now. Should I sleep?",
                options: [
                    "Yes (+ 6 hours)",
                    "No"
                ]
            }], function (data) {
                if (data.option == 1) {
                    // Yes
                    Time.addHours(6);

                    $('#textoverlay').fadeIn('fast', function () {
                        player.canControl = true;

                        if (!IntroText.running) {
                            $('#textoverlay').fadeOut('fast');
                        }

                    }.bind(this));
                } else {
                    // No
                    player.canControl = true;
                }
            }.bind(this));
        } else {
            Dialogue.prepare([{
                text: "It's a bed. Once I find a way to warm up this cabin I may be able to get some rest here."
            }]);
        }

        Dialogue.show();
    }
});