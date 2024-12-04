$("#detailBlog").click(function(){
    $('#contentPages').load('pages/detailBlog.html',function(){
          $.getScript('assets/js/pages/detailBlog.js');
          $.getScript('assets/js/phoenix.js');
       });
  });