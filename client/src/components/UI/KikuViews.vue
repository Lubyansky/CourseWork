<template>
  <div class = "views">
      <div class = "views-icon"></div>
      <div class = "views-number">
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    name: 'kiku-views'
}
</script>

<style scoped>
    .views{
        display: inline-flex;
        align-items: center;
        max-width: 100%;
        height: 25px;
    }
    .views-icon{
        width: 25px;
        height:25px;

        background-image: url("@/assets/images/UI/views.svg");
        background-position: center;
        background-size: 25px 25px;
        background-repeat: no-repeat;
    }
    .views-number{
        margin-top: 3px;
        margin-left: 8px;
        margin-bottom: 3px;
    }
</style>