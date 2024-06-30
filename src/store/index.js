// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';
import cities from './modules/cities.module'; 

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cities,
  },
});
