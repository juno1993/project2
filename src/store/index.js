import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      reducer: state => (
        {
          user: state.user,
          // savedUser: state.savedUser,
          // currentPosition: state.currentPosition,
          // recentSearch: state.recentSearch,
          // loginTeam: state.loginTeam,
          // hidePopup: state.hidePopup,
          // previousPath: state.previousPath
        }
      )
    })
  ],
  state: {
    loadingSpinner: false,
    user: { user_id: 0, name: '' },
  },
  mutations: {
    setLoadingSpinner (state, value) {
      state.loadingSpinner = value;
    },
    setUser (state, value) {
      state.user = value;
    }
  },
  getters: {
    loadingSpinner: state => {
      return state.loadingSpinner;
    },
    user: state => {
      return state.user;
    }
  },
  modules: {
  }
})
