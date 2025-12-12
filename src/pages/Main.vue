<template>
  <div class="container">
    <div class="title">
      <img src="../assets/torps_logo.png" alt="logo" />
      <span class="text">
        <h1>Torps Fantasy League</h1>
        <p>Last updated: {{ lastUpdated ? dateFormat(lastUpdated, "yyyy-mm-dd HH:MM") : "" }}</p>
      </span>
    </div>
    <SelectButton v-model="tab" :options="TABS" :allowEmpty="false" class="selector"/>
    <div class="actions">
      <Select v-model="season" :options="SEASONS" :allowEmpty="false"/>
      <div v-if="isPlayers" class="show-extended">
        <ToggleSwitch v-model="isExtended"/>
        <p>All data</p>
      </div>
      <div class="tom-newman-mode">
        <ToggleSwitch v-model="tomNewmanMode"/>
        <p>Tom Newman mode</p>
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
      <!-- data is static so dont unmount once rendered -->
      <Table
        v-if="shouldMount(isPlayers && isExtended, 'playersExtended')"
        :data="players"
        :columns="PLAYER_COLUMNS"
        :tableHeight="tableHeight"
        :display="isPlayers && isExtended"
        :sortable="true"
      />
      <Table
        v-if="shouldMount(isPlayers && !isExtended, 'playersDefault')"
        :data="players"
        :columns="DEFAULT_PLAYER_COLUMNS"
        :tableHeight="tableHeight"
        :display="isPlayers && !isExtended"
        :sortable="false"
      />
      <Table
        v-if="shouldMount(!isPlayers, 'teams')"
        :data="teams"
        :columns="TEAM_COLUMNS"
        :tableHeight="tableHeight"
        :display="!isPlayers"
        :sortable="false"
      />
      
      <!-- Floating Action Button for Team Builder -->
      <Button 
        label="Build Team" 
        icon="pi pi-users"
        @click="goToTeamPicker"
        class="fab-team-builder"
        aria-label="Build your fantasy team"
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
import Button from "primevue/button"

import { useRoute, useRouter } from "vue-router"

import { getPlayers, getTeams, getLastUpdated } from "../data"
import { onMounted } from "vue"

const $route = useRoute()
const $router = useRouter()

// constants
let tableHeight
let mounted = []

// reactive
const loading = ref(true)
const lastUpdated = ref(null)
const tomNewmanMode = ref(false)
const players = ref([])
const teams = ref([])
const originalPlayers = ref([])
const originalTeams = ref([])

const tab = ref($route.query.tab || TABS[0])
const season = ref($route.query.season || SEASONS[0])
const isExtended = ref(window.innerHeight > 768)

const isPlayers = computed(() => tab.value === "Players")

const hasEmptyTeams = computed(() => {
  return !teams || teams.length === 0 || teams.every(team => !team.name || !team.owner)
})

const getTableHeight = () => {
  const bottomOfActions = document.querySelector(".actions").getBoundingClientRect().bottom
  const bottomOfPage = window.visualViewport.height
  return bottomOfPage - bottomOfActions - 32
}

const shouldMount = (condition, identifier) => {
  if (condition || mounted.includes(identifier)) {
    if (!mounted.includes(identifier)) {
      mounted.push(identifier)
    }
    return true
  }
  return false
}

const goToTeamPicker = () => {
  $router.push('/team-picker')
}

const loadData = async () => {
  loading.value = true
  
  originalPlayers.value = await getPlayers(season.value)
  originalTeams.value = await getTeams(season.value)
  originalTeams.value = originalTeams.value.map((team, index) => ({ ...team, rank: index + 1 }))
  
  // Apply Tom Newman mode if active
  applyTomNewmanMode()
  
  loading.value = false
}

const applyTomNewmanMode = () => {
  if (tomNewmanMode.value) {
    // Transform all player names to "Tom Newman"
    players.value = originalPlayers.value.map(player => ({
      ...player,
      Player: 'Tom Newman'
    }))
    
    // Transform all team owner names to "Tom Newman"
    teams.value = originalTeams.value.map(team => ({
      ...team,
      owner: 'Tom Newman'
    }))
  } else {
    // Use original data
    players.value = [...originalPlayers.value]
    teams.value = [...originalTeams.value]
  }
}

watch(tomNewmanMode, () => {
  applyTomNewmanMode()
})

watch(tab, (newTab) => {
  $router.push({ query: { tab: newTab, season: season.value } })
})

watch(season, async (newSeason) => {
  $router.push({ query: { tab: tab.value, season: newSeason } })
  await loadData()
})

onMounted(async () => {
  tableHeight = getTableHeight()

  await loadData()

  const lastUpdatedData = await getLastUpdated()
  lastUpdated.value = new Date(lastUpdatedData.lastUpdated)

  $router.push({ query: { tab: tab.value, season: season.value } })
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
    gap: 0.5rem;
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
  gap: 0.25rem;
  align-items: center;
}

.show-extended p {
  font-size: 14px;
  white-space: nowrap;
  margin-left: -0.25rem;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
}

.show-extended ::v-deep .p-toggleswitch {
  transform: scale(0.75);
}

.tom-newman-mode {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.tom-newman-mode p {
  font-size: 14px;
  white-space: nowrap;
  margin-left: -0.25rem;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
}

.tom-newman-mode ::v-deep .p-toggleswitch {
  transform: scale(0.75);
}

/* Floating Action Button */
.fab-team-builder {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 2rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    bottom: 1rem;
    right: 1rem;
    padding: 0.7rem 1.1rem;
    font-size: 0.9rem;
  }
}

.fab-team-builder:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.fab-team-builder:active {
  transform: translateY(0);
}
</style>

<script>
const TABS = ["Players", "Teams"]

const SEASONS = ["25/26", "24/25"]

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
    field: "GW Points",
    header: "Points",
    default: true,
  },
  {
    field: "Total Points",
    header: "Total",
    default: true,
  },
]

const PLAYER_COLUMNS = [
  {
    field: "Player",
    header: "Player",
    default: true,
  },
  {
    field: "Position",
    header: "Position",
    default: false,
  },
  {
    field: "Games",
    header: "Games",
    default: true,
  },
  {
    field: "Goals",
    header: "Goals",
    default: true,
  },
  {
    field: "Assists",
    header: "Assists",
    default: true,
  },
  {
    field: "Wins",
    header: "Wins",
    default: false,
  },
  {
    field: "Losses",
    header: "Losses",
    default: false,
  },
  {
    field: "Draws",
    header: "Draws",
    default: false,
  },
  {
    field: "Minutes Played",
    header: "Minutes",
    default: false,
  },
  {
    field: "MOTM Votes",
    header: "Votes",
    default: false,
  },
  {
    field: "Yellow Cards",
    header: "Yellows",
    default: false,
  },
  {
    field: "Red Cards",
    header: "Reds",
    default: false,
  },
  {
    field: "Own Goals",
    header: "Own Goals",
    default: false,
  },
  {
    field: "Clean Sheet",
    header: "Clean Sheets",
    default: false,
  },
  {
    field: "Penalty Saves",
    header: "Penalty Saves",
    default: false,
  },
  {
    field: "GW Points",
    header: "Points",
    default: true,
  },
  {
    field: "Points",
    header: "Total",
    default: true,
  },
]

const DEFAULT_PLAYER_COLUMNS = PLAYER_COLUMNS.filter((column) => column.default)
</script>
