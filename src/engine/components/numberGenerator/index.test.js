/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import numberGenerator from './';

describe('engine > components > numberGenerator', () => {
  it('should update its position acording to the new position', async () => {
    const rawNumber = 3;
    const initPosition = '1,1';
    const size = 64;
    const number = numberGenerator(rawNumber, initPosition, size);
    const initX = number.view.x;
    const initY = number.view.y;
    const newPosition = '2,2';

    await number.updatePosition(newPosition);

    expect(number.position).toBe(newPosition);
    expect(number.view.x).not.toBe(initX);
    expect(number.view.y).not.toBe(initY);

    number.resetPosition();

    expect(number.position).toBe(initPosition);
    expect(number.view.x).toBe(initX);
    expect(number.view.y).toBe(initY);
  });
  it('should update its position to undefined on enter to numeric line', async () => {
    const rawNumber = 3;
    const initPosition = '1,1';
    const size = 64;
    const marginBottom = 10;
    const number = numberGenerator(rawNumber, initPosition, size);
    const initX = number.view.x;
    const initY = number.view.y;

    await number.hasEnteredToNumericLine(marginBottom);

    expect(number.position).toBeUndefined();
    expect(number.view.x).not.toBe(initX);
    expect(number.view.y).not.toBe(initY);
  });
  it(
    'should throw an `UnableToLeaveTheNumericLine` if tries to call updatePosition when is in the numeric line',
    async () => {
      const rawNumber = 3;
      const initPosition = '1,1';
      const size = 64;
      const marginBottom = 10;
      const number = numberGenerator(rawNumber, initPosition, size);

      await number.hasEnteredToNumericLine(marginBottom);

      try {
        number.updatePosition('1,2');
      } catch (err) {
        expect(err.name).toBe('UnableToLeaveTheNumericLine');
        expect(err.message).toMatchSnapshot();
      }
    },
  );
  xit('should stop the animation if the promise was canceled. It should reset its position while clearing the canceled promise');
});
