<template>
  <div class = "article__comments">
    <comment-form 
      :article_id = "article_id" 
       @add = "AddComment" 
    />
    <div class = "article__comment" v-for = "(comment, index) in comments" :key="index">
      <comment-item 
        :comment = "comment" 
        :index = "index"
        @editComment = "EditComment" 
        @deleteComment = "DeleteComment" 
      />
    </div>
  </div>
</template>

<script>
import CommentItem from "@/components/CommentItem.vue"
import CommentForm from "@/components/CommentForm.vue"
import { mapGetters, mapState } from 'vuex'

export default {
    components:{
        CommentItem, CommentForm
    },
    props:{
        comments:{
            type: Array
        },
        article_id:{
            type: Number
        },
        author_id:{
            type: Number
        }
    },
    data(){
        return {
        }
    },
    computed:{
        ...mapState({
            user: state => state.user.body
        }),
        ...mapGetters({
            Roles: 'user/RolesWithoutAuthor'
        })
    },
    methods:{
        async AddComment(data){
            var roles
            await this.Roles(this.user.roles).then(res => {
                roles = res
            })
            if(this.author_id === this.user.user_id){
                if(roles){
                    roles += ", "
                }
                roles += "Автор"
            }
            const newComment = {
                text: data.text,
                username: this.user.username,
                name: this.user.name,
                surname: this.user.surname,
                fk_user_id: this.user.user_id,
                comment_id: data.comment_id,
                date_of_writing: data.date_of_writing,
                roles: roles
            }
            this.comments.push(newComment)
        },
        async EditComment(comment_index, text){
            this.comments[comment_index].text = text
        },
        async DeleteComment(comment_index){
            this.comments.splice(comment_index, 1)
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
    .article__comments{
        margin-top: 22px;
        margin-left: auto;
        margin-right: auto;
        padding-bottom: 105px;
        height: 100%;
        width: 100%;
        max-width: 660px;
        display: flex;
        flex-flow: column;
    }
    .article__comment{
        padding-top: 20px;
        position: relative;
        max-width: calc(100vw + -40px);
        width: 100%;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .article__comment::after{
        left: 0;
        top: calc(100% + -1px);
        position: absolute;
        content: '';
        background-color: #A5A5A5;
        width: 100%;
        height: 1px;
    }
</style>