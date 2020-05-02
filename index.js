$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});
$(function(){
  // $(document).scrollTop(0);
  let value = 0;
  let section = 0;
  let scrolling = false;
  const threshold = 100;
  let lowThreshold = false;

  function topPage(){
      $("#page-up").hide(250);
      $("#page-down").show(250);
      $("#page-down").removeClass("hidden");
      $("#kablip-video")[0].play();
  }
  function middlePage(){
    $("#page-up").show(250);
    $("#page-down").show(250);
    $("#page-down").addClass("hidden");
    $("#kablip-video")[0].pause();
    // setTimeout(function(){$("#page-down").hide(1).show(1)}, 1000);
  }
  function bottomPage(){
    $("#page-up").show(250);
    $("#page-down").hide(250);
    $("#page-down").addClass("hidden");
    $("#kablip-video")[0].pause();
  }

  topPage();
  $(document).on("mousewheel swipe", onMouseScroll);
  $(window).resize(function(){
    value = -section * $(window).height();
    $("#scroll-container").css("transform","translateY("+value+"px)");
  });
  document.addEventListener('mousewheel', function(e) {
    // console.log(e.wheelDelta);
    e.preventDefault();
  }, {passive:false});
  $(document).on("touchstart", function(){
    console.log("touchstart");
  });
  function onMouseScroll(e){
    // e.preventDefault();

    if(!scrolling || e.button){
      scrolling = true;
      setTimeout(function(){
        scrolling = false;
      }, 500);
      console.log(e.originalEvent.wheelDelta);
      if(!e.top){
        if((e.originalEvent.wheelDelta < -threshold || (!lowThreshold && e.originalEvent.wheelDelta < 0)) && section < $("section").length - 1 ){
          value -= $(window).height();
          section++;
        } else if((e.originalEvent.wheelDelta > threshold || (!lowThreshold && e.originalEvent.wheelDelta > 0)) && section > 0){
          value += $(window).height();
          section--;
        }
        if(!lowThreshold){
          lowThreshold = true;
          setTimeout(function(){
            lowThreshold = false;
          }, 2000);
        }
      } else {
        value = 0;
        section = 0;
      }
      if(section <= 0){
        topPage();
      } else if(section >= $("section").length - 1){
        bottomPage();
      } else{
        middlePage();
      }
      $("#scroll-container").css("transform","translateY("+value+"px)");
    }
  }

  $(".top").click(function(){
    onMouseScroll({originalEvent:{wheelDelta:threshold+1}, button:true, top:true});
  });
  $("#page-up").click(function(){
    onMouseScroll({originalEvent:{wheelDelta:threshold+1}, button:true});
  });
  $("#page-down").click(function(){
    onMouseScroll({originalEvent:{wheelDelta:-threshold-1}, button:true});
  });
});
