<template>
  <div class = "tag" :class = "{pressed: isPressed}">
      <slot></slot>
  </div>
</template>

<script>
export default {
    props:{
        isPressed: {
            type: Boolean
        }
    },
    name: 'kiku-tag'
}
</script>

<style scoped>
    .tag{
        white-space: pre-line;
        margin-top:10px;
        margin-left: 12.5px;
        margin-right: 12.5px;
        margin-bottom:10px;

        width: 210px;
        height: 40px;

        text-align: center;
        display:inline-flex;
        justify-content: center;
        align-items: center;
        outline: 1px solid #000000;

        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    }
    .tag:hover{
        color:#DCA600;
        outline-color: #DCA600;
    }
    .pressed{
        background:#DCA600BF;
    }
    .pressed:hover{
        background:none;
    }
</style>