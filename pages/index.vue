<template>
  <v-row>
    <v-col cols="12" md="3" order-md="last">
      <Credentials />
    </v-col>
    <v-col cols="12" md="9">
      <Search class="mb-2" />
      <Content />
    </v-col>
  </v-row>
</template>

<script>
import Credentials from '~/components/Credentials'
import Content from '~/components/Content'
import Search from '~/components/Search'

export default {
  components: {
    Content,
    Credentials,
    Search
  }
}
</script>
