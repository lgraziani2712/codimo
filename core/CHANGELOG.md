## HEAD

### 🀄 Blockly Workspace

- ⚙️ [v1.1.0] `instanciateEveryBlock`: Add new param `engineData` used to configure the blocks.
- ⚙️ [v1.1.0] `parseInstructions`: Add the capability to parse new lines.

### 🤖 PixiJS Engine

- ⚙️ [v1.1.0] `engineGenerator`: Add `addPreExecutionChecker` method. It allow to validate instructions before execution. Solves the problem of duplicated blocks with the same params.

- ⚙️ [v1.1.0] `engineGenerator/processors/processorGenerator`: Add the possibility to receive one `CodimoComponent` or an array of `CodimoComponent`, being able to process all of them. Usefull when the activity has more than one actor.
  - Processors and checkers which follows the new `ProcessorBuilder` type version:
    - ⚙️ [v1.1.0] `engineGenerator/processors/theFallenOneResetProcessorBuilder`.
    - ⚙️ [v1.1.0] `engineGenerator/processors/positioningProcessorBuilder`.
    - ⚙️ [v1.1.0] `engineGenerator/processors/checkers/hasHitAWallBuilder`.
    - ⚙️ [v1.1.0] `engineGenerator/processors/checkers/hasBecomeTheFallenOneBuilder`.
    - ⚙️ [v1.1.0] `engineGenerator/beforeStopExecutionCheckers/starvationCheckerBuilder`.

- ⚙️ [v1.1.0] `components/functionalities/positioningFunctionalityBuilder`:
  - Add an state in which the actor can be, or not, in movement.
  - 🆕 Exportable constant `NO_START_POSITION`.
  - 🆕 Method `setPosition(newPosition: string): void`. It sets the actor in the new position instantly without animation.

### 💅 React UI

- ⚙️ [v1.1.0] `BlocklyApp`: Add `props.blocklyData.doNotUseRootBlock` flag to determine if the Root Blocks is going to be used or not.

## 1.0.0-alpha.2

### 💅 React UI

- ⚙️ [v1.0.2] `Activity`: Add the `handleNextLevelRedirection` helper (#59).
- ⚙️ [v1.1.0] `CodimoRouter`: Add a 404 page to announce the end game of an activity (#59).
- 🆕 [v1.0.0] `CodimoRouter/FourOhFour`: 404 page (#59).

## v1.0.0-alpha.1

### 🤖 PixiJS Engine

- 🎨 [v1.0.1] `starvationCheckerBuilder`: Improve error message (#54).
- 🎨 [v1.0.1] `hasBecomeTheFallenOneBuilder`: Improve error message (#54).
- 🎨 [v1.0.1] `hasBecomeTheFallenOneBuilder`: Replace image with an animated one (#55).
- 🎨 [v1.0.1] `hasHitAWallBuilder`: Improve error message (#54).
- 🎨 [v1.0.1] `hasHitAWallBuilder`: Replace image with an animated one (#55).

### 💅 React UI

- 🎨 `constants`: Add an animated image to the success message (#55).
- 🎨 `constants`: Improve success message (#54).
- 🎨 [v1.0.1] `Activity`: Add more visually atractive cursors (#57).
- 🎨 [v1.0.1] `BlocklyApp`: Add more visually atractive cursors (#57).
- 🎨 [v1.0.1] `BlocklyWorkspace`: Increase the opaque to the scrollbars and the trashcan (#53).

## v1.0.0-alpha.0

### 🀄 Blockly Workspace

- 🆕 [v1.0.0] `parseInstructions`.
- 🆕 [v1.0.0] `instanciateEveryBlock`.
- 🆕 [v1.0.0] `blocks/defaultBlockParser`.
- 🆕 [v1.0.0] `blocks/moveBuilder`.

#### 🀄 Códimo Blocks

- 🆕 [v1.0.0] `blocks/action_container`.
- 🆕 [v1.0.0] `blocks/move_backward`.
- 🆕 [v1.0.0] `blocks/move_forward`.
- 🆕 [v1.0.0] `blocks/move_left`.
- 🆕 [v1.0.0] `blocks/move_right`.
- 🆕 [v1.0.0] `blocks/repeat_x`.
- 🆕 [v1.0.0] `blocks/simple_loop`.

### 🤖 PixiJS Engine

- 🆕 [v1.0.0] `components/blockGenerator`.
- 🆕 [v1.0.0] `components/componentGenerator`.
- 🆕 [v1.0.0] `components/functionalities/emotionFunctionalityBuilder`.
- 🆕 [v1.0.0] `components/functionalities/hitTheWallFunctionalityBuilder`.
- 🆕 [v1.0.0] `components/functionalities/positioningFunctionalityBuilder`.
- 🆕 [v1.0.0] `components/functionalities/theFallenOneFunctionalityBuilder`.
- 🆕 [v1.0.0] `engineGenerator`.
- 🆕 [v1.0.0] `engineGenerator/beforeStopExecutionCheckers/starvationCheckerBuilder`.
- 🆕 [v1.0.0] `engineGenerator/processors/checkers/engineErrorBuilder`.
- 🆕 [v1.0.0] `engineGenerator/processors/checkers/hasBecomeTheFallenOneBuilder`.
- 🆕 [v1.0.0] `engineGenerator/processors/checkers/hasHitAWallBuilder`.
- 🆕 [v1.0.0] `engineGenerator/processors/emotionResetProcessorBuilder`.
- 🆕 [v1.0.0] `engineGenerator/processors/positioningProcessorBuilder`.
- 🆕 [v1.0.0] `engineGenerator/processors/processorGenerator`.
- 🆕 [v1.0.0] `engineGenerator/processors/theFallenOneResetProcessorBuilder`.
- 🆕 [v1.0.0] `generics/actorGenerator`.

### 💅 React UI

- 🆕 [v1.0.0] `Activity`.
- 🆕 [v1.0.0] `BlocklyApp`.
- 🆕 [v1.0.0] `BlocklyApp/components/BlocklyToolbox`.
- 🆕 [v1.0.0] `BlocklyApp/components/BlocklyWorkspace`.
- 🆕 [v1.0.0] `CodimoRouter`.
- 🆕 [v1.0.0] `PixiApp`.
