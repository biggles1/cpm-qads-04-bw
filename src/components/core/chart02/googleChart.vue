<template>
  <q-btn-dropdown flat class="q-ma-xs bg-grey-4" label="Google Charts">
      <q-list style="min-width: 150px" class="q-ma-xs bg-grey-1">
        <q-item
          clickable
          v-close-popup
          @click="drilledOption = 'bar01'"
          render = true;
          hideTable = true
          >
            <q-item-section>
              <q-item-label>
                Bars
              </q-item-label>
            </q-item-section>
        </q-item>
        <q-item
          clickable
          v-close-popup
          @click="drilledOption = 'column01'"
          render = true;
          hideTable = true
          >
            <q-item-section>
              <q-item-label>
                Columns
              </q-item-label>
            </q-item-section>
        </q-item>
        <q-item
          clickable
          v-close-popup
          @click="drilledOption = 'line01'"
          render = true;
          hideTable = true
          >
            <q-item-section>
              <q-item-label>
                Lines
              </q-item-label>
            </q-item-section>
        </q-item>
        <q-item
          clickable
          v-close-popup
          @click="drilledOption = 'bubble01'"
          render = true;
          hideTable = true
          >
            <q-item-section>
              <q-item-label>
                Bubbles
              </q-item-label>
            </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          @click="drilledOption = 'column02'"
          render = true;
          hideTable = true
          >
            <q-item-section>
              <q-item-label>
                Columns 2
              </q-item-label>
            </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          @click="drilledOption = 'pie01'"
          render = true;
          hideTable = true
          >
            <q-item-section>
              <q-item-label>
                Pie
              </q-item-label>
            </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          @click="drilledOption = 'area01'"
          render = true;
          hideTable = true
          >
            <q-item-section>
              <q-item-label>
                Area
              </q-item-label>
            </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          @click="drilledOption = 'bubble02'"
          render = true;
          hideTable = true
          >
            <q-item-section>
              <q-item-label>
                Bubbles 2
              </q-item-label>
            </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          @click="drilledOption = 'combination01'"
          render = true;
          hideTable = true
          >
            <q-item-section>
              <q-item-label>
                Combinations
              </q-item-label>
            </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          @click="drilledOption = 'pie02'"
          render = true;
          hideTable = true
          >
            <q-item-section>
              <q-item-label>
                Pie 2
              </q-item-label>
            </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          @click="drilledOption = 'scatter01'"
          render = true;
          hideTable = true
          >
            <q-item-section>
              <q-item-label>
                Scatter
              </q-item-label>
            </q-item-section>

        </q-item>

      </q-list>
  </q-btn-dropdown>
</template>

<script>
export default {

}
</script>

<style>

</style>
