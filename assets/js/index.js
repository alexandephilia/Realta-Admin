 
$(function () {

	  $('#contentPages').load('pages/home.html',function(){
    	$.getScript('assets/js/pages/home.js');
    });

    $("#profile").click(function(){
      $('#contentPages').load('pages/profile.html',function(){
            $.getScript('assets/js/pages/profile.js');
         });
    });

    $("#headerSection").click(function(){
      $('#contentPages').load('pages/headerSection.html',function(){
            $.getScript('assets/js/pages/headerSection.js');
            
         });
    });


    // HOMEPAGE //

    $("#megamenuSection").click(function(){
      $('#contentPages').load('pages/megaMenu.html',function(){
            $.getScript('assets/js/pages/megaMenu.js');
         });
    });

    $("#customerSection").click(function(){
      $('#contentPages').load('pages/customerSection.html',function(){
            $.getScript('assets/js/pages/customerSection.js');
         });
    });

     $("#customerStatistic").click(function(){
      $('#contentPages').load('pages/customerStatistic.html',function(){
            $.getScript('assets/js/pages/customerStatistic.js');
         });
    });

      $("#customerStatistic").click(function(){
      $('#contentPages').load('pages/customerStatistic.html',function(){
            $.getScript('assets/js/pages/customerStatistic.js');
         });
    });


       $("#solutionSection").click(function(){
      $('#contentPages').load('pages/solutionSection.html',function(){
            $.getScript('assets/js/pages/solutionSection.js');
         });
    });


    $("#ctaSection").click(function(){
      $('#contentPages').load('pages/ctaSection.html',function(){
            $.getScript('assets/js/pages/ctaSection.js');
         });
    });

    $("#solutionSection").click(function(){
      $('#contentPages').load('pages/solutionSection.html',function(){
            $.getScript('assets/js/pages/solutionSection.js');
         });
    });

    $("#partnerSection").click(function(){
      $('#contentPages').load('pages/partnerSection.html',function(){
            $.getScript('assets/js/pages/partnerSection.js');
         });
    });

    $("#byBusinessSection").click(function(){
      $('#contentPages').load('pages/byBusinessSection.html',function(){
            $.getScript('assets/js/pages/byBusinessSection.js');
         });
    });

    $("#testimonialSection").click(function(){
      $('#contentPages').load('pages/testimonialSection.html',function(){
            $.getScript('assets/js/pages/testimonialSection.js');
         });
    });

    $("#blogSection").click(function(){
      $('#contentPages').load('pages/blogSection.html',function(){
            $.getScript('assets/js/pages/blogSection.js');
         });
    });

    $("#FAQSection").click(function(){
      $('#contentPages').load('pages/FAQSection.html',function(){
            $.getScript('assets/js/pages/FAQSection.js');
         });
    });

    $("#scheduleSection").click(function(){
      $('#contentPages').load('pages/scheduleSection.html',function(){
            $.getScript('assets/js/pages/scheduleSection.js');
         });
    });

    $("#contactSection").click(function(){
      $('#contentPages').load('pages/contactSection.html',function(){
            $.getScript('assets/js/pages/contactSection.js');
         });
    });

    


    // MASTER //
    $("#masterUser").click(function(){
      $('#contentPages').load('pages/masterUser.html',function(){
            $.getScript('assets/js/pages/masterUser.js');
         });
    });
    $("#masterSite").click(function(){
      $('#contentPages').load('pages/masterSite.html',function(){
            $.getScript('assets/js/pages/masterSite.js');
         });
    });
    $("#masterMenu").click(function(){
      $('#contentPages').load('pages/masterMenu.html',function(){
            $.getScript('assets/js/pages/masterMenu.js');
         });
    });


    // SUBPAGES //

    $("#aboutRealta").click(function(){
      $('#contentPages').load('pages/aboutRealta.html',function(){
            $.getScript('assets/js/pages/aboutRealta.js');
         });
    });

});