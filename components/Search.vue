<template>
  <div>
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
    <v-card v-if="results.length" class="mt-4">
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in results"
              :key="i"
            >
              <td>{{ titleGuesser(item.data) }}</td>
              <td>
                <v-btn
                  :href="`https://${$store.state.credentials.repository}.prismic.io/documents~b=working&c=published&l=de-de/${item.id}/`"
                  target="_blank"
                  color="primary"
                >
                  Edit
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import PrismicDOM from 'prismic-dom'

export default {
  data () {
    return {
      documentType: null,
      searchData: {},
      results: []
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
      console.log(this.searchData)

      this.$prismic.search(
        this.$store.state.credentials.documentType,
        this.searchData
      ).then((results) => {
        this.$store.commit('notification/setMessage', `${results.length} Elements found`)
        this.results = results
      })
    },
    titleGuesser (data) {
      let title = null
      Object.entries(data).forEach(([key, values]) => {
        if (title !== null) {
          return
        }

        if (key.includes('title')) {
          if (typeof (values) === 'string') {
            title = values
          } else {
            title = PrismicDOM.RichText.asText(values)
          }
        } else if (key.includes('name')) {
          if (typeof (values) === 'string') {
            title = values
          } else {
            title = PrismicDOM.RichText.asText(values)
          }
        }
      })

      return title
    }
  }
}
</script>
