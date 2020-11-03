<template>
  <div id="q-app">
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-blue-8">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="left = !left, increment(10)"
          />

          <q-toolbar-title>
            Quasar Generator Test Application
          </q-toolbar-title>
<!--
          <q-btn
            dense
            flat
            round
            icon="edit"
            @click="toggleSideBar({ update: { left: !left }})"
          >
          </q-btn> -->

          <!-- <div>
            {{ sideBar.left }}
            {{ sideBar.right }}
          </div> -->

          <!-- <div style="margin-right: 20px">
            {{ $store.state.test.counter }}
          </div> -->

          <div>Quasar v{{ $q.version }}</div>

           <q-btn
            dense
            flat
            round
            icon="menu"
            @click="right = !right, decrement(10)"
            />

        </q-toolbar>
      </q-header>

      <q-drawer
          v-model="left"
          :width="200"
          side="left"
          bordered
          :breakpoint="800"
      >
        <q-scroll-area class="fit">
          <q-list>

            <q-item clickable v-ripple tag="a" href="#">
              <q-item-section>Root Node</q-item-section>
            </q-item>
            <q-item clickable v-ripple tag="a" href="#">
              <q-item-section>Dropdown</q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-drawer
        v-model="right"
        :width="500"
        side="right"
        bordered
        :breakpoint="1500"
      >
        <q-scroll-area class="fit">
          <q-list>
            <q-item clickable v-ripple tag="a" href="#">
              <q-item-section>Root Node</q-item-section>
            </q-item>
            <q-item clickable v-ripple tag="a" href="#">
              <q-item-section>Dropdown</q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container style="padding-top: 20px">
        <q-page>
          <!-- {{ rightSideBar }} -->
          <router-view/>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
// import { mapGetters, mapActions, mapState } from 'vuex'
import { mapMutations } from 'vuex'
import test from '../store/test1'

export default {

  name: 'MyLayout',

  data () {
    return {
      // drawerState: false,
      // ...mapState(test, ['counter']),
      // counter: this.$store.counter,
      left: false,
      right: false
    }
  },

  methods: {
    // ...mapActions('test', ['toggleSideBar', 'toggleLeftSideBar', 'toggle']),
    // // ...mapActions('test', ['toggleRightSideBar', 'toggleSideBar', 'toggleLeftSideBar'])
    // clickLeftSideBarLocal() {
    //   console.log('clicked')
    //   this.toggleLeftSideBar(this.left)
    // }
    // ...mapActions(test, ['increment', 'decrement']),
    ...mapMutations(test, ['increment', 'decrement']),
    increment(payload) {
      console.log('action dispatch')
      this.$store.commit('test/increment', payload)
    },
    decrement(payload) {
      this.$store.commit('test/decrement', payload)
    }
  },

  computed: {
    // rightSideBar() {
    //   return this.$store.getters['rightSideBar']
    // }
    // ...mapState('test', ['counter'])
    // // ...mapGetters('test', ['rightSideBar', 'sideBar']),

    // left: {
    //   get () {
    //     console.log('getting sidebar left', this.sideBar.left)
    //     return this.sideBar.left
    //   },
    //   set(value) {
    //     console.log('setting sidebar left 1', value)
    //     this.$store.commit('test/toggleLeft', value)
    //     console.log('setting sidebar left 2', value)
    //     console.log('left: ', this.left)
    //   }
    // },

      // counter1() {
      //   console.log('counter get: ', this.$store.state.test.counter)
      //   return this.$store.state.test.counter
      // }

    // right: {
    //   get () {
    //     console.log('getting sidebar right', this.sideBar.right)
    //     return this.sideBar.right
    //   },
    //   set(value) {
    //     console.log('setting sidebar right 1', value)
    //     this.$store.commit('test/toggleRight', value)
    //     console.log('setting sidebar right 2', value)
    //   }
    // }

    // drawerState: {
    //   get () {
    //     console.log('drawerState ===')
    //     console.log(this.$store.state.showcase.drawerState)
    //     return this.$store.state.showcase.drawerState
    //   },
    //   set (val) {
    //     console.log('val: ', val)
    //     this.$store.commit('showcase/updateDrawerState', val)
    //   }
    // }

    // drawToggle () {
    //   console.log('initial drawer state: ', this.drawerState)
    //   drawState(false)

    //   this.drawerState = false

    //   }
      // return this.drawerState =! this.drawerState
      // console.log('changed drawer state: ', this.drawerState)



    // counterState: {
    //   get () {
    //     return this.$store.state.showcase.counter
    //   }
    // }
  }
}

</script>

<style lang="sass">

</style>

<style>

</style>
