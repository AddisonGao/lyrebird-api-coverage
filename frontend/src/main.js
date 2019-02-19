import Vue from 'vue'
import App from './views/main.vue'
import iView from 'iview'
import VueResource from 'vue-resource'
import 'iview/dist/styles/iview.css'
import locale from 'iview/dist/locale/en-US'

Vue.config.productionTip = false
Vue.use(iView, {locale})
Vue.use(VueResource)

new Vue({
  render: h => h(App),
}).$mount('#app')