export const state = () => ({
  schema: [],
  results: [],
  bust: 'default'
})

export const mutations = {
  setSchema (state, schema) {
    state.schema = schema
  },
  setResults (state, results) {
    state.results = results
  },
  setBust (state, bust) {
    state.bust = bust
  }
}
