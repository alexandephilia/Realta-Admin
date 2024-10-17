$("#viewMenu").click(function(){
    $('#contentPages').load('pages/viewMenu.html',function(){
          $.getScript('assets/js/pages/viewMenu.js');
       });
  });