<template>
  <v-app>
    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import ListIssues from './components/ListIssues'

export default {
  name: 'App',
  components: {
    HelloWorld,
    ListIssues
  },
  data () {
    return {
      //
    }
  }
}
</script>
