<template>
  <div id="MainCore">
    <div :id="uuid1" class="row">
      <!-- table scan -->
      <TableScan
        :formId="formId"
        :data="data"
        :dataSchema="dataSchema"
        @onEdit="onEdit"
        @onCreate="onCreate"
        @onDelete="onDelete"
        @onRowClick="onRowClick"
      >
      </TableScan>
      <!-- form edits :class="editAccess" -->
      <template>
        <q-card class="col-xs-12 col-lg-6" :class="editAccess">
          <EditAdd
            :editedItem=this.editedItem
            :editedIndex=this.editedIndex
            :recId=this.recId
            :dataSchema=this.dataSchema
            :editAddLabel=this.editAddLabel
            @onEdit="onEditSave"
            @onCreate="onCreateSave"
          >
          </EditAdd>
        </q-card>
      </template>

    <!-- access menus -->
    <template>
      <q-card id="access-menu" class="col-xs-12" :class="menuAccess">
        <Access
          :uuid=this.uuid
          :recId=this.recId
          >
        </Access>
      </q-card>
    </template>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import drillLevels from '../../store/drillLevels'
  import * as sdata from '../form/seedData.vue'
  import TableScan from './table02'
  import EditAdd from './edit02'
  import Access from './access02'

  export default {
    components: { TableScan, EditAdd, Access },
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
        filter: '',
        accept: true,
        tableAccessOption: 'display: hidden',
        tableSearchOption: 'display: hidden',
        editAccess: 'display: hidden',
        menuAccess: 'display: hidden',
        menuEditToggle: 'display: hidden',
        menuMode: 'menu',
        dropto: null,
        editedItem: {},
        editedItemBase: {},
        drilledDown: 'display: hidden',
        drilledDownDisplay: 'display: hidden',
        drilledOption: null,
        render: true,
        pagination: {
          rowsPerPage: 0
        },
        colTableClass: 'col-xs-12 col-lg-6',
        breadcrumb: [],
        editedIndex: -1,
        data: {},
        hideTable: false,
        editAddLabel: '',
        createForm: true,
      }
    },

    computed: {
      dataSchema() { return sdata.default.dataSchema },
    },

    methods: {
      ...mapMutations(drillLevels, ['updateBreadCrumb']),

      updateBreadCrumb(id) {
        this.$store.commit('drillLevels/updateBreadCrumb', id)
      },

      onRowClick(payload) {
        this.extractPayload(payload)
        if (this.recId == '') {
          this.menuEditToggle = 'display: hidden'
          this.menuAccess= 'display: hidden'
          this.editAccess = 'display: hidden'
          this.colTableClass = 'col-xs-12 col-lg-6'
        } else {
          this.menuAccess= 'display: block'
        }
        this.updateBreadCrumb({'idx': this.uuid-1, 'selection': this.recId})
      },

      onEdit(payload) {
        this.extractPayload(payload)
        this.menuAccess = 'display: hidden'
        this.menuMode = 'edit'
        this.colTableClass = 'col-xs-12 col-lg-6'
        this.editAccess = 'display: block'
      },

      onEditSave(payload) {
        this.extractPayload(payload)
        this.save()
      },

      onCreate(payload) {
        this.extractPayload(payload)
        this.menuMode = 'edit'
        this.recId = ''
        this.colTableClass = 'col-xs-12 col-lg-6'
        this.editAccess = 'display: block'
      },

      onCreateSave(payload) {
        this.extractPayload(payload)
        this.save()
        this.editItem(this.defaultItem)
      },

      extractPayload(payload) {
        if (payload.menuMode) this.menuMode = payload.menuMode
        if (payload.menuAccess) this.menuAccess = payload.menuAccess
        if (payload.colTableClass) this.colTableClass = payload.colTableClass
        if (payload.editAccess) this.editAccess = payload.editAccess
        this.recId = payload.recId
        if (payload.row) this.editedItem = payload.row
        if (payload.editedIndex) this.editedIndex = payload.editedIndex
        if (payload.editAddLabel) this.editAddLabel = payload.editAddLabel
        if (payload.createForm) this.createForm = payload.createForm
      },

      onDelete(payload) {
        this.extractPayload(payload)
        this.deleteItem()
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
        this.menuMode = 'menu'
        if (this.recId == '') {
          this.menuEditToggle = 'display: hidden'
          this.menuAccess = 'display: hidden'
        } else {
          this.menuEditToggle = 'display: block'
          this.menuAccess = 'display: block'
        }
      },

      drilledDownToggle () {
        if (this.drilledDown == 'display: hidden') {
          this.drilledDown = 'display: block'
        } else {
          this.drilledDown = 'display: hidden'
        }
      },

      onSubmit () {
        this.$q.notify({
          color: 'accent',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Updated',
          position: 'center',
          timeout: 500,
          })
        this.save()
        },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.data[this.editedIndex], this.editedItem)
          }
        else {
          this.data.push(this.editedItem)
        }
      },

      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        // console.log('create: ', item);
      },

      deleteItem () {
        this.$q.notify({
          color: 'accent',
          textColor: 'white',
          icon: 'delete_forever',
          message: 'Deleting',
          timeout: 500,
          position: 'center'
        })
        this.data.splice(this.editedIndex, 1);
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.recId = ''
        this.menuAccess= 'display: hidden'
        this.editAccess= 'display: hidden'
      },

      closeEditor() {
        this.editedItem = Object.assign({}, this.defaultItem)
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

      iconAddEdit() {
        return this.createForm ? 'add' : 'edit'
      },

      saveLabel() {
        return this.createForm ? 'save' : 'update'
      }
    },

    mounted() {
      this.uuid = this.formId
      this.uuid += 1
      this.uuid1 = "table-"+this.uuid.toString().padStart(2,'0')
    },

    created() {
      this.data = JSON.parse(JSON.stringify(sdata.default.recordData))
      this.tableAccessOption = 'display: hidden',
      this.tableSearchOption = 'display: hidden',
      this.editAccess = 'display: hidden',
      this.menuAccess = 'display: hidden',
      this.menuEditToggle = 'display: hidden'
    },
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
