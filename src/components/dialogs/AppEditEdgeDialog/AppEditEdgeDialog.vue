<template>
  <div class="app-edit-edge-dialog">
    <app-base-dialog :options="options"
                     @dialogCancel="onCancelClick()">
      <template slot="content">
        <div class="app-edit-edge-dialog__content">
          <div class="app-edit-edge-dialog__row">
            <app-input v-model="edge.weight"
                       label="Weight"
                       placeholder="Enter weight" v-on:onSave="onWeightSave()">
            </app-input>
          </div>

          <div class="app-edit-edge-dialog__row">
            <div>
              <el-radio v-model="edge.orientation"
                        label="NONE"
                        border
                        size="mini"
                        style="margin: 0">
                None
              </el-radio>
              <el-radio v-model="edge.orientation"
                        label="ONE_TWO"
                        border
                        size="mini"
                        style="margin: 0">
                A - B
              </el-radio>
              <el-radio v-model="edge.orientation"
                        label="TWO_ONE"
                        border
                        size="mini"
                        style="margin: 0">
                B - A
              </el-radio>
            </div>
            <label class="app-edit-edge-dialog__direction-label">Direction</label>
          </div>
        </div>
      </template>
    </app-base-dialog>
  </div>
</template>

<script>
  import './app-edit-edge-dialog.css';
  import _ from 'lodash';
  import * as graphOrientation from '../../../constants/edgeOrientation';
  import { GRAPH_UPDATE_EDGE_WEIGHT } from "../../../store/graph/graph.actions";
  import { CH_LOG_COMMAND } from "../../../store/commandHistory/commandHistory.actions";
  import $store from '../../../store/index';
  import AppInput from "../../AppInput/AppInput";
  import AppCheckbox from "../../AppCheckbox/AppCheckbox";
  import AppBaseDialog from "../AppBaseDialog/AppBaseDialog";

  export default {
    name: "AppEditEdgeDialog",
    components: {
      AppBaseDialog,
      AppCheckbox,
      AppInput
    },
    props: ['inData', 'options'],
    data() {
      return {
        edge: {},
        graphOrientation
      }
    },
    methods: {
      onCancelClick() {
        this.options.onRejectClose();
      },
      onWeightSave() {
        $store.dispatch(`graph/${GRAPH_UPDATE_EDGE_WEIGHT}`, this.edge)
          .then(command => {
            $store.dispatch(
              `commandHistory/${CH_LOG_COMMAND}`,
              command,
              {root: true}
            );
          });
      }
    },
    created() {
      this.edge = _.cloneDeep($store.getters['graph/edgeById'](this.inData.edgeId));

      this.options['windowLeft'] = (this.edge.x1 + this.edge.x2) / 2 + 20;
      this.options['windowTop'] = (this.edge.y1 + this.edge.y2) / 2 + 20;
    }
  }
</script>

<style scoped>

</style>
