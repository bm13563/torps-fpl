<template>
  <div class="scoring-container">
    <div v-if="loading" class="scoring-message">Loading scoring matrix…</div>
    <div v-else-if="error" class="scoring-message">Couldn't load the scoring matrix.</div>
    <template v-else>
      <h3 v-if="title" class="scoring-title">{{ title }}</h3>
      <div class="scoring-scroll">
        <table class="scoring-table">
          <thead>
            <tr>
              <th class="corner" :rowspan="2"></th>
              <th
                v-for="group in groups"
                :key="group.label + group.span"
                :colspan="group.span"
                class="group-header"
              >
                {{ group.label }}
              </th>
            </tr>
            <tr>
              <th
                v-for="(sub, index) in subHeaders"
                :key="sub + index"
                class="sub-header"
              >
                {{ sub }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.label">
              <th class="row-header">{{ row.label }}</th>
              <td
                v-for="(value, index) in row.values"
                :key="index"
                :class="valueClass(value)"
              >
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Papa from 'papaparse'

const loading = ref(true)
const error = ref(false)
const title = ref('')
const groups = ref([])
const subHeaders = ref([])
const rows = ref([])

// Collapse the raw newlines that can live inside quoted CSV cells (e.g. "MOTM\nVote")
const clean = (cell) => (cell || '').replace(/\s+/g, ' ').trim()

// Forward-fill a header row so grouped columns (which only label their first cell)
// carry their label across the whole span. Returns [{ label, span }, ...].
const buildGroups = (headerRow) => {
  const result = []
  headerRow.forEach((cell) => {
    const label = clean(cell)
    if (label) {
      result.push({ label, span: 1 })
    } else if (result.length) {
      result[result.length - 1].span += 1
    } else {
      // Leading empty cell before any group label — keep it as an unlabeled spacer
      result.push({ label: '', span: 1 })
    }
  })
  return result
}

const valueClass = (value) => {
  const num = parseFloat(value)
  if (Number.isNaN(num)) return 'value'
  if (num > 0) return 'value positive'
  if (num < 0) return 'value negative'
  return 'value'
}

const parseMatrix = (csvText) => {
  const parsed = Papa.parse(csvText.trim(), { header: false, delimiter: ',' })
  const data = parsed.data.filter((row) => row.some((cell) => clean(cell) !== ''))
  if (data.length < 4) throw new Error('Unexpected scoring matrix format')

  // Row 0: title. Row 1: group headers. Row 2: sub-headers. Row 3+: data.
  title.value = clean(data[0][0])

  // Group headers start at column 1 (column 0 is the row-label column).
  groups.value = buildGroups(data[1].slice(1))

  subHeaders.value = data[2].slice(1).map(clean)

  rows.value = data.slice(3).map((row) => ({
    label: clean(row[0]),
    values: row.slice(1).map(clean),
  }))
}

onMounted(async () => {
  try {
    const csvPath = import.meta.env.VITE_FILE_ROOT + 'scoring_matrix.csv'
    const response = await fetch(csvPath)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    parseMatrix(await response.text())
  } catch (err) {
    console.error('Failed to load scoring matrix:', err)
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.scoring-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem 0.5rem 2rem;
}

.scoring-title {
  text-align: center;
  margin: 0 0 1.25rem 0;
  color: var(--p-text-color);
  font-size: 1.3rem;
  font-weight: 600;
}

.scoring-message {
  text-align: center;
  padding: 2rem;
  color: var(--p-text-muted-color, var(--p-text-color));
}

.scoring-scroll {
  overflow-x: auto;
  border-radius: 0.5rem;
}

.scoring-table {
  border-collapse: collapse;
  width: 100%;
  min-width: 720px;
  font-size: 0.85rem;
}

.scoring-table th,
.scoring-table td {
  border: 1px solid var(--p-surface-200, #e5e7eb);
  padding: 0.4rem 0.5rem;
  text-align: center;
  white-space: nowrap;
}

.group-header {
  background: var(--p-surface-100, #f1f3f5);
  color: var(--p-text-color);
  font-weight: 600;
  font-size: 0.8rem;
}

.sub-header {
  background: var(--p-surface-50, #f8f9fa);
  color: var(--p-text-color);
  font-weight: 500;
  font-size: 0.78rem;
}

.corner {
  background: var(--p-surface-100, #f1f3f5);
  border: 1px solid var(--p-surface-200, #e5e7eb);
}

.row-header {
  background: var(--p-surface-50, #f8f9fa);
  color: var(--p-text-color);
  font-weight: 600;
  text-align: left;
  position: sticky;
  left: 0;
}

.value {
  color: var(--p-text-color);
}

.value.positive {
  color: #1a7f37;
  font-weight: 500;
}

.value.negative {
  color: #cf222e;
  font-weight: 500;
}

@media (max-width: 768px) {
  .scoring-table {
    font-size: 0.78rem;
  }

  .scoring-table th,
  .scoring-table td {
    padding: 0.3rem 0.35rem;
  }
}
</style>
