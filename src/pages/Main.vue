<template>
  <div class="container">
    <div class="title">
      <img src="../assets/torps_logo.png" alt="logo" />
      <span class="text">
        <h1>Torps Fantasy League</h1>
        <p>Last updated: {{ lastUpdated ? dateFormat(lastUpdated, "yyyy-mm-dd HH:MM") : "" }}</p>
      </span>
    </div>
    <SelectButton v-model="tab" :options="TABS" :allowEmpty="false" class="selector" :disabled="!ready" />
    <div class="actions">
      <Select v-model="source" :options="SOURCES" :allowEmpty="false" :disabled="!ready" />
      <div v-if="isPlayers" class="show-extended">
        <p>Show all player data</p>
        <ToggleSwitch v-model="isExtended" :disabled="!ready" />
      </div>
    </div>
    <ProgressSpinner
      v-if="loading"
      style="width: 50px; height: 50px"
      strokeWidth="4"
      fill="transparent"
      animationDuration=".5s"
    />
    <template v-else>
      <!-- hilarious but primevue tables are so slow that it's better not to unmount them -->
      <Table
        v-if="(isFirsts && isPlayers && isExtended) || backgroundMount"
        :data="firstsPlayers"
        :columns="PLAYER_COLUMNS"
        :tableHeight="tableHeight"
        :display="isFirsts && isPlayers && isExtended"
        :sortable="true"
      />
      <Table
        v-if="(isFirsts && isPlayers && !isExtended) || backgroundMount"
        :data="firstsPlayers"
        :columns="DEFAULT_PLAYER_COLUMNS"
        :tableHeight="tableHeight"
        :display="isFirsts && isPlayers && !isExtended"
        :sortable="false"
      />
      <Table
        v-if="(!isFirsts && isPlayers && isExtended) || backgroundMount"
        :data="clubPlayers"
        :columns="PLAYER_COLUMNS"
        :tableHeight="tableHeight"
        :display="!isFirsts && isPlayers && isExtended"
        :sortable="true"
      />
      <Table
        v-if="(!isFirsts && isPlayers && !isExtended) || backgroundMount"
        :data="clubPlayers"
        :columns="DEFAULT_PLAYER_COLUMNS"
        :tableHeight="tableHeight"
        :display="!isFirsts && isPlayers && !isExtended"
        :sortable="false"
      />
      <Table
        v-if="(isFirsts && !isPlayers) || backgroundMount"
        :data="firstsTeams"
        :columns="TEAM_COLUMNS"
        :tableHeight="tableHeight"
        :display="isFirsts && !isPlayers"
        :sortable="false"
      />
      <Table
        v-if="(!isFirsts && !isPlayers) || backgroundMount"
        :data="clubTeams"
        :columns="TEAM_COLUMNS"
        :tableHeight="tableHeight"
        :display="!isFirsts && !isPlayers"
        :sortable="false"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, watch, computed, nextTick } from "vue"

import ToggleSwitch from "primevue/toggleswitch"
import SelectButton from "primevue/selectbutton"
import ProgressSpinner from "primevue/progressspinner"
import Select from "primevue/select"
import dateFormat from "dateformat"
import Table from "../components/Table.vue"

import { useRoute, useRouter } from "vue-router"

import { getPlayers, getTeams, getLastUpdated } from "../data"
import { onMounted } from "vue"

const $route = useRoute()
const $router = useRouter()

// constants
let firstsPlayers
let clubPlayers
let firstsTeams
let clubTeams
let lastUpdated
let tableHeight

// reactive
const loading = ref(true)
const backgroundMount = ref(false)
const ready = ref(false)

const tab = ref($route.query.tab || TABS[0])
const source = ref($route.query.source || SOURCES[0])
const isExtended = ref(window.innerHeight > 768)

const isFirsts = computed(() => source.value === "Firsts")
const isPlayers = computed(() => tab.value === "Players")

const getTableHeight = () => {
  const bottomOfActions = document.querySelector(".actions").getBoundingClientRect().bottom
  const bottomOfPage = window.visualViewport.height
  return bottomOfPage - bottomOfActions - 32 + "px"
}

watch(tab, (newTab) => {
  $router.push({ query: { tab: newTab, source: source.value } })
})

watch(source, (newSource) => {
  $router.push({ query: { tab: tab.value, source: newSource } })
})

onMounted(async () => {
  tableHeight = getTableHeight()

  firstsPlayers = await getPlayers("firsts")
  clubPlayers = await getPlayers("club")

  firstsTeams = await getTeams("firsts")
  firstsTeams = firstsTeams.map((team, index) => ({ ...team, rank: index + 1 }))

  clubTeams = await getTeams("club")
  clubTeams = clubTeams.map((team, index) => ({ ...team, rank: index + 1 }))

  lastUpdated = await getLastUpdated()
  lastUpdated = new Date(lastUpdated.lastUpdated)

  $router.push({ query: { tab: tab.value, source: source.value } })

  backgroundMount.value = true
  setTimeout(() => {
    backgroundMount.value = true
    nextTick(() => {
      ready.value = true
    })
  }, 100)

  loading.value = false
})
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.title img {
  margin-right: 1rem;
  height: 60px;
  width: 60px;
}

.title h1 {
  margin-bottom: 0;
  margin-top: 0;
  font-size: 24px;
}

.title p {
  margin: 0;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
  font-size: 12px;
}

.container {
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  align-items: center;
}

.selector {
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 24px;
  display: flex;
  align-items: center;
}

.actions {
  display: flex;
  width: 100%;
  height: 2.5rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 12px;
  }
}

::v-deep .p-disabled.p-select {
  border-color: var(--p-select-disabled-background);
}

::v-deep .p-disabled .p-select-dropdown-icon {
  color: var(--p-select-disabled-color);
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
</style>

<script>
const TABS = ["Players", "Teams"]

const SOURCES = ["Club", "Firsts"]

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
    field: "position",
    header: "Position",
    default: false,
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

const DEFAULT_PLAYER_COLUMNS = PLAYER_COLUMNS.filter((column) => column.default)
</script>
