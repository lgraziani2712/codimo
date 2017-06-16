/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
class FieldTextInput {
  spellcheck: boolean;
  text: string;

  constructor(text: string) {
    this.text = text;
  }
  setSpellcheck(spellcheck: boolean) {
    this.spellcheck = spellcheck;
  }
}
declare class FieldNumber {
  constructor(
    value: number,
    min?: number,
    max?: number,
    precision?: number,
    validator?: (value: number) => string | null,
  ): FieldNumber;
}
declare var Blockly: {
  ALIGN_CENTRE: string,
  Blocks: {
    [key: string]: {|
      init(): void,
    |},
  },
  Events: {
    disableOrphans(event: Event): void,
    recordUndo: boolean,
  },
  FieldNumber: typeof FieldNumber,
  FieldTextInput: typeof FieldTextInput,
  inject(elementId: string | HTMLElement, options: Object): Object,
  JavaScript: {
    ORDER_ATOMIC: string,
    addReservedWords(...words: Array<string>): void;
    statementToCode(block: Object, name: string): string,
    valueToCode(block: Object, type: string, order: number): any,
    workspaceToCode(workspace: Object): string,

    // Block excecutors
    [key: string]: (block: Object) => string,
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
