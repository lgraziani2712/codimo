/**
 * @author Luciano Graziani @lgraziani2712
 * @license {@link http://www.opensource.org/licenses/mit-license.php|MIT License}
 *
 * NOTE:  Since this errors are extremely specific, and we know the only place
 *        where they are thrown, there is no need on having the stack error.
 *
 * TODO: messages must be in a localize file.
 * @flow
 */

export function UnableToLeaveTheNumericLine() {
  this.name = UnableToLeaveTheNumericLine.name;
  this.message = 'Is not possible to leave the numeric line';
}

export function MazePathError(actor: number) {
  this.name = MazePathError.name;
  this.actor = actor;
  this.message = 'The path you are trying to go is not a valid one';
}

export function MazeExitError(actor: number) {
  this.name = MazeExitError.name;
  this.actor = actor;
  this.message = 'This position is not an exit';
}

export function MazeWrongExitError(actor: number) {
  this.name = MazeWrongExitError.name;
  this.actor = actor;
  // FIXME actor value is the actor ID, not the actual actor
  this.message = `The number ${actor} has left at the wrong exit`;
}
