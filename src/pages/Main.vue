<template>
  <div class="container">
    <SelectButton v-model="tab" :options="TABS" :allowEmpty="false" class="title" />
    <div v-if="isPlayers" class="show-extended">
      <p>Show all player data</p>
      <ToggleSwitch v-model="showExtended" />
    </div>
    <DataTable :value="tableData">
      <Column
        v-for="column in tableColumns.filter((c) => showExtended || c.default)"
        :key="column.field"
        :field="column.field"
        :header="column.header"
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

import { useRoute, useRouter } from "vue-router"

import {
  getPlayers,
  getTeams,
  getGames,
  aggregateGamesOnPlayer,
  filterDataByPlayerNames,
  calculatePointsForTeams,
} from "../data"

const $route = useRoute()
const $router = useRouter()

console.log($route.query.tab)

const props = defineProps(["source"])

const tab = ref($route.query.tab)
const playerData = ref([])
const teamData = ref([])
const tableData = ref([])
const tableColumns = ref([])
const showExtended = ref(false)

const isPlayers = computed(() => tab.value === "Players")

const chooseData = (tab) => {
  if (tab === "Players") {
    tableData.value = playerData.value
    tableColumns.value = PLAYER_COLUMNS
  } else {
    tableData.value = teamData.value
    tableColumns.value = TEAM_COLUMNS
  }
}

watch(tab, (tab) => {
  $router.push({ query: { tab } })
  chooseData(tab)
})

onBeforeMount(async () => {
  const players = await getPlayers(props.source)
  const games = await getGames()
  const aggregated = aggregateGamesOnPlayer(games)
  const playerNames = players.map((player) => player.player)
  const aggregatedPlayerData = filterDataByPlayerNames(aggregated, playerNames)
  aggregatedPlayerData.sort((a, b) => b.points - a.points)
  playerData.value = aggregatedPlayerData

  const teams = await getTeams(props.source)
  const summed = calculatePointsForTeams(teams, aggregatedPlayerData)
  summed.sort((a, b) => b.points - a.points)
  teamData.value = summed

  chooseData(tab.value)
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1rem 10rem;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.title {
  margin-bottom: 1rem;
}

::v-deep .p-selectbutton * {
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
}

.show-extended {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    display: None;
  }
}

::v-deep .p-datatable-table {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  width: initial;

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
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>

<script>
const TABS = ["Players", "Teams"]

const TEAM_COLUMNS = [
  {
    field: "owner",
    header: "Owner",
    default: true,
  },
  {
    field: "points",
    header: "Points",
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
    field: "minutes_played",
    header: "Minutes",
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
    field: "motm_votes",
    header: "Votes",
    default: false,
  },
  {
    field: "clean_sheet",
    header: "Clean Sheets",
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
    field: "penalty_save",
    header: "Penalty Saves",
    default: false,
  },
  {
    field: "points",
    header: "Points",
    default: true,
  },
]
</script>
