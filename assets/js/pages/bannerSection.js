$(document).ready(function() {
    // Sample data - replace with actual data from your backend
    const predefinedSystems = [
        { value: 'main', label: 'Main Site', badgeClass: 'info' },
        { value: 'golf', label: 'Golf Course System', badgeClass: 'info' },
        { value: 'hotel', label: 'Hotel System', badgeClass: 'success' },
        { value: 'hr', label: 'HR System', badgeClass: 'warning' },
        { value: 'itsm', label: 'ITSM, ITAM & Unified Endpoint Management', badgeClass: 'primary' },
        { value: 'network', label: 'Network & System Integration', badgeClass: 'danger' },
        { value: 'property', label: 'Property & Tenancy System', badgeClass: 'secondary' }
    ];

    // Function to populate system dropdowns
    function populateSystemDropdowns() {
        const dropdowns = ['addAssignedSystem', 'editAssignedSystem'];
        
        dropdowns.forEach(dropdownId => {
            const select = document.getElementById(dropdownId);
            if (!select) return;
            
            // Clear existing options
            select.innerHTML = '';
            
            // Add options from predefinedSystems
            predefinedSystems.forEach(system => {
                const option = new Option(system.label, system.value);
                select.add(option);
            });
            
            // Set default value to 'golf'
            select.value = 'golf';
        });
    }

    // Call populate function on document ready
    populateSystemDropdowns();

    let banners = [
        {
            id: 1,
            title: "Welcome Banner",
            description: "Welcome to our platform",
            icon: "fas fa-home",
            iconColor: "#000000",
            status: "active",
            periodDate: "2024-03-01",
            visibilityDesktop: true,
            visibilityMobile: true,
            button1Text: "Learn More",
            button1Link: "https://example.com",
            button2Text: "",
            button2Link: "",
            assignedSystem: 'golf' // Default to first system
        }
    ];

    // Common FontAwesome icons for suggestions
    const commonIcons = [
        'home', 'user', 'cog', 'bell', 'envelope', 'star',
        'heart', 'calendar', 'clock', 'search', 'bookmark', 'flag',
        'chart-bar', 'comments', 'folder', 'image', 'link', 'map',
        'paper-plane', 'shield-alt', 'shopping-cart', 'tag', 'thumbs-up', 'trophy'
    ];

    // Icon utility functions
    const iconUtils = {
        // Convert raw name to full class (e.g., "home" -> "fas fa-home")
        toFullClass: (name) => name ? `fas fa-${name.replace(/^fa[sb]-/, '').replace(/^fas? /, '')}` : '',
        
        // Get clean name without prefixes (e.g., "fas fa-home" -> "home")
        getCleanName: (fullClass) => fullClass ? fullClass.replace(/^fa[sb]-/, '').replace(/^fas? /, '').replace(/^fa-/, '') : '',
        
        // Check if has proper format
        isFullClass: (str) => /^fas fa-/.test(str)
    };

    // Simple Icon Preview Handler
    const IconPreview = {
        setupHandlers: function(inputId, previewId, colorId) {
            const input = $(`#${inputId}`);
            const preview = $(`#${previewId}`);
            const colorInput = $(`#${colorId}`);

            // Direct icon update on input with proper structure
            input.on('input', function() {
                const iconCode = this.value.trim();
                const currentColor = colorInput.val();
                
                if (iconCode) {
                    preview
                        .empty()
                        .append($('<i>')
                            .addClass(iconCode)
                            .addClass('fs-4')
                            .css('color', currentColor)
                        );
                } else {
                    preview.html(`
                        <div class="text-danger text-center">
                            <i class="fa-solid fa-triangle-exclamation fs-4"></i>
                            <div class="small mt-1">Please enter a valid icon code</div>
                        </div>
                    `);
                }
            });

            // Update color with proper targeting
            colorInput.on('input', function() {
                const currentColor = this.value;
                const iconCode = input.val().trim();
                
                if (iconCode) {
                    preview.empty().append(
                        $('<i>')
                            .addClass(iconCode)
                            .addClass('fs-4')
                            .css('color', currentColor)
                    );
                }
            });

            // Handle suggestions
            const suggestionsId = `${inputId}Suggestions`;
            input.on('input', function() {
                const searchTerm = this.value.trim().replace(/^fas? /, '').replace(/^fa-/, '');
                const container = $(`#${suggestionsId}`);
                
                if (!searchTerm) {
                    container.hide();
                    return;
                }

                const matches = commonIcons
                    .filter(icon => icon.toLowerCase().includes(searchTerm.toLowerCase()))
                    .slice(0, 6);

                if (matches.length) {
                    const html = matches.map(icon => `
                        <a class="dropdown-item" href="#" data-icon="fas fa-${icon}">
                            <i class="fas fa-${icon} me-2"></i>${icon}
                        </a>
                    `).join('');
                    container.html(html).show();
                } else {
                    container.hide();
                }
            });

            // Handle suggestion selection
            $(document).on('click', `#${suggestionsId} .dropdown-item`, function(e) {
                e.preventDefault();
                e.stopPropagation();
                const iconClass = $(this).data('icon');
                input.val(iconClass).trigger('input');
                $(`#${suggestionsId}`).hide();
            });
        },

        // Simple getter for form data
        getIconClass: function(inputId) {
            return $(`#${inputId}`).val();
        },

        // Simple setter for form population
        setValue: function(inputId, previewId, value, color) {
            $(`#${inputId}`).val(value).trigger('input');
            $(`#${previewId}`).find('i').css('color', color);
        },

        // Simple reset
        reset: function(inputId, previewId) {
            $(`#${inputId}`).val('').trigger('input');
        }
    };

    // Form Handlers
    const FormHandlers = {
        getFormData: function(prefix) {
            return {
                title: $(`#${prefix}Title`).val(),
                description: $(`#${prefix}Description`).val(),
                icon: IconPreview.getIconClass(`${prefix}Icon`),
                iconColor: $(`#${prefix}IconColor`).val(),
                status: $(`#${prefix}Status`).val(),
                periodDate: $(`#${prefix}PeriodDate`).val(),
                visibilityDesktop: $(`#${prefix}VisibilityDesktop`).is(':checked'),
                visibilityMobile: $(`#${prefix}VisibilityMobile`).is(':checked'),
                button1Text: $(`#${prefix}Button1Text`).val(),
                button1Link: $(`#${prefix}Button1Link`).val(),
                button2Text: $(`#${prefix}Button2Text`).val(),
                button2Link: $(`#${prefix}Button2Link`).val(),
                assignedSystem: $(`#${prefix}AssignedSystem`).val()
            };
        },

        resetForm: function(prefix) {
            $(`#${prefix}BannerForm`)[0].reset();
            $(`#${prefix}IconColor`).val('#000000');
            IconPreview.reset(`${prefix}Icon`, `${prefix}IconPreview`);
            // Reset button fields
            $(`#${prefix}Button1Text`).val('');
            $(`#${prefix}Button1Link`).val('');
            $(`#${prefix}Button2Text`).val('');
            $(`#${prefix}Button2Link`).val('');
            $(`#${prefix}AssignedSystem`).val('golf');
        },

        populateForm: function(prefix, data) {
            $(`#${prefix}Title`).val(data.title);
            $(`#${prefix}Description`).val(data.description);
            IconPreview.setValue(`${prefix}Icon`, `${prefix}IconPreview`, data.icon, data.iconColor);
            $(`#${prefix}IconColor`).val(data.iconColor);
            $(`#${prefix}Status`).val(data.status);
            $(`#${prefix}PeriodDate`).val(data.periodDate);
            $(`#${prefix}VisibilityDesktop`).prop('checked', data.visibilityDesktop);
            $(`#${prefix}VisibilityMobile`).prop('checked', data.visibilityMobile);
            // Populate button fields
            $(`#${prefix}Button1Text`).val(data.button1Text || '');
            $(`#${prefix}Button1Link`).val(data.button1Link || '');
            $(`#${prefix}Button2Text`).val(data.button2Text || '');
            $(`#${prefix}Button2Link`).val(data.button2Link || '');
            $(`#${prefix}AssignedSystem`).val(data.assignedSystem || 'golf');
        }
    };

    // Helper function to get system badge HTML
    function getSystemBadgeHtml(systemValue) {
        const system = predefinedSystems.find(s => s.value === systemValue);
        if (system) {
            return `<span class="badge badge-phoenix badge-phoenix-${system.badgeClass}">${system.label}</span>`;
        }
        return systemValue; // Fallback to plain text if system not found
    }

    // Table Handler
    const TableHandler = {
        render: function() {
            const tbody = $('#bannerTableBody');
            tbody.empty();

            banners.forEach(banner => {
                const statusClass = {
                    'active': 'success',
                    'inactive': 'warning',
                    'draft': 'secondary'
                }[banner.status] || 'secondary';

                const row = `
                    <tr data-id="${banner.id}">
                        <td class="text-center">
                            <h6 class="mb-0 text-nowrap">${banner.title}</h6>
                            <small class="text-muted">${banner.description}</small>
                            ${banner.button1Text ? `
                            <div class="mt-2">
                                <small class="text-primary">Button 1: ${banner.button1Text}</small>
                            </div>` : ''}
                            ${banner.button2Text ? `
                            <div class="mt-1">
                                <small class="text-primary">Button 2: ${banner.button2Text}</small>
                            </div>` : ''}
                            <div class="mt-2">
                                ${getSystemBadgeHtml(banner.assignedSystem)}
                            </div>
                        </td>
                        <td class="text-center">
                            <i class="${banner.icon}" style="font-size: 1rem; color: ${banner.iconColor};"></i>
                        </td>
                        <td class="text-center">
                            <span class="badge badge-phoenix fs-10 badge-phoenix-${statusClass}">
                                <span class="fa ${banner.status === 'active' ? 'fa-check' : 'fa-clock'}"></span>
                                ${banner.status}
                            </span>
                        </td>
                        <td class="text-center">${new Date(banner.periodDate).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}</td>
                        <td class="text-center">
                            <div class="d-flex justify-content-center gap-2">
                                <span class="badge badge-phoenix fs-10 badge-phoenix-${banner.visibilityDesktop ? 'success' : 'danger'}">
                                    <span class="fa fa-desktop"></span>
                                </span>
                                <span class="badge badge-phoenix fs-10 badge-phoenix-${banner.visibilityMobile ? 'success' : 'danger'}">
                                    <span class="fa fa-mobile-alt"></span>
                                </span>
                            </div>
                        </td>
                        <td class="text-center">
                            <button class="btn btn-sm btn-falcon-default text-danger" onclick="deleteBanner(${banner.id})">
                                <span class="fas fa-trash-alt"></span>
                            </button>
                            <button class="btn btn-sm btn-falcon-default text-warning" onclick="editBanner(${banner.id})">
                                <span class="fas fa-edit me-2"></span>Edit
                            </button>
                        </td>
                    </tr>
                `;
                tbody.append(row);
            });
        }
    };

    // Initialize Icon Preview handlers
    IconPreview.setupHandlers('addIcon', 'addIconPreview', 'addIconColor');
    IconPreview.setupHandlers('editIcon', 'editIconPreview', 'editIconColor');

    // Visibility toggle handler
    window.toggleVisibility = function(badge, checkboxId) {
        const checkbox = document.getElementById(checkboxId);
        const isChecked = !checkbox.checked;
        checkbox.checked = isChecked;
        
        if (isChecked) {
            badge.classList.remove('badge-phoenix-danger');
            badge.classList.add('badge-phoenix-success');
        } else {
            badge.classList.remove('badge-phoenix-success');
            badge.classList.add('badge-phoenix-danger');
        }
    };

    // Initialize visibility badges
    function initVisibilityBadges() {
        const checkVisibility = (checkboxId, badgeElement) => {
            const checkbox = document.getElementById(checkboxId);
            if (checkbox.checked) {
                badgeElement.classList.remove('badge-phoenix-danger');
                badgeElement.classList.add('badge-phoenix-success');
            } else {
                badgeElement.classList.remove('badge-phoenix-success');
                badgeElement.classList.add('badge-phoenix-danger');
            }
        };

        document.querySelectorAll('.visibility-badge').forEach(badge => {
            const modalPrefix = badge.closest('form').id.replace('BannerForm', '');
            const type = badge.dataset.visibility;
            checkVisibility(`${modalPrefix}Visibility${type.charAt(0).toUpperCase() + type.slice(1)}`, badge);
        });
    }

    // Call on modal show
    $('#addBannerModal').on('show.bs.modal', initVisibilityBadges);
    $('#editBannerModal').on('show.bs.modal', function() {
        // Small delay to ensure form population is complete
        setTimeout(initVisibilityBadges, 50);
    });

    // Initialize table
    TableHandler.render();

    // Add Banner Handler
    $('#saveNewBanner').click(function() {
        const formData = FormHandlers.getFormData('add');
        console.log('Adding new banner with color:', formData.iconColor);
        formData.id = banners.length + 1;
        banners.push(formData);
        console.log('Updated banners array:', banners);
        
        TableHandler.render();
        $('#addBannerModal').modal('hide');
        FormHandlers.resetForm('add');
    });

    // Edit Banner Handler
    window.editBanner = function(id) {
        const banner = banners.find(b => b.id === id);
        console.log('Editing banner with current color:', banner.iconColor);
        if (banner) {
            FormHandlers.populateForm('edit', banner);
            $('#editBannerModal').modal('show');
            $('#editBannerModal').data('bannerId', id);
        }
    };

    $('#updateBanner').click(function() {
        const id = $('#editBannerModal').data('bannerId');
        const formData = FormHandlers.getFormData('edit');
        console.log('Updating banner with new color:', formData.iconColor);
        
        banners = banners.map(b => b.id === id ? { ...b, ...formData } : b);
        console.log('Updated banner in array:', banners.find(b => b.id === id));
        
        TableHandler.render();
        $('#editBannerModal').modal('hide');
        FormHandlers.resetForm('edit');
    });

    // Delete Banner Handler
    window.deleteBanner = function(id) {
        $('#deleteBannerModal').modal('show');
        $('#deleteBannerModal').data('bannerId', id);
    };

    $('#confirmDelete').click(function() {
        const id = $('#deleteBannerModal').data('bannerId');
        banners = banners.filter(b => b.id !== id);
        TableHandler.render();
        $('#deleteBannerModal').modal('hide');
    });

    // Modal Reset Handlers
    $('#addBannerModal').on('hidden.bs.modal', function() {
        FormHandlers.resetForm('add');
    });

    $('#editBannerModal').on('hidden.bs.modal', function() {
        FormHandlers.resetForm('edit');
    });

    // Hide suggestions when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('[id$="Icon"], [id$="IconSuggestions"]').length) {
            $('[id$="IconSuggestions"]').hide();
        }
    });

    // Add page assignment handler
    function handlePageAssignment(selectElement) {
        $(selectElement).on('change', function() {
            const selectedValues = $(this).val();
            if (selectedValues.includes('golf')) {
                $(this).val(['golf']);
            } else if (selectedValues.length === 0) {
                $(this).val(['golf']);
            }
        });
    }

    // Initialize page assignment handlers
    handlePageAssignment('#addAssignedSystem');
    handlePageAssignment('#editAssignedSystem');
});
