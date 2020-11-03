<template>
  <div>
    <div id="q-app">
      <layout>
      </layout>
    </div>
  </div>
</template>

<script>
import layout from './layouts/MyLayout'
// Setup the custom Brand colours
import { colors } from 'quasar'

colors.setBrand('listheadertoolbar', '#31CCEC')

export default {
  name: 'App',
  components: { layout }
}
</script>

<style>

</style>
