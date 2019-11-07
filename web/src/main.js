import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'
import axios from 'axios'
Vue.prototype.$http=axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  // baseURL:'http://localhost:3000/web/api'
})

Vue.config.productionTip = false

import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

//组件
import Card from './components/Card.vue'
Vue.component('m-card',Card)

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card',ListCard)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
