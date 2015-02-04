var Axe = Entity.extend({
    isAxe: true,

    init: function () {
        this.height = 32;
        this.width = 32;

        this.spriteBody = Gfx.load('axe');
    }
});