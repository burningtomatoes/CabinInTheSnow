var Matches = Entity.extend({
    isMatches: true,
    causesCollision: false,

    init: function () {
        this.height = 32;
        this.width = 32;

        this.spriteBody = Gfx.load('matchbox');
    }
});