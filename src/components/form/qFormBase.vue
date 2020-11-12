<template>
  <div class="row shadow-1 q-pa-sm">
    <template v-for="(obj, index) in flatCombinedArraySorted">
      <q-card
        v-show="!obj.schema.hidden"
        :key="index"
        :class="getClassName(obj)"
      >
        <slot :name="getTypeTopSlot(obj)"></slot>
        <slot :name="getKeyTopSlot(obj)"></slot>
        <!-- slot replaces complete item of defined type -> <div slot="item-slot-[type]>-->
        <slot :name="getTypeItemSlot(obj)">
          <!-- slot replaces complete item of defined key -> <div slot="item-slot-[key]>-->
          <slot :name="getKeyItemSlot(obj)">

            <!-- radio -->
            <template v-if="obj.schema.type === 'radio'">
              <q-option-group
                id="radio-btn"
                type="radio"
                :value="setValue(obj)"
                val="setValue(obj)"
                :options="obj.schema.options"
                @input="onInput($event, obj)"
              ></q-option-group>
            </template>
            <!-- slider -->
            <template v-else-if="obj.schema.type === 'slider'">
              <q-badge :color="obj.schema.color">
                Model: {{ setValue(obj) }} ({{ obj.schema.min }} to
                {{ obj.schema.max }}) {{ obj.schema.color }}
              </q-badge>
              <q-slider
                :value="setValue(obj)"
                :options="obj.schema.options"
                :min="parseInt(obj.schema.min)"
                :max="parseInt(obj.schema.max)"
                @input="onInput($event, obj)"
                :color="obj.schema.color"
              />
            </template>
            <!-- array -->
            <template v-else-if="obj.schema.type === 'array'">
              <div class="col">
                <slot name="ArrayNameTopSlot"> {{ obj.schema.title }} </slot>
                <div
                  v-bind="obj.schema"
                  :value="setValue(obj)"
                  v-for="(item, idx) in setValue(obj)"
                  :key="idx"
                >
                  <slot :name="getKeyArraySlot(obj)" v-bind:item="item">
                    <q-form-base
                      :id="`${id}-${obj.key}-${idx}`"
                      :value="item"
                      :schema="obj.schema.schema"
                      flex="auto"
                    />
                  </slot>
                </div>
              </div>
            </template>
            <!-- Generic date Lookup -->
            <template v-else-if="obj.schema.type === 'dateLookup'">
              <q-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="10px"
              >
                <template v-slot:activator="{ on }">
                  <q-text-field
                    v-bind="obj.schema"
                    :value="setDateValue(obj)"
                    label="Date lookup without buttons"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></q-text-field>
                </template>
                <q-date-picker
                  v-model="dateLookupDefault"
                  @input="dateMenu = false"
                  @change="onInput($event, obj)"
                ></q-date-picker>
              </q-menu>
            </template>
            <!-- Date Text lookup  -->
            <template v-else-if="obj.schema.type === 'dateTextLookup'">
              <div class="q-pa-md">
                <q-input
                  :label="obj.schema.label"
                  filled
                  :value="setValue(obj)"
                  @input="onInput($event, obj)"
                  mask="date"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        @before-show="dateUpdateProxy(obj)"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="proxyDate">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn
                              label="Cancel"
                              color="primary"
                              flat
                              v-close-popup
                            />
                            <q-btn
                              label="OK"
                              color="primary"
                              flat
                              @click="dateProxySave(obj)"
                              v-close-popup
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </template>
            <!-- Time lookup 1  -->
            <template v-else-if="obj.schema.type === 'timeTextLookup'">
              <div class="q-pa-md">
                <q-input
                  filled
                  :value="setValue(obj)"
                  @input="onInput($event, obj)"
                  mask="time"
                  :rules="['time']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        @before-show="timeUpdateProxy(obj)"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="proxyTime">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn
                              label="Cancel"
                              color="primary"
                              flat
                              v-close-popup
                            />
                            <q-btn
                              label="OK"
                              color="primary"
                              flat
                              @click="timeProxySave(obj)"
                              v-close-popup
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </template>
            <!-- treeview -->
            <template v-else-if="obj.schema.type === 'treeview'">
              <div class="q-pa-md q-gutter-sm">
                <q-tree :nodes="setValue(obj)" node-key="label"> </q-tree>
              </div>
            </template>
            <!-- list -->
            <template v-else-if="obj.schema.type === 'list'">
              <div class="row">
                <q-toolbar v-if="obj.schema.label" v-bind="obj.schema" dark>
                  <q-toolbar-title>{{ obj.schema.label }}</q-toolbar-title>
                </q-toolbar>
                <q-list class="col-12" v-bind="obj.schema">
                  <q-item
                    clickable
                    v-for="(item, ix) in setValue(obj)"
                    :key="ix"
                    :class="obj.schema.selected === ix ? 'active' : 'inactive'"
                    @click="
                      obj.schema.selected = ix;
                      onClick($event, obj, 'list', ix);
                    "
                  >
                    <q-item-section>
                      <q-item-label
                        v-text="obj.schema.item ? item[obj.schema.item] : item"
                      ></q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </template>
            <!-- checkbox || switch -->
            <template
              v-else-if="
                obj.schema.type === 'switch' || obj.schema.type === 'checkbox'
              "
            >
              <div class="q-pa-xs">
                <q-checkbox
                  filled
                  left-label
                  :label="obj.schema.label"
                  v-bind="obj.schema"
                  :value="setValue(obj)"
                  @input="onInput($event, obj)"
                >
                </q-checkbox>
              </div>
            </template>
            <!-- file -->
            <template v-else-if="obj.schema.type === 'file'">
              <div class="q-pa-md">
                <div>
                  <q-input
                    @input="
                      val => {
                        file = val[0];
                      }
                    "
                    filled
                    clearable
                    stack-label
                    type="file"
                    hint="File select"
                    :value="setValue(obj)"
                    v-bind="obj.schema"
                    @focus="onFocus($event, obj)"
                    @blur="onBlur($event, obj)"
                    @change="onInput($event, obj)"
                  />
                </div>
              </div>
            </template>
            <!-- btn-toggle -->
            <template v-else-if="obj.schema.type === 'btnToggle'">
              <q-btn-toggle
                :options="[
                  { label: 'One', value: 'one' },
                  { label: 'Two', value: 'two' },
                  { label: 'Three', value: 'three' }
                ]"
                toggle-color="primary"
                :value="setValue(obj)"
                @change="onInput($event, obj)"
                style="shadow-2"
              >
                <!-- <q-btn-toggle
                :options="[
                  {label: 'One', value: 'one'},
                  {label: 'Two', value: 'two'},
                  {label: 'Three', value: 'three'}
                ]"
                toggle-color="primary"
                :value= "setValue(obj)"
                @change= "onInput($event, obj)"
                style="shadow-2"
                > -->

                <!-- <q-btn
                  v-for="(b,ix) in obj.schema.options"
                  v-bind = "obj.schema"
                  :key="ix"
                  :value="sanitizeOptions(b).value"
                >
                  <q-icon :dark="obj.schema.dark">{{sanitizeOptions(b).icon}}</q-icon>
                  {{sanitizeOptions(b).label}}
                </q-btn>
                {{ obj.schema }}
                 :options="[ { 'label': 'A', 'value': '1' }, { 'label': 'B', 'value': '2' } ]"

                -->
              </q-btn-toggle>
            </template>
            <!-- btn   -->
            <template v-else-if="obj.schema.type === 'btn'">
              <q-btn
                v-bind="obj.schema"
                @click="onClick($event, obj, button)"
                style="display: inline-block"
              >
              </q-btn>
            </template>
            <!-- if masked use this v-text-field section - https://vuejs-tips.github.io/vue-the-mask/  -->
            <template v-else-if="obj.schema.mask || obj.schema.type === 'text'">
              <q-input
                v-bind="obj.schema"
                :value="setValue(obj)"
                filled
                @input="onInput($event, obj)"
              ></q-input>
            </template>
            <!-- textArea -->
            <template v-else-if="obj.schema.type === 'textArea'">
              <q-input
                type="textarea"
                v-bind="obj.schema"
                :value="setValue(obj)"
                filled
                @input="onInput($event, obj)"
              ></q-input>
            </template>
            <!-- password -->
            <template v-else-if="obj.schema.type === 'password'">
              <q-input
                v-bind="obj.schema"
                :value="setValue(obj)"
                filled
                :type="isPwd ? 'password' : 'text'"
                :hint="obj.schema.hint"
                :dense="obj.schema.dense"
                counter
                @input="onInput($event, obj)"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </template>
            <!-- email -->
            <template v-else-if="obj.schema.type === 'email'">
              <q-input
                filled
                v-bind="obj.schema"
                :value="setValue(obj)"
                hint="Enter a valid email"
                @input="onInput($event, obj)"
              >
              </q-input>
            </template>
            <!-- select -->
            <template v-else-if="obj.schema.type === 'select'">
              <q-select
                filled
                v-model="obj.value"
                :multiple="obj.schema.multiple"
                use-input
                input-debounce="0"
                :label="obj.schema.label"
                :options="obj.schema.items"
                @input="onInput($event, obj)"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </template>
            <!-- combobox -->
            <template v-else-if="obj.schema.type === 'combobox'">
              <q-select
                filled
                v-model="obj.value"
                :multiple="obj.schema.multiple"
                fill-input
                input-debounce="0"
                :label="obj.schema.label"
                :options="options"
                @input="onInput($event, obj)"
                @filter="
                  (v, u, a) => {
                    filterFn({ v, u, a }, obj.schema.items);
                  }
                "
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </template>
            <!-- autocomplete -->
            <template v-else-if="obj.schema.type === 'autocomplete'">
              <q-select
                filled
                v-model="obj.value"
                :multiple="obj.schema.multiple"
                fill-input
                input-debounce="0"
                use-input
                use-chips
                label-stack
                :label="obj.schema.label"
                :options="options"
                @input="onInput($event, obj)"
                @filter="
                  (v, u, a) => {
                    filterFn({ v, u, a }, obj.schema.items);
                  }
                "
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </template>
            <!-- all other Types -> see typeToComponent -->
            <template v-else>
              <div
                :is="mapTypeToComponent(obj.schema.type)"
                v-bind="obj.schema"
                :value="setValue(obj)"
                @focus="onFocus($event, obj)"
                @blur="onBlur($event, obj)"
                @click:append="onClick($event, obj, append)"
                @click:append-outer="onClick($event, obj, appendOuter)"
                @click:clear="onClick($event, obj, clear)"
                @click:prepend="onClick($event, obj, prepend)"
                @click:prepend-inner="onClick($event, obj, prependInner)"
                @input="onInput($event, obj)"
              >
                {{ obj.value }}
              </div>
            </template>
          </slot>
        </slot>
        <!-- slot at bottom of item  -> <div slot="slot-bottom-key-[deep-nested-key-name]> -->
        <slot :name="getTypeBottomSlot(obj)"></slot>
        <slot :name="getKeyBottomSlot(obj)"></slot>
      </q-card>
      <!-- push next item to the right and fill space between items -->
      <div v-if="obj.schema.spacer" :key="`s-${index}`"></div>
    </template>
  </div>
</template>

<script>
// import & declarations
 /* eslint-disable no-debugger */
import { get, isPlainObject, isFunction, isString } from "lodash";
import { mask } from "vue-the-mask";

const typeToComponent = {
  // use native HTML5 Input Types - https://www.wufoo.com/html5/
  // text: 'v-text-field',
  password: "v-text-field",
  email: "v-text-field",
  tel: "v-text-field",
  url: "v-text-field",
  search: "v-text-field",
  number: "v-text-field",

  text: "q-input",
  radio: "q-radio",
  treeview: "q-tree",
  range: "v-slider",
  slider: "q-slider",
  file: "q-file-input",
  switch: "q-switch",
  checkbox: "q-checkbox",
  color: "q-color",
  date: "q-date",
  time: "q-time",
  dateTextLookup: "q-date",
  datePicker: "q-date",
  datePick: "q-date",
  dPicker: "q-text-field",
  timeTextLookup: "q-time",
  textArea: "q-input",
  btn: "q-btn",
  btnToggle: "q-btn-toggle"
};
// Declaration
// const orderDirection = 'ASC'
const pathDelimiter = ".";
const classKeyDelimiter = "-";
const defaultID = "form-base";

const itemClassAppendix = "item";
const typeClassAppendix = "type";
const keyClassAppendix = "key";
const propertyClassAppendix = "prop";

const arraySlotAppendix = "slot-array";
const topSlotAppendix = "slot-top";
const itemSlotAppendix = "slot-item";
const bottomSlotAppendix = "slot-bottom";

const clear = "clear";
const button = "button";
const treeview = "treeview";
const append = "append";
const appendOuter = "append-outer";
const prepend = "prepend";
const prependInner = "prepend-inner";

const gridSpacing = "q-pa-xs";
const gridSize = "col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2";

export default {
  name: "q-form-base",
  orange: false,

  // Info Mask https://vuejs-tips.github.io/vue-the-mask/
  directives: { mask },

  props: {
    id: {
      type: String,
      default: defaultID
    },
    value: {
      type: [Object, Array, String],
      required: true
    },
    schema: {
      type: [Object, Array],
      required: true
    },
    flex: {
      type: [String],
      required: false
    }
  },

  data() {
    return {
      debugStuff: false,
      debugLevel: 0,
      flatCombinedArray: [],
      clear,
      button,
      treeview,
      append,
      appendOuter,
      prepend,
      prependInner,
      dateMenu: false,
      dateLookupDefault: "",
      timeMenu: false,
      timeLookupDefault: "",
      isPwd: true,
      proxyDate: null,
      proxyTime: null,
      group: "B",
      options: []
    };
  },

  computed: {
    ref() {
      return this.id;
    },
    flatCombinedArraySorted() {
      // debugger
      // debugging
      if(this.debugStuff) {
        console.log('flatCombineArray1: ', JSON.stringify(this.flatCombinedArray1));
      }
      return this.flatCombinedArray1;
    },
    flatCombinedArray1() {
      // debugging
      if(this.debugStuff && this.debugLevel >= 0) {
        console.log('storeStateData: ', JSON.stringify(this.storeStateData));
        console.log('storeStateSchema: ', JSON.stringify(this.storeStateSchema));
        console.log('flatternAndCombineToArray', JSON.stringify(this.flattenAndCombineToArray(
          this.storeStateData,
          this.storeStateSchema
        )));
      }

      return this.flattenAndCombineToArray(
        this.storeStateData,
        this.storeStateSchema
      );
    },
    storeStateData() {
      this.updateArrayFromState(this.value, this.schema);
      return this.value;
    },
    storeStateSchema() {
      this.updateArrayFromState(this.value, this.schema);
      return this.schema;
    },
    gridFormat() {
      if (this.flex) {
        var sflex = "col-".concat(this.flex).concat("${gridSpacing");
        return sflex;
      } else {
        return "${gridSize} ${gridSpacing}";
      }
    }
  },
  methods: {
    // Date methods
    dateUpdateProxy(obj) {
      this.proxyDate = obj.value;
    },
    dateProxySave(obj) {
      this.onInput(this.proxyDate, obj);
    },
    timeUpdateProxy(obj) {
      this.proxyTime = obj.value;
    },
    timeProxySave(obj) {
      this.onInput(this.proxyTime, obj);
    },
    // Selection methods
    // eslint-disable-next-line no-unused-vars
    filterFn({ v, u, abort }, option) {
      setTimeout(() => {
        u(() => {
          const needle = v.toLowerCase();
          this.options = option.filter(
            v => v.toLowerCase().indexOf(needle) !== -1
          );
        });
      }, 100);
    },
    // Generic methods
    mapTypeToComponent(type) {
      return typeToComponent[type] ? typeToComponent[type] : `q-${type}`;
    },
    // KEY SLOTS
    getKeyArraySlot(obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-item'  -> 'slot-ARRAY-key-address-city'
      return this.getKeyClassNameWithAppendix(obj, arraySlotAppendix + "-key");
    },
    getKeyItemSlot(obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-item'  -> 'slot-item-key-address-city'
      return this.getKeyClassNameWithAppendix(obj, itemSlotAppendix + "-key");
    },
    getKeyTopSlot(obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-top'  -> 'slot-top-key-address-city'
      return this.getKeyClassNameWithAppendix(obj, topSlotAppendix + "-key");
    },
    getKeyBottomSlot(obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-bottom'  -> 'slot-bottom-key-address-city'
      return this.getKeyClassNameWithAppendix(obj, bottomSlotAppendix + "-key");
    },
    //
    // TYPE SLOTS
    getTypeItemSlot(obj) {
      // get Type specific slot name  -> 'slot-item-type-radio'
      return this.getTypeClassNameWithAppendix(obj, itemSlotAppendix + "-type");
    },
    getTypeTopSlot(obj) {
      // get Type specific slot name  -> 'slot-top-type-radio'
      return this.getTypeClassNameWithAppendix(obj, topSlotAppendix + "-type");
    },
    getTypeBottomSlot(obj) {
      // get Type specific slot name  -> 'slot-bottom-type-radio'
      return this.getTypeClassNameWithAppendix(
        obj,
        bottomSlotAppendix + "-type"
      );
    },
    //
    // CLASS Names
    getPropertyClassNameWithAppendix(obj, appendix) {
      // get PROP specific name by app-/prepending 'appendix-' and replacing '.' with '-' in nested key path  -> 'controls switch'
      return obj.key
        ? obj.key
            .split(pathDelimiter)
            .map(s => `${appendix ? appendix + classKeyDelimiter : ""}${s}`)
            .join(" ")
        : "";
    },
    getPropertyClassName(obj) {
      return this.getPropertyClassNameWithAppendix(obj, propertyClassAppendix);
    },
    getKeyClassNameWithAppendix(obj, appendix) {
      // get KEY specific name by app-/prepending 'appendix-' and replacing '.' with '-' in nested key path  -> 'top-slot-address-city'
      return `${appendix ? appendix + classKeyDelimiter : ""}${obj.key.replace(
        /\./g,
        "-"
      )}`;
    },
    getKeyClassName(obj) {
      return this.getKeyClassNameWithAppendix(obj, keyClassAppendix);
    },
    getTypeClassNameWithAppendix(obj, appendix) {
      // get TYPE specific class name by prepending '-type' -> 'type-checkbox'
      return `${appendix + classKeyDelimiter}${obj.schema.type}`;
    },
    getTypeClassName(obj) {
      return this.getTypeClassNameWithAppendix(obj, typeClassAppendix);
    },
    getFlexGridClassName(obj) {
      // get FLEX class from schema.flex ->  schema:{ flex:{ xs:12, md:4  } || flex: 4 } // flex: 4 -> is shorthand for -> flex:{ xs:4 }
      const keysToGridClassName = key =>
        Object.keys(key)
          .map(k => `col-${k}-${key[k]}`)
          .join(" "); //  { xs:12, md:6, lg:4  } => 'xs12 md6 lg4'
      return obj.schema.flex
        ? isPlainObject(obj.schema.flex)
          ? keysToGridClassName(obj.schema.flex)
          : `col-xs-${obj.schema.flex}`
        : `${gridSize}`;
    },
    getOffsetGridClassName(obj) {
      // get OFFSET-FLEX class from schema.offset ->  schema:{ offset:{ xs:12, md:4  } || offset: 4 } // offset: 4 -> is shorthand for -> offset:{ xs:4 }
      const keysToOffsetClassName = key =>
        Object.keys(key)
          .map(k => `offset-${k}-${key[k]}`)
          .join(" "); //  { xs:12, md:6, lg:4  } => 'xs12 md6 lg4'
      return obj.schema.offset
        ? isPlainObject(obj.schema.offset)
          ? keysToOffsetClassName(obj.schema.offset)
          : `offset-lg-${obj.schema.offset}`
        : "";
    },
    getOrderGridClassName(obj) {
      // get ORDER-FLEX class from schema.order ->  schema:{ order:{ xs:12, md:4  } || order: 4 } // order: 4 -> is shorthand for -> order:{ xs:4 }
      return obj.schema.order ? `order-${obj.schema.order}` : "";
    },
    getGridClassName(obj) {
      // combine Flex, Offset, Order into a classname
      // return `${this.getFlexGridClassName(obj)} ${this.getOffsetGridClassName(obj)} ${this.getOrderGridClassName(obj)}`
      //order with grid ordering intact - needs reworking with quasar
      // return `${this.getFlexGridClassName(obj)} ${this.getOffsetGridClassName(obj)} ${this.getOrderGridClassName(obj)} ${gridSpacing}`
      return `${this.getFlexGridClassName(obj)} ${this.getOffsetGridClassName(
        obj
      )} ${gridSpacing}`;
    },
    getClassName(obj) {
      // combines all into a single classname
      // class => ie. 'item type-checkbox key-address-zip prop-adress prop-zip xs12 md6 offset-xs0'
      // console.log('getClassName: ',  `${itemClassAppendix} ${this.getTypeClassName(obj)} ${this.getKeyClassName(obj)} ${this.getPropertyClassName(obj)} ${this.getGridClassName(obj)}`)
      return `${itemClassAppendix} ${this.getTypeClassName(
        obj
      )} ${this.getKeyClassName(obj)} ${this.getPropertyClassName(
        obj
      )} ${this.getGridClassName(obj)}`;
    },
    //
    // Map Values coming FROM Control or going TO Control
    toCtrl(params) {
      // manipulate value going to control, toCtrl-function must return a (modified) value
      // schema:{ name: { type:'text', toCtrl: ( {value} ) value && value.toUpperCase, ... }, ... }
      // console.log('ctl function: ', params.obj.schema.toCtrl(params))
      return isFunction(params.obj.schema.toCtrl)
        ? params.obj.schema.toCtrl(params)
        : params.value;
    },
    fromCtrl(params) {
      // manipulate updated value from control, fromCtrl-function must return a (modified) value
      // schema:{ name: { type:'text', fromCtrl: ( {value} ) value && value.toUpperCase, ... }, ... }
      return isFunction(params.obj.schema.fromCtrl)
        ? params.obj.schema.fromCtrl(params)
        : params.value;
    },
    //
    // Button-Toggle sanitize item from array schema.options
    sanitizeOptions(b) {
      return isString(b) ? { value: b, label: b } : b;
    },
    //
    // Set Value
    setValue(obj) {
      // Control gets a Value
      return this.toCtrl({
        value: obj.value,
        obj,
        data: this.storeStateData,
        schema: this.storeStateSchema,
        options: this.storeStateOptions
      });
    },
    setDateValue(obj) {
      // Control gets a Value
      this.dateLookupDefault = obj.value;
      return this.toCtrl({
        value: obj.value,
        obj,
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    //
    // Get Value from Input & other Events
    onInput(value, obj) {
      // console.log("on input: ", value, obj);
      // console.log("this.$parent oninput: ", this.$parent);
      // console.log("this.$parent.parent oninput: ", this.$parent.$parent);
      // console.log('on input: ', value)
      // Value after change in Control
      value = this.fromCtrl({
        value,
        obj,
        data: this.storeStateData,
        schema: this.storeStateSchema
      });

      // harmonize all empty strings to null, because clearable resets to null and not to empty string !!!
      value = value === "" ? null : value;

      // update deep nested prop(key) with value
      this.setObjectByPath(this.storeStateData, obj.key, value);

      this.emitValue("input", {
        on: "input",
        id: this.ref,
        index: this.ref.replace(/\D/g, ""),
        parentId: this.$parent.id,
        key: obj.key,
        value,
        obj,
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    onClick(event, obj, pos, index) {
      this.emitValue("click", {
        on: "click",
        id: this.ref,
        index: index !== undefined ? index : this.ref.replace(/\D/g, ""),
        parentId: this.$parent.id,
        params: { text: event.srcElement && event.srcElement.innerText, pos },
        key: obj.key,
        value: obj.value,
        obj,
        event,
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    onFocus(event, obj) {
      this.emitValue("focus", {
        on: "focus",
        id: this.ref,
        index: this.ref.replace(/\D/g, ""),
        parentId: this.$parent.id,
        key: obj.key,
        value: obj.value,
        obj,
        event,
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    onBlur(event, obj) {
      this.emitValue("blur", {
        on: "blur",
        id: this.ref,
        index: this.ref.replace(/\D/g, ""),
        parentId: this.$parent.id,
        key: obj.key,
        value: obj.value,
        obj,
        event,
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    onSwipe(pos, obj) {
      this.emitValue("swipe", {
        on: "swipe",
        id: this.ref,
        key: obj.key,
        value: obj.value,
        obj,
        params: { pos },
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    onResize() {
      this.emitValue("resize", {
        on: "resize",
        id: this.ref,
        params: { x: window.innerWidth, y: window.innerHeight },
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    //
    // Event Base
    emitValue(emit, val) {
      // console.log('emit: ', emit, 'val: ', val)
      // console.log('parent.id: ', this.$parent.id)
      // console.log('parent.parent.id: ', this.$parent.$parent.id)
      // console.log('getEvent p/p: ', this.getEventGrandParentName(emit))
      if (this.$parent.id) {
        this.$parent.$emit(this.getEventParentName(emit), {
          ...val,
          parent: this.$parent
        });
        if ("inputclick".indexOf(emit) > -1)
          this.$parent.$emit(this.getEventParentName("change"), {
            ...val,
            parent: this.$parent
          });
        this.$parent.$emit(this.getEventParentName("update"), {
          ...val,
          parent: this.$parent
        });
      } else if (this.$parent.$parent.id) {
        this.$parent.$parent.$emit(this.getEventGrandParentName("update"), {
          ...val,
          parent: this.$parent.$parent
        });
        if ("inputclick".indexOf(emit) > -1)
          this.$parent.$parent.$emit(this.getEventParentName("change"), {
            ...val,
            parent: this.$parent.$parent
          });
        this.$emit(this.getEventName("update"), val); // all listen to events

      } else {
        this.$emit(this.getEventName(emit), val); // listen to specific event
        if ("inputclick".indexOf(emit) > -1)
          this.$emit(this.getEventName("change"), val); // listen only to changes
        this.$emit(this.getEventName("update"), val); // all listen to events
      }
    },
    getEventName(eventName) {
      return this.ref !== defaultID ? `${eventName}:${this.ref}` : eventName;
    },
    getEventParentName(eventName) {
      return this.$parent.id !== defaultID
        ? `${eventName}:${this.$parent.id}`
        : eventName;
    },
    getEventGrandParentName(eventName) {
      return this.$parent.$parent.id !== defaultID
        ? `${eventName}:${this.$parent.$parent.id}`
        : eventName;
    },
    //
    // PREPARE ARRAYS DATA & SCHEMA
    setObjectByPath(object, path, value) {
      // resolves chained keys (like 'user.address.street') on an object and set the value
      let pathArray = path.split(pathDelimiter);
      pathArray.forEach((p, ix) => {
        if (ix === pathArray.length - 1) this.$set(object, p, value);
        object = object[p];
      });
    },
    updateArrayFromState(data, schema) {
      this.flatCombinedArray.forEach(obj => {
        obj.value = get(data, obj.key, null); // get - lodash
        obj.schema = get(schema, obj.key, null); // get - lodash
      });
    },
    flattenObjects(dat, sch) {
      let data = {};
      let schema = {};
      Object.keys(dat).forEach(i => {
        if (
          (!Array.isArray(dat[i]) && dat[i] && typeof dat[i] === "object") ||
          (Array.isArray(dat[i]) && Array.isArray(sch[i]))
        ) {
          let { data: flatData, schema: flatSchema } = this.flattenObjects(
            dat[i],
            sch[i]
          );
          Object.keys(flatData).forEach(ii => {
            data[i + pathDelimiter + ii] = flatData[ii];
            schema[i + pathDelimiter + ii] = flatSchema[ii];
          });
        } else {
          data[i] = dat[i];
          schema[i] = sch[i];
        }
      });

      // debugging
      if(this.debugStuff) {
        console.log("flatten objects - schema, data: ", schema, data);
      }

      return { data, schema };
    },
    combineObjectsToArray({ data, schema }) {
      let arr = [];
      Object.keys(data).forEach(key => {
        if (!schema[key]) {
          console.warn(
            `Property '${key}' in Data has no correspondingly Schema Property is not editable and keeps untouched!`
          );
          return;
        }
        if (!isPlainObject(schema[key])) {
          console.warn(
            `Prop '${key}' must have a correspondingly Property in Schema with at least ${key}:{ type:'text'} as value.  Prop '${key}' is not editable and keeps untouched!`
          );
          return;
        }
        arr.push({ key, value: data[key], schema: schema[key] });
      });
      return arr;
    },
    flattenAndCombineToArray(data, schema) {
      // flatten nested structure of both objects 'data' & 'schema' ...
      let flattenedObjects = this.flattenObjects(data, schema);

      // debugging
      if(this.debugStuff) {
        console.log("schema form base: ", schema, data);
      }

      // ... and combine them to an array
      return this.combineObjectsToArray(flattenedObjects);
    }
  },
  created() {
    // debugging
    if(this.debugStuff && this.debugLevel >= 0) {
      // console.log('created ... parent before: ', this.$parent.id, this.$parent.$parent.id)
      // console.log(
      //   "created ... parent before: ",
      //   this.$parent.id,
      //   this.$parent,
      //   this.$parent.$parent.id,
      //   this.$parent.$parent
      // );
    }
    this.flatCombinedArray = this.flattenAndCombineToArray(
      this.storeStateData,
      this.storeStateSchema
    );
    // debugging
    if(this.debugStuff && this.debugLevel >= 0) {
      // console.log('created ... parent after: ', this.$parent.id, this.$parent.$parent.id)
      // console.log('flatCombinedArray .... ', this.flatCombinedArray)
      // console.log('created ... parent 2: ', this.$parent.id)
      // console.log("schema form base: ", schema, data);
    }
  },
  mounted() {
    // debugging
    if(this.debugStuff && this.debugLevel >= 0) {
       // console.log('mounted ... parent before: ', this.$parent.id,
       //this.$parent.$parent.id, this.$parent.$parent.$parent.id, this.$parent.$parent.$parent.$parent.id)
    }
    this.flatCombinedArray = this.flattenAndCombineToArray(
      this.storeStateData,
      this.storeStateSchema
    );
    // debugging
    if(this.debugStuff && this.debugLevel >= 0) {
    // console.log('mounted ... parent after: ', this.$parent.id, this.$parent.$parent.id)
    // console.log('flatCombinedArray .... ', this.flatCombinedArray)
    // console.log('mounted ... parent 1: ', this.$parent.id)
    // this.flatCombinedArray = this.flattenAndCombineToArray(this.storeStateData, this.storeStateSchema)
    }
  },
  beforeUpdate() {
    // debugging
    if(this.debugStuff && this.debugLevel >= 0) {
      // console.log('beforeUpdate ... parent: ', this.$parent.id, this.$parent.$parent.id)
      // this.flatCombinedArray = this.flattenAndCombineToArray(this.storeStateData, this.storeStateSchema)
    }
  },
  afterUpdate() {
    // debugging
    if(this.debugStuff && this.debugLevel >= 0) {
      // console.log('afterUpdate ... parent: ', this.$parent.id, this.$parent.$parent.id)
    }
  }
};
</script>

<style>  /* scoped */
.v-text-field input{
    padding: 8px, 30px, 8px, 30px;
    font-size: 10px
  }

/* .q-textarea .q-field__native .q-input {
  font-size: 24px;
} */

.q-field {
  font-size: 13px;
}

.q-table tbody td {
    font-size: 13px;
}

/* .row {
    margin-right: 30px;
    margin-left: 0px;
  } */
</style>
