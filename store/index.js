import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    tags: [],
    categories: []
  },
  mutations: {
    setTagsAndCategories(state, payload) {
      state.tags = payload.tags
      state.categories = payload.categories
    }
  },
  actions: {}
})

export default store