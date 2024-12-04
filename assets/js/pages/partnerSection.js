$("#detailPartners").click(function(){
    $('#contentPages').load('pages/detailPartners.html',function(){
          $.getScript('assets/js/pages/detailPartners.js');
          $.getScript('assets/js/phoenix.js');
       });
  });