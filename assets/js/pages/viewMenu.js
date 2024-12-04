$("#backMasterMenu").click(function(){
    $('#contentPages').load('pages/masterMenu.html',function(){
          $.getScript('assets/js/pages/masterMenu.js');
        //   $.getScript('assets/js/phoenix.js');
       });
  });