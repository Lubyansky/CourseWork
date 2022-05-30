<template>
  <button class = "save-button" :class = "{active : isActive}">
      <slot></slot>
  </button>
</template>

<script>
export default {
    props:{
        isActive: {
            type: Boolean
        }
    },
    name: 'save-button'
}
</script>

<style scoped>
    .save-button{
        padding-left: 4px;
        padding-right: 4px;
        width: 25px;
        height:25px;

        background-image: url("@/assets/images/UI/buttons/save-button.svg");
        background-position: center;
        background-size: 20px 20px;
        background-repeat: no-repeat;
    }
    .save-button:hover{
        background-size: 17px 17px;
    }
    .active{
        background-image: url("@/assets/images/UI/buttons/save-button-active.svg");
    }
</style>