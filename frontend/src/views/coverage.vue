<template>
  <table>
    <thead>
      <tr>
        <td v-for="item in headerShowedInList" :key="item"><b>{{item}}</b></td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align:middle;">Total</td>
        <td style="vertical-align:middle;">{{coveragedata.test_len + "/" + coveragedata.len}}</td>
        <td>
          <Progress :percent="coveragedata.total" status="active"></Progress>
        </td>
      </tr>
      <tr v-for="item in coveragedata.priorities" :key="item.label">
        <td style="vertical-align:middle;">{{"P" + item.label}}</td>
        <td style="vertical-align:middle;">{{item.test_len + "/" + item.len}}</td>
        <td>
          <Progress :percent="item.value" status="active"></Progress>
        </td>
      </tr>    
    </tbody>
  </table>
</template>

<script>
import * as api from '@/api'

export default {
  name: 'Coverage',
  props: ["coveragedata"],
  mounted: function() {
  },
  data: function() {
    return {
      // headerShowedInList: ["Priority", "Number", "Coverage", "Progress"]
      headerShowedInList: ["Priority", "Number", "Progress"]
    };
  },
  methods: {
    setProgressClass: function(data) {
      if (data >= 90) {
        return "success";
      } else if (data >= 60 && data < 90) {
        return "normal";
      } else if (data >= 30 && data < 60) {
        return "active";
      } else {
        return "wrong";
      }
    },
    setProgressStyle: function(data) {
      return data + "%";
    }
  }
}
</script>
<style>
</style>
