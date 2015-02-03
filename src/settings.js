/**
 * Compile-time client configuration data.
 *
 * RENDERING
 * tileSize             int         This affects how maps are interpreted and rendered. Must match the tileset, etc.
 *
 * DEVELOPMENT
 * skipBootLogo         bool        Skips the "BurningTomato.com" boot logo.
 * countFps             bool        Shows the frames-per-second counter.
 * skipIntroStory       bool        Skips the initial journey and dialogue RE: finding the cabin
 * spawnWithItems       bool        Adds a bunch of items to the user's inventory on game start. Major cheatage.
 * skipTimeCallouts     bool        Do not announce the "morning of", "evening of" times with the dramatic black screen
 * ignoreRemarks        bool        Do not remark when walking into certain areas
 */
var Settings = {
    tileSize: 32,

    skipBootLogo: true,
    countFps: true,
    skipIntroStory: true,
    spawnWithItems: true,
    skipTimeCallouts: true,
    ignoreRemarks: true
};