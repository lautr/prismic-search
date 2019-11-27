<template>
  <v-app light>
    <v-app-bar app color="primary">
      <v-toolbar-title>
        Primsic Search
      </v-toolbar-title>
      <v-chip-group
        class="ml-4"
      >
        <v-chip
          v-if="$store.state.credentials.repository"
          disabled
        >
          {{ $store.state.credentials.repository }}
        </v-chip>
        <v-chip
          v-if="$store.state.credentials.documentType"
          disabled
        >
          {{ $store.state.credentials.documentType }}
        </v-chip>
      </v-chip-group>
    </v-app-bar>
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <v-alert
          dismissible
          type="info"
        >
          <span
            class="title"
          >
            How To use the Search
          </span>
          <ol>
            <li>Enter &amp; Set your repository name &amp; content type ( API Identifier )</li>
            <li>This will generate a search form based on your properties</li>
            <li>After submitting your query wait a moment till the edit button appears</li>
            <li>If the content you where looking for shows up in the result list it should also be in the edit button when clicking it </li>
          </ol>
        </v-alert>
        <router-view />
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
      <v-snackbar
        :value="$store.state.notification.message"
        bottom
        right
        :timeout="0"
      >
        {{ $store.getters['notification/getMessage'] }}
        <v-btn
          color="pink"
          text
          @click="$store.commit('notification/setMessage', false)"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      repo: null
    }
  },
  created () {

  }
}
</script>
