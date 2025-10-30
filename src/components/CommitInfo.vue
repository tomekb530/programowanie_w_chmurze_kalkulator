<template>
  <div class="commit-info">
    <div class="commit-details">
      <!-- Frontend info -->
      <span v-if="commitId" class="commit-text">
        Frontend: {{ shortCommitId }}
      </span>
      <span v-else-if="!commitId && !buildDate" class="dev-mode">
        Frontend: Development Mode
      </span>
      <span v-if="buildDate" class="build-date">
        Date: {{ formatDate(buildDate) }}
      </span>
      
      <!-- Backend info -->
      <span v-if="backendInfo" class="backend-text">
        Backend: {{ backendInfo.shortHash }}
      </span>
      <span v-if="backendInfo" class="backend-date">
        Date: {{ formatDate(backendInfo.date) }}
      </span>
      <span v-else class="backend-loading">
        Backend: Loading...
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import apiService from '../services/api'
import type { BackendCommitInfo } from '../services/types'

// Get commit info from environment variables
const commitId = import.meta.env.VITE_COMMIT_ID || null
const buildDate = import.meta.env.VITE_BUILD_DATE || null

// Backend commit info
const backendInfo = ref<BackendCommitInfo | null>(null)

// Create short commit ID (first 7 characters)
const shortCommitId = computed(() => {
  return commitId ? commitId.substring(0, 7) : null
})

// Format backend date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Load backend info on component mount
onMounted(async () => {
  try {
    const response = await apiService.getBackendInfo()
    if (response.success && response.data) {
      backendInfo.value = response.data.commit
    }
  } catch (error) {
    console.warn('Failed to load backend info:', error)
  }
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

.backend-text {
  color: #2196F3;
}

.backend-date {
  color: #64B5F6;
  opacity: 0.8;
}

.backend-loading {
  color: #9E9E9E;
  opacity: 0.7;
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