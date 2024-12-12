$(function () {
    var table = $("#contentTable").DataTable({
        responsive: true,
        lengthChange: false,
        autoWidth: false,
        ajax: {
            url: "api/microsites/sections",
            dataSrc: ""
        },
        columns: [
            { 
                data: "displayOrder",
                render: function(data, type, row) {
                    return `
                        <button class="btn px-1 btn-sm btn-falcon-default me-1">
                            <span class="fas fa-chevron-up"></span>
                        </button>
                        <button class="btn px-1 btn-sm btn-falcon-default">
                            <span class="fas fa-chevron-down"></span>
                        </button>
                    `;
                }
            },
            { data: "sectionName" },
            { data: "micrositeName" },
            { 
                data: "status",
                render: function(data) {
                    return data ? 
                        '<span class="badge badge-phoenix fs-10 badge-phoenix-success"><span class="fa fa-check"></span></span>' :
                        '<span class="badge badge-phoenix fs-10 badge-phoenix-danger"><span class="fa fa-xmark"></span></span>';
                }
            },
            {
                data: null,
                render: function(data, type, row) {
                    return `
                        <button class="btn btn-sm btn-falcon-default text-danger" onclick="deleteSection(${row.id})">
                            <span class="fas fa-trash-alt"></span>
                        </button>
                        <button class="btn btn-sm btn-falcon-default text-warning" onclick="editSection(${row.id})">
                            <span class="fas fa-edit me-2"></span>Edit
                        </button>
                    `;
                }
            }
        ]
    });
});

// Section management functions
function editSection(id) {
    // Show edit modal or navigate to edit page
    $('#createContentModal').modal('show');
    // Load section data here
}

function deleteSection(id) {
    $('#deleteContentModal').modal('show');
    // Store the ID for use in confirmDelete
    $('#deleteContentModal').data('sectionId', id);
}

function confirmDelete() {
    const id = $('#deleteContentModal').data('sectionId');
    $.ajax({
        url: `api/microsites/sections/${id}`,
        method: 'DELETE',
        success: function(result) {
            $('#contentTable').DataTable().ajax.reload();
            $('#deleteContentModal').modal('hide');
            toastr.success('Section deleted successfully');
        },
        error: function(xhr, status, error) {
            toastr.error('Error deleting section');
        }
    });
}

// Handle form submission
$('#createContentForm').on('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        sectionName: $('#sectionName').val(),
        micrositeName: $('#micrositeName').val(),
        displayOrder: $('#sectionOrder').val(),
        status: $('#contentStatus').is(':checked'),
        content: tinymce.get('sectionContent').getContent(),
        styles: $('#sectionStyles').val(),
        script: $('#sectionScript').val()
    };

    $.ajax({
        url: 'api/microsites/sections',
        method: 'POST',
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function(result) {
            $('#createContentModal').modal('hide');
            $('#contentTable').DataTable().ajax.reload();
            toastr.success('Section created successfully');
        },
        error: function(xhr, status, error) {
            toastr.error('Error creating section');
        }
    });
}); 