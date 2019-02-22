import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
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
    actions: {
      async nuxtServerInit({ dispatch }, { app, error }) {
        await dispatch('loadTagsAndCategories', {
          app,
          error
        })
      },
      async loadTagsAndCategories({ commit }, { app, error }) {
        try {
          let tagsPromise = app.$axios.$get('/tags')
          let categoriesPromise = app.$axios.$get('/categories')
          const [tags, categories] = await Promise.all([tagsPromise, categoriesPromise])
          commit('setTagsAndCategories', {
            tags: tags.data,
            categories: categories.data
          })
        } catch (e) {
          error({
            statusCode: 500,
            message: `获取标签和类别数据失败:${e.message}`
          })
        }
      }
    }
  })

export default store
