 
$("#detailFAQSection").click(function(){
    $('#contentPages').load('pages/detailFAQSection.html',function(){
          $.getScript('assets/js/pages/detailFAQSection.js');
       });
  });
$.getScript('assets/js/phoenix.js');
