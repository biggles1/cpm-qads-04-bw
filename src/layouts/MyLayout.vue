<template>
  <div id="q-app">
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-grey-7">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="left = !left"
          />
          <q-toolbar-title>
            cPm
          </q-toolbar-title>
          <div>alpha Quasar v{{ $q.version }}</div>
          <q-btn
          dense
          flat
          round
          icon="menu"
          @click="right = !right"
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
      <q-page-container style="padding-top: 50px">
        <q-page>
          <router-view/>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      left: false,
      right: false
    }
  },

  methods: {
  },
  computed: {
  }
}

</script>

<style lang="sass">
</style>

<style>
</style>
