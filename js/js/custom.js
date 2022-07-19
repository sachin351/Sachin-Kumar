//jQuery(function () { // wait for document ready
    // init
  //  var controller = new ScrollMagic.Controller();

    // define movement of panels
    // var wipeAnimation = new TimelineMax()
    //     .fromTo("section.panel.turqoise", 1, {x: "-100%"}, {x: "0%", ease: Linear.easeNone})  // in from left
    //     .fromTo("section.panel.green",    1, {x:  "-100%"}, {x: "0%", ease: Linear.easeNone})  // in from right
    //     .fromTo("section.panel.bordeaux", 1, {x: "-100%"}, {x: "0%", ease: Linear.easeNone}) // in from top
    //     .fromTo("section.panel.white", 1, {x: "-100%"}, {x: "0%", ease: Linear.easeNone});

    // create scene to pin and link animation
    // new ScrollMagic.Scene({
    //         triggerElement: "#pinContainer",
    //         triggerHook: "onLeave",
    //         duration: "300%"
    //     })
    //     .setPin("#pinContainer")
    //     .setTween(wipeAnimation)
    //     // .addIndicators() // add indicators (requires plugin)
//         .addTo(controller);
// });

// post year slider
jQuery('.post-year-section >div >div >div >div >.elementor-widget-wrap').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    //asNavFor: '.slider-for',
    dots: false,
    vertical: true,
    // verticalSwiping:true,
    arrows: true,
    focusOnSelect: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
        }
    ]
  });
  // homepage post-slider
  jQuery('.post-slider-wrapper .post-slider-container').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false
        }
      }
    ]
  });

//Title-fade
jQuery(document).ready(function(){
 //call the function when ready
 slideShow();


//Actually define the slideShow()
function slideShow(){
 
 //*** Conditional & Variables ***//
 
    //Define the current img
   var current = $('.fading-text .show');
   //If index != 0/false then show next img
 var next = current.next().length ?
     current.next() :
     // if index == false then show first img
     current.siblings().first();
 
  //*** Swap out the imgs and class ***//
  current.hide().removeClass('show');
  next.fadeIn("slow").addClass('show');
 
 
 //*** Repeat function every 1.5 seconds ***//
 setTimeout(slideShow, 1500);
 
};
 
}); //end ready

// experience page mobile post slider
  jQuery(document).ready(function(){
      if($(window).width() < 767) {
        jQuery('.wonderpost-wrap-container').slick({
          dots: true,
          arrows:false,
          infinite: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        });
    jQuery('.slider-wrap-date').slick({
          dots: false,
          arrows:true,
          infinite: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        });
      } else {
        jQuery('.wonderpost-wrap-container, .slider-wrap-date').unslick();
      }

    });