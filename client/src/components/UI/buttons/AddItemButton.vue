<template>
    <button class = "add-item-button" :class = "{ no_border : isNoBorder}">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props:{
        isNoBorder: {
            type: Boolean
        }
    },
    name: 'add-item-button'
}
</script>

<style scoped>
    .add-item-button{
      position: relative;
      padding-left: 8px;
      padding-right: 48px;
      width: 100%;
      height: 32px;
      text-align: left;
      font-size: 16px;
      line-height: 18px;
      border: 1px solid #000000
    }
    .add-item-button:hover{
      color: #DCA600;
      border: 1px solid #DCA600
    }
    .add-item-button::after{
      content: "";
      position: absolute;
      width: 17px;
      height: 16px;
      top: 8px;
      right: 15px;
      background-image: url("@/assets/images/UI/buttons/add_item.png");
      background-position: center;
      background-size: 17px 16px;
      background-repeat: no-repeat;
    }
    .add-item-button:hover::after{
      background-image: url("@/assets/images/UI/buttons/add_item_hover.png");
    }
    .no_border{
        border: none;
    }
    .no_border:hover{
        border: none;
    }
</style>