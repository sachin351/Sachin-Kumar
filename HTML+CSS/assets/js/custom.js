$(document).ready(function(){
    // $( "#tabs" ).tabs();
    // $("#myInput").on("keyup", function() {
    //     var value = $(this).val().toLowerCase();
    //     $("#input-check div").filter(function() {
    //       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //     });
    //   });
    $(window).resize(function(){
      $("box-one").height();
      console.log($("box-one").height());
    });
    // Show the first tab and hide the rest
    $('.left-content li:first-child').addClass('active');
    $('.tabs').hide();
    $('.tabs:first').show();
    $('#tabs-nav li:first-child').addClass('active');
    $('.tab-content').hide();
    $('.tab-content:first-child').show();

    // Click function
    $('.left-content li').click(function(){
      $('.left-content li').removeClass('active');
      $(this).addClass('active');
      $('.tabs').hide();
      //
      
      var activeTab = $(this).find('a').attr('href');
      if($(activeTab).length){
        $(activeTab).fadeIn();
        $(activeTab).find('li:first-child').click();
      }
      return false;
    });
    $('#tabs-nav li').click(function(){
      $('#tabs-nav li').removeClass('active');
      $(this).addClass('active');
      $('.tab-content').hide();
      
      var activeTab = $(this).find('a').attr('href');
      $(activeTab).fadeIn();
      return false;
    });
  });