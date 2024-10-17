$("#detailBusiness").click(function(){
    $('#contentPages').load('pages/detailBusiness.html',function(){
          $.getScript('assets/js/pages/detailBusiness.js');
          $.getScript('assets/js/phoenix.js');
       });
  });