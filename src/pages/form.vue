<template>
  <div id="q-form" class="row">
    <q-card class="col-12">
      <q-card-section>
        <q-select 
          filled
          v-model="view"
          :options="items" 
          use-input
          hide-selected
          fill-input
          class="bg-blue-1 shadow-6"
        >
        </q-select>
      </q-card-section>
    </q-card>

    <q-card class="col-12">
      <q-card-section>
        <div>
          <simple v-if="view === items[0]"></simple>
          <async v-if="view === items[1]"></async>
          <css v-if="view === items[2]"></css>
          <deep v-if="view === items[3]"></deep>
          <treeview v-if="view === items[4]"></treeview>
          <selection v-if="view === items[5]"></selection>
          <list v-if="view === items[6]"></list>
          <array v-if="view === items[7]"></array>
          <pickers v-if="view === items[8]"></pickers>
          <partial v-if="view === items[9]"></partial>
          <conditional v-if="view === items[10]"></conditional>
          <complex v-if="view === items[11]"></complex>
          <grid v-if="view === items[12]"></grid>
          <formTable v-if="view === items[13]"></formTable>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="col-12">
      <div class="q-ma-md">
        <q-btn outline size="xs" class="bg-gray-1" label="Typology" @click="typology = !typology"/>
      </div>
      <q-card-section :class=" ( typology == false ) ? 'display: hidden' : 'display: none' ">
        <!-- :style=" ( typology == true ) ? 'display: hidden' : 'display: none' " -->
        <div>
          <div>
            <div v-if="$q.screen.gt.sm">
              <q-toolbar class="bg-blue-1 shadow-1 rounded-borders">
                <q-btn flat label="Typology" />
                <q-space />
                <q-tabs v-model="slide" shrink stretch>
                  <q-tab name="headers" label="Headers" class="text-subheading"/>
                  <q-tab name="subHeaders" label="Subheaders" />
                  <q-tab name="standOuts" label="Standouts" />
                  <q-tab name="attentionSeeking" label="Attention" />
                  <q-tab name="descriptions" label="Descriptions" />
                </q-tabs>
              </q-toolbar>
            </div>

            <div v-if="$q.screen.lt.md">
              <q-toolbar class="bg-blue-1 shadow-1 rounded-borders">
                <q-btn-dropdown auto-close stretch flat label="Typology">          
                  <q-list>
                    <q-item clickable @click="slide= 'headers'">
                      <q-item-section>Headers</q-item-section>
                    </q-item>
                    <q-item clickable @click="slide= 'subHeaders'">
                      <q-item-section>Sub Headers</q-item-section>
                    </q-item>
                    <q-item clickable @click="slide= 'standOuts'">
                      <q-item-section>Stand Outs</q-item-section>
                    </q-item>
                    <q-item clickable @click="slide= 'attentionSeeking'">
                      <q-item-section>Attention Seeking</q-item-section>
                    </q-item>
                    <q-item clickable @click="slide= 'descriptions'">
                      <q-item-section>Descriptions</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-toolbar>
            </div>

            <q-tab-panels v-model="slide" animated style="height: 200px" class="row col-grow shadow-1">
              <q-tab-panel name="headers" class="col-6">
                <div class="q-mt-md text-center">
                  <q-card>
                    <q-card-section>
                      <div class="text-h6">Headers</div>
                      <div class="text-subtitle2">h1 to h6</div>
                    </q-card-section>
                    <q-separator dark inset />
                    <q-card-section>
                      <div class="col-6">
                        <h1 class="bg-pink-1"> h1 -- The quick brown fox ... </h1>
                        <h2 class="bg-pink-2"> h2 -- The quick brown fox ... </h2>
                        <h3 class="bg-pink-3"> h3 -- The quick brown fox ... </h3>
                        <h4 class="bg-pink-4"> h4 -- The quick brown fox ... </h4>
                        <h5 class="bg-pink-5"> h5 -- The quick brown fox ... </h5>
                        <h6 class="bg-pink-6"> h6 -- The quick brown fox ... </h6>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </q-tab-panel>

              <q-tab-panel name="subHeaders">
                <div class="q-mt-md text-center">
                  <q-card>
                    <q-card-section>
                      <div class="text-h6">Subheaders</div>
                      <div class="text-subtitle2">Highlighting and attention seeking</div>
                    </q-card-section>
                    <q-separator dark inset />
                    <q-card-section>
                      <div class="bg-pink-2 shadow-9">
                        <div class="text-subtitle1"> subtitle1 -- The quick brown fox ... </div>
                        <div class="text-subtitle2"> subtitle2 -- The quick brown fox ... </div>
                        <div class="text-body1"> body1 -- The quick brown fox ... </div>
                        <div class="text-body2"> body2 -- The quick brown fox ... </div>
                        <div class="text-overline"> overline -- The quick brown fox ... </div>
                        <div class="text-caption"> caption -- The quick brown fox ... </div>
                        <div class="text-subheading">subheading -- The quick brown fox ... </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </q-tab-panel>

              <q-tab-panel name="standOuts">
                <div class="q-mt-md text-center">
                  <q-card>
                    <q-card-section>
                      <div class="text-h6">Font weights</div>
                      <div class="text-subtitle2">Standouts and dimming</div>
                    </q-card-section>
                    <q-separator dark inset />
                    <q-card-section>
                      <div class="bg-pink-3 shadow-9">
                        <div class="text-weight-thin"> thin -- The quick brown fox ... </div>
                        <div class="text-weight-light"> light -- The quick brown fox ... </div>
                        <div class="text-weight-regular"> regular -- The quick brown fox ... </div>
                        <div class="text-weight-medium"> medium -- The quick brown fox ... </div>
                        <div class="text-weight-bold"> bold -- The quick brown fox ... </div>
                        <div class="text-weight-bolder"> bolder -- The quick brown fox ... </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </q-tab-panel>

              <q-tab-panel name="attentionSeeking">
                <div class="q-mt-md">
                  <q-card>
                    <q-card-section class="text-center"> 
                      <div class="text-h6">Quotes</div>
                      <div class="text-subtitle2">Attention seeking</div>
                    </q-card-section>
                    <q-separator dark inset />
                    <q-card-section>    
                      <div class="bg-pink-4 shadow-9">
                        <div class="quote">
                          quote ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                        </div>
                        <div class="quote text-right">
                          text right ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                        </div>
                        <!-- Blockquotes -->
                        <blockquote>
                          <p>blockquote ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                          <small>small ... Someone famous for <cite title="cite ... Quasar Framework">Quasar Framework</cite></small>
                        </blockquote>
                        <blockquote class="text-right">
                          <p>text-right ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                          <small>small ... Someone famous for <cite title="cite ... Quasar Framework">Quasar Framework</cite></small>
                        </blockquote>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>              
              </q-tab-panel>

              <q-tab-panel name="descriptions">
                <div class="q-mt-md text-center">
                  <q-card>
                    <q-card-section>
                      <div class="text-h6">Descriptions</div>
                      <div class="text-subtitle2">a whole lot of text</div>
                    </q-card-section>
                    <q-separator dark inset />
                    <q-card-section>
                      <div class="bg-pink-5 shadow-9">
                        <dl>
                          <dt>Description lists</dt>
                          <dd>A description list is perfect for defining terms.</dd>
                          <dt>Euismod</dt>
                          <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
                        </dl>
                        <dl class="horizontal">
                          <dt>Description lists</dt>
                          <dd>A description list is perfect for defining terms.</dd>
                          <dt>Euismod</dt>
                          <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
                        </dl>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </q-tab-panel>     
            </q-tab-panels>     
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>


<script>
import async from '../components/form/asyncLoad'
import simple from '../components/form/simple.vue'
import grid from '../components/form/grid.vue'
import css from '../components/form/css.vue'
import deep from '../components/form/deep.vue'
import partial from '../components/form/partial.vue'
import complex from '../components/form/complex.vue'
import array from '../components/form/array.vue'
import selection from '../components/form/selection.vue'
import treeview from '../components/form/treeview.vue'
import conditional from '../components/form/conditional.vue'
import list from '../components/form/list.vue'
import pickers from '../components/form/pickers.vue'
import formTable from '../components/form/table.vue'

const items = ['Simple Form', 'Lazy Loading Component for Async-Data', 'CSS, Slots & Buttons', 'Deep nested Data with Arrays & CSS', 'Treeviews',
  'Select Item(s) from Schema-Array', 'Select Item from Data-Array(List)', 'Edit Item(s) in Data-Array', 'Pickers', 'Partial & Linked', 'Conditional Form', 'Complete Form', 'Use Responsive Grid',
  'Table']

export default {
  name: 'Form',
  components: {
    simple, async, grid, css, deep, partial, complex, treeview, array, selection, conditional, list, pickers, formTable },
  data () {
    return {
      typology: false,
      slide: 'style',
      items,
      view: items[13]
    }
  }
}
</script>

<style>

</style>
