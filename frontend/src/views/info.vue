<template>
  <Card dis-hover>
    <p dis-hover slot="title">Info</p>
    <li v-for="(value, key) in info" :key="key">{{ key }}: {{ value }}</li>
  </Card>
</template>

<script>
import * as api from '@/api'

export default {
  name: 'BaseInfo',
  props: [],
  mounted: function() {
    this.loadBaseInfo();
  },
  data: function() {
    return {
      info: ""
    };
  },
  methods: {
    loadBaseInfo: function() {
      api.loadBaseInfo().then(
        response => {
          this.info = response.data;
        }
      ).catch(error=>console.log(error))
    }
  }
}
  
  
</script>

<style>
</style>
