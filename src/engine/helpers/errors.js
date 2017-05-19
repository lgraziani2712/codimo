/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */

export function UnableToLeaveTheNumericLine() {
  this.name = UnableToLeaveTheNumericLine.name;
  this.message = 'Is not possible to leave the numeric line';
}
export function MazeExitError() {
  this.name = MazeExitError.name;
  this.message = 'This position is not an exit';
}
export function MazePathError() {
  this.name = MazePathError.name;
  this.message = 'The path you are trying to go is not a valid one';
}
export function MazePathOverflow() {
  this.name = MazePathOverflow.name;
  this.message = 'You\'re trying to move forward where on an exit. This would make the number fall from the maze 😱';
}
export function MazeStarvationError() {
  this.name = MazeStarvationError.name;
  this.message = 'The number did not reach an exit and did not leave. It will be lost in the maze for all eternity 😢';
}
export function MazeWrongExitError() {
  this.name = MazeWrongExitError.name;
  this.message = 'The number has left at the wrong exit';
}
