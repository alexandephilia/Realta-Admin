$(function() {
    // Initialize Dropzone
    Dropzone.autoDiscover = false;
    $("#my-awesome-dropzone").dropzone({
        url: "/file/post", // Replace with your upload URL
        maxFilesize: 5,
        acceptedFiles: "image/*",
        addRemoveLinks: false,
        dictDefaultMessage: "Drop files here or click to upload",
        thumbnailWidth: null,
        thumbnailHeight: null,
        previewTemplate: document.querySelector('.dz-preview').innerHTML,
        init: function() {
            this.on("addedfile", function(file) {
                if (file.type.startsWith('image/')) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $('.dz-preview .dz-image').attr('src', e.target.result);
                        $('.dz-preview').show();
                        var removeButton = Dropzone.createElement("<a class='dz-remove' href='javascript:undefined;'>×</a>");
                        removeButton.addEventListener("click", function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            this.removeFile(file);
                        }.bind(this));
                        file.previewElement.appendChild(removeButton);
                    }.bind(this);
                    reader.readAsDataURL(file);
                }
            });
            this.on("removedfile", function(file) {
                $('.dz-preview').hide();
            });
        }
    });

    let selectedRow = null;
    const maxIcons = 6;
    const maxFeatures = 6;
    const maxProducts = 6;

    // Handle row selection
    $('#megamenuTable tbody').on('click', 'tr', function() {
        $(this).addClass('selected-row').siblings().removeClass('selected-row');
        selectedRow = $(this);
    });

    // Handle edit button click
    $('.megamenu-edit-btn').on('click', function(e) {
        e.stopPropagation();
        const row = $(this).closest('tr');
        row.addClass('selected-row').siblings().removeClass('selected-row');
        selectedRow = row;
        populateModalWithRowData(row);
    });

    function populateModalWithRowData(row) {
        $('#megamenuTitle').val(row.find('td:eq(1)').text());
        $('#activeSwitch').prop('checked', row.find('td:eq(3) .badge-phoenix-success').length > 0);
        // Add logic to populate other fields...
    }

    // Handle adding new icon
    $('#megamenu-add-icon-btn').on('click', function() {
        const iconList = $('#megamenu-icon-list');
        if (iconList.children().length < maxIcons) {
            const newItem = document.importNode($('#megamenu-icon-item-template')[0].content, true);
            iconList.append(newItem);
        }
        updateAddButtonState('icon');
    });

    // Handle removing icon
    $(document).on('click', '.megamenu-remove-icon', function() {
        $(this).closest('.megamenu-icon-item').remove();
        updateAddButtonState('icon');
    });

    // Handle adding new feature
    $('#megamenu-add-feature-btn').on('click', function() {
        const featureList = $('#megamenu-feature-list');
        if (featureList.children().length < maxFeatures) {
            const newItem = document.importNode($('#megamenu-feature-item-template')[0].content, true);
            featureList.append(newItem);
        }
        updateAddButtonState('feature');
    });

    // Handle removing feature
    $(document).on('click', '.megamenu-remove-feature', function() {
        $(this).closest('.megamenu-feature-item').remove();
        updateAddButtonState('feature');
    });

    // Handle adding new product
    $('#megamenu-add-product-btn').on('click', function() {
        const productList = $('#megamenu-product-list');
        if (productList.children().length < maxProducts) {
            const newItem = document.importNode($('#megamenu-product-item-template')[0].content, true);
            productList.append(newItem);
        }
        updateAddButtonState('product');
    });

    // Handle removing product
    $(document).on('click', '.megamenu-remove-product', function() {
        $(this).closest('.megamenu-product-item').remove();
        updateAddButtonState('product');
    });

    function updateAddButtonState(type) {
        const listSelector = `#megamenu-${type}-list`;
        const btnSelector = `#megamenu-add-${type}-btn`;
        const maxItems = type === 'icon' ? maxIcons : (type === 'feature' ? maxFeatures : maxProducts);
        
        const itemCount = $(listSelector).children().length;
        const addBtn = $(btnSelector);
        
        if (itemCount >= maxItems) {
            addBtn.prop('disabled', true)
                  .removeClass('btn-falcon-default')
                  .addClass('text-muted')
                  .css('background-color', 'transparent');
        } else {
            addBtn.prop('disabled', false)
                  .addClass('btn-falcon-default')
                  .removeClass('text-muted')
                  .css('background-color', '');
        }
    }

    // Handle form submission
    $("#megamenu-save-btn").click(function() {
        var formData = {
            title: $("#megamenuTitle").val(),
            description: $("#megamenuDescription").val(),
            labelButton: $("#labelButton").val(),
            active: $("#activeSwitch").is(":checked"),
            icons: [],
            features: [],
            products: []
        };

        $('.megamenu-icon-item').each(function() {
            formData.icons.push({
                code: $(this).find('.megamenu-icon-code').val(),
                description: $(this).find('.megamenu-icon-description').val()
            });
        });

        $('.megamenu-feature-item').each(function() {
            formData.features.push({
                title: $(this).find('.megamenu-feature-title').val(),
                description: $(this).find('.megamenu-feature-description').val()
            });
        });

        $('.megamenu-product-item').each(function() {
            formData.products.push({
                name: $(this).find('.megamenu-product-name').val(),
                price: $(this).find('.megamenu-product-price').val()
            });
        });

        console.log(formData);
        if (selectedRow) {
            updateRowWithFormData(selectedRow, formData);
        }
    });

    function updateRowWithFormData(row, data) {
        row.find('td:eq(1)').text(data.title);
        const activeCell = row.find('td:eq(3)');
        activeCell.html(data.active ? 
            '<span class="badge badge-phoenix fs-10 badge-phoenix-success"><span class="fa fa-check"></span></span>' :
            '<span class="badge badge-phoenix fs-10 badge-phoenix-danger"><span class="fa fa-times"></span></span>'
        );
        // Update other cells as needed
    }

    // Drag and drop functionality for table rows
    const table = document.getElementById('megamenuTable');
    const tbody = table.querySelector('tbody');
    let draggedRow = null;

    tbody.addEventListener('dragstart', (e) => {
        draggedRow = e.target.closest('tr');
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => {
            draggedRow.classList.add('dragging');
        }, 0);
    });

    tbody.addEventListener('dragover', (e) => {
        e.preventDefault();
        const row = e.target.closest('tr');
        if (row && row !== draggedRow) {
            const rect = row.getBoundingClientRect();
            const next = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
            tbody.insertBefore(draggedRow, next ? row.nextSibling : row);
        }
    });

    tbody.addEventListener('dragend', () => {
        draggedRow.classList.remove('dragging');
        draggedRow = null;
        updateOrder();
    });

    function updateOrder() {
        const rows = Array.from(tbody.querySelectorAll('tr'));
        rows.forEach((row, index) => {
            console.log(`Row ${index + 1}: ${row.children[1].textContent}`);
        });
        // Send the new order to your backend
    }
});