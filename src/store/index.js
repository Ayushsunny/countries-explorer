import { createStore } from 'vuex';
import cities from './modules/cities.module';

export default createStore({
  modules: {
    cities,
  },
});