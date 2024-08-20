<template>
  <div class="container">
    <h1 class="title">Torps Fantasy Football League</h1>
    <SelectButton v-model="tab" :options="TABS" :allowEmpty="false" class="title" />
    <div class="actions">
      <Select v-model="source" :options="SOURCES" :allowEmpty="false" />
      <div v-if="isPlayers" class="show-extended">
        <p>Show all player data</p>
        <ToggleSwitch v-model="showExtended" />
      </div>
    </div>
    <ProgressSpinner v-if="loading" />
    <DataTable v-else :value="tableData" scrollable>
      <Column
        v-for="column in tableColumns.filter((c) => showExtended || c.default)"
        :key="column.field"
        :field="column.field"
        :header="column.header"
        :sortable="showExtended && isPlayers"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch, computed } from "vue"

import DataTable from "primevue/datatable"
import Column from "primevue/column"
import ToggleSwitch from "primevue/toggleswitch"
import SelectButton from "primevue/selectbutton"
import ProgressSpinner from "primevue/progressspinner"
import Select from "primevue/select"

import { useRoute, useRouter } from "vue-router"

import { getPlayers, getTeams, getLastUpdated } from "../data"

const $route = useRoute()
const $router = useRouter()

const loading = ref(true)

const tab = ref($route.query.tab || TABS[0])
const source = ref($route.query.source || SOURCES[0])

const playerData = ref([])
const teamData = ref([])
const lastUpdated = ref()
const tableData = ref([])

const tableColumns = ref([])
const showExtended = ref(false)

const isPlayers = computed(() => tab.value === "Players")

const getData = async (newSource) => {
  playerData.value = await getPlayers(newSource.toLowerCase())
  teamData.value = await getTeams(newSource.toLowerCase())
  teamData.value = teamData.value.map((team, index) => ({ ...team, rank: index + 1 }))
  lastUpdated.value = await getLastUpdated()
}

const chooseData = (newTab) => {
  if (newTab === "Players") {
    tableData.value = playerData.value
    tableColumns.value = PLAYER_COLUMNS
  } else {
    tableData.value = teamData.value
    tableColumns.value = TEAM_COLUMNS
  }
}

watch(tab, (tab) => {
  chooseData(tab)
  $router.push({ query: { tab, source: source.value } })
})

watch(source, (source) => {
  loading.value = true
  getData(source)
  $router.push({ query: { tab: tab.value, source } })
  loading.value = false
})

onBeforeMount(async () => {
  await getData(source.value)
  chooseData(tab.value)
  $router.push({ query: { tab: tab.value, source: source.value } })
  loading.value = false
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  align-items: center;
}

.title {
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 24px;
}

.actions {
  display: flex;
  width: 100%;
  height: 2.5rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 12px;
}

::v-deep .p-select-label {
  padding: 0.25rem;
  padding-left: 0.5rem;
}

.show-extended {
  display: flex;
  gap: 1rem;
  align-items: center;
}

::v-deep .p-datatable {
  width: 90vw;
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

::v-deep .p-datatable thead th,
::v-deep .p-datatable tbody td,
::v-deep .p-datatable tfoot td {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  max-width: 10rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 768px) {
    max-width: 5rem;
  }
}
</style>

<script>
const TABS = ["Players", "Teams"]

const SOURCES = ["Firsts", "Club"]

const TEAM_COLUMNS = [
  {
      field: "rank",
      header: "Rank",
      default: true,
    },
  {
    field: "name",
    header: "Team Name",
    default: true,
  },
  {
    field: "owner",
    header: "Owner",
    default: true,
  },
  {
    field: "currentPoints",
    header: "Points",
    default: true,
  },
  {
    field: "points",
    header: "Total",
    default: true,
  },
]

const PLAYER_COLUMNS = [
  {
    field: "player",
    header: "Player",
    default: true,
  },
  {
    field: "games",
    header: "Games",
    default: true,
  },
  {
    field: "goals",
    header: "Goals",
    default: true,
  },
  {
    field: "assists",
    header: "Assists",
    default: true,
  },
  {
    field: "wins",
    header: "Wins",
    default: false,
  },
  {
    field: "losses",
    header: "Losses",
    default: false,
  },
  {
    field: "draws",
    header: "Draws",
    default: false,
  },
  {
    field: "minutes_played",
    header: "Minutes",
    default: false,
  },
  {
    field: "motm_votes",
    header: "Votes",
    default: false,
  },
  {
    field: "yellow_card",
    header: "Yellows",
    default: false,
  },
  {
    field: "red_card",
    header: "Reds",
    default: false,
  },
  {
    field: "own_goal",
    header: "Own Goals",
    default: false,
  },
  {
    field: "clean_sheet",
    header: "Clean Sheets",
    default: false,
  },
  {
    field: "penalty_save",
    header: "Penalty Saves",
    default: false,
  },
  {
    field: "currentPoints",
    header: "Points",
    default: true,
  },
  {
    field: "points",
    header: "Total",
    default: true,
  },
]
</script>
