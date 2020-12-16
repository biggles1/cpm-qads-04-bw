<template>
  <div id="AccessCore">
    <div class="row">
    <!-- access menus -->
      <template>
        <q-card id="access-menu" class="col-xs-12 col-lg-6 q-px-lg">
          <q-card-section>
            <q-form
            >
              <q-toolbar>
                <q-toolbar-title style="text-align: left">
                  <q-breadcrumbs
                    class="q-py-sm"
                    active-color="black"
                    style="font-size: 12px"
                  >
                    <q-breadcrumbs-el
                      v-for="(c, index) in this.$store.state.drillLevels.breadCrumb.slice(0,this.uuid-1)"
                      :key="index"
                      :label="c"
                      icon="navigation"
                      :to="'#table-'+(index+1).toString().padStart(2,'0')"
                    />
                  </q-breadcrumbs>
                  <q-btn
                    flat
                    icon="arrow_drop_down"
                    :label=recId
                    @click="drilledTab = 'nextLevel'"
                    render = true;
                    hideTable = true
                    class="q-ma-xs bg-grey-4"
                  >
                  </q-btn>

                  <q-btn-dropdown flat class="q-ma-xs bg-grey-4" label="Google Charts">
                      <q-list style="min-width: 150px" class="q-ma-xs bg-grey-1">
                        <q-item
                          v-for= "chart in chartArray"
                          :key= "chart.title"
                          clickable
                          v-close-popup
                          @click="drilledChart = chart.component;
                            drilledTab = 'charts'"
                          render = true
                          hideTable = true
                          >
                            <q-item-section>
                              <q-item-label>
                                {{ chart.title }}
                              </q-item-label>
                            </q-item-section>
                        </q-item>
                      </q-list>
                  </q-btn-dropdown>
                </q-toolbar-title>
              </q-toolbar>
            </q-form>
          </q-card-section>
        </q-card>
      </template>
    </div>

    <!-- next drill down -->
    <template>
      <q-tab-panels
        :id="tableChildrenId"
        v-model="drilledTab"
        animated
        class="row col-grow col-xs-12"
        :class="menuAccess"
        >
        <q-tab-panel
          name="nextLevel"
          style="padding: 0px; margin: 0px"
          >
            <Core :formId = "uuid" />
        </q-tab-panel>

        <q-tab-panel
          name='charts'
        >
          <component
            v-bind:is="drilledChart"
            >
          </component>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </div>
</template>

<script>
  import * as sdata from '../form/seedData.vue'
  import bar01 from '../chart/bar01.vue'
  import column01 from '../chart/column01.vue'
  import line01 from '../chart/line01.vue'
  import line02 from '../chart/line02.vue'
  import column02 from '../chart/column02.vue'
  import pie01 from '../chart/pie01.vue'
  import area01 from '../chart/area01.vue'
  import bubble02 from '../chart/bubble02.vue'
  import combination01 from '../chart/combination01.vue'
  import pie02 from '../chart/pie02.vue'
  import scatter01 from '../chart/scatter01.vue'
  import bubble01 from '../chart/bubble01.vue'

  export default {
    props: {

      uuid: {
        type: Number,
        default: 0
      },

      recId: {
        type: String,
        default: ''
      }
    },

    components: { bar01, column01, line01, line02, column02, pie01, area01, bubble02, combination01, pie02, scatter01, bubble01 },

    data () {
      return {
        tableChildrenId: '',
        menuAccess: 'display: block',
        menuEditToggle: 'display: hidden',
        menuMode: 'menu',
        editedItem: {},
        editedItemBase: {},
        drilledDown: 'display: hidden',
        drilledOption: '',
        drilledTab: '',
        drilledChart: '',
        render: true,
        colTableClass: 'col-xs-12 col-lg-6',
        breadcrumb: [],
        editedIndex: -1,
        data: {},
        hideTable: false,
        chartArray: [
          {'title': 'Bar 01', 'component': 'bar01'},
          {'title': 'Column 01', 'component': 'column01'},
          {'title': 'Line 01', 'component': 'line01'},
          {'title': 'Line 02', 'component': 'line02'},
          {'title': 'Column 02', 'component': 'column02'},
          {'title': 'Pie 01', 'component': 'pie01'},
          {'title': 'Area 01', 'component': 'area01'},
          {'title': 'Bubble 01', 'component': 'bubble01'},
          {'title': 'Combination 01', 'component': 'combination01'},
          {'title': 'Pie 02', 'component': 'pie02'},
          {'title': 'Scatter 01', 'component': 'scatter01'},
          {'title': 'Bubble 02', 'component': 'bubble02'},
          ]
      }
    },

    computed: {
      dataSchema() { return sdata.default.dataSchema },
    },

    methods: {
      charting() {
        this.drilledOption = 'charts'
      }
    },

    mounted() {
      this.tableChildrenId = "tableChildren-"+this.uuid.toString().padStart(2,'0')
    },

    created() {
      this.data = JSON.parse(JSON.stringify(sdata.default.recordData))
    }
  }
</script>

<style lang="sass">
.my-sticky-header-table
  height: 400px
  max-width: 100%

  td:first-child
    background-color: $grey-1 !important

  tr th
    position: sticky
    z-index: 2

  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3

  thead tr:first-child th
    top: 0
    z-index: 1
    background-color: $grey-1

  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0

  .tab-panels
    margin: 0px 0px 0px 0px
    padding: 0px 0px 0px 0px

  .tab-panel
    margin: 0px 0px 0px 0px
    padding: 0px 0px 0px 0px

  .q-card
    margin: 0px 0px 0px 0px
    padding: 0px 0px 0px 0px

  .q-card-section
    margin: 0px 0px 0px 0px
    padding: 0px 0px 0px 0px

  .q-table__top
    margin: 0px 0px
    padding: 0px 0px

  .q-btn
    line-height: 1.7em

</style>
