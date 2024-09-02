<template>
  <div :class="{ hidden: !display }">
    <DataTable :value="data" scrollable :scroll-height="tableHeight" :virtualScrollerOptions="{ itemSize: 20, appendOnly: true}">
      <Column
        v-once
        v-for="column in columns"
        :key="column.field"
        :field="column.field"
        :header="column.header"
        :frozen="column.field === 'player'"
        :sortable="sortable"
      />
    </DataTable>
  </div>
</template>

<script setup>
import Column from "primevue/column"
import DataTable from "primevue/datatable"

const props = defineProps(["data", "columns", "tableHeight", "display", "sortable"])

</script>

<style scoped>
.hidden {
  visibility: hidden;
  width: 0px;
  height: 0px;
  /* display: none; */
}

::v-deep .p-datatable {
  max-width: 90vw;

  @media (max-width: 768px) {
    width: 90vw;
  }
}

::v-deep .p-datatable-table {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 12px;
  }
}

::v-deep .p-datatable-table > thead > tr:first-of-type > th:first-of-type {
  border-radius: 0.5rem 0 0 0 !important;
}

::v-deep .p-datatable-table > thead > tr:first-of-type > th:last-of-type {
  border-radius: 0 0.5rem 0 0 !important;
}

::v-deep .p-datatable-table > tbody > tr:last-of-type > td:first-of-type {
  border-radius: 0 0 0 0.5rem !important;
}

::v-deep .p-datatable-table > tbody > tr:last-of-type > td:last-of-type {
  border-radius: 0 0 0.5rem 0 !important;
}

::v-deep .p-datatable thead th {
  font-size: 12px;
}

::v-deep .p-datatable thead th,
::v-deep .p-datatable tbody td,
::v-deep .p-datatable tfoot td {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  max-width: 10rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 768px) {
    max-width: 5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
