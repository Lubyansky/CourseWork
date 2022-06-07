<template>
  <form class = "add__comment" @submit.prevent="AddComment">
    <div class = "comment__title">Комментарии</div>
    <textarea class = "comment__input-add" 
        contenteditable ="true"
        :placeholder="isLogin ? 'Оставьте комментарий' : 'Войдите чтобы оставить комментарий'" 
        autocomplete="off" 
        v-model="formAdd.text"
        :disabled = "isBanned || !isLogin ? 'disabled' : null"
    >
    </textarea>
    <kiku-button v-if = "isLogin" type = "submit" :disabled = "!canAdd">Добавить</kiku-button>
  </form>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';

export default {
    props:{
        article_id: {}
    },
    data(){
        return {
            formAdd: {
                text: ''
            }
        }
    },
    computed: {
        ...mapState({
            isBanned: state => state.user.body.is_banned,
            isLogin: state => state.user.isLogin,
            URL: state => state.URL
        }),
        canAdd() {
            if(this.formAdd.text.trim() && this.isLogin && !this.isBanned){
                return true
            }
        }
    },
    methods:{
        async AddComment(){
            const {...comment} = this.formAdd
            comment.article_id = this.article_id
            const url = (this.URL.USER + `/add_comment`)
            try{
                var data = []
                await axios.post(url, {comment}, { withCredentials: true })
                .then(res=>{
                    data = res
                })
                if(data.status == 200){
                    data = data.data
                    data.text = this.formAdd.text
                    console.log(data)
                    this.$emit('add', data)
                }
            }
            catch(e){
                console.log(e)
            }
            this.formAdd.text = ''
        }
    }
}
</script>

<style scoped>
    .add__comment{
        display: flex;
        flex-flow: column;
        align-items: center;
        margin-bottom: 56px;
    }

    .comment__title{
        font-size: 28px;
        line-height: 32px;
        text-align: center;
    }

    .comment__input-add{
        resize: none;
        max-width: calc(100vw + -40px);
        width: 100%;
        height: 200px;
        margin-top: 48px;
        margin-bottom: 20px;
        padding-top: 9px;
        padding-left: 11px;
        padding-right: 11px;
        padding-bottom: 9px;
        font-size: 16x;
        line-height: 18px;
        color: #000000;
        border: 1px solid #000000;
        outline: 1px solid #000000;
        text-align: justify;
        white-space: pre-wrap;
    }
    .comment__input-add::placeholder {
        padding-left: 0px;
        color: #C4C4C4;
    }
</style>