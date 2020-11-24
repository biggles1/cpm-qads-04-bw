<template>
  <q-card :class="colTableClass">
      <!-- ; background-color: red -->
    <q-card-section class="q-pa-xl" :class= "( hideTable == false ) ? 'display: None': 'display: hidden'">
      <!-- Virtual scroll style -->
      <q-table
        virtual-scroll
          :pagination.sync="pagination"
          :rows-per-page-options="[0]"
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
        class="my-sticky-header-table shadow-5"
        :hide-bottom=true

      >
        <template v-slot:top>
          <q-btn icon="view_list" align="left" flat>
            <div class="q-pl-sm">
              Treats
              <q-tooltip content-class="bg-accent">Options</q-tooltip>
            </div>
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
                        <q-icon size='xs' name="send" color="grey-4"/>
                      </template>
                    </q-select>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn-group>
            <div :class="menuAccess">
              <q-btn @click="btnEditMode" icon="edit">
                <q-tooltip content-class="bg-accent">Edit a record</q-tooltip>
              </q-btn>
              <q-btn @click="deleteItem" icon="delete">
                <q-tooltip content-class="bg-accent">Delete a record</q-tooltip>
              </q-btn>
            </div>
            <div>
              <q-btn @click="btnCreateMode" icon="add">
                  <q-tooltip content-class="bg-accent">Add a record</q-tooltip>
              </q-btn>
              <q-btn @click="searchOptionToggle" icon="search">
                <q-tooltip content-class="bg-accent">Search for data</q-tooltip>
              </q-btn>
            </div>
          </q-btn-group>

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
                  <q-icon name="search" color="grey-4"/>
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
        <!-- {{ props.selected }} -->
        <template v-slot:body="props">
          <!-- {{ props.selected }} -->
          <q-tr class="cursor-pointer" :props="props" @click="props.selected = !props.selected; onRowClick(props.selected, props)">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
    <q-card-section>
      <!-- menuAccess {{ menuAccess }} <br/>
      recId {{ recId }} >>> <br/>
      selectedRow {{ selectedRow }} >>> <br/>
      selected {{ selected }} <br/>
      editedIndex {{ editedIndex }} -->
    </q-card-section>
  </q-card>
</template>

<script>
import { mapMutations } from 'vuex'
import drillLevels from '../../store/drillLevels'

export default {
props: {
  formId: {
    type: Number,
    default: 0
  },
  data: Array,
  dataSchema: Object,
  },

  data() {
    return {
      recId: '',
      uuid: 0,
      uuid1: '',
      tableChildrenId: '',
      selectedRow: {},
      // editRow: {},
      selected: [],
      filter: '',
      accept: true,
      tableAccessOption: 'display: hidden',
      tableSearchOption: 'display: hidden',
      addRecordOption: true,
      editRecordOption: true,
      editAccess: 'display: hidden',
      menuAccess: 'display: hidden',
      menuEditToggle: 'display: hidden',
      menuMode: 'menu',
      // dropto: null,
      // editedItem: {},
      drilledDown: 'display: hidden',
      drilledDownDisplay: 'display: hidden',
      drilledOption: null,
      render: true,
      pagination: {
        rowsPerPage: 0
      },
      colTableClass: 'col-xs-12 col-md-6',
      // colEditAccessClass: 'col-xs-12 col-md-6',
      breadcrumb: [],
      editedIndex: -1,
      // data: {},
      hideTable: false,
      visibleColumns: [],
      payload: {},
      editAddLabel: ''
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
    columns() {
      var h1 = Object.keys(this.dataSchema);
      var h2 = [];
      for (var i=0; i < h1.length; i++ ) {
        h2.push(this.dataSchema[h1[i]])
        }
      return h2
      },
    setVisibleColumns() {
      var h1 = Object.keys(this.dataSchema);
      var h2 = [];
      for (var i=0; i < h1.length; i++ ) {
        if (this.dataSchema[h1[i]].defaultVisible) {
          h2.push(h1[i])
          }
        }
      return h2
      },
    },

  methods: {
    ...mapMutations(drillLevels, ['updateBreadCrumb']),
    updateBreadCrumb(id) {
      this.$store.commit('drillLevels/updateBreadCrumb', id)
      },

    onRowClick(selected, props) {
      // console.log('selected: ', selected, 'props: ', JSON.stringify(props));
      // console.log('selected: ', selected, 'props: ', JSON.stringify(props.key));
      // console.log('recId: ', this.recId, 'props: ', props.row.name);
      if (this.recId == props.row.name) {
        this.recId = ''
        this.selectedRow = {}
        this.menuEditToggle = 'display: hidden'
        this.menuAccess= 'display: hidden'
        this.editAccess = 'display: hidden'
        this.colTableClass = 'col-xs-12 col-md-6'
        this.editAddLabel = 'Create new record >>> '
      }
      // else if (this.editAddLabel == 'Create new record >>> ') {
      //     this.editAccess = 'display: hidden'
      // }
      else {
        this.recId = props.row.name
        this.selectedRow = props.row
        this.editItem(this.selectedRow)
        this.render = false
        this.menuAccess= 'display: block'
        this.editAddLabel = 'Editing >>> '
        // console.log('this.selectedRow: ', JSON.stringify(this.selectedRow));
      }

      if (this.recId == '') {
        // this.menuEditToggle = 'display: hidden'
        // this.menuAccess= 'display: hidden'
        // this.editAccess = 'display: hidden'
        // this.colTableClass = 'col-xs-12 col-md-6'
        // this.editAddLabel = 'Create new record >>> '
      } else {
        // this.colTableClass = 'col-xs-12 col-md-4'
        // this.menuEditToggle = 'display: block'
        // this.menuAccess= 'display: block'
        // this.editAddLabel = 'Editing >>> '
      }

      // this.payload = {
      //   menuMode: this.menuMode,
      //   editAccess: this.editAccess,
      //   colTableClass: this.colTableClass,
      //   menuAccess: this.menuAccess,
      //   recId: this.recId,
      //   row: this.selectedRow,
      //   }
      this.assignPayload()
      // console.log('payload 1: ', JSON.stringify(this.payload));
      // console.log('editAdd: ', this.payload.editAddLabel);
      this.$emit('onRowClick', this.payload)
      this.updateBreadCrumb({'idx': this.uuid-1, 'selection': this.recId})
    },

    assignPayload() {
      this.payload = {
      menuMode: this.menuMode,
      editAccess: this.editAccess,
      colTableClass: this.colTableClass,
      menuAccess: this.menuAccess,
      recId: this.recId,
      row: this.selectedRow,
      editAddLabel: this.editAddLabel,
      editedIndex: this.editedIndex,
      }
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
      this.menuMode = 'edit'
      this.colTableClass = 'col-xs-12 col-md-6'
      if (this.recId == '' || !this.recId) {
        this.editAccess = 'display: hidden'
        // this.colTableClass = 'col-xs-12 col-md-6'
      } else {
        // this.colTableClass = 'col-xs-12 col-md-6'
        this.menuAccess = 'display: hidden'
        this.editAccess = 'display: block'
        this.editItem(this.selectedRow)
        // this.editItem(this.selected)
        //this.editedItem = Object.assign({}, this.defaultItem)

        this.editAddLabel = 'Edit >>> '
      }

      // this.payload = {
      //   menuMode: this.menuMode,
      //   editAccess: this.editAccess,
      //   colTableClass: this.colTableClass,
      //   menuAccess: this.menuAccess,
      //   recId: this.recId,
      //   row: this.selectedRow,
      //   }
      this.assignPayload()
      // console.log('editItem: ', this.editedItem);
      // console.log('on edit', JSON.stringify(this.payload));
      this.$emit('onEdit', this.payload)
    },

    btnCreateMode() {
      // console.log('creating 1111111 ');
      this.menuMode = 'edit'
      this.colTableClass = 'col-xs-12 col-md-6'
      this.menuAccess = 'display: hidden'
      this.editAccess = 'display: block'

      this.recId = ''
      this.selectedRow = {}
      this.selected = []
      this.editItem(this.defaultItem)

      this.editAddLabel = 'Add >>> '

      // this.payload = {
      //   menuMode: this.menuMode,
      //   editAccess: this.editAccess,
      //   colTableClass: this.colTableClass,
      //   menuAccess: this.menuAccess,
      //   recId: this.recId,
      //   row: this.selectedRow,
      //   }
      this.assignPayload()
      // console.log('create recId: ', this.recId);
      // console.log('create payload1: ', this.payload.recId);
      // console.log('create payload2: ', JSON.stringify(this.payload));
      // console.log('creating >>>>');
      this.$emit('onCreate', this.payload)
    },

  deleteItem () {
    // confirm('Are you sure you want to delete this item?') && this.data.splice(this.editedIndex, 1);
    this.$q.notify({
      color: 'accent',
      textColor: 'white',
      icon: 'delete_forever',
      message: 'Deleting',
      timeout: 500,
      position: 'left'
    })

    // this.assignPayload()
    // this.$emit('onDelete', this.payload)

    this.data.splice(this.editedIndex, 1);
    this.editedItem = Object.assign({}, this.defaultItem)
    this.editedIndex = -1
    this.recId = ''
    this.menuAccess= 'display: hidden'
    this.editAccess= 'display: hidden'

    this.assignPayload()
    this.$emit('onDelete', this.payload)
    },

    drilledDownToggle () {
      if (this.drilledDown == 'display: hidden') {
        this.drilledDown = 'display: block'
      } else {
        this.drilledDown = 'display: hidden'
      }
    },
    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
  },

  created() {
    this.visibleColumns = this.setVisibleColumns;
    }
}

</script>

<style scoped>

</style>
