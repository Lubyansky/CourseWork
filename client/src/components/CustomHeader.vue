<template>
  <header class = "header" id="header">
    <nav class = "header-container">
        <img class = "header__logo" src = "../assets/images/logo.svg" alt="Лого">
        <nav class = "nav">
            <a class = "nav__link" href = "/">Главная</a>
            <a class = "nav__link" id = "buttonHistory" @click="PeriodsMenuIsOpen ? PeriodsMenuIsOpen = false : PeriodsMenuIsOpen = true" v-click-outside="PeriodsMenuClickOutside">Периоды</a>
            <a class = "nav__link" href = "/periods">Материалы</a>
        </nav>
        <nav class = "history-menu" v-show="PeriodsMenuIsOpen">
            <a class = "history-menu__link link_black" v-for="tag in tags" :key=tag :href="'/periods?tags='+tag.id">&nbsp;&nbsp;·&nbsp;{{tag.title}}</a>
        </nav>
        <div v-click-outside="SearchIsOpenClickOutside">
            <button class = "search__button-cotrol find" @click="SearchControl"></button>
            <form class = "search__container" v-show="SearchIsOpen">
                <input class = "search__input" type="text" :value = "query" @input = "query = $event.target.value">
            </form>
            <div class = "search__results" v-show = "searchResults">
                <div class = "search__results__container">
                    <a class = "search__result" v-for="result in searchResults" :key="result" :href="result.link">{{result.title}}</a>
                </div>
            </div >
        </div>
    </nav>
  </header> 
  <div class = "login" id = "Authorization" v-click-outside="MenuClickOutside">
    <button class = "login__open" 
        :class="{loginOpen: isLogin}" 
        @click="OpenMenu" 
        id = "openLogin" 
        type = "submit" 
        :title = "name ? name : 'Войти'">
            {{nameShorthand}}
    </button>
    <div v-if = "MenuIsOpen" class = "login__container">
        <div class = login__menu v-if = "isLogin" >
            <div class = "login__username" :title = "fullName ? fullName: ''">
                {{fullNameShorthand}}
            </div>
            <a class = "login__link" :href="'/profile/' + user.user_id">Профиль</a>
            <a class = "login__link" :href = "'/profile/'+ user.user_id + '#saved_articles'">Сохранённые статьи</a>
            <a class = "login__link" href = "/article_management" v-if = "(permission.canAddArticles || permission.canEditArticles) && !isBanned">Управление материалами</a>
            <button class = "login__logout" @click.prevent="Logout" id = "buttonLogout" type = "submit">Выйти</button>
        </div>
        <div class = "login__form" v-else>
            <div class = "login__form-title">{{title}}</div>
            <div class = "login__form-username">Имя пользователя  {{isTurn ? '(от 4 до 10 символов)' : ''}}</div>
            <input class = "username__input" id = "usernameInput" type="text" v-model="form.username">
            <div class = "login__form-password" >Пароль {{isTurn ? '(от 4 до 10 символов)' : ''}}</div>
            <input class = "password__input" id = "passwordInput" type="password" v-model="form.password">
            <div class = "login__form-password" v-if = "isTurn" >Повторите пароль</div>
            <input class = "password__input" v-if = "isTurn" id = "repasswordInput" type="password" v-model="form.repassword">
            <button v-if="!isTurn" class = "login__button" id = "buttonLogin" type = "submit" @click.prevent="Login">Войти</button>
            <button v-else class = "login__button" :style="{width: curWidth}" id = "buttonRegist" type = "submit"  @click.prevent="Registration">Зарегистрироваться</button>
            <div class = login__error v-if = "error != ''">{{error}}</div>
            <a class = "login__form-regist" @click="TurnForm">{{turnText}}</a>
        </div>
    </div>
  </div>
  <div v-click-outside="MobileMenuClickOutside">
        <div class = "burger-menu" @click="MobileMenuIsOpen ? MobileMenuIsOpen = false : MobileMenuIsOpen = true">
            <div class = "burger-menu__line"></div>
            <div class = "burger-menu__line"></div>
            <div class = "burger-menu__line"></div>
        </div>
        <div v-show="MobileMenuIsOpen" class = "mobile-menu">
            <div v-if = "MobileLoginIsOpen" class="login__form-mobile">
                <button class = "login__form-close" @click="MobileLoginIsOpen = false"></button>
                <div v-if="!isTurn" class="login__form-login">
                    <div class = "login__form-title">{{title}}</div>
                    <div class = "login__form-username">Имя пользователя</div>
                    <input class = "username__input" id = "usernameInput" type="text" v-model="form.username">
                    <div class = "login__form-password" >Пароль</div>
                    <input class = "password__input" id = "passwordInput" type="password" v-model="form.password">
                    <div class = login__error v-if = "error != ''">{{error}}</div>
                    <button class = "login__button" id = "buttonLogin" type = "submit" @click.prevent="Login">Войти</button>
                    <a class = "login__form-regist" @click="TurnForm">{{turnText}}</a>
                </div>
                <div v-else class="login__form-register">
                    <div class = "login__form-title">{{title}}</div>
                    <div class = "login__form-username">Имя пользователя (от 4 до 10 символов)</div>
                    <input class = "username__input" id = "usernameInput" type="text" v-model="form.username">
                    <div class = "login__form-password" >Пароль (от 4 до 10 символов)</div>
                    <input class = "password__input" id = "passwordInput" type="password" v-model="form.password">
                    <div class = "login__form-password" v-if = "isTurn" >Повторите пароль</div>
                    <input class = "password__input" v-if = "isTurn" id = "repasswordInput" type="password" v-model="form.repassword">
                    <button class = "login__button" :style="{width: curWidth}" type = "submit"  @click.prevent="Registration">Зарегистрироваться</button>
                    <div class = login__error v-if = "error != ''">{{error}}</div>
                    <a class = "login__form-regist" @click="TurnForm">{{turnText}}</a>
                </div>
            </div>
            <div v-else>
                <a class = "mobile-menu__link" href = "/">Главная</a>
                <a class = "mobile-menu__link" href = "/periods">Материалы</a>
                <a v-show="isLogin" class = "mobile-menu__link" :href="'/profile/' + user.user_id">Профиль</a>
                <a v-show="isLogin" class = "mobile-menu__link" :href = "'/profile/'+ user.user_id + '#saved_articles'">Сохранённые статьи</a>
                <a v-show="isLogin" class = "mobile-menu__link" href = "/article_management" v-if = "(permission.canAddArticles || permission.canEditArticles) && !isBanned">Управление материалами</a>
                <button class = "mobile-menu__link" 
                    v-if="!isLogin"
                    @click="MobileLoginIsOpen ? MobileLoginIsOpen = false : MobileLoginIsOpen = true"  
                    type = "submit" 
                    :title = "name ? name : 'Войти'">
                        Войти
                </button>
                <button v-else 
                    class = "mobile-menu__link"
                    @click.prevent="Logout" 
                    type = "submit">
                    Выйти
                </button>
            </div>
        </div>
  </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3'
import jQuery from "jquery";
import {mapActions, mapGetters, mapState} from 'vuex'
import axios from "axios";
window.$ = window.jQuery = jQuery;

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  data(){
    return{
      MenuIsOpen: false,
      SearchIsOpen: false,
      PeriodsMenuIsOpen: false,
      MobileMenuIsOpen: false,
      MobileLoginIsOpen: false,
      error: '',
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      isTurn: false,
      turnText: 'Регистрация',
      curWidth: '130px',
      title: 'Войти',
      formSearch: {
        searchInput: ''
      },
      canAddArticles: false,
      query: null,
      searchResults: null
    }
  },
  computed: {
    ...mapState({
        isLogin: state => state.user.isLogin,
        user: state => state.user.body,
        permission: state => state.permission,
        isBanned: state => state.user.body.is_banned,
        tags: state => state.tags,
        URL: state => state.URL
    }),
    ...mapGetters({
        isHavePermission: 'user/IsHavePermission'
    }),
    name: function(){
        if(this.isLogin){
            return this.user.name ? this.user.name : this.user.username
        }
    },
    fullName: function () {
        if(this.isLogin){
            const firstName = this.user.name ? this.user.name : this.user.username
            const secondName = this.user.surname && this.user.name ? this.user.surname : ''
            var result = ''
            if(secondName){
                result += firstName + " " + secondName
            }
            else {
                result += firstName
            }
            return result
        }  
    },
    nameShorthand: function(){
        if(this.name && this.name.length > 8){
            return this.name.substring(0, 7) + "..."
        }
        else{
            return this.name
        }
    },
    fullNameShorthand: function(){
        if(this.fullName && this.fullName.length > 19){
            return this.fullName.substring(0, 18) + "..."
        }
        else{
            return this.fullName
        }
    }
  },
  methods: {
    ...mapActions({
        registration: 'user/Registration',
        login: 'user/Login',
        logout: 'user/Logout'
    }),
    MenuClickOutside() {
      if(this.MenuIsOpen)
        this.MenuIsOpen = false
    },
    MobileMenuClickOutside() {
      if(this.MobileMenuIsOpen)
        this.MobileMenuIsOpen = false
    },
    SearchIsOpenClickOutside() {
      if(this.SearchIsOpen)
        this.SearchIsOpen = false
        this.searchResults = null
        this.search = null
    },
    PeriodsMenuClickOutside() {
      if(this.PeriodsMenuIsOpen)
        this.PeriodsMenuIsOpen = false
    },
    SearchControl(){
        if(this.SearchIsOpen){
            this.SearchIsOpen = false
            this.searchResults = null
            this.search = null
        }
        else{
            this.SearchIsOpen = true
        }
    },
    async Registration(){
      if(this.MobileLoginIsOpen){
          this.MobileLoginIsOpen = false
      }
      this.error = ''
      const {...input} = this.form
      if(!input.username){
        this.error = "Введите имя пользователя"
        return;
      }
      if(input.username.search('^[a-zA-Z0-9]+$')){
        this.error = "Для имени допускаются только буквы латинского алфавита и цифры"
        return;
      }
      if(input.username.length < 4 || input.username.length > 10 ){
        this.error = "Имя пользователя должно быть от 4 до 10 символов"
        return;
      }
      if(!input.password){
        this.error = "Введите пароль"
        return;
      }
      if(input.password.search('^[a-zA-Z0-9]+$')){
        this.error = "Для пароля допускаются только буквы латинского алфавита и цифры"
        return;
      }
      if(input.password.length < 4 || input.password.length > 10 ){
        this.error = "Пароль должен быть от 4 до 10 символов"
        return;
      }
      if(!input.repassword){
        this.error = "Введите повторный пароль"
        return;
      }
      if(input.repassword != input.password){
        this.error = "Пароли не совпадают"
        return;
      }
      const err = this.registration(input)
      err.then(value => {
        this.error = value
      })

      this.form = {
        username: '',
        password: '',
        repassword: ''
      }
       this.isTurn = false
    },
    async Login(){
      if(this.MobileLoginIsOpen){
          this.MobileLoginIsOpen = false
      }
      this.error = ''
      const {...input} = this.form
      if(!input.username){
        this.error = "Введите имя пользователя"
        return;
      }
      if(!input.password){
        this.error = "Введите пароль"
        return;
      }
      const err = this.login(input)
      err.then(value => {
        this.error = value
      })
      this.form = {
        username: '',
        password: '',
        repassword: ''
      }
    },
    async Logout(){
      this.logout()
      if(this.$route.name == 'article_management' || this.$route.name == 'article_editing'){
          this.$router.push('/')
      }
    },
    async OpenMenu(){
      if(this.MenuIsOpen){
        this.MenuIsOpen = false
        this.error = ''
            this.form = {
            username: '',
            password: '',
            repassword: ''
        }
      }
      else {
        this.MenuIsOpen = true
        this.error = ''
        this.form = {
            username: '',
            password: '',
            repassword: ''
        }
      }
    },
    async TurnForm(){
        if(this.isTurn){
            this.isTurn = false
            this.turnText = "Регистрация"
            this.curWidth = '100px'
            this.form = {
                username: '',
                password: '',
                repassword: ''
            }
            this.error = ''
            this.title = 'Войти'
        }
        else {
            this.isTurn = true
            this.turnText = "Уже зарегестрированны?"
            this.curWidth = '220px'
            this.form = {
                username: '',
                password: '',
                repassword: ''
            }
            this.error = ''
            this.title = 'Регистрация'
        }
        }
    },
    async mounted() {
        this.isHavePermission('canAddArticles').then(
            res =>{
            this.canAddArticles = res
            }
        )
    },
    watch: {
        async query(){
            if(this.query){
                var result = []
                if(this.query.toLowerCase().trim().substring(0,1) == "@" && this.query.toLowerCase().trim().substring(1,this.query.length)){
                    const url = (this.URL.USER + "/get_user_by_name/" + this.query.toLowerCase().trim().substring(1,this.query.length))
                    await axios.get(url).then(res => {
                        if(res.data.length){
                            res.data.forEach(data =>{
                                result.push(data)
                            })
                        }
                    })
                }
                else{
                    this.tags.forEach(tag => {
                        if(tag.title.toLowerCase().trim().includes(this.query.toLowerCase().trim())){
                            result.push({title: tag.title + " [Период]", link: '/periods?tags=' + tag.id})
                        }
                    })
                    const url = (this.URL.API + "/articles_by_title/" + this.query.toLowerCase().trim())
                    await axios.get(url).then(res => {
                        if(res.data.length){
                            res.data.forEach(data =>{
                                result.push(data)
                            })
                        }
                    })
                }
                if(this.query)
                    this.searchResults = result
            }
            else{
                this.searchResults = null
            }
        }
    }
}

</script>

<style>
    .header {
        padding-top: 15px;
        position: absolute;
        display: flex;
        justify-self: center;
        flex-flow: column;
        top: 0;
        left: 0;
        
        width: 100%;
        z-index: 1000;

        background-color: #8D0909;
        background-position: center;
        background-size: 100vw;
        background-repeat: no-repeat;
    }

    .header-container {
        padding: 0px 50px 10px;
        display: inline-flex;
        justify-content: space-between;
        width: 100%;
        height: 65px;
    }
    .header__logo {
        width: 145px;
        height: 50px;
    }
    .burger-menu {
        display: none;
        flex-wrap: wrap;
        position: absolute;

        top: 13.5px;
        left: 50px;

        z-index: 11111;

        width: 20px;
        height: 36px;
    }

    .burger-menu__line {
        position: relative;
        content: "";
        top:1px;
        width: 20px;
        height: 2px;
        margin-top: 4.5px;
        margin-bottom: 4.5px;
        background-color: #fff;
    }

    .link_white {
        color:#ffffff;
        text-decoration: none;

        position: relative;

        font-weight: normal;
        font-size: 20px;
        line-height: 23px;

        transition: color .1s ease-in-out;
    }

    .nav
    {
        margin-left: 11.25%;
        margin-right: 25%;
        width: 100%;
        position: relative;

        display: flex;
        align-items: center;	
        justify-content: space-between;

        text-align: center;
        transition: opacity 0.3s ease;
    }

    .nav__link {
        color:#ffffff;
        text-decoration: none;

        position: relative;

        font-weight: normal;
        font-size: 20px;
        line-height: 23px;

        transition: color .1s ease-in-out;
    }


    .nav__link::after{
        content: "";
        width: 100%;
        height: 1px;
        display: none;

        background-color: #DCA600;

        position: absolute;
        top: 24px;
        left: 0;
        z-index: 1;
    }

    .nav__link:hover {
        color: #DCA600;
    }

    .nav__link:hover::after {
        display: block;
    }

    .login{
        position: absolute;
        right: 0px;
        top: 0px;
        z-index: 1000;
    }

    .login__container{
        position: absolute;
        right: 0;
        top: 80px;
        display: flex;
        flex-flow: column wrap;
        justify-content: space-between;
        align-items: center;
        width: 300px;
        height: auto;
        background-color: #DCA600;
        border: 1px solid #000000;
        z-index: 100;
    }

    .login__open{
        position: relative;
        right: 160px;
        top:25px;

        width:35px;
        height:35px;

        background-image: url("@/assets/images/UI/login.svg");
        background-position: center;
        background-size: 32px 32px;
        background-repeat: no-repeat;

        font-size: 20px;
        color: #ffffff;
    }
    .loginOpen{
        width: 100%;
        background-image: none
    }
    .loginOpen::after{
        content: "";
        width: 100%;
        height: 1px;
        display: none;

        background-color: #DCA600;

        position: absolute;
        top: 30px;
        left: 0;
        z-index: 1;
    }
    .loginOpen:hover{
        color: #DCA600;
    }
    .login__open:hover::after {
        display: block;
    }
    .login__open:hover{
        background-size: 27px 27px;
    }
    .login__menu{
        display: flex;
        flex-flow: column;
        align-items: center;
        width: 100%;
        font-size: 20px;
    }
    .login__username{
        position: relative;
        padding-top: 22px;
        padding-bottom: 22px;
        text-align: center;
        width: 100%;
    }
    .login__link{
        position: relative;
        padding-top: 22px;
        padding-bottom: 22px;
        text-align: center;
        width: 100%;
        height: 100%;
        cursor: pointer;
        color: #000000;
        text-decoration: none;
    }
    .login__link:hover{
        color:#ffffff;
        background-color: #8D0909;
    }
    .login__link::before{
        content: "";
        position: absolute;
        top:0px;
        left: 0px;
        background-color: #000000;
        width: 100%;
        height: 1px;
    }
    .login__logout {
        position: relative;
        padding-top: 23px;
        padding-bottom: 22px;
        width: 100%;
        cursor: pointer;
    }
    .login__logout:hover{
        color:#ffffff;
        background-color: #8D0909;
    }
    .login__logout::after{
        content: "";
        position: absolute;
        top: -1px;
        left: 0px;
        background-color: #000000;
        width: 100%;
        height: 1px;
    }
    .login__form{
        position: relative;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        background-color: #DCA600;
        z-index: 100;
        color: #FFF6F6;
    }
    .login__form-title{
        margin-top: 32px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 26px;
        font-size: 20px;
    }
    .login__form-username{
        margin-left: 20px;
    }

    .username__input{
        margin-top: 9px;
        margin-left: 20px;
        margin-right: 20px;
        width: calc(100% + -40px);
        height: 24px;
        background-color: #DCA600;
        border: 1px solid #FFF6F6;
    }

    .login__form-password{
        margin-top: 16px;
        margin-left: 20px;
    }

    .password__input{
        margin-top: 9px;
        margin-left: 20px;
        margin-right: 20px;
        width: calc(100% + -40px);
        height: 24px;
        background-color: #DCA600;
        border: 1px solid #FFF6F6;
    }

    .login__button{
        position: relative;
        margin-left: auto;
        margin-right: auto;
        margin-top: 28px;
        margin-bottom: 18px;
        width: 100px;
        height: 32px;
        border: 1px solid #FFF6F6;
        color: #ffffff;
        cursor: pointer;
    }

    .login__error{
        margin-left: auto;
        margin-right: auto;
        max-width: 280px;
        text-align: center;
        font-size: 14px;
        color: #8D0909;
    }

    .login__form-regist{
        margin-top: 16px;
        margin-bottom: 16px;
        margin-left: auto;
        margin-right: auto;
        font-size: 16px;
        cursor: pointer;
    }

    .search__button-cotrol {
        position: absolute;
        top:20px;

        width: 45px;
        height:45px;

        cursor: pointer;
    }

    .search__button-cotrol.find{
        right: 50px;
        background-image: url("@/assets/images/UI/find_search.svg");
        background-position: center;
        background-size: 30px 30px;
        background-repeat: no-repeat;
    }
    .search__button-cotrol.find:hover{
        background-size: 25px 25px;
    }
    .search__button-cotrol.close{
        margin-right: 50px;
        right: 2.5px;
        background-image: url("@/assets/images/UI/find_close.svg");
        background-position: center;
        background-size: 25px 25px;
        background-repeat: no-repeat;
    }
    .search__button-cotrol.close:hover{
        background-size: 20px 20px;
    }

    .search__input {
        width: 100%;
        height: 60px;
        position: absolute;
        z-index: 150;

        left:0;
        top: 80px;
        padding-left:50px;
        padding-right:50px;

        font-size: 38px;

        color: #fff;
        background-color: #DCA600;
        border:none;
        outline:none;
    }
    .search__results{
        position: absolute;
        left: 0px;
        top: 140px;
        width: calc(100vw + -14px);
    }
    .search__results__container{
        width: 100%;
        height: 100%;
        max-height: 60vh;
        overflow-y: auto;

        /*display: flex;
        flex-flow: column;*/

        background-color: #DCA600;
    }
    .search__results__container::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0px;
        left: 0px;
        background-color: #FFF6F6;
    }
    .search__results__container::-webkit-scrollbar {
        width: 15px;
    }

    .search__results__container::-webkit-scrollbar-track {
        background-color: #FFF6F6;
        border: none;
    }

    .search__results__container::-webkit-scrollbar-thumb {
        background-color: #8D0909;
        border: none;
    }
    .search__result{
        padding-left: 50px;
        padding-right: 50px;
        width: 100%;
        height: 60px;

        color:#ffffff;
        text-decoration: none;

        position: relative;
        display: flex;
        align-items:center;

        font-weight: normal;
        font-size: 28px;
        line-height: 30px;

        transition: color .1s ease-in-out;
    }
    .search__result:hover{
        color: #000000;
    }
    .search__result::after{
        content: "";
        position: absolute;
        top: 0px;
        left:0px;
        width: 100%;
        height: 1px;
        background-color: #000000;
    }
    #buttonHistory { 
        cursor: pointer; 
    }

    .history-menu{
        position: absolute;
        display: flex;

        top: 80px;
        left: 0px;
        
        padding-top: 10px;
        padding-bottom: 15px;
        padding-left: 210px;
        padding-right: 210px;

        /*max-width: 1180px;*/
        width: 100%;
        height: auto;

        z-index: 9999;
        justify-content: center;
        flex-flow: wrap;

        background: #FFF6F6;
        background-size: 100%;

        text-align: center;
        font-size: 20px;
        color: #000000;

        box-shadow: 0px 4px 4px rgba(141, 9, 9, 0.25);
    }
    .history-menu::after{
        display: none;
        content: "";
        position: absolute;
        top: 80px;
        left:0px;
        width: 100%;
        height: 2px;
        background-color: #8D0909;
    }
    .link_black {
        color:#000000;
        text-decoration: none;
    }	

    .history-menu__link {
        line-height: 30px;
    }

    .history-menu__link:hover {
        color: #DCA600;
    }

    .mobile-menu{
        display: none;
        flex-flow: column;
        align-items: center;
        position: absolute;
        left: 0px;
        top: 80px;
        width: 100vw;

        z-index: 10000;
    }

    .mobile-menu::before{
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0px;
        top: -1px;
        background-color: #000000;
    }

    .mobile-menu__link{
        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
        width: 100vw;
        height: 60px;
        background-color: #DCA600;

        font-size: 24px;
        line-height: 26px;

        text-decoration: none;
        color: #000000;
    }

    .mobile-menu__link::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0px;
        bottom: 0px;
        background-color: #000000;
    }

    .mobile-menu__link:hover{
        background-color: #8D0909;
        color: #FFFFFF;
    }
    .login__form-login{
        height: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
    }
    .login__form-register{
        height: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
    }
    .login__form-close{
        position: absolute;
        top: 15px;
        right: 15px;
        width: 15px;
        height: 15px;
        background: url("@/assets/images/UI/buttons/delete-button.svg");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        background: assets\images\UI\buttons;
    }

    .login__form-mobile{
        position: relative;
        width: 100%;
        background-color: #DCA600;
        z-index: 100;
        color: #FFF6F6;
    }

    @media (max-width: 1476px) {
        .history-menu{
            padding-left: 105px;
            padding-right: 105px;
        }
    }
    @media (max-width: 1266px) {
        .history-menu{
            height:105px
        }
        .history-menu::after{
            top: 105px;
        }
    }

    @media (max-width: 992px) {
        #buttonHistory{
            display: none;
        }

        .header-container{
            height: 65px;
            padding-bottom:0;
        }
        .header__logo {
            margin-left: auto;
            margin-right: auto;
            padding-left: 10px;
            width: 165px;
        }
        .burger-menu {
            display: flex;
            margin-top: 9px;
        }
        .nav{
            display: none;
            position: absolute;

            padding: 0;
            margin: 0;
            top: 80px;
            left: 0px;

            width: 100%;
            z-index: 999;
            background-color: #8D0909;
            background-position:top;
            background-size: 100vw;
            background-repeat: no-repeat;
            flex-flow:column;
        }
        .nav::before{
            content: "";
            position: absolute;
            top: 100%;
            left: 0;
        
            width: 100%;
            height: 2px;
        
            background-color: #A5A5A5;
        
            z-index: 50;
        }
        .nav__link{
            padding-top: 24px;
            width: 100%;
            height: 75px;
            width: 100vw;
            font-size: 24px;
        }
        .nav__link:hover::after {
            display: none;
        }
        .nav__link::before{
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
        
            width: 100vw;
            height: 2px;
        
            background-color: #A5A5A5;
        
            z-index: 50;
        }
        .search__button-cotrol{
            top: 20px;
        }

        .search__results{
            position: absolute;
            left: 0px;
            top: 140px;
            width: 100vw;
        }
        .login{
            display: none;
        }
        .mobile-menu{
            display: flex;
        }
        .login__container{
            width: 100vw;
        }
        .login__form{
            max-height: 330px;
        }
    }

    @media (max-width: 768px) {
        .burger-menu {
            left: 15px;
        }
        .header-container {
            padding-left: 15px;
            padding-right: 15px;
        }
        .burger__menu {
            margin-top: 13px;
        }
        .search__button-find {
            right: 15px;
        }
        .search__button-cotrol.find{
            right: 15px;
        }
        .search__button-cotrol.close{
            margin-right: 15px;
        }
        .search__input {
            padding-left:15px;
            padding-right:65px;
        }
         .search__result{
            padding-top: 8px;
            padding-bottom: 8px;
            width: 100%;
            height: 100%;
            min-height: 60px;
        }
    }

    @media (max-width: 576px) {
        .nav__link{
            padding-top: 12.5px;
            height: 50px;
            font-size: 20px;
        }
        .nav__link::before{
            top: 0px;
        }
        .nav::before{
            top: 150px;
        }
    }
</style>