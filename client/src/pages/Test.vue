<template>
  <div class = "container">
    <div class = "content">
      <div class = "item">ААААААААААААААААААААААААААААААААААААААААААААААА</div>
      <div class = "item">БББББББББББББББББББББББББББББББББББББББББББББББ</div>
      <div class = "item">ВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВВ</div>
      <div class = "item">ДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДД</div>
      <div class = "item">УУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУ</div>
      <div class = "item">ППППППППППППППППППППППППППППППППППППППППППППППП</div>
    </div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'

export default {
};
</script>

<style scoped>
  .container{
    min-height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content{
    position: absolute;
    top: 80px;
    left: 0px;
    width: 99vw;
    height: 200px;
    color:black;
    border: #000000 1px solid;
    overflow-x: scroll;
    overflow-y: auto;
  }
  .item{
    width: 420px;
    height: 50px;
    border: #727511 1px solid;
    overflow-x: auto;
  }
</style>