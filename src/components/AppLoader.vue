<template>
  <div class="loader-animation">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</template>

<style scoped>
.loader-animation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.circle {
  width: 3vw;
  height: 3vw;
  border-radius: 100%;
  border: 3px solid #3eaf7c;
  background-color: white;
  margin: 2vw;
  /*background-image: linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0) 100%);*/
  animation: bounce 1.5s 0.5s linear infinite;
  position: relative;
  transform: scale(0.6);
}

.circle:nth-child(2) {
  animation-delay: 0.1s;
}

.circle:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {
  0%, 50%, 100% {
    transform: scale(0.6);
  }
  25% {
    transform: scale(1.4);
  }
  75% {
    transform: scale(1);
  }
}
</style>
