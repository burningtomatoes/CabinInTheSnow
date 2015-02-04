/**
 * Bed script in the cabin.
 */
window.mapObjects['bed'] = MapObject.extend({
    trigger: function (player) {
        var hasFire = this.map.fireplaceLit;
        var isNighttime = Time.getHour() >= 18 || Time.getHour() <= 6;
        var hasLogs = Inventory.getItemQty(ItemTypes.FIRE_WOOD) >= 1;

        if (isNighttime && !hasFire && hasLogs) {
            Dialogue.prepare([{
                text: "It's freezing in here. I should light a fire with the wood I have before sleeping."
            }]);
        }
        else if (hasFire || isNighttime) {
            player.canControl = false;

            var dialoguePages = [];

            if (hasFire) {
                dialoguePages.push({
                    text: "The cabin is warm now. Should I sleep?"
                });
            } else {
                dialoguePages.push({
                    text: "It seems insane to go to sleep in here with this cold, but going outside might be worse right now."
                });
                dialoguePages.push({
                    text: "What should I do?"
                });
            }

            dialoguePages[dialoguePages.length - 1].options = [
                "Sleep (+ 6 hours)",
                "Nevermind"
            ];

            Dialogue.prepare(dialoguePages, function (data) {
                if (data.option == 1) {
                    // Yes
                    Time.addHours(6);
                    Needs.changeNeed(NeedType.SLEEP, -60);

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