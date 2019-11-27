export const state = () => ({
  repository: null,
  token: null,
  documentType: null
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setRepository (state, repository) {
    state.repository = repository
  },
  setDocumentType (state, documentType) {
    state.documentType = documentType
  }
}
