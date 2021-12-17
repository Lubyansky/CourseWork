import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
  el: '#Subscribe',
  data(){
    return{
      form: {
        email: ''
      }
    }
  },
  computed: {
    canAdd() {
      return this.form.email.trim()
    }
  },
  methods: {
    async makeSubscribe(){
      const {...subscriber} = this.form
      console.log(subscriber)
      await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscriber)
      })
      this.form.email =  ''
    }
  }
})

new Vue({
  el: '#Find',
  data(){
    return{
      form: {
        searchInput: ''
      }
    }
  },
  methods: {
    async toSearch(){
      const {...input} = this.form
      console.log(input)

      this.form.searchInput =  ''
    }
  }
})


//УБРАТЬ/ПОКАЗАТЬ НАВИГАЦИЮ ПРИ ИЗМЕНЕНИИ РАЗМЕРОВ ОКНА
$(window).resize(function(){
  if ($(window).width() > 992) {
      $('.nav').css({ "display": 'flex'});
      $('#mobile').each(function () {
          $(this).css({ "display": 'none'});
      });
      $('#desk').each(function () {
          $(this).css({ "display": 'block'});
      });
      $('#buttonHistory').each(function () {
        $(this).css({ "display": 'block'});
      });
      $('.backdrop').css({ "opacity": '100', "left": '-100%'});
  }
  else if ($(window).width() <= 992) {
      $('.nav').css({ "display": 'none'});
      $('.backdrop').css({ "opacity": '0', "left": '-100%'});
      $('#mobile').each(function () {
          $(this).css({ "display": 'block'});
      });
      $('#desk').each(function () {
          $(this).css({ "display": 'none'});
      });
      $('#buttonHistory').each(function () {
        $(this).css({ "display": 'none'});
      });
      $('.history-menu').each(function () {
          $(this).css({ "display": 'none'});
      });
  }
});

$(document).mouseup(function (e){ 

  //ПОИСК
  if ( $(e.target).closest('#buttonControl').length) {

      if( $('.history-menu').css("display") === 'block'){
          $('.history-menu').css({ "display": 'none'});
      }
      
      if ($(window).width() <= '992'){
          if( $('.nav').css("display") === 'flex'){
              $('.nav').css({ "display": 'none'});
              $('.backdrop').css({ "opacity": '0', "left": '-100%'});
              $('.header').css({ "z-index": '0'});
          }
      } 

      if( $('#searchInput').css("display") === 'none'){
          $('#searchInput').css({ "display": 'block'});
          $('#buttonFind').css({ "display": 'block'});
          $('#buttonControl').removeClass('find');
          $('#buttonControl').addClass('close');
          $('.header').css({ "z-index": '100'});
          $('#searchInput').focus();
      }
      else if ( $('#searchInput').css("display") === 'block')
      {
          $("#searchInput").val("");
          $('#searchInput').css({ "display": 'none'});
          $('#buttonFind').css({ "display": 'none'});
          $('#buttonControl').removeClass('close');
          $('#buttonControl').addClass('find');
          $('.header').css({ "z-index": '0'});
      }
  }
  //ПОДМЕНЮ ПЕРИОДЫ
  else if ( ($(e.target).closest('#buttonHistory').length)) {
      if( $('#searchInput').css("display") === 'block'){
          $("#searchInput").val("");
          $('#searchInput').css({ "display": 'none'});
          $('#buttonFind').css({ "display": 'none'});
          $('#buttonControl').removeClass('close');
          $('#buttonControl').addClass('find');
          $('.header').css({ "z-index": '0'});
      }
      if ($(window).width() <= '992'){
          if( $('.nav').css("display") === 'flex'){
              $('.nav').css({ "display": 'none'});
              $('.backdrop').css({ "opacity": '0', "left": '-100%'});
              $('.header').css({ "z-index": '0'});
          }
          document.location.href = "#";
      }
      else if ($(window).width() > '992'){
          if( $('.history-menu').css("display") === 'none'){
              $('.history-menu').css({ "display": 'block'});
              $('.header').css({ "z-index": '100'});
          }
          else if ( $('.history-menu').css("display") === 'block')
          {
              $('.history-menu').css({ "display": 'none'});
              $('.header').css({ "z-index": '0'});
          }
      }

  }
  //БУРГЕР
  else if ( $(e.target).closest('#buttonBurger').length) {

      if( $('#searchInput').css("display") === 'block'){
          $("#searchInput").val("");
          $('#searchInput').css({ "display": 'none'});
          $('#buttonFind').css({ "display": 'none'});
          $('#buttonControl').removeClass('close');
          $('#buttonControl').addClass('find');
          $('.header').css({ "z-index": '0'});
      }

      if( $('.nav').css("display") === 'none'){
          $('.nav').css({ "display": 'flex'});
          $('.backdrop').css({ "opacity": '1', "left": '0'});
          $('.header').css({ "z-index": '101'});
      }
      else if ( $('.nav').css("display") === 'flex')
      {
          $('.nav').css({ "display": 'none'});
          $('.backdrop').css({ "opacity": '0', "left": '-100%'});
          $('.header').css({ "z-index": '0'});
      }
  }
  //ЛЮБАЯ ДРУГАЯ ОБЛАСТЬ
  else{
      if(!($(e.target).closest('.search__input').length 
      || $(e.target).closest('.history-menu').length 
      && !$(e.target).closest('.history-menu__link').length)) {
          if( $('.history-menu').css("display") === 'block'){
              $('.history-menu').css({ "display": 'none'});
              $('.header').css({ "z-index": '0'});
          }
          if( $('#searchInput').css("display") === 'block'){
              $('#searchInput').css({ "display": 'none'});
              $('#buttonFind').css({ "display": 'none'});
              $('#buttonControl').removeClass('close');
              $('#buttonControl').addClass('find');
              $('.header').css({ "z-index": '0'});
          }
          if ($(window).width() <= '992'){
              if( $('.nav').css("display") === 'flex'){
                  $('.nav').css({ "display": 'none'});
                  $('.backdrop').css({ "opacity": '0', "left": '-100%'});
                  $('.header').css({ "z-index": '0'});
              }
          } 
      }
  }
});

//ПОЛЕ ПОИСКА
$('#searchInput').keydown(function(e) {
  if(e.keyCode === 13) {
      $('#searchInput').css({ "display": 'none'});
      $('#buttonFind').css({ "display": 'none'});
      $('#buttonControl').removeClass('close');
      $('#buttonControl').addClass('find');
  }
});