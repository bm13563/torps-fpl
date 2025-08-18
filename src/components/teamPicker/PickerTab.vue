<template>
  <div class="picker-container">
    <!-- Team Header -->
    <div class="team-header">
      <div class="team-name-section">
        <label>Team Name:</label>
        <InputText 
          v-model="localTeam.teamName" 
          placeholder="Enter your team name"
          @input="updateTeam"
        />
      </div>
      <div class="formation-section">
        <label>Formation:</label>
        <Select 
          v-model="localTeam.formation" 
          :options="formations" 
          @change="updateTeam"
        />
      </div>
    </div>

    <!-- Validation Status -->
    <div class="validation-panel">
      <h3>Team Status</h3>
      <div class="validation-items">
        <div class="validation-item" :class="{ valid: teamValidation.validPlayerCount }">
          <i :class="teamValidation.validPlayerCount ? 'pi pi-check' : 'pi pi-times'"></i>
          <span>11 Players Selected ({{ selectedTeam.players.length }}/11)</span>
        </div>
        <div class="validation-item" :class="{ valid: teamValidation.validBudget }">
          <i :class="teamValidation.validBudget ? 'pi pi-check' : 'pi pi-times'"></i>
          <span>Budget: £{{ teamValidation.totalCost }}/£100</span>
        </div>
        <div class="validation-item" :class="{ valid: teamValidation.hasNewPlayer }">
          <i :class="teamValidation.hasNewPlayer ? 'pi pi-check' : 'pi pi-times'"></i>
          <span>At least 1 NEW player</span>
        </div>
        <div class="validation-item" :class="{ valid: teamValidation.hasAllTeams }">
          <i :class="teamValidation.hasAllTeams ? 'pi pi-check' : 'pi pi-times'"></i>
          <span>At least 1 from each team</span>
        </div>
        <div class="validation-item" :class="{ valid: teamValidation.maxFromSingleTeam }">
          <i :class="teamValidation.maxFromSingleTeam ? 'pi pi-check' : 'pi pi-times'"></i>
          <span>Max 4 from single team</span>
        </div>
        <div class="validation-item" :class="{ valid: teamValidation.hasCaptain }">
          <i :class="teamValidation.hasCaptain ? 'pi pi-check' : 'pi pi-times'"></i>
          <span>Captain selected</span>
        </div>
        <div class="validation-item" :class="{ valid: teamValidation.hasTwelfthMan }">
          <i :class="teamValidation.hasTwelfthMan ? 'pi pi-check' : 'pi pi-times'"></i>
          <span>12th man selected</span>
        </div>
      </div>
    </div>

    <!-- Team Display -->
    <div class="team-display">
      <h3>Your Team</h3>
      <div class="formation-grid" :class="`formation-${localTeam.formation.replace('-', '')}`">
        <div v-for="position in formationLayout" :key="position.id" class="position-slot">
          <div 
            class="player-slot" 
            :class="{ 
              filled: position.player, 
              captain: position.player && localTeam.captain?.playerName === position.player.playerName 
            }"
            @click="selectPlayerForPosition(position)"
          >
            <div v-if="position.player" class="selected-player">
              <span class="player-name">{{ position.player.playerName }}</span>
              <span class="player-details">{{ position.player.position }} • {{ position.player.team }} • {{ position.player.price }}</span>
              <Button 
                icon="pi pi-times" 
                class="p-button-text p-button-sm remove-btn"
                @click.stop="removePlayer(position)"
              />
              <Button 
                v-if="!isCaptainOrTwelfthMan(position.player)"
                :icon="localTeam.captain?.playerName === position.player.playerName ? 'pi pi-star-fill' : 'pi pi-star'"
                class="p-button-text p-button-sm captain-btn"
                @click.stop="setCaptain(position.player)"
              />
            </div>
            <div v-else class="empty-slot">
              <i class="pi pi-plus"></i>
              <span>{{ position.positionType }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Captain & 12th Man -->
    <div class="special-selections">
      <div class="captain-section">
        <h4>Captain (2x Points)</h4>
        <Select 
          v-model="localTeam.captain" 
          :options="eligibleCaptains"
          optionLabel="playerName"
          placeholder="Select Captain"
          @change="updateTeam"
        />
      </div>
      <div class="twelfth-man-section">
        <h4>12th Man</h4>
        <Select 
          v-model="localTeam.twelfthMan" 
          :options="eligibleTwelfthMen"
          optionLabel="playerName"
          placeholder="Select 12th Man"
          @change="updateTeam"
        />
      </div>
    </div>

    <!-- Player Selection Modal -->
    <Dialog 
      v-model:visible="showPlayerSelector" 
      header="Select Player"
      :style="{ width: '90vw', maxWidth: '800px' }"
      modal
    >
      <div class="player-selector">
        <div class="selector-filters">
          <Select 
            v-model="selectorFilters.position" 
            :options="positionOptions"
            placeholder="Filter by position"
            :clearable="true"
          />
          <Select 
            v-model="selectorFilters.team" 
            :options="teamOptions"
            placeholder="Filter by team"
            :clearable="true"
          />
          <InputText 
            v-model="selectorFilters.search"
            placeholder="Search players..."
          />
        </div>
        <DataTable 
          :value="filteredAvailablePlayers" 
          :paginator="true" 
          :rows="10"
          selectionMode="single"
          @row-select="selectPlayer"
          class="player-selector-table"
        >
          <Column field="playerName" header="Player" />
          <Column field="position" header="Position">
            <template #body="slotProps">
              <span class="position-badge" :class="slotProps.data.position.toLowerCase()">
                {{ slotProps.data.position }}
              </span>
            </template>
          </Column>
          <Column field="team" header="Team">
            <template #body="slotProps">
              <span class="team-badge" :class="`team-${slotProps.data.team.toLowerCase()}`">
                {{ slotProps.data.team }}
              </span>
            </template>
          </Column>
          <Column field="price" header="Price" />
          <Column field="totalPoints" header="Points" />
        </DataTable>
      </div>
    </Dialog>

    <!-- Export Button -->
    <div class="export-section">
      <Button 
        label="Copy Team to Clipboard" 
        icon="pi pi-copy"
        :disabled="!teamValidation.isValid()"
        @click="$emit('export-team')"
        class="export-btn"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const props = defineProps(['players', 'selectedTeam', 'teamValidation'])
const emit = defineEmits(['update-team', 'export-team'])

const localTeam = ref({ ...props.selectedTeam })
const showPlayerSelector = ref(false)
const currentPositionSlot = ref(null)

const selectorFilters = ref({
  position: null,
  team: null,
  search: ''
})

const formations = [
  { label: '3-5-2', value: '352' },
  { label: '3-4-3', value: '343' },
  { label: '4-5-1', value: '451' },
  { label: '4-4-2', value: '442' },
  { label: '4-3-3', value: '433' },
  { label: '5-4-1', value: '541' },
  { label: '5-3-2', value: '532' },
  { label: '5-2-3', value: '523' }
]

const positionOptions = ['GK', 'DEF', 'MID', 'FOR']
const teamOptions = ['1', '2', '3', '4', 'NEW']

// Formation layouts
const formationLayouts = {
  '352': [
    { id: 'gk1', positionType: 'GK', player: null },
    { id: 'def1', positionType: 'DEF', player: null },
    { id: 'def2', positionType: 'DEF', player: null },
    { id: 'def3', positionType: 'DEF', player: null },
    { id: 'mid1', positionType: 'MID', player: null },
    { id: 'mid2', positionType: 'MID', player: null },
    { id: 'mid3', positionType: 'MID', player: null },
    { id: 'mid4', positionType: 'MID', player: null },
    { id: 'mid5', positionType: 'MID', player: null },
    { id: 'for1', positionType: 'FOR', player: null },
    { id: 'for2', positionType: 'FOR', player: null }
  ],
  '442': [
    { id: 'gk1', positionType: 'GK', player: null },
    { id: 'def1', positionType: 'DEF', player: null },
    { id: 'def2', positionType: 'DEF', player: null },
    { id: 'def3', positionType: 'DEF', player: null },
    { id: 'def4', positionType: 'DEF', player: null },
    { id: 'mid1', positionType: 'MID', player: null },
    { id: 'mid2', positionType: 'MID', player: null },
    { id: 'mid3', positionType: 'MID', player: null },
    { id: 'mid4', positionType: 'MID', player: null },
    { id: 'for1', positionType: 'FOR', player: null },
    { id: 'for2', positionType: 'FOR', player: null }
  ]
  // Add other formations as needed
}

const formationLayout = computed(() => {
  const layout = formationLayouts[localTeam.value.formation] || formationLayouts['442']
  // Map selected players to positions
  return layout.map(position => ({
    ...position,
    player: localTeam.value.players.find(p => p.slotId === position.id) || null
  }))
})

const eligibleCaptains = computed(() => {
  return localTeam.value.players.filter(p => 
    p.playerName !== localTeam.value.twelfthMan?.playerName
  )
})

const eligibleTwelfthMen = computed(() => {
  // Include NEW players and yourself (represented as a special entry)
  const newPlayers = props.players.filter(p => p.team === 'NEW')
  return [
    { playerName: 'Yourself (Free)', position: 'SELF', team: 'SELF', price: '£0' },
    ...newPlayers
  ].filter(p => p.playerName !== localTeam.value.captain?.playerName)
})

const filteredAvailablePlayers = computed(() => {
  let filtered = props.players.filter(player => 
    !localTeam.value.players.some(selected => selected.playerName === player.playerName)
  )

  if (selectorFilters.value.position) {
    filtered = filtered.filter(p => p.position === selectorFilters.value.position)
  }

  if (selectorFilters.value.team) {
    filtered = filtered.filter(p => p.team === selectorFilters.value.team)
  }

  if (selectorFilters.value.search) {
    const search = selectorFilters.value.search.toLowerCase()
    filtered = filtered.filter(p => 
      p.playerName.toLowerCase().includes(search)
    )
  }

  return filtered
})

const selectPlayerForPosition = (position) => {
  currentPositionSlot.value = position
  showPlayerSelector.value = true
}

const selectPlayer = (event) => {
  const player = event.data
  const slot = currentPositionSlot.value
  
  if (slot) {
    // Add slotId to player for tracking
    const playerWithSlot = { ...player, slotId: slot.id }
    
    // Remove any existing player in this slot
    localTeam.value.players = localTeam.value.players.filter(p => p.slotId !== slot.id)
    
    // Add new player
    localTeam.value.players.push(playerWithSlot)
    
    updateTeam()
  }
  
  showPlayerSelector.value = false
  currentPositionSlot.value = null
}

const removePlayer = (position) => {
  localTeam.value.players = localTeam.value.players.filter(p => p.slotId !== position.id)
  
  // Remove from captain/12th man if selected
  if (localTeam.value.captain?.playerName === position.player.playerName) {
    localTeam.value.captain = null
  }
  
  updateTeam()
}

const setCaptain = (player) => {
  localTeam.value.captain = player
  updateTeam()
}

const isCaptainOrTwelfthMan = (player) => {
  return player.playerName === localTeam.value.twelfthMan?.playerName
}

const updateTeam = () => {
  emit('update-team', localTeam.value)
}

// Watch for prop changes
watch(() => props.selectedTeam, (newTeam) => {
  localTeam.value = { ...newTeam }
}, { deep: true })
</script>

<style scoped>
.picker-container {
  padding: 1rem;
  max-height: 80vh;
  overflow-y: auto;
}

.team-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.team-name-section,
.formation-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
}

.team-name-section label,
.formation-section label {
  font-weight: 500;
  color: var(--p-text-color);
}

.validation-panel {
  background: var(--p-surface-50);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--p-surface-200);
  margin-bottom: 2rem;
}

.validation-panel h3 {
  margin: 0 0 1rem 0;
  color: var(--p-text-color);
}

.validation-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.5rem;
}

.validation-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background: var(--p-surface-100);
}

.validation-item.valid {
  background: var(--p-green-50);
  color: var(--p-green-700);
}

.validation-item.valid i {
  color: var(--p-green-500);
}

.validation-item:not(.valid) i {
  color: var(--p-red-500);
}

.team-display {
  margin-bottom: 2rem;
}

.team-display h3 {
  margin: 0 0 1rem 0;
  color: var(--p-text-color);
}

.formation-grid {
  display: grid;
  gap: 1rem;
  padding: 2rem;
  background: var(--p-surface-50);
  border-radius: 0.5rem;
  border: 1px solid var(--p-surface-200);
  min-height: 400px;
}

.formation-442 {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
}

.position-slot {
  display: flex;
  justify-content: center;
  align-items: center;
}

.player-slot {
  width: 100%;
  min-height: 80px;
  border: 2px dashed var(--p-surface-300);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.player-slot:hover {
  border-color: var(--p-primary-color);
}

.player-slot.filled {
  border: 2px solid var(--p-primary-color);
  background: var(--p-primary-50);
}

.player-slot.captain {
  border-color: var(--p-yellow-500);
  background: var(--p-yellow-50);
}

.selected-player {
  text-align: center;
  padding: 0.5rem;
  width: 100%;
}

.player-name {
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
}

.player-details {
  font-size: 0.8rem;
  color: var(--p-text-muted-color);
  display: block;
}

.remove-btn,
.captain-btn {
  position: absolute;
  top: 0.25rem;
  width: 1.5rem !important;
  height: 1.5rem !important;
  min-width: 1.5rem !important;
}

.remove-btn {
  right: 0.25rem;
}

.captain-btn {
  right: 2rem;
}

.empty-slot {
  text-align: center;
  color: var(--p-text-muted-color);
}

.empty-slot i {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.special-selections {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.captain-section,
.twelfth-man-section {
  flex: 1;
  min-width: 250px;
}

.captain-section h4,
.twelfth-man-section h4 {
  margin: 0 0 0.5rem 0;
  color: var(--p-text-color);
}

.player-selector {
  padding: 1rem 0;
}

.selector-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.selector-filters > * {
  min-width: 150px;
}

.export-section {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--p-surface-200);
}

.export-btn {
  font-size: 1.1rem;
  padding: 0.75rem 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .team-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .validation-items {
    grid-template-columns: 1fr;
  }
  
  .special-selections {
    flex-direction: column;
    gap: 1rem;
  }
  
  .formation-grid {
    padding: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Position badges from StatsTab */
.position-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
}

.position-badge.gk { background: var(--p-yellow-500); color: black; }
.position-badge.def { background: var(--p-blue-500); }
.position-badge.mid { background: var(--p-green-500); }
.position-badge.for { background: var(--p-red-500); }

.team-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
}

.team-badge.team-1 { background: var(--p-purple-500); }
.team-badge.team-2 { background: var(--p-indigo-500); }
.team-badge.team-3 { background: var(--p-teal-500); }
.team-badge.team-4 { background: var(--p-orange-500); }
.team-badge.team-new { background: var(--p-gray-500); }
</style> 