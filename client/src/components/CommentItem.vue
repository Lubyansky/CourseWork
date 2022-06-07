<template>
  <div class = "comment__head">
    <div class = "comment_info">
        <a 
            :class = "{comment__username_active: comment.fk_user_id == user_id}"
            class = "comment__username"
            :href="'/profile/' + comment.fk_user_id" title = "Перейти в профиль"
        >
            {{comment.name?comment.name:comment.username}} {{comment.surname&&comment.name?comment.surname:''}}
        </a>
        <div v-if = "comment.roles" class = "comment__user-roles">[{{comment.roles}}]</div>
        <div class = "comment__date">{{comment.date_of_writing}}</div>
    </div>
    <div class = "comment__control" v-if = "!isBanned">
        <edit-comment-button v-if = "comment.fk_user_id == user_id || permission.canEditComments" type = "submit" @click="EditControl(index, comment.text)"></edit-comment-button>
        <delete-button v-if = "comment.fk_user_id == user_id|| permission.canEditComments" type = "submit" @click="DeleteComment(comment.comment_id, index)"></delete-button>
    </div>
  </div>
  <form v-if = "currEdit == index" class = "comment__edit" @submit.prevent="EditComment(comment.comment_id, index)">
    <textarea class = "comment__input-edit" id = "commentInputEdit" autocomplete="off" type="text" v-model="formEdit.text"></textarea>
    <kiku-button-small class = "comment__button-save" type = "submit" :disabled = "!canEdit">Изменить</kiku-button-small>
  </form>
  <div v-else class = "comment__text">{{comment.text}}</div>
</template>

<script>
import axios from 'axios';
import {mapGetters, mapState} from 'vuex'

export default {
    emits: ['editComment', 'deleteComment'],
    props:{
        comment:{
            type: Object
        },
        index:{
            type: Number
        }
    },
    data(){
        return{
            formEdit:{
                text: ''
            },
            currEdit: -1,
            canEditComments: false
        }
    },
    computed: {
        ...mapState({
            isLogin: state => state.user.isLogin,
            URL: state => state.URL,
            permission: state => state.permission,
            user_id: state => state.user.body.user_id,
            isBanned: state => state.user.body.is_banned
        }),
        ...mapGetters({
            isHavePermission: 'user/IsHavePermission'
        }),
        canEdit() {
            if(this.formEdit.text.trim() && this.isLogin){
                return true
            }
        }
    },
    async mounted(){
        this.isHavePermission('canEditComments').then(
            res =>{
                this.canEditComments = res
            }
        )
    },
    methods:{
         async EditComment(comment_id, comment_index){
            const {...comment} = this.formEdit
            comment.comment_id = comment_id
            const url = (this.URL.USER + `/update_comment`)
            try{
                var data = []
                await axios.put(url, {comment}, {withCredentials: true })
                .then(res=>{
                    data = res
                })
                if(data.status == 200){
                    data.text = this.formEdit.text
                    this.$emit('editComment', comment_index, comment.text)
                }
            }
            catch(e){}
            this.formEdit.text = ''
            this.currEdit = -1
        },
        async DeleteComment(comment_id, comment_index){
            const comment = {
                comment_id: comment_id
            }
            const url = (this.URL.USER + `/delete_comment`)
            try{
                var data = []
                await axios.delete(url, { data: comment, withCredentials: true })
                .then(res=>{
                    data = res
                })
                if(data.status == 200){
                    this.$emit('deleteComment', comment_index)
                }
            }
            catch(e){}
        },
        async EditControl(curr, text) {
            if(this.currEdit == -1){
            this.currEdit = curr
            this.formEdit.text = text
            }
            else if(this.currEdit == curr) {
            this.currEdit = -1
            this.formEdit.text = ""
            }
            else {
            this.currEdit = curr
            this.formEdit.text = text
            }
        }
    }
}
</script>

<style scoped>
    .comment__head{
        width: 100%;
        display: inline-flex;
        flex-flow: nowrap;
        justify-content: space-between;
    }
    .comment_info{
        width: 100%;
        padding-right: 10px;
        display: inline-flex;
        flex-flow: wrap;
        color: #000000;
    }
    .comment__username{
        margin-bottom: 5px;
        margin-right: 18px;
        text-decoration: none;
        color: #000000;
    }
    .comment__username_active{
        color:#DCA600;
    }
    .comment__user-roles{
        margin-bottom: 5px;
        margin-right: 18px;
        color: #A5A5A5;
    }
    .comment__date{
        margin-bottom: 5px;
        color: #A5A5A5;
    }
    .comment__control{
        width: 45px;
        display: flex;
        flex-flow: nowrap row;
        justify-content: space-between;
    }
    .comment__text{
        padding-top: 10px;
        padding-bottom: 26px;
        text-align: justify;
        white-space: pre-line;
    }
    .comment__edit{
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    .comment__input-edit{
        resize: none;
        width: 100%;
        height: 144px;
        margin-top: 20px;
        margin-bottom: 20px;
        padding-top: 9px;
        padding-left: 11px;
        padding-right: 11px;
        padding-bottom: 9px;
        border: 1px solid #8D0909;
        outline: 1px solid #8D0909;
        text-align: justify;
        white-space: pre-line;
    }
    .comment__button-save{
        margin-bottom: 20px;
    }
</style>