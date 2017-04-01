## HEAD

- ⚙ [2017-03-31] `test/PixiWrapper`: extract it from `engine/components/mazeGenerator.stories`. It's a little more generical!
- ⚙ [2017-03-31] `engine/components/Block -> blockGenerator`: now it has one curry function to receive the representation color and then returns the blockGenerator specifically for that color. In the near future it will receive a texture instead of a color.
- ⚙ [2017-03-31] `engine/components/Maze -> mazeGenerator`: extract the implementation that was done in the story. Then refactore it for the new blockGenerator implementation.
- 🚀 [2017-03-31] `engine/components/numberGenerator`: finish the first version of the game's actor object.
- 🚀 [2017-03-31] `flow-typed/pixi_v4.x.x`: finish the first version of the PixiJS' type definition.
- [2017-03-28] `engine/components/{Block|Maze}`: first version of unit elements of a Maze. Add one story for unit development. PixiJS ❤ ReactStoryBook.
- [2017-03-27] `engine/helpers/assetLoader`: create first version. It has a decent type definition.
- [2017-02-14] Add authorship to every file.
- [2017-02-14] `blockly/components/ActionContainer`: add block's container. Also make it work with its children.
- [2017-02-13] `blockly/components`: add first blocks.
- [2017-02-13] `components/BlocklyApp`: it's the React component in charge of making Blockly work.
