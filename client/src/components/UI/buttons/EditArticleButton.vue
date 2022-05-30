<template>
  <button class = "edit-button">
      <slot></slot>
  </button>
</template>

<script>
export default {
    name: 'edit-article-button'
}
</script>

<style scoped>
    .edit-button{
        width: 25px;
        height:25px;

        background-image: url("@/assets/images/UI/buttons/edit-article-button.svg");
        background-position: center;
        background-size: 20px 20px;
        background-repeat: no-repeat;
    }
    .edit-button:hover{
        background-size: 17px 17px;
    }
</style>