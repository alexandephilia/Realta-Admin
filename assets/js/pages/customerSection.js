$("#createCustomer").click(function(){
    $('#contentPages').load('pages/createCustomer.html',function(){
          $.getScript('assets/js/pages/createCustomer.js');
          $.getScript('assets/js/phoenix.js');
    

       });
  });

  $("#detailCustomerSection").click(function(){
    $('#contentPages').load('pages/detailCustomerSection.html',function(){
          $.getScript('assets/js/pages/detailCustomerSection.js');
          $.getScript('assets/js/phoenix.js');
       });
  });

  