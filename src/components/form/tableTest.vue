<template>
  <div class="row">
    <q-card class="col-xs-12 col-md-6" style="margin: 0px">
      <q-card-section class="q-pa-xs m-pa-xs" style="margin: 0px 5px 0px 5px">
        <q-table
          title="Treats"
          :data="data"
          :columns="columns"
          row-key="name"
          :filter="filter"
          binary-state-sort
          :visible-columns="visibleColumns"
          :dense="$q.screen.lt.xs"
          @row-click="onRowClick"
          class="my-sticky-column-table shadow-10 q-pa-xs"
        >
          <template v-slot:top>
            <q-btn icon="view_list" align="left" flat class="col-2">
              <div>Treats</div>
              <q-menu>
                <q-list style="min-width: 150px">
                  <q-separator />
                  <q-item-label header>Selections</q-item-label>

                  <q-item clickable v-close-popup @click="btnMenuMode">
                    <q-item-section avatar>
                      <q-icon name="apps" />
                    </q-item-section>
                    <q-item-section>
                        Drill down
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="btnEditMode">
                    <q-item-section avatar>
                      <q-icon name="edit" />
                    </q-item-section>
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-separator />

                  <q-item-label header>Table Options</q-item-label>

                  <q-item clickable v-close-popup @click="btnEditMode">
                    <q-item-section avatar>
                      <q-icon name="add" />
                    </q-item-section>
                    <q-item-section>Create</q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section avatar>
                      <q-icon name="search" />
                    </q-item-section>
                    <q-item-section>Search</q-item-section>
                  </q-item>

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
                          <q-icon name="send" color="blue-6"/>
                        </template>
                      </q-select>

                    </q-item-section>

                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-toggle
              v-model="tableAccessOption"
              color="blue-5"
              false-value="hidden"
              true-value=" none"
            >
              <q-tooltip>
                Search and column options
              </q-tooltip>
            </q-toggle>

            <!-- menu or editing -->
            <q-toggle
              v-model="menuMode"
              color="pink-5"
              false-value="menu"
              true-value="edit"
              @input="toggleMenuEdit"
              :class="menuEditToggle"
              checked-icon="edit"
              unchecked-icon="apps"
            >
              <q-tooltip>
                Drill down menu access
              </q-tooltip>

            </q-toggle>

            <q-space />

            <!-- visible options -->
            <div :class="tableAccessOption">
              <div class="row">
                <q-input
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                  class="q-px-md col-sm-6 col-xs-12">
                    <template v-slot:prepend>
                      <q-icon name="search" color="blue-6"/>
                    </template>
                </q-input>
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
                  class="q-px-md col-sm-6 col-xs-12"
                >
                  <template v-slot:prepend>
                    <q-icon name="send" color="blue-6"/>
                  </template>
                </q-select>
              </div>
            </div>
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
            <q-toolbar-title>
              <q-btn flat icon="edit" style="height: 50px; font-size: 12px; min-width: 150px">
                <div class="q-pa-xs" style="font-size: 12px">
                  {{ recId }}
                </div>
                <!-- <q-chip color="primary" icon="edit">Editing</q-chip> -->
                <q-menu>
                  <q-list style="min-width: 150px">
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        Component 1
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        Component 2
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        Component 3
                      </q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>
                        Component 4
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>

              </q-btn>
            </q-toolbar-title>
            <q-space />
            <q-btn label="Update" type="submit" icon="save" color="orange-8" flat style="height: 50px; font-size: 12px"/>
            <q-btn label="Undo" type="reset" icon="undo" color="green-8" flat class="q-ml-sm" style="height: 50px; font-size: 12px"/>
            <q-btn label="Delete" type="delete" icon="delete" color="red-8" flat class="q-ml-sm" style="height: 50px; font-size: 12px"/>
          </q-toolbar>

          <q-form-base
            id="formBaseTable"
            :value= "selectedRow"
            :schema= "dataSchema"
            />

        </q-form>
        <!-- @update:formBaseTable= "update"  -->
          <!-- {{ selectedRow }}
          <q-separator />
          {{ dataSchema }}
          <q-separator />
          {{ editAccess }} -->
      </q-card-section>
    </q-card>

  <!-- access menus -->
    <q-card rounded-borders class="col-xs-12 col-md-6 q-pa-xs" :class="menuAccess" style="margin: 0px">
      <q-card-section class="q-pa-xs" style="margin: 0px">
        <q-form
          class="shadow-1"
          rounded-borders
        >
          <q-toolbar>
            <q-toolbar-title style="min-width: 150px">
              <q-btn flat icon="apps" icon-right="arrow_drop_down" style="height: 50px">
                <div class="q-pa-xs" style="font-size: 12px">
                  {{ recId }}
                </div>

                <q-menu>
                  <q-list style="min-width: 150px">
                    <q-item clickable v-close-popup @click="drilledDownToggle">
                      <q-item-section>
                        Next table
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="dropTo= 'item2'">
                      <q-item-section>
                        Table 2
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>

              </q-btn>
            </q-toolbar-title>
            <!-- <q-space /> -->

            <q-btn flat label="Link" icon="arrow_drop_down" style="font-size: 12px; height: 50px"/>
            <q-btn flat label="Link" icon="arrow_drop_down" style="font-size: 12px; height: 50px"/>

            <q-btn-dropdown flat label="Dropdown" icon="account_tree" style="font-size: 12px; height: 50px">
              <q-list>
                <q-item-label header>Folders</q-item-label>
                <q-item v-for="n in 1" :key="`x.${n}`" clickable v-close-popup tabindex="0">
                  <q-item-section avatar>
                    <q-avatar icon="folder" color="secondary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Photos</q-item-label>
                    <q-item-label caption>February 22, 2016</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="info" />
                  </q-item-section>
                </q-item>
                <q-separator inset spaced />
                <q-item-label header>Files</q-item-label>
                <q-item v-for="n in 1" :key="`y.${n}`" clickable v-close-popup tabindex="0">
                  <q-item-section avatar>
                    <q-avatar icon="assignment" color="primary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Vacation</q-item-label>
                    <q-item-label caption>February 22, 2016</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="info" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

          </q-toolbar>
        </q-form>

      </q-card-section>
    </q-card>

    <!-- {{ drilledDown }}
    <div>
      <q-card class="col-12">
        <q-card-section class=" q-pa-xs shadow-2">
          <div class="drilledDown">
            <core></core>
          </div>
        </q-card-section>
      </q-card>
    </div> -->

  </div>
</template>

<script>
import QFormBase from './qFormBase.vue'
// import Core from './tableTest.vue'

export default {
  components: { QFormBase },

  data () {
    return {
      recId: '',
      selectedRow: {},
      filter: '',
      accept: false,
      tableAccessOption: 'display: hidden',
      editAccess: 'display: hidden',
      editAccessL: false,
      menuAccess: 'display: hidden',
      menuAccessL: false,
      menuEditToggle: 'display: hidden',
      menuMode: 'menu',
      visibleColumns: [ 'calories', 'protein', 'sodium', 'iron' ],
      dropto: null,

      editedItem: null,
      editedIndex: null,
      dialog: null,
      drilledDown: 'display: hidden',

      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'bg-grey-2 text-black',
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
          headerClasses: 'bg-grey-2 text-black',
          classes: 'bg-grey-2 ellipsis'
          },
        calories: { type: 'text', name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        fat: { type: 'text', name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        carbs: { type: 'text', name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        protein: { type: 'text', name: 'protein', label: 'Protein (g)', field: 'protein' },
        sodium: { type: 'text', name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        calcium: { type: 'text', name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        iron: { type: 'text', name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      },

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

  methods: {
    onRowClick(event, row) {
      // console.log("row clicked on ....")
      // console.log("event: ", event)
      // console.log("row: ", row.name)

      if (this.editAccess == "display: hidden" &&  this.menuAccess== "display: hidden") {
        this.menuMode = "menu"
      }
      if (this.recId == row.name) {
        this.recId = ''
        this.selectedRow = {}
      }
      else {
        this.recId = row.name
        this.selectedRow = row
        }

      if (this.recId == '') {
        this.menuEditToggle = 'display: hidden'
        this.menuAccess= 'display: hidden'
        this.menuAccessL= false
        this.editAccess = 'display: hidden'
        this.editAccessL= false
      } else {
        this.menuEditToggle = 'display: none'
      }

      if (!this.recId == '') {
          this.toggleMenuEdit()
      }

      console.log('row: ', row)
      console.log('selected row: ', this.selectedRow)
      console.log('schema: ', this.dataSchema)

    },

    btnMenuMode() {
      this.editAccess = 'display: hidden'
      this.editAccessL = false
      this.menuMode = 'menu'

      if (this.recId == '') {
        this.menuEditToggle = 'display: hidden'
        this.menuAccess = 'display: hidden'
      } else {
        this.menuEditToggle = 'display: none'
        this.menuAccess = 'display: none'
      }
    },

    btnEditMode() {
      console.log('btn edit mode triggered')
      this.menuAccess= 'display: hidden'
      this.menuAccessL= false
      this.menuMode = 'edit'
      if (this.recId == '' || !this.recId) {
        this.editAccess = 'display: hidden'
        this.editAccessL= false
      } else {
        this.editAccess = 'display: none'
        this.editAccessL= true
      }
      console.log(this.editAccess, this.recId)
    },

    drilledDownToggle () {
      if (this.drilledDown == 'display: hidden') {
        this.drilledDown = 'display: none'
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
          message: 'Submitted'
        })
      }
    },

    update () {
      console.log('updating triggered .....')
    },

    onReset () {
    },

    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log("edited item: ", this.editedItem)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.data.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.data.splice(index, 1)
    },

    toggleMenuEdit() {
      if (this.menuMode == 'menu') {
        this.editAccess = 'display: hidden'
        this.menuAccess= 'display: none'
        this.menuAccessL= true
        console.log('menu')
      }
      else {
        this.editAccess= 'display: none'
        this.editAccessL= true
        this.menuAccess= 'display: hidden'
        this.menuAccessL= false
        console.log('edit')

      }
    }
  }

  // created () {
  //   this.mdiAbTesting = mdiAbTesting
  // }
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
</style>
