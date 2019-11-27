export const state = () => ({
  message: null
})

export const mutations = {
  setMessage (state, message) {
    state.message = message
  }
}
export const getters = {
  getMessage (state) {
    return state.message
  }
}
