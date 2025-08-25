<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <!-- Close button in top right -->
      <button class="close-button" @click="goBack" aria-label="Close">
        ×
      </button>
      
      <!-- Header matching Main.vue but without back link -->
      <div class="title">
        <img src="../assets/torps_logo.png" alt="logo" />
        <span class="text">
          <h1>Team Builder</h1>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import RulesTab from '../components/teamPicker/RulesTab.vue'
import StatsTab from '../components/teamPicker/StatsTab.vue'
import PickerTab from '../components/teamPicker/PickerTab.vue'

const router = useRouter()
const route = useRoute()

// Initialize tab from URL query parameter, default to 'Rules'
const activeTabLabel = ref(route.query.tab || 'Rules')

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
  router.push('/?tab=Teams&season=25/26')
}

// Watch for tab changes and update URL
watch(activeTabLabel, (newTab) => {
  router.push({ 
    path: '/team-picker', 
    query: { tab: newTab } 
  })
})

// Load player data when page mounts
onMounted(async () => {
  // Set initial URL with tab parameter if not already present
  if (!route.query.tab) {
    router.push({ 
      path: '/team-picker', 
      query: { tab: activeTabLabel.value } 
    })
  }
  
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
/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
}

/* Modal container */
.modal-container {
  background: #fffefd;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

/* Close button */
.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
  font-weight: normal;
  line-height: 1;
  font-family: Arial, sans-serif;
}

.close-button:hover {
  background: #e9ecef;
  color: #333;
  border-color: #adb5bd;
}

/* Adjust title to not conflict with close button */
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 0;
  padding-right: 3rem;
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

.title .text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

/* Mobile optimizations */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .modal-container {
    max-height: 95vh;
    padding: 1rem;
    border-radius: 8px;
  }
  
  .close-button {
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.25rem;
    width: 36px;
    height: 36px;
  }
  
  .title {
    padding-right: 2.5rem;
  }
  
  .selector {
    font-size: 18px;
  }
}
</style> 