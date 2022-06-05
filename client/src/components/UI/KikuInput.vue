<template>
  <input class = "kiku-input" :class = "{ no_border : isNoBorder}">
</template>

<script>
export default {
    props:{
        isNoBorder: {
            type: Boolean
        }
    },
    name: 'kiku-input'
}
</script>

<style scoped>
    .kiku-input{
        padding-left: 8px;
        padding-right: 8px;
        width: 100%;
        height: 34px;
        font-size: 16px;
        outline: none;
        border-radius: 0px;
        border: #000000 solid 1px;
    }
    .no_border{
        border: none;
    }
    .profile__item-input{
        width: 95%;
    }
    .first-input{
      padding-right: 48px;
    }
</style>