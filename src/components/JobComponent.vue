<template>
  <transition name="placehold" mode="out-in">
      <main key="form" v-if="isInitialized" class="grid-container">
            <h1>{{ attributes.title }}</h1>
            <div v-html="attributes.body"></div>
            <transition name="questions" mode="out-in">
                <div class="questions" :class="{sending: sending}" v-if="!sent" key="questions">
                    <JobQuestion v-for="question in questions" :key="question.key" :question="question"></JobQuestion>
                    <div class="candidate-inputs">
                        <input type="text" v-model.trim="firstName.value" placeholder="Förnamn" class="hiq-style m-b:1" :class="{invalid:firstName.isDirty&&!firstName.isValid}">
                        <input type="text" v-model.trim="lastName.value" placeholder="Efternamn" class="hiq-style m-b:1" :class="{invalid:lastName.isDirty&&!lastName.isValid}">
                        <input type="email" v-model.trim="email.value" placeholder="Email" class="hiq-style m-b:1" :class="{invalid:email.isDirty&&!email.isValid}">
                        <button @click="send" class="button-hiq">{{ attributes['apply-button-text']||'Skicka' }}</button>
                    </div>
                </div>
                <div key="sent" v-else>
                    <h2>Tack {{ firstName.value }}, för din ansökan!</h2>
                </div>
            </transition>
      </main>
      <main key="placeholder" class="loading-placeholder grid-container" v-else>
          <span class="placeholder-text m-b:2"></span>
          <span class="placeholder-input m-b:1"></span>
          <span class="placeholder-textarea m-b:1"></span>
          <span class="placeholder-input m-b:1"></span>
          <span class="placeholder-input m-b:1"></span>
          <span class="placeholder-input m-b:1"></span>
          <span class="placeholder-button"></span>
      </main>
  </transition>
</template>

<script>
import JobQuestion from './JobQuestionComponent'
import { GETRequest, jobsEndpoint, candidatesEndpoint, answersEndpoint, applicationsEndpoint } from '@/tt-api-wrapper'

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default {
  name: 'Job',
  props: ['id'],
  data(){
      return {
          attributes: {},
          questions: [],
          firstName: {
              value: '',
              isDirty: false,
              isValid: false
          },
          lastName: {
              value: '',
              isDirty: false,
              isValid: false
          },
          email: {
              value: '',
              isDirty: false,
              isValid: false
          },
          isInitialized: false,
          candidate: null,
          sending: false,
          sent: false
      }
  },
  created(){
      this.$emit('loading', true)
      jobsEndpoint.show(this.id)
        .then(data => {
            this.attributes = data.attributes;
            return GETRequest(data.relationships.questions.links.related);
        })
        .then(questions => {
            this.questions = _.map(questions, q => ({ value: '', valueName: '', isValid: false, isDirty: false, ...q }))
            this.$emit('loading', false);
            this.isInitialized = true;
        })
        .catch(err => console.error(err));
  },
  methods: {
      send(){
          if(this.isAllFieldsValid()){
              this.sending = true;
              candidatesEndpoint.list({
                  include: ['job-applications'],
                  filters: {
                      email: this.email.value
                  }
              })
              .then(data => {
                  if(data.length > 0){
                      const candidate = data.find(d => 
                            d.attributes['first-name'].toLocaleLowerCase() === this.firstName.value.toLocaleLowerCase() && 
                            d.attributes['last-name'].toLocaleLowerCase() === this.lastName.value.toLocaleLowerCase()
                        );
                      if(candidate) return Promise.resolve(candidate);
                  }
                  return candidatesEndpoint.create(this.firstName.value, this.lastName.value, this.email.value);
              })
              .then(candidate => {
                  this.candidate = candidate;
                  return GETRequest(candidate.relationships.answers.links.related) // Fetch all answers for the candidate;
              })
              .then(answers => {
                  return Promise.all(answers.map(answer => GETRequest(answer.relationships.question.links.related)))// Fetch all the questions that have allready been answered...
              })
              .then(answeredQuestions => {
                  // Filter out the questions that have allready been answered.
                  return Promise.all(this.questions.reduce((acc, question) => {
                    if(!answeredQuestions.find(q => q.id === question.id)){ // if question have not yet been answered by user, ignore.
                        const attributes = {};
                        attributes[question.valueName] = question.value;
                        acc.push(answersEndpoint.create(attributes, this.candidate.id, question.id))
                    }
                    return acc;
                  }, []))
              })
              .then(result => {
                  applicationsEndpoint.create(this.candidate.id, this.id)
              })
              .then(val => {
                  console.log(val)
                  this.sent = true;
                  this.sending = false;
              })
              .catch(err => {
                  console.error(err)
                  this.sending = false;
              })
          }else{ // Invalidate all fields that are not dirty yet.
            this.getAllFields().forEach(field => {
                if(!field.isDirty) field.isDirty = true;
            })
          }
      },
      getAllFields(){
          return [...this.questions, this.firstName, this.lastName, this.email];
      },
      isAllFieldsValid(){
          return this.getAllFields().find(f => !f.isValid) ? false : true;
      }
  },
  watch: {
      firstName: {
          handler(newValue){
              this.firstName.isDirty = this.firstName.isDirty || newValue.value.length > 0;
              this.firstName.isValid = newValue.value.length > 0;
          },
          deep: true
      },
      lastName: {
          handler(newValue){
              this.lastName.isDirty = this.lastName.isDirty || newValue.value.length > 0;
              this.lastName.isValid = newValue.value.length > 0;
          },
          deep: true
      },
      email: {
          handler(newValue){
              this.email.isDirty = this.email.isDirty || newValue.value.length > 0;
              this.email.isValid = EMAIL_REGEX.test(newValue.value.toLowerCase());
          },
          deep: true
      }
  },
  components: {
      JobQuestion
  }
}
</script>
<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

@keyframes placeholdLoading {
    0%{ background-position: -800px 0; }
  100%{ background-position: 800px 0; }
}

main {
    transition: opacity .5s;
}

.questions.sending {
    position: relative;
    z-index: 1;
    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background: rgba($pink, .85);
        opacity: 1;
        z-index: 999999;
    }
}

.questions,
.placehold {
    &-enter-active,
    &-leave-active {
        transition: opacity .2s;
    }
    &-enter,
    &-leave-to {
        opacity: 0;
    }
}
.loading-placeholder {
    display: flex;
    flex-flow: row wrap;
    filter: blur(1px);

    > [class^="placeholder"] {
        display: block;
        width: 100%;

        background: linear-gradient(to right, $white 8%, $gray-dark 18%, $white 33%);
        background-size: 800px 104px;

        animation-duration: 1.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-name: placeholdLoading;

        &.placeholder-text {
            height: 4rem;
        }

        &.placeholder-input {
            @include input;
        }

        &.placeholder-textarea {
            @include textarea;
            height: 10rem;
        }

        &.placeholder-button {
            height: 3.5rem;
            width: 10rem;
            box-shadow: 4px 4px 0px $pink-dark;
        }
    }
}
</style>


