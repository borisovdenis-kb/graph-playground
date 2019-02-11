import * as mutations from './mutations';
import CommandHistory from "../../../core/commands/CommandHistory";

const commandHistoryStoreModule = {
  state: {
    commandHistory: null
  },
  mutations: {
    [mutations.COMMAND_HISTORY_CREATE] (state) {
      state.commandHistory = new CommandHistory();
    },
    [mutations.COMMAND_HISTORY_LOG] (state, payload) {
      state.commandHistory.logCommand(payload.command);
    },
    [mutations.COMMAND_HISTORY_UNDO] (state) {
      state.commandHistory.undoLastCommand();
    }
  }
};

export default commandHistoryStoreModule;
