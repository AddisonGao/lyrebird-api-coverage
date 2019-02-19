<template>
  <div>
    <Row class='button-bar'>
      <banner @newbase="loadDetailData" @newcoverage="loadCoverageData" @poptarget="findTargetContext"></banner>
    </Row>
    <div class="divider"></div>
    <Row>
      <Col span="7" >
        <div class="info-bar">
          <coverage :coveragedata ="coverageData" @newcoverage="loadCoverageData" class="coverage"></coverage>
          <base-info></base-info>
        </div>
      </Col>
      <div class="split"></div>
      <Col span="17">
        <APIList :detaildata ="showedAPIData"  @newbase="loadDetailData" class="apilist"></APIList>
      </Col>
    </Row>
  </div>
</template>

<script>
import Banner from '@/views/banner.vue'
import APIList from '@/views/api-list.vue'
import BaseInfo from '@/views/info.vue'
import Coverage from '@/views/coverage.vue'
import io from 'socket.io-client'
import * as api from '@/api' 

//websocket namespace /tracking-plugin
let apicoverageIO = io("/api_coverage");


export default {
  name : 'API-Coverage',
  components: {
    Banner,
    APIList,
    BaseInfo,
    Coverage
  },
  data: function () {
    return {
      coverageData: {},
      detailData: [], //总体的数据
      showedAPIData: [], //搜索出的数据
      targetContext: null
    }
  },
  mounted: function() {
    this.loadCoverageData();
    this.loadDetailData();
    const loadCoverageData = this.loadCoverageData;
    const loadDetailData = this.loadDetailData;
    apicoverageIO.on("coverage message", function(msg) {
      loadCoverageData();
    });
    apicoverageIO.on("test_data message", function(msg) {
      loadDetailData();
    });
  },
  methods: {
    loadCoverageData: function() {
      api.loadCoverage()
      .then(response=> {
        this.coverageData = response.data;
      })
      .catch(error=>console.log(error))
    },
    loadDetailData: function() {
      api.loadAPIList()
      .then(response=> {
        this.detailData = response.data.test_data;
        // 总的数据赋值给show，搜索用的数据
        this.showedAPIData = this.detailData;
      })
      .catch(error=>console.log(error))
    },
    //搜索框
    findTargetContext: function(targetContext) {
      this.targetContext = targetContext;
      if (targetContext) {
        this.showedAPIData = [];
        for (const item of this.detailData) {
          if (JSON.stringify(item, null).search(this.targetContext) != -1) {
            this.showedAPIData.push(item);
          }
        }
      } else {
        this.showedAPIData = this.detailData;
      }
    }
  }
}

</script>

<style scoped>
  .button-bar {
    height: 38px;
    display: flex;
    align-items: center;
  }
  .info-bar {
    margin-right: 5px;
  }

  .api-list {
    margin-left: 5px;
  }

  .divider{
    display: block;
    width: 100%;
    height: 1px;
    background: #eee;
    top: 0;
    left: 0;
  }

  .split{
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    border: 1px dashed #eee;
  }
  
  .coverage {
    width: 100%
  }

</style>
