<template>
  <div class="app-action-history">
    <div class="app-action-history__toolbar">

      <div class="app-action-history__toolbar-title">History</div>

      <div class="app-action-history__toolbar-buttons">
        <div class="app-action-history__buttons">
          <app-button v-on:click="undoCommand()"
                      icon-text="<-">
          </app-button>
        </div>

        <div class="app-action-history__buttons">
          <app-button icon-text="->"></app-button>
        </div>
      </div>
    </div>

    <div class="app-action-history__command-list">
      <template v-if="!isActionHistoryEmpty">
        <div class="app-action-history__row" v-for="action in undoActionsList">
          <div class="app-action-history__label app-action-history__label--left">
            <div>{{ action.name }}</div>
          </div>
          <div class="app-action-history__label app-action-history__label--right">{{ action.date }}</div>
        </div>
      </template>
      <template v-else>
        <div class="app-action-history__empty-message">Empty</div>
      </template>
    </div>

  </div>
</template>

<script>
  import './app-action-history.css';

  import AppButton from "../AppButton/AppButton";
  import {mapState, mapGetters} from 'vuex';

  export default {
    name: "app-action-history",
    components: {
      AppButton
    },
    methods: {
      undoCommand() {
        // this.$store.commit(COMMAND_HISTORY_UNDO);
      }
    },
    computed: {
      ...mapState('actionHistory', {
        undoActionsList: 'undo'
      }),
      ...mapGetters('actionHistory', [
        'isActionHistoryEmpty'
      ])
    }
  }
</script>
