$("#detailHeaderSection").click(function(){
    $('#contentPages').load('pages/detailHeaderSection.html',function(){
          $.getScript('assets/js/pages/detailHeaderSection.js');
          $.getScript('assets/js/phoenix.js');
       });
  });