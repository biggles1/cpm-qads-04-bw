<template>
  <div id="q-app">
    <q-layout view="hHh LpR fFf" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-blue-8">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            @click="left = !left"
          />

          <q-toolbar-title>
            Quasar GenTest Application
          </q-toolbar-title>

          <div>Quasar v{{ $q.version }}</div>

        </q-toolbar>
      </q-header>

      <q-drawer
        show-if-above
        v-model="left"
        side="left"
        bordered  
      >
        <!-- <q-scroll-area class="fit">
          <q-list>

            <q-item clickable v-ripple tag="a" href="#">
              <q-item-section>Root Node</q-item-section>
            </q-item>
            <q-item clickable v-ripple tag="a" href="#">
              <q-item-section>Dropdown</q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area> -->

      </q-drawer>

      <q-page-container style="padding-top: 20px">
        <q-page>
          <router-view/>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      right: false
    }
  }
}
</script>


<style>

</style>
