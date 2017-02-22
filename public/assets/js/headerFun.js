$(document).ready(function(){
  var vOffsetContainer = $('#main-content').offset().top;
  var skipHeight = $('#welcome-slide #home-skip').outerHeight();
  var logoHeight = $('#welcome-slide #logo').outerHeight();

  var getMenuHeight = function(){
    return 78;
  }

  var menuHeight = getMenuHeight();
  var windowHeight = $(window).innerHeight();
  var slideHeight = $('#welcome-slide').innerHeight();

  var contentSize = function(){
    var menuHeight = getMenuHeight();
    var windowHeight = $(window).innerHeight();
    var slideHeight = $('#welcome-slide').innerHeight();
    $('#main-content').css('height', windowHeight - menuHeight + 'px');
    $('#main-content').css('max-height', windowHeight - menuHeight + 'px');
  }

  var backgroundSize = function(){
    var menuHeight = getMenuHeight();
    var windowHeight = $(window).innerHeight();
    var windowWidth = $(window).innerWidth();
    var slideHeight = $('#welcome-slide').innerHeight();
    var scrollWindow = $(window).scrollTop();
    var heightRatio = 1/(windowHeight/(scrollWindow-vOffsetContainer));
    $('#welcome-slide #slide-background').css('background-position-y', 30 + 20*heightRatio + '%');
    if (windowWidth < windowHeight){
      $('#welcome-slide #slide-background').css('background-size', '220%');
      $('#welcome-slide #slide-background').css('background-position-x', 'center');
    } else {
      $('#welcome-slide #slide-background').css('background-size', '110%');
      $('#welcome-slide #slide-background').css('background-position-x', '-270%');
    }
  }

  var placeLogo = function(){
    var menuHeight = getMenuHeight();
    var windowHeight = $(window).innerHeight();
    var slideHeight = $('#welcome-slide').innerHeight();
    var scrollWindow = $(window).scrollTop();
    $('#welcome-slide #logo').css('top', (windowHeight-(scrollWindow-vOffsetContainer))/2-(logoHeight/2) + 'px');
    $('#welcome-slide #home-skip').css('top', (windowHeight-(scrollWindow-vOffsetContainer))*4/5 - (skipHeight/2) + 'px');
  }

  var placeContent = function(){
    var menuHeight = getMenuHeight();
    var windowHeight = $(window).innerHeight();
    var slideHeight = $('#welcome-slide').innerHeight();
    $('#main-content').css('top', slideHeight + 'px');
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
    backgroundSize();
  });

  $(window).scroll(function() {
    var menuHeight = getMenuHeight();
    var vOffsetContainer = $('#main-content').offset().top;
    var scrollWindow = $(window).scrollTop();
    if ((vOffsetContainer - scrollWindow) <= menuHeight + logoHeight){
      $('#mini-logo').css('display', 'inline-block');
      $('#welcome-slide #home-skip').hide("fast");
      $('#welcome-slide #logo').hide("fast");
    } else {
      $('#mini-logo').hide("fast");
      $('#welcome-slide #home-skip').show("fast");
      $('#welcome-slide #logo').show("fast");
    }
    backgroundSize();
    placeLogo();
  });

  backgroundSize();
  placeLogo();
  placeContent();
  randomCharImage();
  contentSize();
})
