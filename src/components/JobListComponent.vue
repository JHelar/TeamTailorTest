<template>
    <main class="grid-container">
        <div class="c:white" v-for="location in listJobs" :key="location.id">
            <h2>{{ location.city }}</h2>
            <div class="grid-y">
                <router-link v-for="job in location.jobs" :key="job.id" :to="{ name: 'job', params: {id: job.id}}" class="button-hiq m-b:1">{{ job.title }}</router-link>
            </div>
        </div>
    </main>
</template>

<script>
import { jobsEndpoint, GETRequest } from "@/tt-api-wrapper";
export default {
  name: "JobList",
  data() {
    return {
      jobs: []
    };
  },
  created() {
    this.$emit("loading", true);
    jobsEndpoint
      .list({
        include: ["location", "role"],
        pagesize: 15
      })
      .then(data => {
        this.jobs = _.map(data, job => {
          const jobObject = {
            id: job.id,
            title: job.attributes.title,
            location: false,
            role: false
          };
          GETRequest(job.relationships.location.links.related)
            .then(val => (jobObject.location = val))
            .catch(err => console.error(err));
          return jobObject;
        });
        this.$emit("loading", false);
      })
      .catch(err => console.error(err));
  },
  methods: {
      selectJob(job){
          this.$emit('selectJob', job);
      }
  },
  computed: {
    listJobs() {
      const sortByJobTitle = (a, b) => {
        return a.title.localeCompare(b.title) === -1
          ? -1
          : a.title.localeCompare(b.title) === 1 ? 1 : 0;
      };
      return this.jobs.reduce((acc, job) => {
        let id = -1;
        let city = "";
        let country = "";

        if (job.location && job.location.attributes) {
          id = job.location.id;
          city = job.location.attributes.city;
          country = job.location.attributes.country;
        }

        const location = acc.find(a => a.id === id);
        if (location) {
          location.jobs.push(job);
          location.jobs.sort(sortByJobTitle);
        } else {
          acc.push({
            id,
            city,
            country,
            jobs: [job]
          });
        }

        return acc;
      }, []);
    }
  }
};
</script>

