/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */
import { TweenLite, Linear } from 'gsap';

import { ZERO, HALF, DEFAULT_MOVEMENT_DURATION } from 'core/constants/numbers';

import { type CodimoComponent, type FunctionalityBuilder } from '../componentGenerator';

export const NO_START_POSITION = 'NO_START_POSITION';

/**
 * A builder with two prerequired params.
 *
 * @version 1.1.0
 * @param {string} position CodimoComponent's starting point.
 * @param {string} [endPosition] CodimoComponent's possible end point.
 * @param {number} [movementDuration=0.5] Main animation time
 * @return {FunctionalityBuilder}
 *  This new function returns an object with the `positioning` functionality.
 */
const positioningFunctionalityBuilder = (
  position: string,
  endPosition: string = '',
  movementDuration: number = DEFAULT_MOVEMENT_DURATION,
): FunctionalityBuilder => (
  size: number,
  margin: number,
  component: CodimoComponent,
) => {
  if (!component.view.parent) {
    throw new Error(
      '`positioning` functionality requires the component to have a parent',
    );
  }
  const initialParent = component.view.parent;
  const initialPosition = position !== NO_START_POSITION
    ? position
      .split(',')
      .map((string: string): number => (parseInt(string)))

    : [ZERO, ZERO];

  component.view.x = initialPosition[0] * (size + margin) + size / HALF + margin;
  component.view.y = initialPosition[1] * (size + margin) + size / HALF + margin;

  return {
    /**
     * Flag that determines that the actor is moving.
     *
     * @readonly
     */
    isMoving: position !== NO_START_POSITION,
    /**
     * Actual position
     *
     * @readonly
     */
    position,
    /**
     *
     * @readonly
     */
    initialPosition,
    /**
     *
     * @readonly
     */
    endPosition,
    /**
     * This animation moves the component to a new position.
     * It uses a linear ease.
     *
     * @param {string} newPosition coords as x,y string.
     * @return {Promise<void>} animation's promise.
     */
    updatePosition(newPosition: string): Promise<void> {
      this.isMoving = true;
      this.position = newPosition;

      const positionNumbers =
        this.position
          .split(',')
          .map((string: string): number => (parseInt(string)));

      return new Promise((onComplete) => {
        TweenLite.to(this.view, movementDuration, {
          x: positionNumbers[0] * (size + margin) + size / HALF + margin,
          y: positionNumbers[1] * (size + margin) + size / HALF + margin,
          ease: Linear.easeNone,
          onComplete,
        });
      });
    },
    setPosition(newPosition: string): void {
      this.isMoving = true;
      this.position = newPosition;

      const positionNumbers =
        this.position
          .split(',')
          .map((string: string): number => (parseInt(string)));

      this.view.x = positionNumbers[0] * (size + margin) + size / HALF + margin;
      this.view.y = positionNumbers[1] * (size + margin) + size / HALF + margin;
    },
    /**
     * Reset the actor's position to the initial one.
     * No animation is involved.
     *
     * @return {void}
     */
    resetPosition() {
      this.isMoving = position !== NO_START_POSITION;
      this.position = `${this.initialPosition[0]},${this.initialPosition[1]}`;

      this.view.setParent(initialParent);

      this.view.x = this.initialPosition[0] * (size + margin) + size / HALF + margin;
      this.view.y = this.initialPosition[1] * (size + margin) + size / HALF + margin;
    },
  };
};

export default positioningFunctionalityBuilder;
