import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'

Vue.config.devtools = true;
Vue.use(iView)

iView.lang('en-US');

new Vue({
    render: h => h(App),
}).$mount('#app')