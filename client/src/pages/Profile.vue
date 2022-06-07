<template>
  <div class = "profile" v-cloak>
    <div class = "container__loader" v-if = "loading" style = "padding-top: 180px; padding-bottom:240px">
      <div class = "loader"></div>
    </div>
    <h2 class = "user_is_banned" v-else-if = "user.is_banned && !permission.canBan">
        Пользователь заблокирован
    </h2>
    <div class = "profile__container" v-else-if = "(!user.is_banned || user.user_id == user_id || permission.canBan) && user">
      <h1 class = "profile__title">Профиль</h1>
      <div class = "profile__content">
        <div class = "profile__item type1">
          <div class = "profile__item-title">Имя пользователя</div>
          <div v-if="!isEdit" class = "profile__item-value">{{user.username}}</div>
          <kiku-input v-else class = "profile__item-input"
            placeholder="Введите новое имя пользователя" 
            type="text" 
            :value = "formEditUser.username"
            @input = "formEditUser.username = $event.target.value"
          />
        </div>
        <div class = "profile__item type2">
          <div class = "profile__item-title">Роль</div>
          <div v-if="!(isEdit && permission.canAssignRoles)" class = "profile__item-value">
            {{userRolesWithoutUser}}
          </div>
          <Multiselect v-else-if = "permission.canAssignRoles"
            v-model="formEditUser.roles" 
            :options="rolesWithoutUser"
            label="display"
            trackBy="id"
            valueProp="id"
            mode="tags"
            placeholder="Выберите роль"
            noResultsText="Доступных ролей нет"
            :close-on-select="true"
            class = ""
          >
            <template v-slot:tag="{ option, handleTagRemove, disabled }">
                <div class="multiselect-tag is-user">
                    {{ option.display }}
                    <span
                        v-if="!disabled"
                        class="multiselect-tag-remove"
                        @mousedown.prevent="handleTagRemove(option, $event)"
                    >
                        <span class="multiselect-tag-remove-icon"></span>
                    </span>
                </div>
            </template>
          </Multiselect>
        </div>
        <div class = "profile__item type3">
          <div class = "profile__item-title">Дата регистрации</div>
          <div class = "profile__item-value">{{user.registration_date}}</div>
        </div>
        <div class = "profile__item type1">
          <div class = "profile__item-title">Имя</div>
          <div v-if="!isEdit" class = "profile__item-value">{{user.name == null ? "—" : user.name}}</div>
          <kiku-input v-else class = "profile__item-input" 
            placeholder="Введите имя" 
            type="text" 
            :value = "formEditUser.name"
            @input = "formEditUser.name = $event.target.value"
          />
        </div>
        <div class = "profile__item type2">
          <div class = "profile__item-title">Фамилия</div>
          <div v-if="!isEdit" class = "profile__item-value">{{user.surname == null ? "—" : user.surname}}</div>
          <kiku-input v-else class = "profile__item-input" 
            placeholder="Введите фамилию" 
            type="text" 
           :value = "formEditUser.surname"
            @input = "formEditUser.surname = $event.target.value"
          />
        </div>
        <div class = "profile__item type3">
          <div class = "profile__item-title">Email</div>
          <div v-if="!isEdit" class = "profile__item-value">{{user.email == null || user.email == "" ? "—" : user.email}}</div>
          <kiku-input v-else class = "profile__item-input" 
            placeholder="Введите email" 
            type="email" 
            :value = "formEditUser.email"
            @input = "formEditUser.email = $event.target.value"
          />
        </div>
      </div>
      <div class = "profile__control">
        <div v-if = "!isEdit && !isRepass" class="profile__control-main">
          <kiku-button v-show = "user_id == user.user_id && !user.is_banned || permission.canEditUsers" @click="Edit">Редактировать</kiku-button>
          <kiku-button v-show = "user_id == user.user_id && !user.is_banned" @click = "EditPassControl">Изменить пароль</kiku-button>
          <kiku-button v-show = "user_id == user.user_id || permission.canDeleteUsers" :isDelete="true" @click = "Delete">Удалить</kiku-button>
          <kiku-button v-show = "permission.canBan && !(user_id == user.user_id) && !userRolesWithoutUser.includes('Администратор')" :isDelete="true" @click = "Ban">{{user.is_banned ? 'Разблокировать' : 'Заблокировать'}}</kiku-button>
        </div>
        <kiku-button v-else-if = "isRepass && user_id == user.user_id" @click = "EditPassControl">Закрыть</kiku-button>
        <kiku-button class = "profile__control-save" v-else @click="Edit">Сохранить</kiku-button>
        <div v-show="formEditUser.error" class = "profile__edit-user-error">{{formEditUser.error}}</div>
      </div>
      <form v-if = "isRepass" class = "profile__edit-password" @submit.prevent="EditPass">
          <div class = "profile__edit-password-title">Введите старый пароль</div>
          <input class = "profile__edit-password-input" type = "password" v-model="formEditPass.oldPass">
          <div class = "profile__edit-password-title">Введите новый пароль</div>
          <input class = "profile__edit-password-input" type = "password" v-model="formEditPass.newPass">
          <div class = "profile__edit-password-title">Повторно введите новый пароль</div>
          <input class = "profile__edit-password-input" type = "password" v-model="formEditPass.reNewPass">
          <kiku-button class = "profile__edit-password-button">Сохранить</kiku-button>
          <div class = "profile__edit-password-error">{{formEditPass.error}}</div>
      </form>
      <div v-if = "formEditPass.success && isLogin" class = "profile__edit-password-success">{{formEditPass.success}}</div>
      <div class = "profile__saved-article" v-if = "user.user_id == user_id" id = "saved_articles">
        <h2 class = "profile__saved-article-title">Сохраненные статьи</h2>
        <div class = "profile__saved-article-list" v-if = "convert_articles.length">
            <ArticleList :articles="convert_articles"/>
        </div>
        <div v-else class = "profile__saved-article-error">
            <div class = "profile__saved-article-error-tittle">Cтатей нет.</div>
            <a href="/periods"><kiku-button>Добавить?</kiku-button></a>
        </div>
      </div>
    </div>
     <div v-else class = "profile__content_none">Пользователь не найден</div>
  </div>
  <div v-if = "isDelete" class = "deletion-warning">
      <h1 class = "deletion-warning__title">Удаление</h1>
      <div class = "deletion-warning__body">Вы уверены?</div>
      <div class = "deletion-warning__buttons">
        <button class = "deletion-warning__button" href="/" @click="Yes">Да</button>
        <button class = "deletion-warning__button" @click="No">Нет</button>
      </div>
  </div>
</template>

<script>
import ArticleList from "@/components/ArticleList.vue"
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
import articleMixin from "@/mixins/articleMixin"
import Multiselect from '@vueform/multiselect'

export default {
    mixins: [articleMixin],
    emits: ['drop'],
    components:{
        ArticleList, Multiselect
    },
    data(){
        return{
            user: {},
            isRepass: false,
            isEdit: false,
            isDelete: false,
            loading: false,
            formEditUser:{
                username: '',
                name: '',
                surname: '',
                email: '',
                roles: [],
                error: ''
            },
            formEditPass:{
                button: 'Изменить пароль',
                oldPass: '',
                newPass: '',
                reNewPass: '',
                error: '',
                success: ''
            },
            convert_articles: []
        }
    },
    computed: {
      canAdd() {
        if(this.formEditUser.username){
          return true
        }
      },
      rolesWithoutUser(){
        var result = []
        this.roles.forEach(role =>{
            if(role.id != "user"){
                result.push(role)
            }
        })
        return result
      },
      userRolesWithoutUser(){
        var result = ""
        if(this.user.roles){
            this.user.roles.forEach(role =>{
                if(role.id != "user"){
                    if(result.length)
                        result += ", " + role.display
                    else
                        result += role.display
                }
            })
            if(!result.length){
                result += this.roles.find(role => role.id === "user").display
            }
        }
        return result
      },
      ...mapState({
          saved_articles: state => state.saved_articles,
          permission: state => state.permission,
          user_id: state => state.user.body.user_id,
          isLogin: state => state.user.isLogin,
          isHidden: state => state.isHidden,
          roles: state => state.roles
      }),
      ...mapGetters({
        isHavePermission: 'user/IsHavePermission',
        getSavedArticles: 'getSavedArticles'
      })
    },
    methods: {
        ...mapActions({
            DeleteUser: 'user/Delete',
            EditUser: 'user/EditUser',
            EditPassword: 'user/EditPass',
            GetUser: 'user/GetUser',
            BanControl: 'user/BanControl'
        }),
        ...mapMutations({
            SetUser: 'user/setUser'
        }),
        async Edit(){
            this.isRepass = false
            this.isDelete = false
            if(this.isEdit){
                if(this.formEditUser.username == null || this.formEditUser.username.length < 4 || this.formEditUser.username.length > 10 ){
                    this.formEditUser.error = "Имя пользователя должно быть больше от 4 до 10 символов"
                    return;
                }
                if(this.formEditUser.username.search('^[a-zA-Z0-9]+$')){
                    this.formEditUser.error = "Для имени пользователя допускаются только буквы латинского алфавита и цифры"
                    return;
                }
                if(this.formEditUser.name != null && this.formEditUser.name.length > 15 ){
                    this.formEditUser.error = "Имя должно быть до 15 символов"
                    return;
                }
                if(this.formEditUser.surname != null && this.formEditUser.surname.length > 15 ){
                    this.formEditUser.error = "Фамилия должна быть до 15 символов"
                    return;
                }
                this.isEdit = false
                var user = {
                    id: this.user.user_id,
                    username: this.formEditUser.username,
                    name: this.formEditUser.name,
                    surname: this.formEditUser.surname,
                    email: this.formEditUser.email,
                    roles: this.formEditUser.roles,
                }
                if(!user.roles.find(role => role === "user"))
                    user.roles.unshift(this.roles.find(role => role.id === "user").id)
                this.formEditUser = {
                    username: '',
                    name: '',
                    surname: '',
                    email: '',
                    roles: [],
                    error: ''
                }
                var err = this.EditUser(user)
                err.then(value => {
                    this.formEditUser.error = value
                    if(value){
                        return
                    }
                    var convertRoles = []
                    user.roles.forEach(id =>{
                        convertRoles.push(this.roles.find(role => role.id === id))
                    })
                    this.user.username = user.username,
                    this.user.name = user.name,
                    this.user.surname = user.surname,
                    this.user.email = user.email,
                    this.user.roles = convertRoles
                    if(this.user_id === this.user.user_id){
                        this.SetUser(this.user)
                    }
                })
            }
            else{
                this.isEdit = true
                var convertRoles = []
                this.user.roles.forEach(role => {
                    convertRoles.push(role.id)
                })
                this.formEditUser = {
                    username: this.user.username,
                    name: this.user.name,
                    surname: this.user.surname,
                    email: this.user.email,
                    roles: convertRoles,
                    error: ''
                }
            }
        },
        Delete(){
            this.isRepass = false
            this.isEdit = false
            if(this.isDelete){
                this.isDelete = false
                this.$emit("drop", false)
            } 
            else{
                this.isDelete = true
                this.$emit("drop", true)
            }
        },
        async Yes(){
            this.$router.push({path: '/#header'})
            this.DeleteUser(this.user.user_id)
        },
        No(){
            this.isDelete = false
            this.$emit("drop", false)
        },
        EditPassControl(){
            this.isEdit = false
            this.isDelete = false
            if(this.isRepass) {
                this.formEditPass = {
                    button: 'Изменить пароль',
                    oldPass: '',
                    newPass: '',
                    reNewPass: '',
                    error: '',
                    success: ''
                }
                this.isRepass = false
            }
            else {
                this.formEditPass = {
                    button: 'Закрыть',
                    oldPass: '',
                    newPass: '',
                    reNewPass: '',
                    error: '',
                    success: ''
                }
                this.isRepass = true
            }
        },
        async EditPass(){
            this.formEditPass.error = ''
            const {...input} = this.formEditPass
            if(!input.oldPass){
                this.formEditPass.error = "Введите старый пароль"
                return;
            }
            if(!input.newPass){
                this.formEditPass.error = "Введите новый пароль"
                return;
            }
            if(input.newPass.search('^[a-zA-Z0-9]+$')){
                this.formEditPass.error = "Для пароля допускаются только буквы латинского алфавита и цифры"
                return;
            }
            if(input.oldPass === input.newPass){
                this.formEditPass.error = "Старый и новый пароли должны отличаться"
                return;
            }
            if(input.newPass.length < 4 || input.newPass.length > 10 ){
                this.formEditPass.error = "Пароль должен быть от 4 до 10 символов"
                return;
            }
            if(!input.reNewPass){
                this.formEditPass.error = "Введите повторный пароль"
                return;
            }
            if(input.newPass != input.reNewPass){
                this.formEditPass.error = "Новые пароли не совпадают"
                return;
            }
            const err = this.EditPassword(input)
            err.then(value => {
                this.formEditPass.error = value
                if(!value){
                    this.EditPassControl()
                    this.formEditPass.success = "Пароль успешно изменен"
                }
            })
        },
        async Ban(){
            if(this.user.is_banned){
                this.user.is_banned = false
                await this.BanControl({value:false, user_id:this.user.user_id})
            }
            else{
                this.user.is_banned = true
                await this.BanControl({value:true, user_id:this.user.user_id})
            }
        },
        async LoadingArticles(){
            if(this.saved_articles){
                this.saved_articles.forEach(article =>{
                    this.Decrease(article).then(convertArticle => {
                        convertArticle.isSave = true
                        if(this.isHidden){
                            convertArticle.isHidden = true
                        }
                        else convertArticle.isHidden = false
                        this.convert_articles.push(convertArticle)
                    })
                })
            }
        }
    },
    async mounted() {
        this.loading = true

        if(!this.convert_articles.length) {
            await this.LoadingArticles()
        }

        this.GetUser(this.$route.params.id).then(res =>{
            this.user = res
        })
        this.loading = false
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
    .profile{
        margin-top:80px;
        background-color: #FFF6F6;
        height: 100%;
        position: relative;
    }

    .profile__container{
        padding-bottom: 50px;
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

    .profile__title{
        margin-left: auto;
        margin-right: auto;
        margin-top: 66px;
        font-size: 32px;
    }

    .profile__content{
        margin-top: 100px;
        padding-left: 15px;
        padding-right: 15px;
        position: relative;
        display:grid;
        grid-template-columns: 33.33% 33.33% 33.33%;
        grid-template-rows: 166px 166px;
        width: 100%;
        max-width: 938px;
        font-size: 20px;
    }

    .profile__content::after{
        position: absolute;
        content: "";
        top:calc(50% + -50px);
        left:0px;
        width: 100%;
        height: 1px;
        background-color: #A5A5A5;
    }
    .type2{
        text-align: center;
    }
    .type3{
        text-align: end;
    }
    .profile__item{
        position: relative;
        height: 100%;
    }
    .profile__item-title{
        color: #A5A5A5;
    }
    .profile__item-value{
        margin-top: 20px;
    }
    .profile__item-input{
        margin-top: 20px;
        width: 90%;
    }
    .multiselect{
        margin-top: 20px;
        --ms-tag-bg: #DCA600;
        --ms-tag-color: #000000;
        --ms-tag-radius: 0px;
        --ms-line-height: 1;
        border: #000000 1px solid;
        border-radius: 0px;
        max-width: 95%;
    }
    .multiselect.is-active{
        box-shadow: none;
    }
    .multiselect.is-open{
        border-radius: 0px;
    }
    .multiselect-clear-icon{
        background-color: #A5A5A5;
    }
    .multiselect-caret{
        background-color: #A5A5A5;
    }
    .profile__control{
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    .profile__control-main{
        margin-bottom: 80px;
        display: flex;
        height: 50px;
        justify-items: center;
    }
    .profile__control-save{
        margin-bottom: 80px;
    }
    .deletion-warning{
        top:calc(50% + -150px);
        left:calc(50% + -200px);
        position: fixed;
        z-index: 9999;
        width: 400px;
        height: 300px;
        padding-top: 50px;
        padding-bottom: 50px;

        display:flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;

        color: #FFF6F6;
        background-color: #8D0909;
        box-shadow: 4px 4px 4px rgba(141, 9, 9, 0.25);
    }
    .deletion-warning__title{
        
    }
    .deletion-warning__body{
        
        font-size: 24px;
        line-height: 26px;
    }
    .deletion-warning__buttons{
        
    }
    .deletion-warning__button{
        margin-left: 20px;
        margin-right: 20px;
        width: 100px;
        height: 40px;
        font-size: 20px;
        line-height: 22px;
        color:#FFF6F6;
        border: 1px solid #FFF6F6;
    }
    .deletion-warning__button:hover{
        color:#000000;
        background-color: #DCA600;
        border: 1px solid #DCA600;
    }
    .profile__edit-password{
        padding-left: 15px;
        padding-right: 15px;
        max-width: 400px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;

        font-size: 20px;
        line-height: 22px;
    }
    .profile__edit-password-title{
        margin-top: 30px;
    }
    .profile__edit-password-input{
        margin-top: 8px;
    }
    .profile__edit-password-button{
        margin-top:30px;
        align-self: center;
    }
    .profile__edit-password-error{
        align-self: center;
        margin-top: 25px;
        margin-bottom: 80px;
        font-size: 18px;
        line-height: 20px;
        color:#8D0909;
        text-align: center;
    }
    .profile__edit-user-error{
        align-self: center;
        margin-bottom: 80px;
        font-size: 18px;
        line-height: 20px;
        color:#8D0909;
        text-align: center;
    }
    .profile__edit-password-success{
        margin-top: 40px;
        margin-bottom: 60px;
        font-size: 18px;
        line-height: 20px;
        color: #1d6923;
    }
    .profile__edit-user-success{
        margin-top: 40px;
        margin-bottom: 60px;
        font-size: 18px;
        line-height: 20px;
        color: #1d6923;
    }
    .profile__saved-article{
        width: 100%;
    }
    .profile__saved-article-title{
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 66px;
        font-size: 32px;
        text-align: center;
    }
    .profile__saved-article-list{
        
    }
    .profile__saved-article-error{
        margin-bottom: 135px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    .profile__saved-article-error-tittle{
        margin-bottom: 66px;
        font-size: 24px;
        text-align: center;
    }
    .profile__saved-article-error-link{
        width: 170px;
        height: 50px;
        font-size: 20px;
        color: #DCA600;
        border: 1px solid #DCA600;
        box-shadow: 4px 4px 4px rgba(220, 166, 0, 0.4);
    }
    .profile__saved-article-error-link:hover{
        color: #8D0909;
        border: 1px solid #8D0909;
        box-shadow: 4px 4px 4px rgba(141, 9, 9, 0.25);
    }
    .profile__content_none{
        font-size: 32px;
        text-align: center;
        padding-top: 260px;
        padding-bottom:240px
    }
    .user_is_banned{
        padding-top: 160px;
        padding-bottom: 240px;
        color:#8D0909;
        font-size: 32px;
        text-align: center;
    }

    @media(max-width: 836px){
        .profile__control-main{
            display: flex;
            flex-flow: column;
            height: 100%;
            /*
            justify-items: center;*/
        }
        .button {
            margin-top: 20px;
        }

        .profile__content{
            margin-top: 36px;
            /*padding-left: 15px;
            padding-right: 15px;*/
            display:flex;
            flex-flow: column;

        }
        .profile__content::after{
            display: none;
        }
        .type1{
            text-align: center;
        }
        .type2{
            text-align: center;
        }
        .type3{
            text-align: center;
        }
        .profile__item-title{
            margin-top: 36px;
        }
        .profile__item-value{
            margin-top: 12px;
            font-size: 24px;
        }
        .profile__control{
            margin-top: 36px;
        }
    }

    /*@media(max-width: 576px){
        .profile__content{
            margin-top: 36px;
            display:flex;
            flex-flow: column;

        }
        .profile__content::after{
            display: none;
        }
        .type1{
            text-align: center;
        }
        .type2{
            text-align: center;
        }
        .type3{
            text-align: center;
        }
        .profile__item-title{
            margin-top: 36px;
        }
        .profile__item-value{
            margin-top: 12px;
            font-size: 24px;
        }
        .profile__control{
            margin-top: 36px;
        }
    }*/

</style>