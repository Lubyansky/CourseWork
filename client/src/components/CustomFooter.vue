<template>
  <footer class = "footer">
    <img class = "footer__logo" src = "../assets/images/logo.svg" alt="Лого">
    <div class = "footer-container">
        <nav class = "footer-page__socials">
            <h4>НАШИ СОЦСЕТИ</h4>
            <a class="footer-page__social link_white" href="https://www.vk.com/" rel="noopener" target="_blank">
                <img class="footer-page__social-icon" src = "../assets/images/UI/social/icon-vk.svg" alt="Иконка вконтакте">
                <span class="footer-page__social-title">
                    vk
                </span>
            </a>
            <a class="footer-page__social link_white" href="https://www.ok.ru/" rel="noopener" target="_blank">
                <img class="footer-page__social-icon" src = "../assets/images/UI/social/icon-ok.svg" alt="Иконка одноклассники">
                <span class="footer-page__social-title">
                    одноклассники
                </span>
            </a>
            <a class="footer-page__social link_white" href="https://web.telegram.org/" rel="noopener" target="_blank">
                <img class="footer-page__social-icon" src = "../assets/images/UI/social/icon-telegram.svg" alt="Иконка телеграм">
                <span class="footer-page__social-title">
                    telegram
                </span>
            </a>
        </nav>
        <div class="footer-page__socials__interblock-line"></div>
        <div class = "footer-page__subscribe">
            <div class = "footer-page__subscribe-title">
                Подписка
                </div>
            <div class = "footer-page__subscribe-description">
                Оставьте ваш e-mail, чтобы получать наши новости
            </div>
            <form class = "footer-page__subscribe__field" @submit.prevent="makeSubscribe" v-cloak>
                <input id = "emailInput" class = "footer-page__subscribe__input" type="email" placeholder="Ваш e-mail" autocomplete="off" v-model="email">
                <button id = "buttonSubscribe" class = "footer-page__subscribe__button button-reset" type = "submit" :disabled = "!canAdd"></button>
                <div class = "footer-page__subscribe__line"></div>
            </form>
        </div>
        <div class="footer-page__subscribe__interblock-line"></div>
        <div class = "footer-page__copyright">
            <div class = "footer-page__copyright__title">
                История Японии
            </div>
            <address class = "footer-page__copyright__contacts">
                Контакты для связи: kiku@mail.com
            </address>
            <div class = "footer-page__copyright__text">
                © Kiku 2021. Все права защищены
            </div>
        </div>
    </div>
  </footer>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    data(){
        return{
            email: ''
        }
    },
    computed: {
        ...mapState({
            URL: state => state.URL
        }),
        canAdd() {
            return this.email.trim()
        }
    },
    methods: {
        async makeSubscribe(){
            const email = this.email
            this.email = ""
            console.log(email)
            const url = (this.URL.API + '/email')

            await axios.post(url, {email}, { withCredentials: true })
            .catch()
        }
    }
}
</script>

<style>
    .footer{
        width: 100%;
        height: 420px;
        
        background: #8D0909;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .footer::before{
        content: "";
        display: block;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 1px;
        z-index: 50;
        background-color: rgba(255, 247, 247, 0.5);
    }
    .footer__logo{
        padding-top: 20px;
        padding-right: 25px;

        display: block;
        margin-left: auto;
        margin-right: auto;

    }

    .footer-container{
        padding-top: 38px;
        position: relative;

        display: flex;
        align-items:flex-start;
        justify-content: center;
        flex-wrap: nowrap;
    }

    .footer-page__socials {
        max-width: 440px;
        width: 21.4vw;
        height: 225px;

        font-family: Alice;
        font-weight: 400;
        line-height: 23px;
        font-size: 24px;

        display: flex;
        flex-flow: wrap;
        align-content:space-between;

        text-transform:uppercase;

        color: #FFFFFF;
    }

    .footer-page__socials h4{
        margin: 0;
        font-style: normal; 
        font-weight: normal;
    }

    .footer-page__social {
        display: inline-flex;
        line-height: 1;
        width: 100%;

    }

    .footer-page__social:hover {
        color: #DCA600;
    }

    .footer-page__social-title{
        padding-left: 20px;
    }

    .footer-page__social-icon{
        width: 31.5px;
        height: 29px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 31.5px 29px;
    }


    .footer-page__socials__interblock-line{
        content: "";
        display: block;
        margin-left: 40px;
        margin-right: 40px;
        width: 1px;
        height: 220px;
        background-color: #ffffff;
    }

    .footer-page__subscribe{

        display: flex;
        flex-flow: wrap;
        justify-content: center;
        align-content:space-between;

        max-width: 440px;
        width: 21.4vw;
        height: 225px;

        font-family: Alice;
        font-weight: 400;
        line-height: 23px;

        position: relative;

        text-align: center;
        color: #FFFFFF;
    }

    .footer-page__subscribe-title{
        font-size: 24px;
        text-transform:uppercase;
    }

    .footer-page__subscribe-description{
        font-size: 20px;
    }

    .footer-page__subscribe__field{
        padding-left: 20px;
        padding-right: 20px;
        max-width: 100%;
        position: relative;
        display:flex;
        justify-content: space-between;
        align-items: baseline;
        align-self: center;
        flex-wrap: nowrap;
    }

    .footer-page__subscribe__field::after{
        content: "";
        position: absolute;
        left:20px;
        top:24px;
        width: calc(100% + -40px);
        height: 1px;
        z-index: 100;
        background-color: #ffffff;
    }

    .footer-page__subscribe__input{
        position: relative;
        padding-right: 12px;
        padding-bottom: 7px;
        margin-left: auto;
        margin-right: auto;
        max-width: calc(100% - 20px);
        background: none;
        border:none;
        outline:none;

        color: #ffffff;
    }
    .footer-page__subscribe__input::placeholder{
        color: #FFFFFF;
    }
    .footer-page__subscribe__button{
        width: 20px;
        height: 16px;

        background: url("@/assets/images/UI/subscribe_arrow.svg");
        background-position: center;
        background-size: 20px 16px;
        background-repeat: no-repeat;	

        border:none;
        outline:none;
    }

    .footer-page__subscribe__button:hover {
        background-size: 18px 14px;
        color: black;
        opacity: 0.5;
    }


    .footer-page__subscribe__line{
        margin-left: auto;
        margin-right: auto;
        content: "";
        display: none;
        position: relative;
        width: calc(100% - 40px);
        height: 1px;
        background-color: #ffffff;
    }

    .footer-page__subscribe__interblock-line{
        content: "";
        display: block;
        margin-left: 40px;
        margin-right: 40px;
        width: 1px;
        height: 220px;
        background-color: #ffffff;
    }

    .footer-page__copyright{
        max-width: 440px;
        width: 21.4vw;
        height: 225px;

        display: flex;
        flex-flow: wrap;
        align-content:space-between;

        font-family: Alice;
        font-weight: 400;
        line-height: 23px;
        color: #FFFFFF;
    }
    .footer-page__copyright__title{
        font-size: 20px;
    }
    .footer-page__copyright__contacts{
        font-style: normal;
        font-size: 20px;
    }
    .footer-page__copyright__text{
        font-size: 16px;
    }

    @media(max-width: 992px){
        .footer{
            width: 100%;
            height: 100%;
        }
        .footer__logo{
            padding-top: 30px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 0px;
            padding-right: 0px;
        
        }
        .footer-container{
            padding-top: 38px;
            padding-bottom: 76px;

            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: column;
        }

        .footer-page__socials {
            padding-top: 0;
            padding-left: 0;
            padding-right: 0;

            width: 100%;

            display: inline-flex;
            justify-content: center;
            flex-flow: wrap;
            text-align: center;

            content: "";
        }

        .footer-page__socials h4{
            display: none;
        }

        .footer-page__social {
            padding: 20px ;
            justify-content: center;
        }
        /*.footer-page__social-title {
            display: none;
        }*/

        .footer-page__subscribe{
            padding-top: 38px;
            width: 40%;
            height: 100%
        }
        .footer-page__subscribe-title{
            font-size: 18px;
        }
        .footer-page__subscribe-description{
        
            padding-top: 25px;
            font-size: 16px;
        }
        
        .footer-page__subscribe__field{
            margin-top: 27px;
        }
        .footer-page__copyright{
            padding-top: 40px;
            padding-left: 0;
            width: 40%;
            height: 100%;
            justify-content: center;
            text-align: center;
        }
        
        .footer-page__copyright__contacts{
            padding-top: 20px;
        }
        .footer-page__copyright__text{
            padding-top: 20px;
        }
        .footer-page__socials__interblock-line{
            display: none;
        }
        .footer-page__subscribe__interblock-line{
            display: none;
        }
    }

    @media (max-width: 768px) {
        .footer-page__copyright__title{
            font-size: 18px;
        }
        .footer-page__copyright__contacts{
            font-size: 18px;
        }
        .footer-page__copyright__text{
            font-size: 13px;
        }
        .footer-page__subscribe{
            width: 50%;
        }
        .footer-page__copyright{
            width: 50%;
        }
    }

    @media (max-width: 576px) {
        .footer-page__socials {
            padding-left: 80px;
            padding-right: 80px;
        }

        .footer-page__subscribe{
            width: 60%;
        }
        .footer-page__copyright{
            width: 60%;
        }
    }
</style>