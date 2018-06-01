import Vue from 'vue';
import App from '@/App.vue';
import SelectBoxIt from '@/components/global/SelectBoxIt.vue';
import router from '@/router';
import store from '@/store/store';
import '@/registerServiceWorker';
import { apolloProvider } from '@/setup/apollo-setup';
import i18n from '@/setup/i18n-setup';

import './assets/scss/main.scss';

Vue.config.productionTip = false;

Vue.component('SelectBoxIt', SelectBoxIt);

new Vue({
  router,
  store,
  i18n,
  provide: apolloProvider.provide(),
  render: h => h(App),
}).$mount('#app');