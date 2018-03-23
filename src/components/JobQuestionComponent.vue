<template>
  <div class="input-wrapper m-b:1">
      <div class="input-field" v-if="question.attributes['question-type'] === 'Text' && question.attributes['single-line']">
          <input v-model="question.value" type="text" :placeholder="question.attributes.title" class="hiq-style" :class="{invalid:question.isDirty && !question.isValid}">
      </div>
      <div class="input-field" v-else-if="question.attributes['question-type'] === 'Text' && !question.attributes['single-line']">
          <textarea v-model="question.value" cols="30" rows="10" :placeholder="question.attributes.title" class="hiq-style" :class="{invalid:question.isDirty && !question.isValid}"></textarea>
      </div>
      <div class="input-field" v-else-if="question.attributes['question-type'] === 'Boolean'">
          <label :for="question.id" class="c:white">{{ question.attributes.title }}</label>
          <input v-model="question.value" :id="question.id" type="checkbox" class="hiq-style show-for-sr" :class="{invalid:question.isDirty && !question.isValid}">
          <label :for="question.id"></label>
      </div>
      <div class="input-field" v-else-if="question.attributes['question-type'] === 'Range'">
          <label class="c:white">{{ question.attributes.title }}</label>
          <range-slider class="hiq-style" :min="question.attributes['start-with']" :max="question.attributes['end-with']" v-model="question.value" :class="{invalid:question.isDirty && !question.isValid}"></range-slider>
      </div>
      <div class="input-field" v-else-if="question.attributes['question-type'] === 'Choice'">
          <label class="c:white" :for="question.id">{{ question.attributes.title }}</label>
          <select :id="question.id" multiple v-model="question.value" v-if="question.attributes.multiple" class="hiq-style" :class="{invalid:question.isDirty && !question.isValid}">
              <option v-for="option in question.attributes.alternatives" :value="option.id" :key="option.id">{{ option.title }}</option>
          </select>
          <select :id="question.id" v-model="question.value" v-else class="hiq-style" :class="{invalid:question.isDirty && !question.isValid}">
              <option v-for="option in question.attributes.alternatives" :value="option.id" :key="option.id">{{ option.title }}</option>
          </select>
      </div>
      <div class="input-field" v-else>
          <span>{{question.attributes['question-type']}}</span>
      </div>
  </div>
</template>
<script>
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
    name: 'JobQuestion',
    props: ['question'],
    created(){
        switch(this.question.attributes['question-type']){
            case 'Choice': this.question.valueName = 'choices'; this.question.value = []; break;
            case 'Range': this.question.valueName = 'range'; break;
            case 'Boolean': this.question.valueName = 'boolean'; break;
            case 'Text': this.question.valueName = 'text'; break;
            default: break;
        }
    },
    watch: {
        question: {
            handler(newValue){
                this.question.isDirty = this.question.isDirty || newValue.value.length > 0 || typeof newValue.value === 'boolean';
                this.question.isValid = typeof newValue.value === 'number' ? newValue.value > -1 : typeof newValue.value === 'boolean' ? newValue.valueName||true : newValue.value.length > 0;
            },
            deep: true
        },
    },
    components: {
        RangeSlider
    }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

.range-slider.hiq-style {
    width: 100%;
    height: 2.25rem;
    padding: 0;

    .range-slider-fill,
    .range-slider-rail {
        height: 1.25rem;
        background: $gray-light;
    }
    .range-slider-fill {
        background: $green;
    }
    .range-slider-knob {
        height: 2.25rem;
        width: 2.25rem;

        border: 0;
        background: $pink;
        box-shadow: 2px 2px $pink-dark;
        
        z-index: 2;

        $triangleWidth: 16px;

        &.draging,
        &:hover {
            &::after,
            &::before {
                transition: top .2s linear .2s, opacity .2s linear .1s, background-color .2s linear;
            }
            &::after {
                top: calc(-75% - #{$triangleWidth});
                background-color: $pink;
            }
            &::before {
                top: -$triangleWidth;
                opacity: 1;
            }
        }

        &::after {
            content: attr(data-value);

            text-align: center;

            display: block;
            width: 100%;
            height: 27px;
            padding-top: .25rem;
            position: absolute;
            background-color: transparent;
            border-radius: 3px 3px 0 0;
            color: $white;
            top: 0;

            transition: top .2s linear, background-color .2s linear .2s;

            z-index: 1;
        }

        &::before {
            content: '';
            display: block;
            position: absolute;
            
            top: 27px;
            opacity: 0;
            width: 100%;
            
            border: $triangleWidth solid transparent;
            border-bottom: 0;
            border-top-color: $pink;

            transition: top .2s linear, opacity .2s linear .2s;
            z-index: 1;
        }
    }
}
.range-slider-value {
    display: block;
    width: 100%;
    text-align: center;
}
</style>


