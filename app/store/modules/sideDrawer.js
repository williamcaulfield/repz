const state = {
    sideDrawer: false
}

const mutations = {

    setSideDrawer(state, data) {
        state.sideDrawer = data
    }

}

const getters = {
    // this is the change that we're watching in the mixin
    sideDrawer: (state) => state.sideDrawer

}

export default {
    state,
    mutations,
    getters
}
