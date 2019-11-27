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
            <v-col cols="6">
              <v-text-field v-model="repository" label="Repository" placeholder="my-repository-string" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="token" label="Token (disabled)" disabled />
            </v-col>
            <v-col>
              <v-text-field
                v-model="documentType"
                label="Content Type"
                placeholder="blog_post"
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
              <v-btn
                block
                color="warning"
                class="mt-4"
                @click="clearCredentials"
              >
                Clear
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
  methods: {
    setCredentials () {
      if (this.repository) {
        this.$store.commit('notification/setMessage', `${this.repository} set`)
        this.$store.commit('credentials/setRepository', this.repository)
        this.$store.commit('credentials/setDocumentType', this.documentType)

        this.buildSeachForm()
      }
    },
    clearCredentials () {

    },
    buildSeachForm () {
      this.$prismic.querySearchData(
        this.documentType
      ).then((documentData) => {
        console.log(documentData)
        this.$store.commit('search/setSchema', documentData)
      })
    }
  }
}
</script>
