
export default class CommandHistory {
  constructor() {
    this.undo = [];
    this.redo = [];
    this.lastCommandIndex = -1;
  }

  logCommand(command) {
    if (this.lastCommandIndex !== this.undo.length - 1) {
      this.undo.splice(this.lastCommandIndex + 1);

      // TODO: call of dialogService
      throw new Error('Deletion of all redo commands');
    }

    this.undo.push({
      isCanceled: false,
      command
    });
    this.lastCommandIndex++;
  }

  undoLastCommand() {
    if (this.lastCommandIndex) {
      const command = this.undo[this.lastCommandIndex];
      command.command.cancel();
      command.isCanceled = true;

      this.redo.push(command);
      this.lastCommandIndex--;
    }
  }

  redoLastCommand() {
    if (this.redo.length) {
      const command = this.redo.pop();
      command.command.execute();
      command.isCanceled = false;

      this.lastCommandIndex++;
    }
  }
}
