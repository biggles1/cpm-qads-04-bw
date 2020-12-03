<template>
  <div id="AccessCore">
    <div class="row">
    <!-- access menus -->
      <template>
        <q-card id="access-menu" class="col-xs-12">
          <q-card-section class="q-px-xl">
            <q-form
              class="shadow-0"
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
                  <q-btn
                    flat
                    icon="arrow_drop_down"
                    label='Bar Chart'
                    @click="drilledOption = 'BarChart'"
                    render = true;
                    hideTable = true
                    class="q-ma-xs bg-grey-4"
                  >
                  </q-btn>
                  <q-btn
                    flat
                    icon="arrow_drop_down"
                    label='Bubble Chart'
                    @click="drilledOption = 'BubbleChart'"
                    render = true;
                    hideTable = true
                    class="q-ma-xs bg-grey-4"
                  >
                  </q-btn>
                  <q-btn flat icon="apps" class="q-ma-xs bg-grey-4" label="Options">
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
                            <q-item-section color="bg-blue-2">
                              <q-item-label color="bg-blue-2">
                                Bubble chart
                              </q-item-label>
                            </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
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
        style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px"
        >
        <q-tab-panel
          v-if= "render"
          name="nextLevel"
          style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">
            <Core :formId = "uuid" />
        </q-tab-panel>
        <q-tab-panel
          v-if= "render"
          name="BarChart"
          class="shadow-5"
          style="margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">
            <BarChart />
        </q-tab-panel>
        <q-tab-panel
          v-if= "render"
          name="BarChart1"
          class="shadow-5"
          style="margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">
            <BarChart1 />
        </q-tab-panel>
        <q-tab-panel
          v-if= "render"
          name="BarChart3"
          class="shadow-5"
          style="margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">
            <BarChart3 />
        </q-tab-panel>
        <q-tab-panel
          v-if= "render"
          name="BubbleChart"
          class="shadow-5"
          style="margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">
            <BubbleChart />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </div>
</template>

<script>
  import * as sdata from '../form/seedData.vue'
  import BarChart from '../chart/barTest1.vue'
  import BarChart1 from '../chart/barTest2.vue'
  import BarChart3 from '../chart/barTest3.vue'
  import BubbleChart from '../chart/bubbleTest1.vue'

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

    components: { BarChart, BubbleChart, BarChart1, BarChart3 },

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
