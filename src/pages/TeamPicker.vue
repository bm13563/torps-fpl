<template>
  <div class="container">
    <!-- Header matching Main.vue exactly -->
    <div class="title">
      <img src="../assets/torps_logo.png" alt="logo" />
      <span class="text">
        <h1>Team Builder</h1>
        <p class="back-link" @click="goBack">
          ⬅️ Back to League
        </p>
      </span>
    </div>

    <!-- Tab Navigation using SelectButton like Main.vue -->
    <SelectButton 
      v-model="activeTabLabel" 
      :options="TAB_OPTIONS" 
      :allowEmpty="false" 
      class="selector"
    />

    <!-- Tab Content -->
    <div class="tab-content">
      <RulesTab v-if="activeTabLabel === 'Rules'" />
      <StatsTab v-if="activeTabLabel === 'Player Stats'" :players="players" />
      <PickerTab 
        v-if="activeTabLabel === 'Pick Team'"
        :players="players" 
        :selectedTeam="selectedTeam"
        :teamValidation="teamValidation"
        @update-team="updateTeam"
        @export-team="exportTeam"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import RulesTab from '../components/teamPicker/RulesTab.vue'
import StatsTab from '../components/teamPicker/StatsTab.vue'
import PickerTab from '../components/teamPicker/PickerTab.vue'

const router = useRouter()
const activeTabLabel = ref('Rules')
const players = ref([])
const selectedTeam = ref({
  teamName: '',
  defenders: [],
  midfielders: [],
  attackers: [],
  players: [],
  captain: null,
  twelfthMan: null,
  formation: '4-4-2'
})

// Simplified validation - now handled in PickerTab
const teamValidation = computed(() => {
  return {
    isValid: () => true // Validation is now in the child component
  }
})

const updateTeam = (teamData) => {
  selectedTeam.value = { ...selectedTeam.value, ...teamData }
}

const exportTeam = () => {
  const team = selectedTeam.value
  const formation = team.formation || 'Custom'
  
  // Gather all players from the new structure
  const allPlayers = []
  if (team.goalkeeper) allPlayers.push(team.goalkeeper)
  if (team.defenders) allPlayers.push(...team.defenders)
  if (team.midfielders) allPlayers.push(...team.midfielders)  
  if (team.attackers) allPlayers.push(...team.attackers)
  
  const players = allPlayers.map(p => `${p.playerName} (${p.position}, ${p.team}, ${p.price})`).join('\n')
  const captain = team.captain ? `${team.captain.playerName} (${team.captain.position}, ${team.captain.team})` : 'Not selected'
  const twelfthMan = team.twelfthMan ? `${team.twelfthMan.playerName}` : 'Not selected'
  const totalCost = allPlayers.reduce((sum, player) => sum + parseFloat(player.price.replace('£', '')), 0)
  
  const teamText = `TEAM SUBMISSION - ${team.teamName || 'Unnamed Team'}

Formation: ${formation}
Total Cost: £${totalCost.toFixed(2)}

PLAYERS:
${players}

CAPTAIN: ${captain}
12TH MAN: ${twelfthMan}
`

  navigator.clipboard.writeText(teamText).then(() => {
    console.log('Team copied to clipboard!')
    // Could add a toast notification here
  }).catch(err => {
    console.error('Failed to copy team to clipboard:', err)
    // Fallback: could show the text in a modal or alert
  })
}

const goBack = () => {
  router.push('/')
}

// Load player data when page mounts
onMounted(async () => {
  try {
    // Load the player picker CSV data - using same pattern as JSON files
    const csvPath = import.meta.env.VITE_FILE_ROOT + 'player_picker.csv'
    console.log('Loading CSV from:', csvPath)
    
    const response = await fetch(csvPath)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const csvText = await response.text()
    
    // Parse CSV (simple implementation)
    const lines = csvText.split('\n')
    const headers = lines[0].split('\t')
    
    players.value = lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split('\t')
        return {
          playerName: values[0],
          position: values[1],
          team: values[2],
          price: values[3],
          totalPoints: values[4] || '0',
          pointsPerGame: values[5] || '0',
          gamesPlayed: values[6] || '0',
          motmVotes: values[7] || '0',
          goals: values[8] || '0',
          assists: values[9] || '0',
          cleanSheets: values[10] || '0',
          yellowCards: values[11] || '0',
          redCards: values[12] || '0'
        }
      })
      
    console.log(`Loaded ${players.value.length} players`)
  } catch (error) {
    console.error('Failed to load player data:', error)
    console.error('VITE_FILE_ROOT:', import.meta.env.VITE_FILE_ROOT)
    // Could show user-friendly error message here
  }
})
</script>

<script>
const TAB_OPTIONS = ["Rules", "Player Stats", "Pick Team"]
</script>

<style scoped>
/* Copy exact styles from Main.vue */
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
  line-height: 1.2;
}

.title .text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.back-link {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.back-link:hover {
  opacity: 0.8;
}

.arrow {
  font-size: 16px;
  margin-right: 4px;
  vertical-align: middle;
  line-height: 1;
}

.container {
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  align-items: center;
  width: 100%;
}

.selector {
  margin-top: 0;
  text-align: center;
  font-size: 24px;
  display: flex;
  align-items: center;
}

.tab-content {
  width: 100%;
  max-width: 1200px;
}

@media (max-width: 768px) {
  .selector {
    font-size: 18px;
  }
  
  .title h1 {
    font-size: 20px;
  }
}
</style> 