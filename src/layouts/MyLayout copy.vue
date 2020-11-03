<template>
  <q-layout view="hHh lpr fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn 
          dense 
          flat 
          round 
          icon="menu" 
          @click="left = !left" 
        />

        <q-toolbar-title>
          Title
        </q-toolbar-title>
        <!-- {{ left }} {{ right }} -->

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
      side="left" 
      bordered 
      :breakpoint="1200" 
      :width="200"
    >
      <p> hhhhh </p>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer 
      v-model="right" 
      side="right" 
      bordered 
      :breakpoint="1000" 
      :width="400"
    >
      <p> jjjj </p>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
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