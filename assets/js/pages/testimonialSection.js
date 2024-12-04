$("#detailTestimonial").click(function(){
    $('#contentPages').load('pages/detailTestimonial.html',function(){
          $.getScript('assets/js/pages/detailTestimonial.js');
          $.getScript('assets/js/phoenix.js');
       });
  });