$(function () {

	  $('#contentPages').load('pages/home.html',function(){
    	$.getScript('assets/js/pages/home.js');
    });

    $("#profile").click(function(){
      $('#contentPages').load('pages/profile.html',function(){
            $.getScript('assets/js/pages/profile.js');
         });
    });

    $("#headerSection").click(function(){
      $('#contentPages').load('pages/headerSection.html',function(){
            $.getScript('assets/js/pages/headerSection.js');
            
         });
    });


    // HOMEPAGE //

    $("#megamenuSection").click(function(){
      $('#contentPages').load('pages/megaMenu.html',function(){
            $.getScript('assets/js/pages/megaMenu.js');
         });
    });

    $("#customerSection").click(function(){
      $('#contentPages').load('pages/customerSection.html',function(){
            $.getScript('assets/js/pages/customerSection.js');
         });
    });

     $("#customerStatistic").click(function(){
      $('#contentPages').load('pages/customerStatistic.html',function(){
            $.getScript('assets/js/pages/customerStatistic.js');
         });
    });

    $("#customerStatistic").click(function(){
      $('#contentPages').load('pages/customerStatistic.html',function(){
            $.getScript('assets/js/pages/customerStatistic.js');
         });
    });

    // Blog handlers
    // $('a[href="#nv-blog-home"]').click(function(){
    //   $('#contentPages').load('pages/blogList.html', function() {
    //       initializeImageUpload();
    //   });
    // });

    $("#blogArticles").click(function(){
      $('#contentPages').load('pages/SubPages/Blog/blogList.html', function() {
          initializeImageUpload();
          initializeTinyMCE();
      });
    });

    $("#blogCategories").click(function(){
      $('#contentPages').load('pages/SubPages/Blog/categoriesList.html', function() {
          // Initialize any category-specific scripts if needed
          const categoryStatus = document.getElementById('categoryStatus');
          if (categoryStatus) {
              categoryStatus.addEventListener('change', function() {
                  const statusText = this.parentElement.querySelector('.status-text');
                  if (this.checked) {
                      statusText.textContent = 'Active';
                      statusText.classList.remove('text-danger');
                      statusText.classList.add('text-success');
                  } else {
                      statusText.textContent = 'Inactive';
                      statusText.classList.remove('text-success');
                      statusText.classList.add('text-danger');
                  }
              });
          }
      });
    });

    $("#solutionSection").click(function(){
      $('#contentPages').load('pages/solutionSection.html',function(){
            $.getScript('assets/js/pages/solutionSection.js');
         });
    });

    $("#ctaSection").click(function(){
      $('#contentPages').load('pages/ctaSection.html',function(){
            $.getScript('assets/js/pages/ctaSection.js');
         });
    });

    $("#solutionSection").click(function(){
      $('#contentPages').load('pages/solutionSection.html',function(){
            $.getScript('assets/js/pages/solutionSection.js');
         });
    });

    $("#partnerSection").click(function(){
      $('#contentPages').load('pages/partnerSection.html',function(){
            $.getScript('assets/js/pages/partnerSection.js');
         });
    });

    $("#byBusinessSection").click(function(){
      $('#contentPages').load('pages/byBusinessSection.html',function(){
            $.getScript('assets/js/pages/byBusinessSection.js');
         });
    });

    $("#testimonialSection").click(function(){
      $('#contentPages').load('pages/testimonialSection.html',function(){
            $.getScript('assets/js/pages/testimonialSection.js');
         });
    });

    $("#blogSection").click(function(){
      $('#contentPages').load('pages/SubPages/Blog/blogSection.html',function(){
            $.getScript('assets/js/pages/blogSection.js');
         });
    });

    $("#FAQSection").click(function(){
      $('#contentPages').load('pages/FAQSection.html',function(){
            $.getScript('assets/js/pages/FAQSection.js');
         });
    });

    $("#scheduleSection").click(function(){
      $('#contentPages').load('pages/scheduleSection.html',function(){
            $.getScript('assets/js/pages/scheduleSection.js');
         });
    });

    $("#contactSection").click(function(){
      $('#contentPages').load('pages/contactSection.html',function(){
            $.getScript('assets/js/pages/contactSection.js');
         });
    });

    


    // MASTER //
    $("#masterUser").click(function(){
      $('#contentPages').load('pages/masterUser.html',function(){
            $.getScript('assets/js/pages/masterUser.js');
         });
    });
    $("#masterSite").click(function(){
      $('#contentPages').load('pages/masterSite.html',function(){
            $.getScript('assets/js/pages/masterSite.js');
         });
    });
    $("#masterMenu").click(function(){
      $('#contentPages').load('pages/masterMenu.html',function(){
            $.getScript('assets/js/pages/masterMenu.js');
         });
    });


    // SUBPAGES //

    $("#listIndustries").click(function(){
      $('#contentPages').load('pages/SubPages/listIndustries.html');
    });

    $("#aboutRealta").click(function(){
      $('#contentPages').load('pages/aboutRealta.html',function(){
            $.getScript('assets/js/pages/aboutRealta.js');
         });
    });

    // Image upload handling
    function initializeImageUpload() {
        const imageUpload = document.getElementById('imageUpload');
        const imagePreview = document.getElementById('imagePreview');
        const uploadText = document.getElementById('uploadText');
        const removeButton = document.getElementById('removeImage');
        const container = document.querySelector('.image-upload-container');
        const dropArea = document.querySelector('.preview-area');
        
        if (!imageUpload) return;

        // Handle file selection logic
        function handleFile(file) {
            if (!file) return;
            
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }
            
            if (!file.type.match('image.*')) {
                alert('Please select an image file');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                imagePreview.src = event.target.result;
                container.classList.add('has-image');
                removeButton.classList.remove('d-none');
                uploadText.style.display = 'none';
            };
            reader.onerror = function() {
                alert('Error reading file');
            };
            reader.readAsDataURL(file);
        }

        function resetUploadArea() {
            // Reset the image with transparent GIF
            imagePreview.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            imageUpload.value = '';
            
            // Reset classes
            container.classList.remove('has-image');
            if (removeButton) {
                removeButton.classList.add('d-none');
            }
            
            // Show upload text
            if (uploadText) {
                uploadText.style.removeProperty('display');
                uploadText.style.removeProperty('opacity');
                uploadText.style.removeProperty('visibility');
            }
            
            // Reset preview styles while preserving required styles
            imagePreview.style.cssText = 'width: 100%; height: 100%; object-fit: cover; position: relative; z-index: 1;';
        }

        // Drag and Drop handlers
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, e => {
            e.preventDefault();
            e.stopPropagation();
            });
        });

        // Visual feedback
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => dropArea.classList.add('drag-over'));
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => dropArea.classList.remove('drag-over'));
        });

        // Handle drop
        dropArea.addEventListener('drop', e => handleFile(e.dataTransfer.files[0]));

        // Handle manual file selection
        imageUpload.addEventListener('change', e => handleFile(e.target.files[0]));
        
        // Handle remove
        removeButton.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            resetUploadArea();
        });
        
        // Handle preview area click
        dropArea.addEventListener('click', () => imageUpload.click());
    }

    // Separate the TinyMCE initialization into its own function
    function initializeTinyMCE() {
        tinymce.init({
            selector: '.tinymce-editor',
            height: 400,
            menubar: false,
            branding: false,
            statusbar: false,
            plugins: [
                'lists', 'link', 'image', 'code', 'table', 'help'
            ],
            toolbar: 'styles | bold italic | alignleft aligncenter alignright | bullist numlist | link image | removeformat',
            content_style: `
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px; }
                p { margin: 0 0 1em; }
            `,
            setup: function(editor) {
                editor.on('init', function() {
                    const editorContainer = editor.getContainer();
                    const customStyles = document.createElement('style');
                    customStyles.textContent = `
                        .tox-toolbar__group:has(.tox-tbtn--select) {
                            width: auto !important;
                            flex: 0 0 auto !important;
                        }
                        .tox-tbtn.tox-tbtn--select {
                            width: 200px !important;
                            min-width: 200px !important;
                        }
                        .tox-tbtn__select-label {
                            width: auto !important;
                            flex-grow: 1 !important;
                        }
                    `;
                    editorContainer.appendChild(customStyles);
                });
            }
        });
    }

    // Initialize TinyMCE when modals are shown
    $('#createBlogModal').on('shown.bs.modal', function() {
        initializeTinyMCE();
    });

    $('#editBlogModal').on('shown.bs.modal', function() {
        initializeTinyMCE();
    });

    // Clean up TinyMCE instances when modals are hidden
    $('#createBlogModal, #editBlogModal').on('hidden.bs.modal', function() {
        tinymce.remove('.tinymce-editor');
    });

    
    $("#jobListings").click(function(){
      $('#contentPages').load('pages/SubPages/Career/jobListings.html', function() {
          // Initialize TinyMCE for job description and requirements
          document.querySelectorAll('.tinymce-editor').forEach(editor => {
              tinymce.init({
                  target: editor,
                  height: 300,
                  menubar: false,
                  plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                  content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }'
              });
          });
      });
    });

    $("#jobSubmissions").click(function(){
      $('#contentPages').load('pages/SubPages/Career/jobSubmission.html');
    });

    $("#jobCategories").click(function () {
        $("#contentPages").load("pages/SubPages/Career/jobCategories.html", function() {
            // Initialize any necessary plugins after loading
        });
    });

});