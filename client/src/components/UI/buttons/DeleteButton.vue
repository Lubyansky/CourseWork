<template>
    <button class = "delete-button">
      <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'delete-button'
}
</script>

<style scoped>
    .delete-button{
        width: 15px;
        height:15px;

        background-image: url("@/assets/images/UI/buttons/delete-button.svg");
        background-position: center;
        background-size: 10px 10px;
        background-repeat: no-repeat;
    }
    .delete-button:hover{
        background-size: 8px 8px;
    }
    .input_remove{
      position: absolute;
      right: -26px;
      top: 0px;
      width: 24px;
      height: 32px;
    }
</style>