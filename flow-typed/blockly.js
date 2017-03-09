/**
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * @author Luciano Graziani @lgraziani2712
 */
declare var Blockly: {
  inject(elementId: string | HTMLElement, options: Object): Object,
  Blocks: Object,
  JavaScript: {
    workspaceToCode(workspace: Object): string,
    statementToCode(block: Object, name: string): string,
    valueToCode(block: Object, type: string, order: number): any,
    ORDER_ATOMIC: string,
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
