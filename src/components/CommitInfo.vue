<template>
  <div class="commit-info">
    <div class="commit-details">
      <span v-if="commitId" class="commit-text">
        Commit: {{ shortCommitId }}
      </span>
      <span v-if="buildDate" class="build-date">
        Built: {{ buildDate }}
      </span>
      <span v-if="!commitId && !buildDate" class="dev-mode">
        Development Mode
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Get commit info from environment variables
const commitId = import.meta.env.VITE_COMMIT_ID || null
const buildDate = import.meta.env.VITE_BUILD_DATE || null

// Create short commit ID (first 7 characters)
const shortCommitId = computed(() => {
  return commitId ? commitId.substring(0, 7) : null
})
</script>

<style scoped>
.commit-info {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
}

.commit-details {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.commit-text {
  color: #4CAF50;
}

.build-date {
  color: #81C784;
  opacity: 0.8;
}

.dev-mode {
  color: #FFA726;
}

@media (max-width: 600px) {
  .commit-info {
    bottom: 5px;
    right: 5px;
  }
  
  .commit-details {
    padding: 6px 10px;
    font-size: 10px;
  }
}
</style>