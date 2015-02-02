/**
 * Compile-time client configuration data.
 *
 * RENDERING
 * tileSize         int         This affects how maps are interpreted and rendered. Must match the tileset, etc.
 *
 * DEVELOPMENT
 * skipBootLogo     bool        Skips the "BurningTomato.com" boot logo.
 * countFps         bool        Shows the frames-per-second counter.
 * skipIntroStory   bool        Skips the initial journey and dialogue RE: finding the cabin
 */
var Settings = {
    tileSize: 32,

    skipBootLogo: true,
    countFps: true,
    skipIntroStory: true
};