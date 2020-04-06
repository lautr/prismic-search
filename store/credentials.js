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
    localStorage.setItem('repository', repository)
    state.repository = repository
  },
  setDocumentType (state, documentType) {
    localStorage.setItem('documentType', documentType)
    state.documentType = documentType
  }
}
