<template>
  <div class = "comments">
      <div class = "comments-icon"></div>
      <div class = "comments-number">
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    name: 'kiku-comments'
}
</script>

<style scoped>
    .comments{
        max-width: 100%;
        height: 25px;
        display: inline-flex;
        justify-content: end;
    }
    .comments-icon{
        width: 25px;
        height:25px;

        background-image: url("@/assets/images/UI/comments.svg");
        background-position: center;
        background-size: 25px 25px;
        background-repeat: no-repeat;
    }
    .comments-number{
        padding-top: 3.5px;
        padding-left: 6px;
    }
    @media(max-width: 576px){
        .comments{
            justify-content: center;
        }
    }
</style>