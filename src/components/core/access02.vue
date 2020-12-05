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
                    @click="drilledOption = 'nextLevel'"
                    render = true;
                    hideTable = true
                    class="q-ma-xs bg-grey-4"
                  >
                  </q-btn>
                  <!-- <q-btn
                    flat
                    icon="arrow_drop_down"
                    label='Bar Chart'
                    @click="drilledOption = 'BarChart'"
                    render = true;
                    hideTable = true
                    class="q-ma-xs bg-grey-4"
                  >
                  </q-btn> -->
                  <!-- <q-btn
                    flat
                    icon="arrow_drop_down"
                    label='Bubble Chart'
                    @click="drilledOption = 'BubbleChart'"
                    render = true;
                    hideTable = true
                    class="q-ma-xs bg-grey-4"
                  >
                  </q-btn> -->

                  <!-- <q-btn flat icon="apps" class="q-ma-xs bg-grey-4" label="Options">
                    <q-menu>
                      <q-list style="min-width: 150px" class="q-ma-xs bg-grey-1">
                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'BarChart'"
                          render = true;
                          hideTable = true
                          class="q-ma-xs bg-grey-4"
                          >
                            <q-item-section>
                              <q-item-label>
                                Bar chart
                              </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'BarChart1'"
                          render = true;
                          hideTable = true
                          class="q-ma-xs bg-grey-4"
                          >
                            <q-item-section>
                              <q-item-label>
                                Bar chart 1
                              </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'BarChart3'"
                          render = true;
                          hideTable = true
                          class="q-ma-xs bg-grey-4"
                          >
                            <q-item-section>
                              <q-item-label>
                                Bar chart 3
                              </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'BubbleChart'"
                          render = true;
                          hideTable = true
                          class="q-ma-xs bg-grey-4"
                          >
                            <q-item-section>
                              <q-item-label>
                                Bubble chart
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'BarChart4'"

                          render = true;
                          hideTable = true
                          class="q-ma-xs bg-grey-4"
                          >
                            <q-item-section>
                              <q-item-label>
                                Bar chart 4
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'BarChart5'"
                          render = true;
                          hideTable = true
                          class="q-ma-xs bg-grey-4"
                          >
                            <q-item-section>
                              <q-item-label>
                                Bar chart 5
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'BarChart6'"
                          render = true;
                          hideTable = true
                          class="q-ma-xs bg-grey-4"
                          >
                            <q-item-section>
                              <q-item-label>
                                Bar chart 6
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'BarChart7'"
                          render = true;
                          hideTable = true
                          class="q-ma-xs bg-grey-4"
                          >
                            <q-item-section>
                              <q-item-label>
                                Bar chart 7
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'BarChart8'"
                          render = true;
                          hideTable = true
                          class="q-ma-xs bg-grey-4"
                          >
                            <q-item-section>
                              <q-item-label>
                                Bar chart 8
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'BarChart9'"
                          render = true;
                          hideTable = true
                          class="q-ma-xs bg-grey-4"
                          >
                            <q-item-section>
                              <q-item-label>
                                Bar chart 9
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'BarChart10'"
                          render = true;
                          hideTable = true
                          class="q-ma-xs bg-grey-4"
                          >
                            <q-item-section>
                              <q-item-label>
                                Bar chart 10
                              </q-item-label>
                            </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn> -->

                  <q-btn-dropdown flat class="q-ma-xs bg-grey-4" label="Google Charts">
                      <q-list style="min-width: 150px" class="q-ma-xs bg-grey-1">
                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'bar01'"
                          render = true;
                          hideTable = true
                          >
                            <q-item-section>
                              <q-item-label>
                                Bars
                              </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'column01'"
                          render = true;
                          hideTable = true
                          >
                            <q-item-section>
                              <q-item-label>
                                Columns
                              </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'line01'"
                          render = true;
                          hideTable = true
                          >
                            <q-item-section>
                              <q-item-label>
                                Lines
                              </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'bubble01'"
                          render = true;
                          hideTable = true
                          >
                            <q-item-section>
                              <q-item-label>
                                Bubbles
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'column02'"
                          render = true;
                          hideTable = true
                          >
                            <q-item-section>
                              <q-item-label>
                                Columns 2
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'pie01'"
                          render = true;
                          hideTable = true
                          >
                            <q-item-section>
                              <q-item-label>
                                Pie
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'area01'"
                          render = true;
                          hideTable = true
                          >
                            <q-item-section>
                              <q-item-label>
                                Area
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'bubble02'"
                          render = true;
                          hideTable = true
                          >
                            <q-item-section>
                              <q-item-label>
                                Bubbles 2
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'combination01'"
                          render = true;
                          hideTable = true
                          >
                            <q-item-section>
                              <q-item-label>
                                Combinations
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'pie02'"
                          render = true;
                          hideTable = true
                          >
                            <q-item-section>
                              <q-item-label>
                                Pie 2
                              </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                          clickable
                          v-close-popup
                          @click="drilledOption = 'scatter01'"
                          render = true;
                          hideTable = true
                          >
                            <q-item-section>
                              <q-item-label>
                                Scatter
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
        v-model="drilledOption"
        animated
        class="row col-grow col-xs-12"
        :class="menuAccess"
        >
        <q-tab-panel
          v-if= "render"
          name="nextLevel"
          >
            <Core :formId = "uuid" />
        </q-tab-panel>
        <q-tab-panel
          v-if= "render"
          name="bar01"
          >
            <bar01 />
        </q-tab-panel>
        <q-tab-panel
          v-if= "render"
          name="column01"
          >
            <column01 />
        </q-tab-panel>
        <q-tab-panel
          v-if= "render"
          name="line01"
          >
            <line01 />
        </q-tab-panel>
        <q-tab-panel
          v-if= "render"
          name="column02"
          >
            <column02 />
        </q-tab-panel>

        <q-tab-panel
          v-if= "render"
          name="pie01"
          >
            <pie01 />
        </q-tab-panel>

        <q-tab-panel
          v-if= "render"
          name="area01"
          >
            <area01 />
        </q-tab-panel>


        <q-tab-panel
          v-if= "render"
          name="bubble02"
          >
            <bubble02 />
        </q-tab-panel>


        <q-tab-panel
          v-if= "render"
          name="combination01"
          >
            <combination01 />
        </q-tab-panel>


        <q-tab-panel
          v-if= "render"
          name="pie02"
          >
            <pie02 />
        </q-tab-panel>


        <q-tab-panel
          v-if= "render"
          name="scatter01"
          >
            <scatter01 />
        </q-tab-panel>


        <q-tab-panel
          v-if= "render"
          name="bubble01"
          >
            <bubble01 />
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
  import column02 from '../chart/column02.vue'
  import pie01 from '../chart/pie01.vue'
  import area01 from '../chart/area01.vue'
  import bubble02 from '../chart/buble02.vue'
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

    components: { bar01, column01, line01, column02, pie01, area01, bubble02, combination01, pie02, scatter01, bubble01 },

    data () {
      return {
        tableChildrenId: '',
        menuAccess: 'display: block',
        menuEditToggle: 'display: hidden',
        menuMode: 'menu',
        editedItem: {},
        editedItemBase: {},
        drilledDown: 'display: hidden',
        drilledOption: null,
        render: true,
        colTableClass: 'col-xs-12 col-lg-6',
        breadcrumb: [],
        editedIndex: -1,
        data: {},
        hideTable: false,
      }
    },

    computed: {
      dataSchema() { return sdata.default.dataSchema },
    },

    methods: {
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
