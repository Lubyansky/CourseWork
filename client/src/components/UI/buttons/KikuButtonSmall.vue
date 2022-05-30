<template>
    <button class = "button" :class = "{button_delete: isDelete}">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        isDelete: {
            type: Boolean
        }
    },
    name: 'kiku-button-small',
}
</script>

<style scoped>
    .button{
        margin-left:15px;
        margin-right: 15px;
        width: 130px;
        height: 40px;
        color: #000000;
        border: 1px solid #000000;
        font-size: 18px;
        box-shadow: 4px 4px 4px rgba(141, 9, 9, 0.25);
        transition: all 0.4s ease;
    }
    .button:hover{
        border: 1px solid #000000;
        background-color: #DCA600;
    }
    .button_delete{
        color: #8D0909;
        border: 1px solid #8D0909;
    }
    .button_delete:hover{
        color: #FFF6F6;
        background-color: #8D0909;
        border: 1px solid #8D0909;
    }
</style>