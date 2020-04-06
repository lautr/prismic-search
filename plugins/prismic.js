import Prismic from 'prismic-javascript'

export default ({ store, req }, inject) => {
  // Set the function directly on the context.app object
  inject('prismic', {
    getRepositoryData () {
      return fetch(`https://${store.state.credentials.repository}.cdn.prismic.io/api/v2`)
        .then((response) => {
          return response.json()
        })
    },
    search (documentType, query) {
      const predicates = []

      Object.entries(query).forEach(([key, query]) => {
        if (query !== '') {
          predicates.push(Prismic.Predicates.fulltext(`my.${documentType}.${key}`, query))
        }
      })

      return Prismic.getApi(`https://${store.state.credentials.repository}.cdn.prismic.io/api/v2`, { req }).then(function (api) {
        return api.query(
          predicates,
          { pageSize: 25, page: 1 }
        )
      }).then((response) => {
        return response.results
      })
    },
    querySearchData (documentType) {
      return Prismic.getApi(`https://${store.state.credentials.repository}.cdn.prismic.io/api/v2`, { req }).then(function (api) {
        return api.query(
          Prismic.Predicates.at('document.type', documentType),
          { pageSize: 1, page: 1 }
        )
      }).then((response) => {
        return response.results[0].data
      })
    }
  })
}
