<template>
  <button class = "edit-button">
      <slot></slot>
  </button>
</template>

<script>
export default {
    name: 'edit-comment-button'
}
</script>

<style scoped>
    .edit-button{
        width: 15px;
        height:15px;

        background-image: url("@/assets/images/UI/buttons/edit-comment-button.svg");
        background-position: center;
        background-size: 12.5px 12.5px;
        background-repeat: no-repeat;
    }
    .edit-button:hover{
        background-size: 10px 10px;
    }
</style>