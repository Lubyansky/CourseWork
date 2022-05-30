<template>
    <a v-if = "article.isHidden" class = "article__container__content_hidden link_black" :href = "'/article/' + article.info.article_id">
      <div class = "articles__article-content_hidden">
        <h3 class = "articles__article-title_hidden">{{article.info.title}}</h3>
        <div class = "articles__article-desc_hidden">{{article.info.description}}</div>
      </div>
      <div class = "articles__article-info_hidden">
        <kiku-views>{{article.info.number_of_views}}</kiku-views>
      </div>
    </a>
    <a v-else class = "article__container__content link_black" :href = "'/article/' + article.info.article_id">
      <img class = "articles__article-picture" width="478" height="268" :src = "article.info.preview_image" alt="Изображение">
      <div class = "articles__article-content">
        <h3 class = "articles__article-title">{{article.info.title}}</h3>
        <div class = "articles__article-desc">{{article.info.description}}</div>
      </div>
      <div class = "articles__article-info">
        <div class = "article__info-tag">{{tags.find(tag => tag.id === article.info.tag).title}}</div>
        <kiku-views class = "article__info-views">Просмотры: {{article.info.number_of_views}}</kiku-views>
        <kiku-comments class="article__info-comments">Комментарии: {{article.comments.length}}</kiku-comments>
      </div>
    </a>
    <div class = "article__control" v-if = "isLogin && !isBanned">
      <save-button :isActive = "article.isSave" @click="Save(article)" title="Сохранить"></save-button>
      <edit-article-button v-if = "permission.canEditArticles || article.author.author_id == user_id" title="Редактировать" @click="Edit"></edit-article-button>
      <button class = "control__button-cover" :class="{button__uncover: article.isHidden}" @click="Cover(article)" title="Свернуть/развернуть"></button>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
    props: {
        article: {
            type: Object
        }
    },
    data(){
        return{
            canEditArticles: false
        }
    },
    computed: {
      ...mapState({
        tags: state => state.tags,
        article_edit: state => state.article_edit,
        isLogin: state => state.user.isLogin,
        permission: state => state.permission,
        user_id: state => state.user.body.user_id,
        isBanned: state => state.user.body.is_banned
      }),
      ...mapGetters({
        isHavePermission: 'user/IsHavePermission'
      })
    },
    methods:{
        ...mapActions({
            DeleteArticle: 'user/DeleteArticle',
            SaveArticle: 'user/SaveArticle'
        }),
        async Save(article){
            if(article.isSave){
                article.isSave = false
                this.DeleteArticle(article.info.article_id)
            }
            else {
                article.isSave = true
                this.SaveArticle(article.info.article_id)
            }
        },
        async Edit(){
            this.article_edit.article  = {
                info: this.article.info,
                content: this.article.content,  
                sources: this.article.sources
            }
            this.article_edit.isEdit = true
            this.$router.push({name: 'article_editing'})
        },
        async Cover(article){
            if(article.isHidden){
                article.isHidden = false
            }
            else{
                article.isHidden = true
            }
        },
    }
}
</script>

<style scoped>
    .article__container__content{
        display: grid;
        grid-template: 
                "picture . ." 23px
                "picture content content" auto
                "picture info info" 50px / 478px auto 91px;
        
    }

    .article__container__content_hidden{
        display: flex;
        flex-flow: column;
    }

    .article__container__content:hover{
        color: #DCA600;
        /*outline: 3px solid #DCA600;*/
    }

    .article__container__content_hidden:hover{
        color: #DCA600;
    }

    .articles__article:hover .articles__article-picture{
        outline-color: #DCA600;
    }

    .articles__article-picture{
        grid-area: picture;
        width: 478px;
        height: 268px;

        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;

        outline: 2px solid #000000;
        box-shadow: 4px 2px 6px 2px rgba(0, 0, 0, 0.25);

        transition: all 0.3s;
    }
    .articles__article-content{
        grid-area: content;
        padding-left:43px;
        max-width: 464px;
    }

    .articles__article-content_hidden{
        max-width: 936px;
    }

    .articles__article-title{
        font-size: 32px;
        line-height: 37px;

        color: #8D0909;
    }
    .articles__article-title_hidden{
        font-size: 32px;
        line-height: 37px;
        text-align: center;
        color: #8D0909;
    }

    .articles__article-desc{
        padding-top: 18px;
        font-size: 20px;
        line-height: 23px;
    }

    .articles__article-desc:first-letter{
        text-transform: uppercase;
    }

    .articles__article-desc_hidden{
        padding-top: 24px;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
    }

    .articles__article-desc_hidden:first-letter{
        text-transform: uppercase;
    }

    .articles__article-info{
        grid-area: info;
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        padding-left:43px;
        max-width: 464px;
        color:#A5A5A5;
    }

    .articles__article-info_hidden{
        position: absolute;
        left: 0px;
        top:0px;
        width: 100%;
        display: inline;
        color: #000000;
    }

    .article__info-tag{
        width: 100%;
        color:#DCA600;
    }
    .article__info-views{
        margin-top:12px;
        width: 50%;
    }
    .article__info-comments{
        margin-top:12px;
        width: 50%;
    }
    .article__control{
        position: absolute;
        top: 0;
        right: 0;
        display: inline-flex;
        justify-content: space-between;
    }

    .control__button-cover{
        padding-left: 4px;
        padding-right: 4px;
        width: 25px;
        height:25px;

        background-image: url("@/assets/images/UI/buttons/to_cover.svg");
        background-position: center;
        background-size: 20px 20px;
        background-repeat: no-repeat;
    }
    .control__button-cover:hover{
        background-size: 17px 17px;
    }

    .button__uncover{
        background-image: url("@/assets/images/UI/buttons/to_uncover.svg");
    }
</style>