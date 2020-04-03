<template>
  <div
    v-if="$store.state.search.results.length > 0"
  >
    <v-simple-table>
      <template v-slot:default>
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
            v-for="(item, i) in $store.state.search.results"
            :key="i"
          >
            <td>{{ titleGuesser(item.data) }}</td>
            <td>
              <v-btn
                :href="`https://${$store.state.credentials.repository}.prismic.io/documents~b=working&c=published&l=de-de/${item.id}/`"
                target="_blank"
              >
                Edit
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!-- <script
      v-if="$store.state.search.results.length > 0"
      :key="$store.state.search.bust"
      :src="`https://static.cdn.prismic.io/prismic.min.js?new=true&repo=${$store.state.credentials.repository}&bust=${$store.state.search.bust}`"
    /> -->
  </div>
</template>
<script>
import PrismicDOM from 'prismic-dom'

export default {
  methods: {
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
