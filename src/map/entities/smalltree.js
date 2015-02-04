var SmallTree = Entity.extend({
    isTree: true,

    init: function () {
        this.height = 48;
        this.width = 48;

        this.spriteBody = Gfx.load('smalltree');
    }
});