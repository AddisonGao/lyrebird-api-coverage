<template>
  <Row class="button-bar">
      <Col span="20">

        <Upload action="/ui/plugin/api_coverage/resumeTest"
        :on-success="handleResumeSuccess"
        :on-error="handleResumeError"
        :format="['json']"
        accept="json"
        :on-format-error="handleFormatError"
        :show-upload-list="false"
        class="upload"
        >
          <Tooltip content="Resume Test">
            <Button icon="md-sync"></Button>
          </Tooltip>
        </Upload>


        <div class="inline">
          <Divider type="vertical"></Divider>
        </div>

        <Upload action="/ui/plugin/api_coverage/importBase"
        :on-success="handleSuccess"
        :on-error="handleError"
        :format="['json']"
        accept="json"
        :on-format-error="handleFormatError"
        :show-upload-list="false"
        class="upload"
        >
          <Tooltip content="Import Base">
            <Button icon="md-log-in"></Button>
          </Tooltip>
        </Upload>

        <div class="inline">
            <Divider type="vertical"></Divider>
        </div>
        
        <Tooltip content="Clear">
            <Button @click="clearTest" icon="md-refresh"></Button>
        </Tooltip>
        
        <div class="inline">
            <Divider type="vertical"></Divider>
        </div>

        <Tooltip content="Save Result">
          <Button @click="showCreateResultModal=true" icon="md-download"></Button>
        </Tooltip>
        
        <div class="inline">
            <Divider type="vertical"></Divider>
        </div>

        <Tooltip content="Filtering Rules">
            <Button @click="filterShow" icon="md-settings"></Button>
        </Tooltip>

        <modal v-model="showCreateResultModal" title="Save Result" :mask="false" @on-ok="createResultOk">
            <label>Path: ~/.lyrebird/plugins/lyrebird_api_coverage/data</label>
            <Input placeholder="Type file name,eg:travel_9.5_test_result" v-model="newResultName"/>
        </modal>

        <modal v-model="showFilterModal" title="Edit Filtering Rules" @on-ok="editFilterOk" :mask="false" style="width:1000px">
          <Input :autosize="true" type="textarea" v-model="filterRules" placeholder="filtering rules json"/>
        </modal>

      </Col>
      <Col span="4">
        <Input v-model="targetContext" search @on-enter="popTargetContext(targetContext)"/>
      </Col>
  </Row>  
</template>

<script>
import * as api from '@/api' 

export default {
  name : 'Banner',
  data: function(){
    return {
      targetContext: null,
      showCreateResultModal: false,
      showFilterModal: false,
      newResultName: null,
      filterRules: null
    }
  },
  methods: {
    handleSuccess: function (res, file){
      console.log(res);
      if (res.code == 1000) {
        this.$Notice.open({ title: "Import base success!" });
        this.$emit("newbase");
        this.$emit("newcoverage");
      } else if (res.code == 3000) {
        this.$Notice.open({
          title: "import file failed!",
          desc: String(res.message)
        });
      }
    },
    handleResumeSuccess: function(res,file){
      if (res.code == 1000) {
        this.$Notice.open({ title: "Resume test success!" });
        this.$emit("newbase");
        this.$emit("newcoverage");
      } else if (res.code == 3000) {
        this.$Notice.open({
          title: "Resume test failed!",
          desc: String(res.message)
        });
      }
    },
    handleError: function (){
      this.$Notice.open({
        title: "Import file failed!",
        desc: String(data.data.message)
      })
    },
    handleResumeError: function (){
      this.$Notice.open({
        title: "Resume test failed!",
        desc: String(data.data.message)
      })
    },
    handleFormatError: function (){
      this.$Notice.open({ title: "只能上传.json后缀的文件" })
    },
    clearTest: function() {
      api.clearResult().then(
        response=>{
          if (response.data.code == 1000) {
            this.$Notice.open({ title: "Clear test success!" });
            this.$emit("newbase");
            this.$emit("newcoverage");
          } else {
            this.$Notice.open({ title: "Clear test failed!" });
          }
        }
      ).catch(error=>console.log(error))
    },
    createResultOk: function() {
      let name = this.newResultName;
      if (name) {
        api.saveResult(name).then(
          response=>{
            this.$Notice.open({ title: "Create result success!" });
            this.newResultName = null;
          }
        ).catch(error=>console.log(error))
      }
    },
    filterShow: function() {
      this.showFilterModal = true;
      api.loadFilters().then(
        response=>{
          if (response.data.code == 3000) {
            this.$Notice.open({ title: response.data.message });
          } else {
            this.filterRules = JSON.stringify(response.data, null, 4)
          }
        }
      ).catch(error => console.log(error))
    },
    editFilterOk: function() {
      let data = JSON.parse(this.filterRules);
      api.setFilters(data).then(
        response=> {
          if (response.data.code == 1000) {
            this.$Notice.open({ title: "Set filter success!" });
          } else if (response.data.code == 3000) {
            this.$Notice.open({
              title: "Set filter error!",
              desc: response.data.message
            });
          }
        }
      ).catch(error => console.log(error))
    },
    popTargetContext: function(targetContext) {
      this.$emit("poptarget", targetContext);
    }
  }
}

</script>

<style>
 .inline {
    display: inline;
  }
  .button-bar {
    flex-grow: 1
  }
  .upload {
    width: 45px;
    display: inline-block
  }
</style>
