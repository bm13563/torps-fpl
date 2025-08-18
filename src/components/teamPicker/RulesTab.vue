<template>
  <div class="rules-container">
    <div class="rules-content">
      <div class="rule-card">
        <h3>Team Selection</h3>
        <ul>
          <li>Pick 11 players from a £100 budget</li>
          <li>At least 1 NEW player required</li>
          <li>At least 1 player from each team (1, 2, 3, 4)</li>
          <li>No more than 4 players from a single team</li>
          <li>You cannot pick yourself</li>
        </ul>
      </div>

      <div class="rule-card">
        <h3>Captain & 12th Man</h3>
        <ul>
          <li>Pick a captain who scores 2x points</li>
          <li>Cannot captain yourself/12th man</li>
          <li>You are your team's 12th man (free)</li>
          <li>If not playing, pick a NEW player as 12th man</li>
        </ul>
      </div>

      <div class="rule-card">
        <h3>Formations</h3>
        <p>Available formations:</p>
        <ul>
          <li>3-5-2</li>
          <li>3-4-3</li>
          <li>4-5-1</li>
          <li>4-4-2</li>
          <li>4-3-3</li>
          <li>5-4-1</li>
          <li>5-3-2</li>
          <li>5-2-3</li>
        </ul>
      </div>

      <div class="rule-card">
        <h3>Prizes</h3>
        <ul>
          <li><strong>1st:</strong> 2/3 of prize pot</li>
          <li><strong>2nd:</strong> Potentially Club Kit</li>
          <li><strong>3rd:</strong> TBD</li>
        </ul>
        <p class="prize-note">£175 rollover guaranteed + Second Chance League</p>
      </div>

      <div class="rule-card">
        <h3>How Players Score Points</h3>
        <ul>
          <li>Points awarded for individual & team performance each game</li>
          <li>Points for all competitive games</li>
          <li>Stats taken from manager score sheets at Port of Call</li>
          <li>Team performance points given to anyone who plays</li>
          <li>Player assigned to team they played most for last season</li>
          <li>Players with "?" have poor availability in first half</li>
        </ul>
      </div>

      <div class="rule-card">
        <h3>Winter Wildcard</h3>
        <p>
          No transfers during the season, but you'll get a <strong>Winter Wildcard</strong> 
          during the winter break to pick a completely new team for the second half! 
          Prices will be adjusted based on first-half performance.
        </p>
      </div>

      <div class="rule-card">
        <h3>Submit Your Team</h3>
        <p>Send your completed team to:</p>
        <ul class="contact-list">
          <li>📱 +447818455491</li>
          <li>✉️ Alexanderhillbusiness@outlook.com</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.rules-container {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.rules-content {
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.rule-card {
  background: var(--p-surface-50);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.rule-card h3 {
  margin: 0 0 1rem 0;
  color: var(--p-text-color);
  font-size: 1.3rem;
  font-weight: 600;
}

.rule-card ul {
  margin: 0;
  padding-left: 1.5rem;
}

.rule-card li {
  margin-bottom: 0.5rem;
  color: var(--p-text-color);
}

.rule-card li:last-child {
  margin-bottom: 0;
}

.rule-card p {
  margin: 0 0 1rem 0;
  color: var(--p-text-color);
}

.rule-card p:last-child {
  margin-bottom: 0;
}

.prize-note {
  margin-top: 1rem !important;
  margin-bottom: 0 !important;
  font-size: 0.9rem;
  color: var(--p-text-muted-color);
  font-style: italic;
}

.contact-list {
  list-style: none !important;
  padding-left: 0 !important;
  text-align: center;
}

.contact-list li {
  font-family: monospace;
  background: var(--p-content-background);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: inline-block;
  margin-right: 1rem;
}

.contact-list li:last-child {
  margin-right: 0;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .rules-container {
    padding: 1.5rem;
  }
  
  .contact-list li {
    display: block;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
  
  .contact-list li:last-child {
    margin-bottom: 0;
  }
}
</style> 