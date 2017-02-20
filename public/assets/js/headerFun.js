$(document).ready(function(){
  var contentSize = function(){
    var windowHeight = $(window).innerHeight();
    var menuheight = $('#main-menu').outerHeight();
    $('#content-views').css('min-height', windowHeight - (menuheight*2) - 26 + 'px');
  }

  var placeLogo = function(){
    var logoHeight = $('#welcome-slide #logo').outerHeight();
    var slideHeight = $('#welcome-slide').innerHeight();
    $('#welcome-slide #logo').css('top', slideHeight/2-(logoHeight/2) + 'px');
  }

  var placeContent = function(){
    var slideHeight = $('#welcome-slide').innerHeight();
    $('#content-views').css('top', slideHeight + 40 + 'px');
  }

  var randomCharImage = function(){
    var chars = [
      'am', 'ar', 'az', 'bl', 'bn', 'ca', 'ce', 'es', 'ha', 'hb', 'hz',
      'iz', 'jn', 'kg', 'kk', 'lc', 'ma', 'mi', 'mk', 'mu', 'no', 'no2',
      'nt', 'ny', 'ph', 'pt', 'rc', 'rg', 'rl', 'su', 'tb', 'tg', 'tk',
      'tm', 'vh'
    ]
    var char = chars[Math.floor(Math.random()*chars.length)];
    $('#welcome-slide #slide-background').css('background-image', "url('../assets/img/characters/cmn_ch_a_"+char+".png')");
  }

  $(window).resize(function(){
    placeLogo();
    placeContent();
    contentSize();
  });

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var vOffset = $('#content-views').offset().top;
    var menuHeight = $('#main-menu').outerHeight();
    var slideBottom = parseInt($('#welcome-slide').css('bottom'));
    if (slideBottom < $(window).innerHeight() - menuHeight - 5){
      $('#welcome-slide').css('bottom', slideBottom + scroll + 'px');
    } else {
      $('#welcome-slide').css('bottom', $(window).innerHeight() - menuHeight - 5 + 'px');
    }
    if ($('#logo').outerHeight() + 20 > $('#welcome-slide').innerHeight()){
      $("#logo").slideUp("fast");
      $("#logo").css("display", "none");
      $("#main-menu #mini-logo").css("display", "inline-block");
    }
    placeLogo();
    placeContent();
  });

  placeLogo();
  placeContent();
  randomCharImage();
  contentSize();
})
