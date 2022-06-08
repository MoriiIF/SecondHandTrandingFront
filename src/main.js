import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueResource  from 'vue-resource';
import SIdentify from './components/identify.vue'
import Icon from 'vue-svg-icon/Icon.vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(SIdentify);
Vue.component('icon', Icon);
//Vue.config.productionTip = false

new Vue({
    //el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app')