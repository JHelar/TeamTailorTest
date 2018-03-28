// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Loader from './components/LoaderComponent'
import VueRouter from 'vue-router';
import router from './router/router'

Vue.config.productionTip = false
Vue.use(VueRouter)

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  data: {
    loading: false
  },
  components: { App, Loader },
  template: `<div>
          <App/>
          <Loader :active="loading"/>
        </div>`,
  router
})

router.beforeEach((to, from, next) => {
  app.loading = true;
  console.log('Before')
  next();
});

router.afterEach((to, from) => {
  setTimeout(() => app.loading = false, 250);
  console.log('After')
});