<template>
  <main class="grid-container">
    <div class="grid-x">
      <transition name="main" mode="out-in">
          <div v-if="choosenJob" class="auto cell m-r:1">
            <Job :id="choosenJob.id" v-on:loading="value => loading = value"></Job>
          </div>
          <div class="auto cell" v-else>
            <div class="c:white" v-for="location in listJobs" :key="location.id">
              <h1>{{ location.city }}</h1>
              <div class="grid-y">
                <button v-for="job in location.jobs" :key="job.id" @click="selectJob(job)" class="button-hiq m-b:1">{{ job.title }}</button>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <Loader :active="loading"></Loader>
    </main>
</template>

<script>
import Job from './components/JobComponent'
import Loader from './components/LoaderComponent'
import { jobsEndpoint, GETRequest } from '@/tt-api-wrapper'

export default {
  name: 'App',
  data(){
    return {
      jobs: [],
      firstName: '',
      lastName: '',
      email: '',
      choosenJob: null,
      loading: false,
    }
  },
  methods: {
    selectJob(job){
      this.choosenJob = job;
    }
  },
  created(){
    this.loading = true;
    jobsEndpoint.list({
      include: ['location', 'role'],
      pagesize: 15
    })
    .then(data => {
      this.jobs = _.map(data, job => {
        const jobObject = { id: job.id, title: job.attributes.title, location: false, role: false }
        GETRequest(job.relationships.location.links.related)
          .then(val => jobObject.location = val)
          .catch(err => console.error(err));
        return jobObject;
      })
      this.loading = false;
    })
    .catch(err => console.error(err));
  },
  components: {
    Job,
    Loader
  },
  computed: {
    listJobs(){
      const sortByJobTitle = (a, b) => {
          return a.title.localeCompare(b.title) === -1 ? -1 : a.title.localeCompare(b.title) === 1 ? 1 : 0; 
        }
      return this.jobs.reduce((acc, job) => {
        let id = -1;
        let city = '';
        let country = '';

        if(job.location && job.location.attributes){
          id = job.location.id;
          city = job.location.attributes.city;
          country = job.location.attributes.country;
        }

        const location = acc.find(a => a.id === id);
        if(location){
          location.jobs.push(job);
          location.jobs.sort(sortByJobTitle);
        }else{
          acc.push({
            id,
            city,
            country,
            jobs: [ job ]
          })
        }

        return acc;
      }, [])
    }
  }
}
</script>

<style lang="scss">
.main-enter-active, .main-leave-active {
  transition: opacity .3s ease;
}
.main-enter, .main-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

