/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
declare var Blockly: {
  Blocks: {
    [key: string]: {|
      init(): void,
    |},
  },
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
  Events: {
    disableOrphans(event: Event): void,
  },
  Xml: {
    textToDom(text: string): HTMLElement;
    domToWorkspace(workspace: Object, block: HTMLElement): void;
  },
  Msg: Object,
  ALIGN_CENTRE: string,
}
