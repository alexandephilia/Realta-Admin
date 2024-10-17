$("#detailContact").click(function(){
    $('#contentPages').load('pages/detailContact.html',function(){
          $.getScript('assets/js/pages/detailContact.js');
          $.getScript('assets/js/phoenix.js');
       });
  });


$("#detailMessage").click(function(){
    $('#contentPages').load('pages/detailMessage.html',function(){
          $.getScript('assets/js/pages/detailMessage.js');
          $.getScript('assets/js/phoenix.js');
       });
  });