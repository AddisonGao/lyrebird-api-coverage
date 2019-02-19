<template>
  <div>
    <Tabs value="name1">
      <TabPane label="Coverage Info" name="name1">
        <table class="coverage">
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
      </TabPane>
      <TabPane label="Base Info" name="name2">
        <li v-for="(value, key) in info" :key="key">{{ key }}: {{ value }}</li>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import * as api from '@/api'

export default {
  name: 'BaseInfo',
  props: ["coveragedata"],
  mounted: function() {
    this.loadBaseInfo();
  },
  data: function() {
    return {
      info: null,
      headerShowedInList: ["Priority", "Number", "Progress"]
    };
  },
  methods: {
    loadBaseInfo: function() {
      api.loadBaseInfo().then(
        response => {
          this.info = response.data;
        }
      ).catch(error=>console.log(error))
    },
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
  .coverage {
    width: 100%
  }
</style>
