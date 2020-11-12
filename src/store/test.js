const state = {
    // rightSidebar: false,
    sideBar: {
        left: false,
        right: false
    }
}

const mutations = {
    // toggle (state, payload) {
    //     state.rightSidebar = payload.update
    // },

    toggle1 (state, payload) {
        // console.log('payload update left: ', payload.update.left)
        if (payload.update.left != null) state.sideBar.left = payload.update.left
        // if (payload.update.right != null) state.sideBar.right = payload.update.right
        // console.log('after t1 left', state.sideBar.left)
    },

    toggleLeft (state, payload) {
        // console.log("toggle left payload: ", !payload)
        state.sideBar.left = !payload
    },

    // toggleRight (state, payload) {
    //     console.log("toggle right payload: ", payload)
    //     // state.sideBar.right = payload
    // },

}

const getters = {
    // rightSideBar: (state) => {
    //     return state.rightSidebar
    // },
    // sideBar: (state) => {
    //     return state.sideBar
    // }
}

const actions = {
    toggleLeftSideBar ( { commit }, payload ) {
        // console.log('toggle action: ', payload)
        commit('toggleLeft', payload)
    },
    toggleSideBar ( { commit }, payload ) {
        // console.log('toggle action: ', payload)
        commit('toggle1', payload)
        // console.log('end of toggle')
        // console.log('action => payload update left & right: ', payload.update.left, payload.update.right)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
