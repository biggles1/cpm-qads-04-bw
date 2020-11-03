const state = {
    counter: 1,
    // bCrumb: [],
    breadCrumb: []
}

const mutations = {
    increment (state, payload) {
        state.counter += payload
        console.log('counter: ', state.counter)
    },

    decrement (state, payload) {
        state.counter -= payload
        console.log('counter: ', state.counter)
    },

    // updateBCrumb (state, payload) {
    //     console.log('updateBC')
    //     state.bCrumb.push(payload)
    // },
   
    updateBreadCrumb (state, payload) {
        // console.log('updateBreadCrumb', payload)
        state.breadCrumb = state.breadCrumb.slice(0,payload.idx)
        // console.log('updatedBC: ', state.breadCrumb )
        if(payload.selection) state.breadCrumb[payload.idx] = payload.selection
    }
}

const getters = {
    // rightSideBar: (state) => {
    //     return state.rightSidebar
    // },
    // sideBar: (state) => {
    //     return state.sideBar
    // }
    counter: state => state.counter
}

const actions = {

    // increment ( { commit }, payload ) {
    //     console.log('payload', payload)
    //     commit ('increment', payload)
    // },

    // decrement ( { commit }, payload ) {
    //     console.log('payload', payload)
    //     commit ('decrement', payload)      
    // },

    // updateBCrumb ( { commit }, payload ) {
    //     console.log('bc payload', payload)
    //     commit ('updateBCrumb', payload)
    // },

    // updateBCrumb1 ( { commit }, payload ) {
    //     console.log('bc1 payload', payload)
    //     commit ('updateBCrumb1', payload)
    // }
}

export default {
    namespaced: true,
    state, 
    mutations, 
    getters, 
    actions 
}