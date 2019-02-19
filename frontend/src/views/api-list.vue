<template>
  <div> 
    <Table height="1000" stripe :columns="columns" :data="detaildata"></Table>
  </div>
    
</template>

<script>
import * as api from '@/api'

export default {
  name : 'APIList',
  props: ["detaildata"],
   data: function() {
    return {
      columns: [
        {
          title: "Priority",
          key: "priority",
          sortable: true,
          width: 100
        },
        {
          title: "API",
          key: "url",
          sortable: true,
          width: 380
        },
        {
          title: "Description",
          key: "desc",
          sortable: true,
          width: 200
        },
        {
          title: "Count",
          key: "count",
          sortable: true
        },
        {
          title: "Status",
          key: "status",
          render: (h, params) => {
            if (params.row.status === 0) {
              return h("p", { style: { color: "orange" } }, "NotTest");
            } else if (params.row.status === 1) {
              return h("p", { style: { color: "green" } }, "Tested");
            } else if (params.row.status === 2) {
              return h("p", "NewAPI");
            }
          },
          sortable: true,
          filters: [
            {
              label: "Tested",
              value: 1
            },
            {
              label: "NotTest",
              value: 0
            },
            {
              label: "NewAPI",
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.status === 1;
            } else if (value === 2) {
              return row.status === 2;
            } else if (value === 0) {
              return row.status === 0;
            }
          }
        }
      ],
      table_data: [],
      api_id: "",
      showAPIDetailModal: false
    };
  },
  methods: {
  }
}
</script>

<style>
</style>
