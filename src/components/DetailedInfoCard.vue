<template>
  <div class="detailed-card">
    <div class="card-content">
      <h2>About Me</h2>
      <p>你好，我是钴蓝音</p>
      <!-- <div class="divider"></div>
      <h2>My Projects</h2>
      <p>Garupa T10</p> -->
    </div>
  </div>
</template>

<style scoped>
.detailed-card {
  /* Inheriting the design language from your homepage */
  background: var(--card-bg, rgba(246, 246, 246, 0.85));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  color: var(--text-color, #3a3a3a);

  /* Flexible size that adapts to content */
  width: min(900px, 90vw);
  min-height: 500px;
  padding: 3rem 4rem;
  box-sizing: border-box;
  margin: 2rem auto;

  text-align: left;
}

.card-content h2 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-color, #3a3a3a);
}

.card-content p {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  line-height: 1.7;
  opacity: 0.9;
}

.divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.25);
  margin: 2.5rem 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .detailed-card {
    width: 90vw;
    min-height: 400px;
    padding: 2rem;
    margin: 1rem auto;
  }

  .card-content h2 {
    font-size: 1.5rem;
  }

  .card-content p {
    font-size: 1rem;
  }

  .divider {
    margin: 2rem 0;
  }
}
</style>
