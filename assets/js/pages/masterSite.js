$("#viewCTA").click(function(){
    $('#contentPages').load('pages/viewCTA.html',function(){
          $.getScript('assets/js/pages/viewCTA.js');
       });
  });