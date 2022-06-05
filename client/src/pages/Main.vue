<template>  
	<div class = "hero" name="hero">
		<div class = "container">
			<div class="hero__content">
				<div class = "hero__container">
					<div class = "hero__line1"></div>
					<img class = "hero__image1" src = "../assets/images/hero/Image1.png" alt="Изображение 1">
					<h1 class="hero__content__title">
						История Японии
					</h1>
					<div class="hero__content__description">
						Погрузитесь в удивительную и увлекательную историю страны восходящего солнца
					</div>
					<div class = "hero__line2"></div>
				</div>
				<img class = "hero__image2" src = "../assets/images/hero/Image2.png" alt="Изображение 2">
			</div>
		</div>
	</div>
	<div class = "best">
		<div class = "container">
			<h1 class = "best__title">
				Лучшее
			</h1>
			<div class = "best__content" id = "BestArticles" v-cloak>
				<div class = "container__loader" v-if = "loadingSlider">
					<div class = "loader"></div>
				</div>
				<div class="slider best__slider" v-else-if = "articles.length">
					<div class="slider__container best__slider__container">
						<div class="slider__wrapper best__slider__wrapper">
							<div class="slider__items best__slider__items">
								<div class="slider__item best__slider__item slider__item_active" v-for="article in articles" :key="article.info.article_id">
									<a class = "best__slider__article link_black" :href = "'/article/' + article.info.article_id">
										<img class = "best__slider__article-picture" width="290" height="290" :src = "article.info.preview_image" alt="Изображение">
										<div class = "best__slider__article-tittle">{{article.info.title}}</div>
										<div class = "best__slider__article-description">{{article.info.description}}</div>
									</a>
								</div>
							</div>
						 </div>
					</div>
					<a href="#" class="slider__control best__slider__control" data-slide="prev"></a>
					<a href="#" class="slider__control best__slider__control" data-slide="next"></a>
				</div>
				<div class = "article__content_none" v-else>Статьи не найдены</div>

				<div class = "container__loader" v-if = "loadingArticle">
					<div class = "loader"></div>
				</div>
				<a class = "best__article link_white" v-else-if = "bestArticle" :href = "'/article/' + bestArticle.info.article_id">
					<img class = "best__article-picture" width="1505" height="560" :src = "bestArticle.info.preview_image" alt="Изображение">
					<h1 class = "best__article__title">{{bestArticle.info.title}}</h1>
					<div class = "best__article__description">{{bestArticle.info.description}}</div>
					<div class = "best__article__button"></div>
				</a>
				<div class = "article__content_none" v-else>Статья не найдена</div>
			</div>
		</div>
	</div>
	<div class = "history">
		<div class = "container">
			<h1 class = "history__title">
				Периоды
			</h1>
			<div class = "history__content">
				<div class="slider history__slider-desk" id = "desk">
					<div class="slider__container history__slider__container">
						<div class="slider__wrapper history__slider__wrapper">
							<div class="slider__items history__slider__items">

								<div class="slider__item history__slider__item">
									<a class = "history__slider__period link_white" href="/periods?tags=tag1">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image1.png" alt="Изображение 1">
										<div class = "history__slider__period-tittle">Доисторическая Япония</div>
									</a>
									<a class = "history__slider__period link_white" href="/periods?tags=tag2">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image2.png" alt="Изображение 2">
										<div class = "history__slider__period-tittle">Эра родовой аристократия</div>
									</a>
									<a class = "history__slider__period link_white" href="/periods?tags=tag3">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image3.png" alt="Изображение 3">
										<div class = "history__slider__period-tittle">Эра военной аристократии</div>
									</a>		
									<a class = "history__slider__period link_white" href="/periods?tags=tag4">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image4.png" alt="Изображение 4">
										<div class = "history__slider__period-tittle">Эпоха воюющих провинций</div>
									</a>
						  		</div>
									<div class="slider__item history__slider__item">
									<a class = "history__slider__period link_white" href="/periods?tags=tag5">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image5.png" alt="Изображение 5">
										<div class = "history__slider__period-tittle">Сёгунат Токугава</div>
									</a>
									<a class = "history__slider__period link_white" href="/periods?tags=tag6">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image6.png" alt="Изображение 6">
										<div class = "history__slider__period-tittle">Модернизация</div>
									</a>
									<a class = "history__slider__period link_white" href="/periods?tags=tag7">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image7.png" alt="Изображение 7">
										<div class = "history__slider__period-tittle">Япония в качестве Великой Державы</div>
									</a>		
									<a class = "history__slider__period link_white" href="/periods?tags=tag8">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image8.png" alt="Изображение 8">
										<div class = "history__slider__period-tittle">Современность</div>
									</a>
						  		</div>
							</div>
					  	</div>
					</div>
					<a href="#" class="slider__control history__slider__control" data-slide="prev"></a>
					<a href="#" class="slider__control history__slider__control" data-slide="next"></a>
					<ol class="slider__indicators history__slider__indicators">
						<li data-slide-to="0"></li>
						<li data-slide-to="1"></li>
					</ol>
				</div>
				<div class="slider history__slider-mobile" id = "mobile">
						<div class="slider__container history__slider__container">
						<div class="slider__wrapper history__slider__wrapper">
							<div class="slider__items history__slider__items">

								<div class="slider__item history__slider__item">
									<a class = "history__slider__period link_white" href="/periods?tags=tag1">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image1.png" alt="Изображение 1">
										<div class = "history__slider__period-tittle">Доисторическая Япония</div>
									</a>
								</div>
								<div class="slider__item history__slider__item">
									<a class = "history__slider__period link_white" href="/periods?tags=tag2">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image2.png" alt="Изображение 2">
										<div class = "history__slider__period-tittle">Эра родовой аристократии</div>
									</a>
								</div>
								<div class="slider__item history__slider__item">
									<a class = "history__slider__period link_white" href="/periods?tags=tag3">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image3.png" alt="Изображение 3">
										<div class = "history__slider__period-tittle">Эра военной аристократии</div>
									</a>
								</div>
									<div class="slider__item history__slider__item">		
									<a class = "history__slider__period link_white" href="/periods?tags=tag4">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image4.png" alt="Изображение 4">
										<div class = "history__slider__period-tittle">Эпоха воюющих провинций</div>
									</a>
						  		</div>
								<div class="slider__item history__slider__item">
									<a class = "history__slider__period link_white" href="/periods?tags=tag5">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image5.png" alt="Изображение 5">
										<div class = "history__slider__period-tittle">Сёгунат Токугава</div>
									</a>
								</div>
								<div class="slider__item history__slider__item">
									<a class = "history__slider__period link_white" href="/periods?tags=tag6">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image6.png" alt="Изображение 6">
										<div class = "history__slider__period-tittle">Модернизация</div>
									</a>
								</div>
								<div class="slider__item history__slider__item">
									<a class = "history__slider__period link_white" href="/periods?tags=tag7">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image7.png" alt="Изображение 7">
										<div class = "history__slider__period-tittle">Япония в качестве Великой Державы</div>
									</a>
								</div>
								<div class="slider__item history__slider__item">	
									<a class = "history__slider__period link_white" href="/periods?tags=tag8">
										<img class = "history__slider__period-picture" width="480" height="268" src = "../assets/images/periods/image8.png" alt="Изображение 8">
										<div class = "history__slider__period-tittle">Современность</div>
									</a>
						  		</div>
							</div>
					  	</div>
					</div>
					<a href="#" class="slider__control history__slider__control" data-slide="prev"></a>
					<a href="#" class="slider__control history__slider__control" data-slide="next"></a>
					<ol class="slider__indicators history__slider__indicators">
						<li data-slide-to="0"></li>
						<li data-slide-to="1"></li>
						<li data-slide-to="2"></li>
						<li data-slide-to="3"></li>
						<li data-slide-to="4"></li>
						<li data-slide-to="5"></li>
						<li data-slide-to="6"></li>
						<li data-slide-to="7"></li>
					</ol>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ChiefSlider from "../assets/scripts/chief-slider"
import articleMixin from "@/mixins/articleMixin"
import { mapState } from 'vuex'

export default {
    mixins: [articleMixin],
    data(){
        return{
        loadingSlider: false,
        loadingArticle: false,
        articles: [],
        bestArticle: ''
        }
    },
    computed: {
        ...mapState({
            URL: state => state.URL
        })
    },
    methods: {
        async loadArticles(){
            this.loadingSlider = this.loadingArticle = true
            const response = await fetch(this.URL.API + "/best_articles")
            const dataArticles = await response.json()
            
            var articles = []
            await dataArticles.forEach(async (article, index = 0) =>{
                this.Decrease(article).then(res => {
                    if(index == 0){
                        this.bestArticle = res
                    }
                    else{
                        articles.push(res)
                    }
                })
            })
            this.loadingSlider = this.loadingArticle = false
            this.articles = articles
        }
    },
    async mounted() {
        await this.loadArticles()
        if(this.articles && !this.loadingSlider){
            new ChiefSlider('.best__slider', {
                loop: true,
                swipe: false
            });
        }

        console.log(this.bestArticle)
        console.log(this.articles)

        new ChiefSlider('.history__slider-desk', {
            loop: true,
            swipe: false
        });

        new ChiefSlider('.history__slider-mobile', {
            loop: true,
            swipe: false
        });
    }
}

</script>

<style scoped>
    /*.backdrop{
        display: block;
        position: fixed;
        left: -100%;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 100;
    }*/
    .container {
        padding: 0 50px;
        margin: 0 auto;
        max-width: 1600px;
        display: flex;
        justify-self: center;
        flex-flow: column;
    }
    .hero {
        color:#ffffff;
        width: 100%;
        height: 900px;

        background-color: #8D0909;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .hero__content {
        margin-top: 160px;
    }

    .hero__content__title{
        position: relative;
        padding-top: 140px;

        font-size: 50px;
        line-height: 57px;
        z-index: 10;

    }
    .hero__content__description{
        position: relative;
        margin-left: auto;
        margin-right: auto;
        max-width: 440px;
        width: 100%;
        height: 50%;

        padding-top: 120px;

        font-size: 28px;
        line-height: 32px;
        z-index: 10;
    }
    .hero__container{
        height: 675px;
        width: 75vw;
        left: 0px;
        position: absolute;

        font-style: normal;
        font-weight: normal;
        text-align: center;
        text-shadow: 0px 0px 5px rgb(0, 0, 0);
    }
    .hero__line1{
        position: absolute;
        top:-30px;
        left:0px;
        width: 100vw;
        height: 30px;
        background-color: #FFF6F6;
        z-index: 2;
    }
    .hero__line1::before{
        content: "";
        position: absolute;
        top:-10px;
        left:0px;
        width: 100vw;
        height: 10px;
        background-color: #dca50040;
    }
    .hero__line2{
        content: "";
        position: absolute;
        top:675px;
        width: 100vw;
        height: 20px;
        background-color: #FFF6F6;
    }
    .hero__line2::before{
        content: "";
        position: absolute;
        top:20px;
        left:0px;
        width: 100vw;
        height: 10px;
        background-color: #dca50040;
    }
    .hero__image1{
        position: absolute;
        top:0px;
        left:0px;
        width: 75vw;
        height: 100%;
        object-position:top;
    }
    .hero__image2 {
        height: 675px;
        width: 25vw;
        left:75vw;
        position: absolute;
        object-position:top;
    }

    .hero__container::after{
        display: block;
        content: "";
        position: absolute;
        left:calc(75vw + -1.25px);
        top:0;
        height: 675px;
        width: 2.5px;
        background-color: #9F0B0B96;
        z-index: 50;
    }

    .best{
        width: 100%;
        height: 1350px;
        
        background: url("@/assets/images/bg/bg-best.png");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .best__title{
        padding-top: 50px;

        text-align: center;
        font-weight: normal;
        font-size: 42px;
        line-height: 48px;
    }

    .best__content{
        margin-top: 50px;

        display: flex;
        justify-content: center;
        flex-flow: column;
    }

    .best__slider{
        max-width: 1400px;
        width: 100%;
        align-self: center;
    }

    .best__slider__container{
        padding-bottom: 90px;

        max-width: 980px;
        
        margin-left: auto;
        margin-right: auto;
    }

    .best__slider__wrapper {
        overflow: hidden;
    }

    .best__slider__item {
        flex: 0 0 33.3333333333%;
        max-width: 33.3333333333%;
    }

    .best__slider__article{
        padding-top: 2px;
        padding-left: 20px;
        padding-right: 20px;

        display: flex;
        align-items: center;
        flex-flow: column;

        transition: all .3s ease-in-out;
    }

    .best__slider__article:hover{
        color: #DCA600;
    }

    .best__slider__article-picture{
        margin-top: 4px;
        width: 290px;
        top: 50%;
        outline: solid;
        box-shadow: 0px 0px 6px 1px #00000080;
    }

    .best__slider__article-tittle{
        max-width: 290px;
        padding-top: 20px;

        display: flex;
        align-items: center;
        text-align: center;


        font-size: 24px;
        line-height: 27px;
        
        color: #8D0909;
    }
    .best__slider__article-description{
        max-width: 290px;
        padding-top: 10px;

        display: block;
        align-items: center;
        text-align: center;

        font-size: 20px;
        line-height: 23px;
    }

    .best__slider__article-description:first-letter{
        text-transform: uppercase;
    }

    .best__slider__control {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        top: 145px;
        background: none;

        transform: none;
    }

    .best__slider__control:hover,
    .best__slider__control:focus {
        color: #fff;
        text-decoration: none;
        outline: 0;
        background: none;
    }

    .best__slider__control[data-slide='prev'] {
        left: 0;
    }
    
    .best__slider__control[data-slide='next'] {
        right: 0;
    }

    .best__slider__control::before {
        content: '';
        display: inline-block;
        width: 50px;
        height: 50px;
        background: transparent no-repeat center center;
        background-size: 100% 100%;
        transition: all .3s ease-in-out;
    }

    .best__slider__control[data-slide='prev']::before {
        background-image: url("@/assets/images/UI/slider_control/best_arrow_left.svg");
    }
    
    .best__slider__control[data-slide='next']::before {
        background-image: url("@/assets/images/UI/slider_control/best_arrow_right.svg");
    }

    .best__slider__control[data-slide='prev']:hover::before {
        background-image: url("@/assets/images/UI/slider_control/best_arrow_left_hover.svg");
    }
    
    .best__slider__control[data-slide='next']:hover::before {
        background-image: url("@/assets/images/UI/slider_control/best_arrow_right_hover.svg");
    }

    .best__article{
        
        margin-top:40px;
        max-width: 1400px;
        width: 100%;
        height: 560px;

        padding-top: 170px;
        display: flex;
        align-self: center;
        align-content: center;
        flex-flow: column;

        outline: solid black;
        user-select: none;
        transition: all .3s ease-in-out;
        filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
    }
    .best__article-picture{
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .best__article__title{
        display: flex;
        justify-self: center;
        align-self: center;

        font-weight: normal;
        font-size: 42px;
        line-height: 48px;
        text-align: center;
        z-index: 10;
    }

    .best__article__description{
        
        padding-top: 40px;
        padding-bottom: 90px;
        max-width: 450px;

        display: block;
        justify-self: center;
        align-self: center;

        font-size: 24px;
        line-height: 27px;
        text-align: center;
        z-index: 10;
    }

    .best__article__description:first-letter{
        text-transform: uppercase;
    }

    .best__article__button{
        width: 212px;
        height: 73px;

        align-self: center;

        position: relative;

        background-image: url("@/assets/images/UI/best_arrow_button.svg");
        background-position: center;
        background-size: 75px 75px;
        background-repeat: no-repeat;
        outline: solid white;
        transition: all .3s ease-in-out;
        z-index: 10;
    }

    .best__article::after{
        display: block;
        content: "";
        width: 36%;
        max-width: 568px;
        height: 1px;

        background-color: white;
        opacity: 60%;

        position: absolute;
        top: 79%;
        left: 40px;
        z-index: 1;
        transition: all .3s ease-in-out;
    }
    .best__article::before{
        display: block;
        content: "";
        width: 36%;
        max-width: 568px;
        height: 1px;

        background-color: white;
        opacity: 60%;

        position: absolute;
        top: 79%;
        right: 40px;
        z-index: 1;
        transition: all .3s ease-in-out;
        z-index: 10;
    }

    .best__article:hover{
        color:#DCA600;
        outline-color: #DCA600;
    }
    .best__article:hover .best__article__button{
        background-image: url("@/assets/images/UI/best_arrow_button_hover.svg");
        background-position: center;
        background-size: 75px 75px;
        background-repeat: no-repeat;
        outline: solid #DCA600;
    }

    .best__article:hover::after{
        background-color: #DCA600;
    }

    .best__article:hover::before{
        background-color: #DCA600;
    }

    .history{
        width: 100%;
        height: 900px;

        background: url("@/assets/images/bg/bg-history.png");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;

        color: #ffffff;
    }
    .history__title{
        padding-top: 60px;

        text-align: center;
        font-weight: normal;
        font-size: 42px;
        line-height: 48px;
    }

    .history__content{
        margin-top: 70px;
        
        display: flex;
        justify-content: center;
        flex-flow: column;
    }
    .history__slider__container{
        padding-bottom: 0px;

        max-width: 1004px;

        margin-left: auto;
        margin-right: auto;
    }

    .history__slider__wrapper{
        max-height: 620px;
    }

    .history__slider__item {
        flex: 0 0 100%;
        max-width: 100%;

        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
    }

    .history__slider__period {
        padding-left:4px;
        padding-right: 4px;
        width: 100%;
        max-width: 480px;
        max-height: 270px;
        margin-bottom: 40px;

        position: relative;
    }

    .history__slider__period::before{
        display: block;
        content: "";
        width: 380px;
        height: 2px;
        line-height: 27px;
        background-color: #8D0909;
        opacity: 60%;
        
        position: relative;
        top: 237px;
        left: 50px;
        z-index: 1;
    }

    .history__slider__period-picture {
        width: 100%;
        height: 100%;
        outline: solid;
        transition: all .3s ease-in-out;
    }

    .history__slider__period:hover .history__slider__period-picture{
        outline-color: #DCA600;
    }


    .history__slider__period:hover .history__slider__period-tittle {
        color: #DCA600;
    }

    .history__slider__period-tittle{

        position: relative;

        display:flex;
        flex-direction:column-reverse;

        top: -256px;
        left: 50px;

        max-width: 250px;
        height: 200px;
        font-size: 24px;
        line-height: 27px;
        /*text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;*/
        text-shadow: -1px 0 black, 0 1px black;
        text-align: left;
        transition: color .3s ease-in-out;
    }

    .history__slider__control {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        top: 38.5%;
        background: none;
        transform: none;
    }

    .history__slider__control[data-slide='prev'] {
        left: 0;
    }
    
    .history__slider__control[data-slide='next'] {
        right: 0;
    }

    .history__slider__control:hover,
    .history__slider__control:focus {
        color: #fff;
        text-decoration: none;
        outline: 0;
        background: none;
    }

    .history__slider__control::before {
        content: '';
        display: inline-block;
        width: 80px;
        height: 80px;
        background: transparent no-repeat center center;
        background-size: 100% 100%;
        transition: all .3s ease-in-out;
    }

    .history__slider__control[data-slide='prev']::before {
        background-image: url("@/assets/images/UI/slider_control/history_arrow_left.svg");
    }
    
    .history__slider__control[data-slide='next']::before {
        background-image: url("@/assets/images/UI/slider_control/history_arrow_right.svg");
    }

    .history__slider__control[data-slide='prev']:hover::before {
        background-image: url("@/assets/images/UI/slider_control/history_arrow_left_hover.svg");
    }
    
    .history__slider__control[data-slide='next']:hover::before {
        background-image: url("@/assets/images/UI/slider_control/history_arrow_right_hover.svg");
    }

    .slider__indicators {
        position: relative;
    }

    .history__slider__indicators li {
        margin-top: 8px;

        box-sizing: content-box;
        flex: 0 1 auto;
        width: 50px;
        height: 2px;
        margin-right: 3px;
        margin-left: 3px;
        text-indent: -999px;
        cursor: pointer;
        background-color: #8d09097a;
        background-clip: padding-box;
        border-top: 15px solid transparent;
        border-bottom: 15px solid transparent;
    }

    .history__slider__indicators li.active {
        background-color: white;
    }

    @media (max-width: 1476px) {
        .best__article::after{
            width: 35%;
        }
    
        .best__article::before{
            width: 35%;
        }
    }

    @media (max-width: 1266px) {
        .hero__content__title{
            padding-top: 185px;
            font-size: 42px;
        }
        .hero__container{
            width: 100vw;
        }
        .hero__image1{
            width: 100vw;
        }
        .hero__container::after{
            display: none;
        }
        .hero__image2{
            display: none;
        }
        .best__slider__item {
            flex: 0 0 50%;
            max-width: 50%;
        }
        .best__slider__container{
            max-width: 800px;
        }
        .best__slider__article{
            padding-left: 0px;
            padding-right: 0px;
        }
        .best__article__button{

            width: 170px;
            height: 58.5px;
        }
        .best__article::after{
            width: 34%;
            top: 78%;
        }
        .best__article::before{
            width: 34%;
            top: 78%;
        }
        .history{
            height: 760px;
        }
        .history__slider__container{
            max-width: 794px;
        }
        .history__slider__item {
            flex: 0 0 100%;
            max-width: 100%;
        }
        .history__slider__period {
            width: 100%;
            max-width: 390px;
            max-height: 220px;
            margin-bottom: 20px;
            
        }
        .history__slider__period-tittle{
        
            top: -196px;
            margin:0;
            max-width: 250px;
            height: 150px;
            padding-right: 0;
        }
        .history__slider__period::before{
            width: 290px;
            height: 1.5px;
            top: 187px;
            left: 50px;
        }
        .history__slider__control::before {
            width: 70px;
            height: 70px;
        }
        .history__slider__control{
            width: 70px;
            height: 70px;
            top: 36.5%;
        }
        .history__slider__indicators li{
            margin-top: 20px;
        }
    }

    @media (max-width: 992px) {
        #desk{
            display: none;
        }
        #mobile{
            display: block;
        }
        .hero__content {
            margin-top: 130px;
        }    
        .hero__content__title{
            padding-top: 205px;
        }

        .best{
            height: 1050px;
        }
        .best__title{
            padding-top: 27px;
            font-size: 32px;
        }
        .best__slider__container{
            padding-bottom: 20px;
        }

        .best__slider__article-tittle{
            font-size: 20px;
        }
        .best__slider__article-description{
            font-size: 16px;
        }

        .best__slider__control {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            text-align: center;
            width: 50px;
            height: 50px;
            top: 145px;
            background: #C4C4C459;
            border-radius: 40px;
        }

        .best__slider__control:hover,
        .best__slider__control:focus {
            background:#8d09097a;
        }

        .best__slider__control::before {
            width: 18px;
            height: 18px;
        }

        .best__slider__control[data-slide='prev']::before {
            background-image: url("@/assets/images/UI/best_small_arrow_left.svg");
        }
        
        .best__slider__control[data-slide='next']::before {
            background-image: url("@/assets/images/UI/best_small_arrow_right.svg");
        }

        .best__slider__control[data-slide='prev']:hover::before {
            background-image: url("@/assets/images/UI/best_small_arrow_left.svg");
        }
        
        .best__slider__control[data-slide='next']:hover::before {
            background-image: url("@/assets/images/UI/best_small_arrow_right.svg");
        }

        .best__article{
            padding-top: 100px;
            height: 400px;
        }
        .best__article__title{
            font-size: 24px;
        }
        
        .best__article__description{
            padding-top: 30px;
            padding-bottom: 60px;
            font-size: 18px;
            max-width: 300px;
        }
        
        .best__article__button{

            width: 128px;
            height: 44px;

            background: url("@/assets/images/UI/best_arrow_button.svg");
            background-position: center;
            background-size: 45px 45px;
            background-repeat: no-repeat;
        }
        .best__article:hover .best__article__button{
            background: url("@/assets/images/UI/best_arrow_button_hover.svg");
            background-position: center;
            background-size: 45px 45px;
            background-repeat: no-repeat;
            outline: solid #DCA600;
        }

        .best__article::after{
            display: none;
        }

        .best__article::before{
            display: none;
        }
        .history{
            height: 460px;
        }
        .history__title{
            padding-top: 27px;

            font-size: 32px;
        }
        .history__content{
            margin-top: 42px;
        }
        .history__slider__item {
            flex: 0 0 100%;
            max-width: 100%;
            padding-left: 10px;
            padding-right: 10px;
            display: flex;
            justify-content: center;
        }
        .history__slider__period-tittle{

            top: -198px;
        }
        
        .history__slider__control {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            text-align: center;
            width: 50px;
            height: 50px;
            top:30%;
            background: #C4C4C459;
            border-radius: 40px;
        }

        .history__slider__control:hover,
        .history__slider__control:focus {
            background:#8d09097a;
        }

        .history__slider__control::before {
            width: 18px;
            height: 18px;
        }

        .history__slider__control[data-slide='prev']::before {
            background-image: url("@/assets/images/UI/history_small_arrow_left.svg");
        }
        
        .history__slider__control[data-slide='next']::before {
            background-image: url("@/assets/images/UI/history_small_arrow_right.svg");
        }

        .history__slider__control[data-slide='prev']:hover::before {
            background-image: url("@/assets/images/UI/history_small_arrow_left.svg");
        }
        
        .history__slider__control[data-slide='next']:hover::before {
            background-image: url("@/assets/images/UI/history_small_arrow_right.svg");
        }
        .history__slider__indicators li{
            margin-top: 20px;
            width: 30px;
        }
    }

    @media (max-width: 768px) {
        .container {
            padding-left: 15px;
            padding-right: 15px;
        }
        .hero__content__title{
            font-size: 32px;
        }
        .hero__content__description{
            font-size: 22px;
        }
        .best__slider__item {
            flex: 0 0 100%;
            max-width: 100%;
        }
        .history{
            height: 460px;
        }
        .history__slider__item {
            flex: 0 0 100%;
            max-width: 100%;
        }
        .history__slider__control{
            top:30%;
        }
        .history__slider__indicators li{
            margin-top: 20px;
        }
    }

    @media (max-width: 576px) {
        .hero {
            height: 640px;
        }
        .hero__content {
            margin-top: 110px;
        }    
        .hero__container{
            height: 471px;
            background-image: url("@/assets/images/hero/Image2.png");
            background-position: top;
            background-size: cover;
            background-repeat: no-repeat;
        }
        .hero__image1{
            display: none;
        }
        .hero__content__title{
            padding-top: 70px;
            margin-left: auto;
            margin-right:auto;
            max-width: 145px;
            line-height: 37px;
        }
        .hero__content__description{
            padding-top: 90px;
            max-width: 308px;
            line-height: 25px;
        }
        .hero__line1{
            top:-20px;
            height: 20px;
        }
        .hero__line1::before{
            top:-10px;
            height: 10px;
        }
        .hero__line2{
            top:471px;
            height: 10px;
        }
        .hero__line2::before{
            top:10px;
            height: 5px;
        }
        .best{
            height: 1000px;
        }
        .best__content{
            margin-top: 40px;
        }
        .best__title{
            font-size: 24px;
        }
        .best__slider__article-picture{
            width: 200px;
            height: 200px;
        }
        .best__slider__article-tittle{
            max-width: 200px;
        }
        .best__slider__article-description{
            max-width: 200px;
        }
        .best__slider__control {
            top: 105px;
        }    
        .history{
            height: 400px;
        }
        .history__title{
            padding-top: 27px;

            font-size: 24px;
        }
        .history__slider__container{
            padding-bottom: 0px;
        
            max-width: 320px;
        }
        .history__slider__period {
            width: 100%;
            max-width: 320px;
            max-height: 180px;
            padding-bottom: 4px;
            margin-bottom: 0px;
            
        }
        .history__slider__period::before{
            width: 270px;
            top: 157px;
            left: 25px;
        }
        .history__slider__period-tittle{
            font-size: 20px;
            top: -236px;
            left: 25px;
            max-width: 200px;
            height: 200px;
        }
        .history__slider__control{
            top:25%;
        }
        .history__slider__indicators li{
            margin-top: 40px;
        }
    }

    @media (max-width: 360px) {
        .history{
            height: 400px;
        }
        .history__slider__container{
            padding-bottom: 0px;
        
            max-width: 280px;
        }
        .history__slider__period {
            width: 100%;
            max-width: 280px;
            max-height: 160px;
            margin-bottom: 0px;
        }
        .history__slider__period::before{
            width: 215px;
            top: 137px;
        }

    }

</style>