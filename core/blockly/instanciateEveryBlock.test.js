/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import 'test/BlocklyMock';

import instanciateEveryBlock from './instanciateEveryBlock';

describe('blockly/blocks/instanciateEveryBlock', () => {
  it('should load and instanciate a required block with default parser', async () => {
    const blockTest = 'move_forward';

    expect(Blockly.JavaScript[blockTest]).toBeUndefined();
    expect(Blockly.Blocks[blockTest]).toBeUndefined();

    await instanciateEveryBlock('easy', [blockTest]);

    expect(Blockly.JavaScript[blockTest]).toBeInstanceOf(Function);
    expect(Blockly.Blocks[blockTest].init).toBeInstanceOf(Function);
  });
  it('should load and instanciate a required block with custom parser', async () => {
    const blockTest = 'repeat_x';

    expect(Blockly.JavaScript[blockTest]).toBeUndefined();
    expect(Blockly.Blocks[blockTest]).toBeUndefined();

    await instanciateEveryBlock('easy', [blockTest]);

    expect(Blockly.JavaScript[blockTest]).toBeInstanceOf(Function);
    expect(Blockly.Blocks[blockTest].init).toBeInstanceOf(Function);
  });
});
