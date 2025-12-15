<template>
  <div class="minimal-picker">
    <!-- Team Name -->
    <div class="input-group">
      <label><strong>Team Name</strong></label>
      <InputText 
        v-model="localTeam.teamName" 
        placeholder="Enter your team name"
        @input="updateTeam"
      />
    </div>

    <!-- Validation and Budget -->
    <div class="validation-container">
      <div class="validation-message" :class="{ valid: isValid, invalid: !isValid }">
        <strong>{{isValid ? '' : 'Invalid Team: '}}</strong> {{ validationMessage }}
      </div>
      <div class="budget-display">
        £{{ TEAM_RULES.maxBudget - currentBudget }}
      </div>
    </div>

    <!-- Export Button -->
    <Button 
      label="Copy Team to Clipboard" 
      icon="pi pi-copy"
      :disabled="!isValid"
      @click="$emit('export-team')"
      class="export-btn"
    />

    <!-- Goalkeeper -->
    <div class="input-group">
      <label><strong>Goalkeeper</strong></label>
      <Select 
        v-model="localTeam.goalkeeper" 
        :options="goalkeeperOptions"
        optionLabel="displayName"
        placeholder="Select goalkeeper"
        @change="updateTeam"
        class="position-select"
      />
      <div class="selected-players">
        {{ localTeam.goalkeeper ? `🥅 ${localTeam.goalkeeper.playerName}` : 'None selected' }}
      </div>
    </div>

    <!-- Position Selects -->
    <div class="input-group">
      <label><strong>Defenders</strong></label>
      <MultiSelect 
        v-model="localTeam.defenders" 
        :options="defenderOptions"
        optionLabel="displayName"
        placeholder="Select defenders"
        @change="updateTeam"
        :maxSelectedLabels="0"
        selectedItemsLabel="{0} defenders selected"
        class="position-select"
      />
      <div class="selected-players">
        {{ localTeam.defenders.length > 0 ? `🛡️ ${localTeam.defenders.map(p => p.playerName).join(', ')}` : 'None selected' }}
      </div>
    </div>

    <div class="input-group">
      <label><strong>Midfielders</strong></label>
      <MultiSelect 
        v-model="localTeam.midfielders" 
        :options="midfielderOptions"
        optionLabel="displayName"
        placeholder="Select midfielders"
        @change="updateTeam"
        :maxSelectedLabels="0"
        selectedItemsLabel="{0} midfielders selected"
        class="position-select"
      />
      <div class="selected-players">
        {{ localTeam.midfielders.length > 0 ? `⚽ ${localTeam.midfielders.map(p => p.playerName).join(', ')}` : 'None selected' }}
      </div>
    </div>

    <div class="input-group">
      <label><strong>Attackers</strong></label>
      <MultiSelect 
        v-model="localTeam.attackers" 
        :options="attackerOptions"
        optionLabel="displayName"
        placeholder="Select attackers"
        @change="updateTeam"
        :maxSelectedLabels="0"
        selectedItemsLabel="{0} attackers selected"
        class="position-select"
      />
      <div class="selected-players">
        {{ localTeam.attackers.length > 0 ? `🎯 ${localTeam.attackers.map(p => p.playerName).join(', ')}` : 'None selected' }}
      </div>
    </div>

    <!-- Captain and 12th Man -->
    <div class="input-group">
      <label><strong>Captain (2x Points)</strong></label>
      <Select 
        v-model="localTeam.captain" 
        :options="allSelectedPlayers"
        optionLabel="displayName"
        placeholder="Select captain"
        @change="updateTeam"
      />
    </div>

    <div class="input-group">
      <label><strong>12th Man</strong></label>
      <Select 
        v-model="localTeam.twelfthMan" 
        :options="twelfthManOptions"
        optionLabel="displayName"
        placeholder="Select 12th man"
        @change="updateTeam"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'
import { TEAM_RULES } from '../../config/teamRules'

const props = defineProps(['players', 'selectedTeam', 'teamValidation'])
const emit = defineEmits(['update-team', 'export-team'])

const localTeam = ref({
  teamName: '',
  defenders: [],
  midfielders: [],
  attackers: [],
  goalkeeper: null,
  captain: null,
  twelfthMan: null
})

// Player options by position with display names
const defenderOptions = computed(() => 
  props.players.filter(p => p.position === 'DEF').map(p => ({
    ...p,
    displayName: `${p.playerName} (${p.price}, Team ${p.team})`
  }))
)

const midfielderOptions = computed(() => 
  props.players.filter(p => p.position === 'MID').map(p => ({
    ...p,
    displayName: `${p.playerName} (${p.price}, Team ${p.team})`
  }))
)

const attackerOptions = computed(() => 
  props.players.filter(p => p.position === 'FOR').map(p => ({
    ...p,
    displayName: `${p.playerName} (${p.price}, Team ${p.team})`
  }))
)

const goalkeeperOptions = computed(() => 
  props.players.filter(p => p.position === 'GK').map(p => ({
    ...p,
    displayName: `${p.playerName} (${p.price}, Team ${p.team})`
  }))
)

const allSelectedPlayers = computed(() => {
  const players = [
    ...localTeam.value.defenders,
    ...localTeam.value.midfielders,
    ...localTeam.value.attackers
  ]
  if (localTeam.value.goalkeeper) {
    players.push(localTeam.value.goalkeeper)
  }
  return players
})

const twelfthManOptions = computed(() => {
  // Get all currently selected players in the main 11
  const selectedPlayerNames = allSelectedPlayers.value.map(p => p.playerName)
  
  return [
    { playerName: 'Yourself (Free)', displayName: 'Yourself (Free)', position: 'SELF', team: 'SELF', price: '£0' },
    ...props.players
      .filter(p => p.team === 'NEW' && !selectedPlayerNames.includes(p.playerName))
      .map(p => ({
        ...p,
        displayName: `${p.playerName} (Team ${p.team})` // Removed price from display
      }))
  ]
})

// Simple validation logic using TEAM_RULES config
const validation = computed(() => {
  const allPlayers = allSelectedPlayers.value
  const totalPlayers = allPlayers.length
  
  if (!localTeam.value.teamName.trim()) {
    return { valid: false, message: 'Enter a team name' }
  }
  
  if (!localTeam.value.goalkeeper) {
    return { valid: false, message: 'Select a goalkeeper' }
  }
  
  if (totalPlayers === 0) {
    return { valid: false, message: 'Select some players' }
  }
  
  if (totalPlayers !== TEAM_RULES.totalPlayers) {
    return { valid: false, message: `Select ${TEAM_RULES.totalPlayers} players (currently ${totalPlayers})` }
  }
  
  // Check formation
  const defCount = localTeam.value.defenders.length
  const midCount = localTeam.value.midfielders.length  
  const attCount = localTeam.value.attackers.length
  
  if (defCount < TEAM_RULES.defenders.min || defCount > TEAM_RULES.defenders.max) {
    return { valid: false, message: `Select ${TEAM_RULES.defenders.min}-${TEAM_RULES.defenders.max} defenders` }
  }
  
  if (midCount < TEAM_RULES.midfielders.min || midCount > TEAM_RULES.midfielders.max) {
    return { valid: false, message: `Select ${TEAM_RULES.midfielders.min}-${TEAM_RULES.midfielders.max} midfielders` }
  }
  
  if (attCount < TEAM_RULES.attackers.min || attCount > TEAM_RULES.attackers.max) {
    return { valid: false, message: `Select ${TEAM_RULES.attackers.min}-${TEAM_RULES.attackers.max} attackers` }
  }
  
  // Check budget
  const totalCost = allPlayers.reduce((sum, player) => sum + parseFloat(player.price.replace('£', '')), 0)
  if (totalCost > TEAM_RULES.maxBudget) {
    return { valid: false, message: `Over budget: £${totalCost}/£${TEAM_RULES.maxBudget}` }
  }
  
  // Check team distribution
  const teamCounts = {}
  const newPlayerCount = allPlayers.filter(p => p.team === 'NEW').length
  
  allPlayers.forEach(player => {
    if (player.team !== 'NEW') {
      teamCounts[player.team] = (teamCounts[player.team] || 0) + 1
    }
  })
  
  // Only check for new players if required by config
  if (TEAM_RULES.requireNewPlayer && newPlayerCount < TEAM_RULES.minNewPlayers) {
    return { valid: false, message: `Select at least ${TEAM_RULES.minNewPlayers} NEW player${TEAM_RULES.minNewPlayers > 1 ? 's' : ''}` }
  }
  
  const maxFromSingleTeam = Math.max(...Object.values(teamCounts), 0)
  if (maxFromSingleTeam > TEAM_RULES.maxPlayersFromSingleTeam) {
    return { valid: false, message: `Max ${TEAM_RULES.maxPlayersFromSingleTeam} players from one team` }
  }
  
  const teamsRepresented = Object.keys(teamCounts).length
  if (teamsRepresented < TEAM_RULES.totalTeamsInLeague) {
    return { valid: false, message: `Select players from all ${TEAM_RULES.totalTeamsInLeague} teams` }
  }
  
  if (!localTeam.value.captain) {
    return { valid: false, message: 'Select a captain' }
  }
  
  if (!localTeam.value.twelfthMan) {
    return { valid: false, message: 'Select a 12th man' }
  }
  
  return { valid: true, message: 'Your team is valid!' }
})

const isValid = computed(() => validation.value.valid)
const validationMessage = computed(() => validation.value.message)

const currentBudget = computed(() => {
  const totalCost = allSelectedPlayers.value.reduce((sum, player) => sum + parseFloat(player.price.replace('£', '')), 0)
  return totalCost.toFixed(2)
})

const updateTeam = () => {
  // Convert to the format expected by parent
  const teamData = {
    ...localTeam.value,
    players: allSelectedPlayers.value,
    formation: getFormation()
  }
  emit('update-team', teamData)
}

const getFormation = () => {
  const defCount = localTeam.value.defenders.length
  const midCount = localTeam.value.midfielders.length  
  const attCount = localTeam.value.attackers.length
  return `${defCount}-${midCount}-${attCount}`
}

// Watch for prop changes
watch(() => props.selectedTeam, (newTeam) => {
  if (newTeam) {
    localTeam.value.teamName = newTeam.teamName || ''
    localTeam.value.captain = newTeam.captain
    localTeam.value.twelfthMan = newTeam.twelfthMan
    
    // Split players by position if they exist
    if (newTeam.players) {
      localTeam.value.defenders = newTeam.players.filter(p => p.position === 'DEF')
      localTeam.value.midfielders = newTeam.players.filter(p => p.position === 'MID')
      localTeam.value.attackers = newTeam.players.filter(p => p.position === 'FOR')
      localTeam.value.goalkeeper = newTeam.players.find(p => p.position === 'GK') || null
    }
  }
}, { immediate: true, deep: true })
</script>

<style scoped>
.minimal-picker {
  padding: 1rem;
  width: 100%;
  margin: 0 auto;
}

.input-group {
  margin-bottom: 1rem;
  width: 100%;
  min-width: 0;
  overflow: hidden;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--p-text-color);
  font-size: 0.9rem;
}

.position-select,
.input-group .p-inputtext,
.input-group .p-select {
  width: 100%;
}

.selected-players {
  font-size: 0.8rem;
  color: var(--p-text-color-secondary);
  margin-top: 0.5rem;
  padding: 0.75rem;
  line-height: 1.4;
  background: var(--p-surface-50);
  border: 1px solid var(--p-surface-200);
  border-radius: 0.5rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  box-sizing: border-box;
}

.validation-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.validation-message {
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-align: center;
  font-size: 0.9rem;
  flex: 1;
  min-width: 0;
}

.validation-message.valid {
  background: var(--p-green-50);
  color: var(--p-green-700);
  border: 1px solid var(--p-green-200);
}

.validation-message.invalid {
  background: var(--p-red-50);
  color: var(--p-red-700);
  border: 1px solid var(--p-red-200);
}

.budget-display {
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: var(--p-gray-50);
  color: var(--p-gray-700);
  border: 1px solid var(--p-gray-200);
  font-weight: 500;
  font-size: 0.9rem;
  white-space: nowrap;
}

.export-btn {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  margin-bottom: 1rem;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .minimal-picker {
    padding: 0.75rem;
  }
  
  .input-group {
    margin-bottom: 0.75rem;
  }
  
  .input-group label {
    margin-bottom: 0.4rem;
    font-size: 0.85rem;
  }
  
  .selected-players {
    font-size: 0.75rem;
    margin-top: 0.4rem;
    padding: 0.6rem;
  }
  
  .validation-container {
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
  }
  
  .validation-message {
    padding: 0.6rem;
    font-size: 0.85rem;
  }
  
  .budget-display {
    padding: 0.6rem;
    font-size: 0.85rem;
  }
}
</style> 