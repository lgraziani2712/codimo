/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * @flow
 */

export function UnableToLeaveTheNumericLine() {
  this.name = UnableToLeaveTheNumericLine.name;
  this.message = 'Is not possible to leave the numeric line';
  this.stack = (new Error()).stack;
}

export function MazePathError(actor: number) {
  this.name = MazePathError.name;
  this.actor = actor;
  this.message = 'The path you are trying to go is not a valid one';
  this.stack = (new Error()).stack;
}

export function MazeExitError(actor: number) {
  this.name = MazeExitError.name;
  this.actor = actor;
  this.message = 'This position is not an exit';
  this.stack = (new Error()).stack;
}
