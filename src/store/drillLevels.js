const state = {
    breadCrumb: []
}
const mutations = {
    updateBreadCrumb (state, payload) {
      if(payload.selection) state.breadCrumb[payload.idx] = payload.selection
    }
}
const getters = {}
const actions = {}
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
