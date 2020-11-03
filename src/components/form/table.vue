<template>
  <div>
    <div :id="uuid1" class="row">
      <q-card :class="colTableClass" style="margin: 0px">
        <q-card-section class="q-pa-xs m-pa-xs" style="margin: 0px 0px 0px 0px">
          <q-table
            title="Treats"
            :data="data"
            :columns="columns"
            row-key="name"
            selection="single"
            :selected.sync="selected"
            :filter="filter"
            binary-state-sort
            :visible-columns="visibleColumns"
            :dense="$q.screen.lt.xs"
            @row-click="onRowClick"
            class="my-sticky-column-table shadow-10 q-pa-xs"
          >
            <template v-slot:top>
              <q-btn icon="view_list" align="left" flat class="col-4">
                <div class="q-pl-sm">Treats</div>
                <q-menu>
                  <q-list style="min-width: 200px">
                    <q-separator />

                    <div :class="menuAccess">
                      <q-item-label header>Selections</q-item-label>
                      <q-item clickable v-close-popup @click="btnEditMode">
                        <q-item-section avatar>
                          <q-icon size='xs' name="edit" />
                        </q-item-section>
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="deleteItem">
                        <q-item-section avatar>
                          <q-icon size='xs' name="delete" />
                        </q-item-section>
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                      <q-separator />
                    </div>

                    <q-item-label header>Options</q-item-label>
                      
                    <q-item clickable v-close-popup @click="btnCreateMode">
                      <q-item-section avatar>
                        <q-icon size='xs' name="add" />
                      </q-item-section>
                      <q-item-section>Create</q-item-section>
                    </q-item>
                    
                    <q-item clickable v-close-popup @click="searchOptionToggle">
                      <q-item-section avatar>
                        <q-icon size='xs' name="search" />
                      </q-item-section>
                      <q-item-section>Search</q-item-section>
                    </q-item>

                    <q-item-label header>Format</q-item-label>

                    <q-item clickable>
                      <q-item-section>
                        <q-select
                          v-model="visibleColumns"
                          multiple
                          dense
                          options-dense
                          :display-value="$q.lang.table.columns"
                          emit-value
                          map-options
                          :options="columns"
                          option-value="name"
                          options-cover
                          :visible-columns="visibleColumns"
                        >
                          <template v-slot:prepend>
                            <q-icon size='xs' name="send" color="blue-6"/>
                          </template>
                        </q-select>

                      </q-item-section>

                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>

              <!-- visible options -->
              <q-space />  
              <div :class="tableSearchOption">     
                <q-input 
                  dense 
                  debounce="300" 
                  v-model="filter" 
                  placeholder="Search"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" color="blue-6"/>
                    </template>
                </q-input>
              </div>
            </template>

            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template> 

            <template v-slot:body="props">
              <q-tr class="cursor-pointer" :props="props" @click="props.selected = !props.selected; onRowClick(props.selected, props)">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
            </template>

          </q-table>
        </q-card-section>
      </q-card>
 
      <!-- form edits :class="editAccess" -->
      <q-card class="col-xs-12 col-md-6 p-pa-xs q-pa-xs" :class="editAccess" style="margin: 0px">
        <q-card-section class="q-pa-xs" style="margin: 0px 5px 0px 5px">     
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-pa-xs shadow-1"
            style="padding: 0px"
            rounded-borders
          >
            <q-toolbar style="padding: 0px">
              <q-toolbar-title style="text-align: left">    
                <q-btn flat icon="edit" style="height: 50px; font-size: 12px; min-width: 150px; text-align: left">
                  <div class="q-pa-xs" style="font-size: 12px">
                    {{ recId }} 
                  </div>
                </q-btn>    
              </q-toolbar-title>
              <q-space />   
              <q-btn label="Update" type="submit" icon="save" color="orange-8" flat style="height: 50px; font-size: 12px"/>
              <q-btn label="Undo" type="reset" icon="undo" color="green-8" flat class="q-ml-sm" style="height: 50px; font-size: 12px"/>
            </q-toolbar>

            <q-form-base 
              id="formBaseTable"  
              :value= "editedItem" 
              :schema= "dataSchema" 
              />

          </q-form>
        </q-card-section>
      </q-card>

    <!-- access menus -->
      <q-card id="access-menu" class="col-xs-12 q-pa-x" :class="menuAccess" style="padding: 5px">
        <!-- {{ this.$store.state.test.breadCrumb.length > 4 }} -->
        <!-- {{ this.$store.state.test.breadCrumb }} {{ uuid }} -->
        <q-card-section v-if="uuid > 1">
          <q-breadcrumbs 
            active-color="black" 
            style="font-size: 12px">
              <q-breadcrumbs-el
                v-for="(c, index) in this.$store.state.test.breadCrumb.slice(0,this.uuid-1)" 
                :key="index"
                :label="c" 
                icon="navigation"
                :to="'#table-'+(index+1).toString().padStart(2,'0')"
              />
          </q-breadcrumbs> 
        </q-card-section>
        <q-card-section class="q-pa-xs" style="margin: 0px">     
          <q-form
            class="shadow-0"
          >
            <q-toolbar>
              <q-toolbar-title style="text-align: left">
                <q-btn flat icon="apps" icon-right="arrow_drop_down" style="height: 40px; text-align: left; line-height: 1.7em" class="bg-blue-3">
                  <div class="q-pa-xs" style="font-size: 12px">
                    {{ recId }}
                  </div>
                  <q-menu>
                    <q-list style="min-width: 150px">
                      <q-item clickable v-close-popup @click="drilledOption = 'option1'; render = true">
                        <q-item-section>
                          Next level
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>          
              </q-toolbar-title>
              <!-- <q-space />
              <q-btn color="secondary" icon="navigation" @click="render =! render" />   -->
            </q-toolbar>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <div :id="tableChildrenId" class="row" :class="menuAccess">
      <div class="col-xs-12">
        <q-card class="q-pr-xs" style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">
          <q-card-section style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px">
            <q-tab-panels v-model="drilledOption" animated class="row col-grow" style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">

              <q-tab-panel v-if= "render" name="option1" style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">
                <div class="q-mt-xs text-center" style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px">
                  <q-card>
                    <q-card-section style=" margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; ">
                      <!-- {{ uuid }} -->
                      <CoreTable 
                        :formId = "uuid"
                      >
                      </CoreTable>
                    </q-card-section>
                  </q-card>
                </div>
              </q-tab-panel>

            </q-tab-panels>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </div>
</template>

<script>
import QFormBase from './qFormBase.vue'

import { mapMutations } from 'vuex'
import test from '../../store/test1'
// import Core from './table.vue'

export default {
  components: { QFormBase },
  props: {
    formId: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      recId: '',
      uuid: 0,
      uuid1: '',
      tableChildrenId: '',
      selectedRow: {},
      editRow: {},
      selected: [],
      filter: '',
      accept: true,
      tableAccessOption: 'display: hidden',
      tableSearchOption: 'display: hidden',
      editAccess: 'display: hidden',
      menuAccess: 'display: hidden',
      menuEditToggle: 'display: hidden',
      menuMode: 'menu',
      visibleColumns: [ 'calories', 'protein', 'sodium', 'iron' ],
      dropto: null,
      editedItem: {},
      drilledDown: 'display: hidden',
      drilledDownDisplay: 'display: hidden',
      drilledOption: null,
      render: true,

      colTableClass: 'col-xs-12 col-md-7',
      // colEditAccessClass: 'col-xs-12 col-md-6',

      breadcrumb: [],
      // BC2: this.$store.state.test.breadCrumb.slice(0,this.uuid-1),

      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'bg-blue-2 text-black',
          classes: 'bg-grey-2 ellipsis'
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true, style: 'width: 10px' },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
 
      dataSchema: {
        name: {
          type: 'text',
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'bg-blue-2 text-black',
          classes: 'bg-grey-2 ellipsis',
          defaultValue: ''
          },
        calories: { type: 'text', name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true, defaultValue: 0 },
        fat: { type: 'text', name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true, defaultValue: 0 },
        carbs: { type: 'text', name: 'carbs', label: 'Carbs (g)', field: 'carbs', defaultValue: 0 },
        protein: { type: 'text', name: 'protein', label: 'Protein (g)', field: 'protein', defaultValue: 0 },
        sodium: { type: 'text', name: 'sodium', label: 'Sodium (mg)', field: 'sodium', defaultValue: 0 },
        calcium: { type: 'text', name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, defaultValue: 0, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        iron: { type: 'text', name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, defaultValue: 0, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      },
    
      editedIndex: -1,
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ],
    }
  },

  computed: {

    defaultItem() {
        var h1 = Object.keys(this.dataSchema);
        var h2 = {};         
        for (var i=0; i < h1.length; i++ ) {
            h2[h1[i]] = this.dataSchema[h1[i]].defaultValue;
        }
        return h2
    },
  },

  methods: {
    ...mapMutations(test, ['updateBreadCrumb', 'increment', 'decrement']),

    updateBreadCrumb(id) {
      // console.log('updateBreadCrumb id')
      this.$store.commit('test/updateBreadCrumb', id)
    },

    // increment(payload) {
    //   // console.log('action dispatch')
    //   this.$store.dispatch('test/increment', payload)
    // },
    // decrement(payload) {
    //   this.$store.commit('test/decrement', payload)
    // },

    onRowClick(selected, props) {  

      // this.render =! this.render
      // if (!this.recId == '' && this.recId != props.row.name) {
      //   // console.log('fresh select bait')
      //   // this.render =! this.render
      // }

      if (this.editAccess == "display: hidden" &&  this.menuAccess== "display: hidden") {
        // this.menuMode = "menu"
      }

      if (this.recId == props.row.name) {
        this.recId = ''
        this.selectedRow = {}
      }
      else {
        this.recId = props.row.name
        this.selectedRow = props.row
        this.editItem(this.selectedRow)
        this.render = false
        // this.editRow = this.editItem(this.selectedRow)
        // console.log('editItem: ', this.selectedRow, this.editedItem)
      }

      if (this.recId == '') {
        this.menuEditToggle = 'display: hidden'
        this.menuAccess= 'display: hidden'
        this.editAccess = 'display: hidden'
        this.colTableClass = 'col-xs-12 col-md-8'
      } else {
        // this.colTableClass = 'col-xs-12 col-md-4'
        // this.menuEditToggle = 'display: block'
      }

      if (!this.recId == '') {
          // this.toggleMenuEdit()
          // this.colTableClass = 'col-xs-12 col-md-4'
          this.menuAccess= 'display: block'
      }

      this.updateBreadCrumb({'idx': this.uuid-1, 'selection': this.recId})
      
    },

    searchOptionToggle () {
      if (this.tableSearchOption == 'display: hidden') {
        this.tableSearchOption = 'display: block'
      } else {
        this.tableSearchOption = 'display: hidden'
      }
    },

    btnMenuMode() {
      this.editAccess = 'display: hidden'
      this.editAccessL = false
      this.menuMode = 'menu'

      if (this.recId == '') {
        this.menuEditToggle = 'display: hidden'
        this.menuAccess = 'display: hidden'
      } else {
        this.menuEditToggle = 'display: block'
        this.menuAccess = 'display: block'
      }
    },

    btnEditMode() {
      // console.log('btn edit mode triggered')
      this.menuMode = 'edit'
      if (this.recId == '' || !this.recId) {
        this.editAccess = 'display: hidden'
        this.colTableClass = 'col-xs-12 col-md-6'
      } else {
        this.colTableClass = 'col-xs-12 col-md-6'
        this.editAccess = 'display: block'
        this.menuAccess = 'display: hidden'
      }
      // console.log(this.editAccess, this.recId)
    },

    btnCreateMode() {
      // console.log('btn create mode triggered')
      this.menuAccess= 'display: hidden'
      this.menuMode = 'edit'
      this.recId = ''
      this.editItem(this.defaultItem)
      this.colTableClass = 'col-xs-12 col-md-6'
      this.editAccess = 'display: block'
    },

    drilledDownToggle () {
      if (this.drilledDown == 'display: hidden') {
        this.drilledDown = 'display: block'
      } else {
        this.drilledDown = 'display: hidden'
      }
    },

    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'primary',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Updated'
        })
        if (this.editedIndex > -1) {
          Object.assign(this.data[this.editedIndex], this.editedItem)
          } else {
              this.data.push(this.editedItem)
          }
        }
    },

    onReset () {
      // console.log('reset')
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Resetting'
      })
      if (this.editedIndex > -1) {
        this.editItem(this.selectedRow)
      } else {
        this.editItem(this.defaultItem)
      }
    },

    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem () {
      // console.log('default item: ', this.defaultItem)
      confirm('Are you sure you want to delete this item?') && this.data.splice(this.editedIndex, 1)
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.recId = ''
      // console.log('edited item: ', this.editedItem)
      this.menuAccess= 'display: hidden'
      this.editAccess= 'display: hidden'
      // this.closeEditor
    },

    closeEditor() {
      this.editedItem = Object.assign({}, this.defaultItem)
      // console.log('close edited edit item: ', this.editedItem)
      this.editedIndex = -1
    },

    toggleMenuEdit() {
      if (this.menuMode == 'menu') {
        this.editAccess = 'display: hidden'
      }
      else {
        this.editAccess= 'display: none'
      }
    },

    // removeElement() {  
    // // Removes an element from the document
    //   // var element = document.getElementById(elementId);
    //   // console.log('element: ', element)
    //   // element.parentNode.removeChild(element);
    //   var i
    //   for ( i = this.uuid+2; i < 10; i++ ) {
    //     var e = "table-"+i.toString().padStart(2,'0')
    //     var e1 = "tableChildren-"+i.toString().padStart(2,'0')
    //     console.log('e: ', e, document.getElementById(e), document.getElementById(e1),)
    //     if (document.getElementById(e)) {
    //       document.getElementById(e).remove()
    //     }
    //     if (document.getElementById(e1)) {
    //       document.getElementById(e1).remove()
    //     } 
    //   }
    // }

    // uuidTest() {
    //   return this.formId
    // },

    // BC1() {
    //   return this.$store.state.test.breadCrumb.slice(0,this.uuid-1)
    // }

  },

  calculated: {
  },

  mounted() {
    // console.log('beforeMountedProp: ', this.formId)
    this.uuid = parseInt(this.formId, 10);
    this.uuid += 1
    this.uuid1 = "table-"+this.uuid.toString().padStart(2,'0')
    this.tableChildrenId = "tableChildren-"+this.uuid.toString().padStart(2,'0')
    // console.log('uuid1: ', this.uuid1, this.uuid1.substring(6,8))
  }
}

</script>

<style lang="sass">
  .my-sticky-column-table
      /* specifying max-width so the example can
          highlight the sticky column on any browser window */
      // max-width: 60%

      thead tr:first-child th:first-child
          /* bg color is important for th; just specify one */
          background-color: #fff

      td:first-child
          background-color: #f5f5dc

      th:first-child,
      td:first-child
          position: sticky
          left: 0
          z-index: 1

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