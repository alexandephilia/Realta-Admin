$("#detailSolution").click(function(){
    $('#contentPages').load('pages/detailSolution.html',function(){
          $.getScript('assets/js/pages/detailSolution.js');
          $.getScript('assets/js/phoenix.js');
       });
  });