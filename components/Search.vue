<template>
  <v-expansion-panels
    :value="isActive"
  >
    <v-expansion-panel>
      <v-expansion-panel-header>
        Search
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-form>
          <v-row>
            <v-col
              v-for="(fieldData, fieldName) in $store.state.search.schema"
              :key="fieldName"
              cols="6"
            >
              <v-text-field
                v-model="searchData[fieldName]"
                :label="fieldName"
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                block
                color="accent"
                @click="search"
              >
                Search
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
      documentType: null,
      searchData: {}
    }
  },
  computed: {
    isActive () {
      if (this.$store.state.credentials.repository === null) {
        return false
      } else {
        return 0
      }
    }
  },
  methods: {
    search () {
      this.$prismic.search(
        this.$store.state.credentials.documentType,
        this.searchData
      ).then((results) => {
        function removeElement (path) {
          // Removes an element from the document
          const element = document.querySelector(path)
          if (element === null) {
            return
          }
          element.parentNode.removeChild(element)
        }
        removeElement('#prismic-toolbar-v2')
        removeElement('body > iframe')
        this.$store.commit('notification/setMessage', `${results.length} Elements found`)
        this.$store.commit('search/setResults', results)
        this.$store.commit('search/setBust', Math.random())
      })
    }
  }
}
</script>
