<template>
  <v-app>
    <v-content>
      <HelloWorld/>
      <ListIssues/>

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
