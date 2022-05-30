<template>
  <button class = "remove-item-button">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'remove-item-button'
}
</script>

<style scoped>
    .remove-item-button{
      position: absolute;
      width: 32px;
      height: 30px;
      top: 0px;
      right: 7.5px;
      margin-top: 2px;
      background-image: url("@/assets/images/UI/buttons/remove_item.png");
      background-position: center;
      background-size: 17px 1.5px;
      background-repeat: no-repeat;
      z-index: 5000;
    }
    .remove-item-button:hover{
      background-image: url("@/assets/images/UI/buttons/remove_item_hover.png");
    }
</style>