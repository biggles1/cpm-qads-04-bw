const state = {
    breadCrumb: []
}
const mutations = {
    updateBreadCrumb (state, payload) {
        state.breadCrumb = state.breadCrumb.slice(0,payload.idx)
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
