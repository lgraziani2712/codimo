/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
/**
 * @see https://developers.google.com/blockly/reference/js/Blockly.Field
 */
declare class Blockly$Field {
  name: string;
  text: string;

  constructor(
    text: string,
    optValidator?: (text: string) => (string | null),
  ): Blockly$Field;
}
/**
 * @see https://developers.google.com/blockly/reference/js/Blockly.FieldTextInput
 */
declare class Blockly$FieldTextInput extends Blockly$Field {
  spellcheck: boolean;

  constructor(text: string): Blockly$FieldTextInput;
  setSpellcheck(spellcheck: boolean): void;
}
/**
 * @see
 */
declare class Blockly$FieldNumber extends Blockly$Field {
  constructor(
    value: number,
    min?: number,
    max?: number,
    precision?: number,
    validator?: (value: number) => string | null,
  ): Blockly$FieldNumber;
}
/**
 * @see https://developers.google.com/blockly/reference/js/Blockly.FieldImage
 */
declare class Blockly$FieldImage extends Blockly$Field {
  constructor(
    src: string,
    width: number,
    height: number,
    alt?: string,
    handleClick?: (event: SyntheticEvent) => void,
  ): Blockly$FieldImage;
}
/**
 * @see https://developers.google.com/blockly/reference/js/Blockly.Input
 */
declare class Blockly$Input {
  align: number;
  name: string;
  type: number;

  appendField(field: string | Blockly$Field, optName?: string): Blockly$Input;
  setAlign(align: number): Blockly$Input;
  setCheck(compatibleTypes?: string | Array<string> | null): Blockly$Input;
}
/**
 * @see https://developers.google.com/blockly/reference/js/Blockly.Block
 */
declare class Blockly$Block {
  type: string;
  id: string;

  appendDummyInput(optName?: string): Blockly$Input;
  appendStatementInput(name: string): Blockly$Input;
  appendValueInput(name: string): Blockly$Input;
  getFieldValue(name: string): string;
  setColour(colour: number | string): void;
  setNextStatement(
    canBeANextStatement: boolean,
    connecTypes?: string | Array<string> | null,
  ): void;
  setOutput(theIsAnOutput: boolean, returnTypes?: string | Array<string> | null): void;
  setPreviousStatement(
    canBeAPreviousStatement: boolean,
    connecTypes?: string | Array<string> | null,
  ): void;
  setTooltip(newTip: string | () => string): void;
}
declare var Blockly: {
  ALIGN_CENTRE: number,
  Blocks: {
    [key: string]: {|
      init(): void,
    |},
  },
  Events: {
    disableOrphans(event: Event): void,
    recordUndo: boolean,
  },
  FieldImage: typeof Blockly$FieldImage,
  FieldNumber: typeof Blockly$FieldNumber,
  FieldTextInput: typeof Blockly$FieldTextInput,
  inject(elementId: string | HTMLElement, options: Object): Object,
  JavaScript: {
    ORDER_ATOMIC: 0,
    addReservedWords(...words: Array<string>): void;
    statementToCode(block: Blockly$Block, name: string): string,
    valueToCode(block: Blockly$Block, type: string, order: number): string,
    workspaceToCode(workspace: Object): string,

    // Block excecutors
    [key: string]: (block: Blockly$Block) => string,
  },
  Msg: Object,
  WidgetDiv: {
    DIV: HTMLElement,
  },
  Xml: {
    textToDom(text: string): HTMLElement;
    domToWorkspace(workspace: Object, block: HTMLElement): void;
  },
}
