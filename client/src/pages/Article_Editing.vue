<template>
  <div class = "editing" v-cloak>
    <div class = "container__loader" v-if = "loading" style = "padding-top: 180px; padding-bottom:240px">
      <div class = "loader"></div>
    </div>
    <form class = "editing__container" v-else>
      <h1 class = "editing__title">{{isEdit ? 'Редактировать' : 'Новая статья'}}</h1>
      <div class = "editing__general-information">
        <h2 class = "general-information__title">Общая информация</h2>
        <h3 class = "general-information__item-title">Название</h3>
        <kiku-input
          :value = "article.info.title"
          @input = "article.info.title = $event.target.value"
          type = "text" 
          placeholder="Введите название"
        />
        <h3 class = "general-information__item-title">Описание</h3>
        <kiku-input
          :value = "article.info.description"
          @input = "article.info.description = $event.target.value"
          type = "text" 
          placeholder="Введите описание"
        />
        <h3 class = "general-information__item-title">Период</h3>
        <select 
          v-model="article.info.tag" 
          class = "general-information__tag-select"
        >
          <option disabled hidden>Выберите период</option>
          <option v-for="tag in tags" 
            :key="tag.id" 
            :value="tag.id"
          >
            {{tag.title}}
          </option>
        </select>
        <h3 class = "general-information__item-title">Превью</h3>
        <div class = "general-information__preview">
          <kiku-input
            :value = "article.info.preview_image"
            @input = "article.info.preview_image = $event.target.value"
            type = "text" 
            placeholder="Добавьте ссылку или загрузите изображение (Кратно размеру 478*268)"
          />
          <label for="preview_file" class="general-information__input-file_label">Обзор</label>
          <input class="general-information__input-file"
          id="preview_file" 
          ref="file"
          type="file" 
          accept="image/*"
          @change = "loadingFile"
          >
        </div>
      </div>
      <div class = "editing__content">
        <h2 class = "editing__content__title">Наполнение</h2>
        <div class = "editing__content-item" v-for = "(item, index_c) in article.content" :key = "index_c">
          <remove-item-button @click.prevent="RemoveContentItem(index_c)" title="Удалить блок"></remove-item-button>
          <div class = "editing__content-item-container">
            <kiku-input class = "first-input"
              :value = "article.content.indexOf(item) != 0 ? item.title : ''"
              @input = "item.title = $event.target.value"
              type = "text"
              :placeholder = "article.content.indexOf(item) != 0 ? 'Введите заголовок' : ''"
              :disabled = "article.content.indexOf(item) != 0 ? null : 'disabled'"
              :isNoBorder = "true"
            />
          </div>
          <div class = "editing__content-item-container"
            v-for="(paragraph, index_p) in item.paragraphs"
            :key="index_p"
          >
            <div class = "editing__content-item-input-text" 
              contenteditable ="true"
              placeholder="Введите текст"
              :textContent = "paragraph.body"
              @blur = "paragraph.body = $event.target.innerText">
            </div>
            <delete-button class = "input_remove" @click.prevent="RemoveTextItem(index_c, index_p)" title = "Удалить параграф"></delete-button>
          </div>
          <div class = "editing__content-item-container">
            <add-item-button @click.prevent="AddTextItem(index_c)" :isNoBorder = "true" title = "Добавить параграф">Добавьте параграф</add-item-button>
          </div>
          <div class = "editing__content-item-container">
            <kiku-input
              :value = "item.picture.url"
              @input = "item.picture.url = $event.target.value"
              type = "text"
              placeholder = "Добавьте ссылку или загрузите изображение (необязательно)"
              :isNoBorder = "true"
            />
          </div>
          <div class = "editing__content-item-container">
            <kiku-input
              :value = "item.picture.desc"
              @input = "item.picture.desc = $event.target.value"
              type = "text"
              placeholder = "Введите описание для изображения (необязательно)"
              :isNoBorder = "true"
            />
          </div>
          <div class = "editing__content-item-container">
            <kiku-input
              :value = "item.picture.copyright"
              @input = "item.picture.copyright = $event.target.value"
              type = "text"
              placeholder = "Введите информацию об авторских правах (необязательно)"
              :isNoBorder = "true"
            />
          </div>
        </div>
        <add-item-button @click.prevent="AddContentItem" title = "Добавить блок">Добавьте блок</add-item-button>
      </div>
      <div class = "editing__sources">
        <h2 class = "editing__sources__title">Источники</h2>
        <div class = "editing__sources-source" v-for = "(source, index) in article.sources" :key = "index">
          <remove-item-button @click.prevent="RemoveSource(index)" title = "Удалить источник"></remove-item-button>
          <kiku-input class = "first-input"
            :value = "source.body"
            @input = "source.body = $event.target.value"
            type = "text"
            placeholder = "Введите источник"
          />
        </div>
        <add-item-button @click.prevent="AddSource" title = "Добавить источник">Добавьте источник</add-item-button>
      </div>
      <div class = "editing__control">
        <kiku-button v-if="!isEdit" class="editing__button-add" @click.prevent="AddArticle" title = "Добавить статью">Добавить</kiku-button>
        <div class = "button_control" v-else>
          <kiku-button @click.prevent="UpdateArticle" title = "Сохранить статью">Сохранить</kiku-button>
          <kiku-button :isDelete="true" @click.prevent="DeleteArticle" title = "Удалить статью">Удалить</kiku-button>
        </div>
        <div v-show = "this.error" class = "editing__control-error">{{error}}</div>
        <div v-show="success" class = "editing__control-success">{{success}}</div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
import jQuery from 'jquery';
import autosize from 'autosize';
import articleMixin from "@/mixins/articleMixin"
window.$ = window.jQuery = jQuery;

export default {
  mixins: [articleMixin],
  data(){
    return{
      article: {
        info: {
          title: '',
          description: '',
          tag: 'Выберите период',
          preview_image: ''
        },
        content: [],
        sources: []
      },
      tags: [],
      error: '',
      success: '',
      picture: [],
      isEdit: false,
      loading: false
    }
  },
  computed:{
    ...mapState({
      article_edit: state => state.article_edit,
      Tags: state => state.tags,
      URL: state => state.URL,
      user_id: state => state.user.body.user_id,
      is_banned: state => state.user.body.is_banned,
      permission: state => state.permission
    })
  },
  methods:{
    ...mapMutations({
        setArticleEdit: 'setArticleEdit'
    }),
    async loadingFile(event){
      this.picture = event.target.files[0];
    },
    async AddContentItem(){
      this.article.content.push({
        title: '',
        paragraphs: [],
        picture: {
          url: '',
          desc: '',
          copyright: '' 
        }
      })
    },
    async RemoveContentItem(index){
      this.article.content.splice(index, 1)
    },
    async AddSource(){
      this.article.sources.push({body: ''})
    },
    async RemoveSource(index){
      this.article.sources.splice(index, 1)
    },
    async AddTextItem(index){
      this.article.content[index].paragraphs.push({body: ""})
    },
    async RemoveTextItem(index_c, index_p){
      this.article.content[index_c].paragraphs.splice(index_p, 1)
    },
    ResetForm(){
      this.article = {
        info: {
          title: '',
          description: '',
          tag: 'Выберите период',
          preview_image: ''
        },
        content: [],
        sources: []
      }
    },
    async AddArticle(){
      //let formData = new FormData();
      /*formData.set('article_id', 0);
      formData.append('userS', {sex:"male", fullName:{firstName:"Вова", secondName:"Владимиров"}, age: 19});
      formData.append('file', this.picture);
      */
      //await axios.delete(url, {data: {article_id: 0}, withCredentials: true})
      /*.then(res=>{
        console.log(res.data.path)
      })*/
      //.catch(e => console.log(e))
      this.success = ''
      this.error = ''
      var hasTag = false
      this.tags.forEach(tag => {
        if(tag.id === this.article.info.tag){
          hasTag = true
        }
      })
      if(!this.article.info.title){
        this.error = 'Статья должна иметь заголовок'
        return
      }
      if(!this.article.info.description){
        this.error = 'Статья должна иметь описание'
        return
      }
      if(!hasTag){
        this.error = 'Статья должна иметь тег'
        return
      }
      if(!this.article.info.preview_image){
        this.error = 'Статья должна иметь превью'
        return
      }
      this.article.content.forEach((item, index = 0) => {
        if(!item.title && index != 0){
          this.error = 'Каждый блок кроме первого должен иметь заголовок'
          return
        }
        if(!item.paragraphs){
          this.error = 'Каждый блок должен иметь текст'
          return
        }
      })
      this.article.sources.forEach(source =>{
        if(!source.body){
          this.error = 'Каждый источник должен иметь текст'
        }
      })
      
      /*article.picture = window.btoa(this.picture)
      const url = (this.URL.API + `/upload_pictures_article`);
      await axios.post(url, article, 
        {withCredentials: true
      })*/
      
      this.Expand(this.article).then(async res => {
        const url = (this.URL.API + `/add_article`)
        await axios.post(url, res, { withCredentials: true })
        .then(res=>{
          this.success = 'Статья успешно сохранена'
        })
        .catch(e => {
          console.log(e)
        })
      })
      .catch(e=>console.log(e))
    
      this.ResetForm()
      this.preview = ''
      this.error = ''
    },
    async UpdateArticle(){
      this.success = ''
      this.error = ''

      var hasTag = false
      this.tags.forEach(tag => {
        if(tag.id === this.article.info.tag){
          hasTag = true
        }
      })
      if(!this.article.info.title){
        this.error = 'Статья должна иметь заголовок'
        return
      }
      if(!this.article.info.description){
        this.error = 'Статья должна иметь описание'
        return
      }
      if(!hasTag){
        this.error = 'Статья должна иметь тег'
        return
      }
      if(!this.article.info.preview_image){
        this.error = 'Статья должна иметь превью'
        return
      }
      this.article.content.forEach((item, index = 0) => {
        if(!item.title && index != 0){
          this.error = 'Каждый блок кроме первого должен иметь заголовок'
          return
        }
        if(!item.paragraphs){
          this.error = 'Каждый блок должен иметь текст'
          return
        }
      })
      this.article.sources.forEach(source =>{
        if(!source.body){
          this.error = 'Каждый источник должен иметь текст'
        }
      })
      const article_id = this.article.info.article_id
      this.Expand(this.article).then(async res => {
        const url = (this.URL.API + `/update_article`)
        res.article_id = article_id
        await axios.put(url, res, { withCredentials: true })
        .then(res=>{
          this.success = 'Статья успешно изменена'
        })
        .catch(e => {
          console.log(e)
        })
      })
      .catch(e=>console.log(e))

      this.ResetForm()
      this.isEdit = false
    },
    async DeleteArticle(){
      const url = (this.URL.API + `/delete_article`)
      const article = {
        article_id: this.article.info.article_id
      }
      await axios.delete(url, { data: article, withCredentials: true })
      .then(res=>{
        this.success = 'Статья успешно удалена'
        this.ResetForm()
        this.isEdit = false
      })
      .catch()
    }
  },
  created(){
        if(!(this.permission.canEditArticles || this.permission.canAddArticles) || this.is_banned){
            this.$router.push('/')
        }
  },
  async mounted(){
    this.loading = true
    // ОТЛАДКА, УДАЛИТЬ
    this.article = {
      info: {
          title: 'Заголовок',
          description: 'Описание',
          tag: 'tag8',
          preview_image: 'https://cdnn21.img.ria.ru/images/156038/25/1560382524_0:162:3068:1888_1920x0_80_0_0_be78d9435c38e0064bd674438fec2c12.jpg'
        },
        content: [
          {
            paragraphs: [
              {body:'Параграф 1'}, 
              {body:'Параграф 2'}
            ],
            picture: {
              url: 'https://cdnn21.img.ria.ru/images/156038/25/1560382524_0:162:3068:1888_1920x0_80_0_0_be78d9435c38e0064bd674438fec2c12.jpg',
              desc: '',
              copyright: '' 
            },
          },
          {
            title: 'Подзаголовок',
            paragraphs: [
              {body: 'Параграф 1'}
            ],
            picture: {
              url: '',
              desc: '',
              copyright: '' 
            }
          }
        ],
        sources: [
          {body: "Источник 1"},
          {body: "Источник 2"},
          {body: "Источник 3"}
        ]
    }
    //Добавляем теги
    this.Tags.forEach((tag)=>{
      this.tags.push(tag)
    })
    //Если редактируем
    if(this.article_edit.isEdit){
      this.isEdit = true

      this.article = this.article_edit.article
      this.article.info.description = this.article.info.description.charAt(0).toUpperCase() + this.article.info.description.slice(1)

      this.setArticleEdit({
          article: '',
          isEdit: false
      })
    }
    this.loading = false
  }
}
$('.general-information__input-file').change(function() {
    if ($(this).val() != '') $(this).prev().text('Выбрано');
    else $(this).closest('.editing__general-information').children('.general-information__input-file_label').text('Выберите файлы');
});

autosize($('textarea'));
</script>

<style>
    input::placeholder{
      color: #A5A5A5;
    }
    h3 {
        margin: 0;
        font-style: normal; 
        font-weight: normal;
    }
    .editing{
        margin-top:80px;
        background-color: #FFF6F6;
        height: 100%;
    }

    .editing__container{
        padding-bottom:100px;
        max-width: 1020px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        flex-flow: column;

        background-color: #ffffff;
    }

    .editing__title{
        margin-left: auto;
        margin-right: auto;
        margin-top: 66px;
        font-size: 32px;
    }
    .editing__general-information{
      margin-top: 72px;
      padding-left: 42px;
      padding-right: 42px;
      width: 100%;
    }
    .general-information__title{
      width: 100%;
      font-size: 28px;
      text-align: center;
    }
    .general-information__item-title{
      margin-top: 20px;
      margin-bottom: 20px;
      width: 100%;
      font-size: 24px;
      text-align: left;
    }
    .general-information__tag-select{
      padding-left: 5px;
      padding-right: 5px;
      width: 100%;
      height: 32px;
      font-size: 16px;
      outline: none;
      border-radius: 0px;
      border: #000000 solid 1px;
    }
    .general-information__preview{
      display: flex;
      flex-flow: row;
    }
    .general-information__input-file{
      width: 0px;
      height: 0px;
      opacity: 0;
      overflow: hidden;
      z-index: -1;
    }
    .general-information__input-file_label{
      margin-left: 10px;
      padding-top: 4px;
      width: 106px;
      height: 32px;
      text-align: center;
      cursor: pointer;
      display: block;
      font-size: 20px;
      transition: all 0.18s ease-in-out;
      border: 1px solid rgb(0, 0, 0);
      color: rgb(0, 0, 0);
    }
    .general-information__input-file_label:hover {
        background: #DCA600;
    }
    .editing__general-information{
      display: flex;
      flex-flow: column;
    }
    .editing__content{
      margin-top: 55px;
      padding-left: 42px;
      padding-right: 42px;
      width: 100%;
    }
    .editing__content__title{
      margin-bottom: 20px;
      text-align: center;
      font-size: 28px;
    }
    .editing__content-item{
      margin-top: 20px;
      margin-bottom: 20px;
      position: relative;
      border: 1px solid #000000
    }
    .editing__content-item-container{
      position: relative;
      width: 100%;
      min-height: 32px;
    }
    .editing__content-item-container::after{
      content: "";
      position: absolute;
      left: 0px;
      bottom: -1px;
      width: 100%;
      height: 1px;
      background-color: #000000;
      z-index: 100;
    }
    .editing__content-item-input-text{
      padding-top: 7px;
      padding-left: 8px;
      padding-right: 8px;
      padding-bottom: 7px;
      width: 100%;
      height: 100%;
      max-width: 100%;
      min-height: 32px;
      font-size: 16px;
      line-height: 18px;
      border: none;
      outline: none;
      white-space: pre-wrap;
      word-wrap: normal;
    }
    .editing__content-item-input-text[placeholder]:empty:before {
      content: attr(placeholder);
      color: #A5A5A5; 
    }
    .content-item-input-text-add{
      position: relative;
      padding-left: 8px;
      width: 100%;
      height: 32px;
      font-size: 16px;
      text-align: left;
    }
    .content-item-input-text-add:hover{
      color:#DCA600;
    }
    .content-item-input-text-add::after{
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
    .content-item-input-text-add:hover::after{
      background-image: url("@/assets/images/UI/buttons/add_item_hover.png");
    }
    .editing__sources{
      margin-top: 55px;
      padding-left: 42px;
      padding-right: 42px;
      width: 100%;
    }
    .editing__sources__title{
      text-align: center;
      font-size: 28px;
      margin-bottom: 20px;
    }
    .editing__sources-source{
      margin-bottom: 10px;
      position: relative;
    }
    .editing__control{
      margin-top: 68px;
      width: 100%;
      display: flex;
      flex-flow: column;
      align-items: center;
    }
    .editing__control-error{
      margin-top: 40px;
      color: #8D0909;
      text-align: center;
      font-size: 18px;
    }
    .editing__control-success{
      margin-top: 40px;
      font-size: 18px;
      line-height: 20px;
      color: #1d6923;
    }
    @media(max-width: 476px){
      .button_control{
        display: flex;
        flex-flow: column;
      }
      .button_delete{
        margin-top: 20px;
      }
    }
</style>