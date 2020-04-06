<template>
  <v-expansion-panels
    :value="0"
  >
    <v-expansion-panel>
      <v-expansion-panel-header>
        Data
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="repository" label="Repository" placeholder="my-repository-string" />
            </v-col>
            <v-col v-if="types.length" cols="12">
              <v-select
                v-model="documentType"
                :items="types"
                label="pick content type"
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                block
                color="accent"
                @click="setCredentials"
              >
                Set
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  data () {
    return {
      token: '',
      repository: '',
      types: [],
      documentType: null
    }
  },
  computed: {
    isActive () {
      if (this.$store.state.credentials.repository === null) {
        return 0
      } else {
        return false
      }
    }
  },
  mounted () {
    if (localStorage.getItem('repository')) {
      this.$store.commit('credentials/setRepository', localStorage.getItem('repository'))
      this.repository = localStorage.getItem('repository')
      this.populateTypes()
    }
    if (localStorage.getItem('documentType')) {
      this.$store.commit('credentials/setDocumentType', localStorage.getItem('documentType'))
      this.documentType = localStorage.getItem('documentType')
      this.buildSeachForm()
    }
  },
  methods: {
    populateTypes () {
      this.$prismic.getRepositoryData().then((data) => {
        this.types = Object.keys(data.types)
      })
    },
    setCredentials () {
      if (this.repository) {
        this.$store.commit('notification/setMessage', `${this.repository} set`)
        this.$store.commit('credentials/setRepository', this.repository)
        this.$store.commit('credentials/setDocumentType', this.documentType)
        this.populateTypes()

        this.buildSeachForm()
      }
    },
    buildSeachForm () {
      this.$prismic.querySearchData(
        this.documentType
      ).then((documentData) => {
        this.$store.commit('search/setSchema', documentData)
      })
    }
  }
}
</script>
