// Activity data service
const ActivityService = {
    activities: [
        {
            id: 1,
            user: 'Khailal',
            page: 'Master site',
            time: '09 August 2024, 13:25'
        },
        {
            id: 2,
            user: 'Ratna',
            page: 'Solution',
            time: '11 Agustus 2024, 12:00'
        },
        {
            id: 3,
            user: 'Mefa',
            page: 'Industri',
            time: '21 April 2024, 11:00'
        },
        {
            id: 4,
            user: 'Tamrin',
            page: 'Logo Section',
            time: '24 Juli 2024, 10:00'
        },
        {
            id: 5,
            user: 'Harry',
            page: 'Blog',
            time: '11 Juli 2024, 10:00'
        },
        {
            id: 6,
            user: 'Sarah',
            page: 'Products',
            time: '10 Juli 2024, 09:30'
        },
        {
            id: 7,
            user: 'John',
            page: 'About Us',
            time: '09 Juli 2024, 14:20'
        },
        {
            id: 8,
            user: 'Emma',
            page: 'Contact',
            time: '08 Juli 2024, 16:45'
        },
        {
            id: 9,
            user: 'Michael',
            page: 'Services',
            time: '07 Juli 2024, 11:15'
        },
        {
            id: 10,
            user: 'David',
            page: 'Portfolio',
            time: '06 Juli 2024, 13:40'
        }
    ],
    currentPage: 1,

    search(query, limit = 5, page = 1) {
        query = query.toLowerCase();
        const filteredActivities = this.activities.filter(activity => 
            activity.user.toLowerCase().includes(query) ||
            activity.page.toLowerCase().includes(query) ||
            activity.time.toLowerCase().includes(query)
        );
        
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return {
            activities: filteredActivities.slice(startIndex, endIndex),
            totalPages: Math.ceil(filteredActivities.length / limit)
        };
    },

    // Show skeleton loading
    showLoading(limit = 5) {
        const tbody = $('#activityTable tbody');
        const skeletonTemplate = $('#skeleton-template').html();
        tbody.empty();
        for (let i = 0; i < limit; i++) {
            tbody.append(skeletonTemplate);
        }
    },

    formatActivity(activity) {
        return `
            <tr class="activity-row cursor-pointer transition-all hover:bg-light">
                <td class="mb-0 fs-9 text-body text-center">
                    <span class="fw-semibold">${activity.user}</span>
                </td>
                <td class="mb-0 fs-9 text-body text-center">
                    <span class="text-primary">${activity.page}</span>
                </td>
                <td class="mb-0 fs-9 text-body text-center">
                    <span class="text-muted">${activity.time}</span>
                </td>
            </tr>
        `;
    },

    renderActivities(activities) {
        $('#activityTable tbody').html(activities.map(this.formatActivity).join(''));
    },

    getActivities(limit = 5, page = 1) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return {
            activities: this.activities.slice(startIndex, endIndex),
            totalPages: Math.ceil(this.activities.length / limit)
        };
    },

    renderPagination(currentPage, totalPages) {
        const pagination = $('.pagination');
        const pageItems = [];
        
        // Previous button
        pageItems.push(`
            <li class="page-item${currentPage === 1 ? ' disabled' : ''}" id="prevPage">
                <a class="page-link" href="#">Previous</a>
            </li>
        `);
        
        // Numbered pages
        for (let i = 1; i <= totalPages; i++) {
            pageItems.push(`
                <li class="page-item${currentPage === i ? ' active' : ''}" data-page="${i}">
                    <a class="page-link" href="#">${i}</a>
                </li>
            `);
        }
        
        // Next button
        pageItems.push(`
            <li class="page-item${currentPage >= totalPages ? ' disabled' : ''}" id="nextPage">
                <a class="page-link" href="#">Next</a>
            </li>
        `);
        
        pagination.html(pageItems.join(''));
    }
};

// Initialize when the page loads
$(document).ready(function() {
    const updateActivities = () => {
        const limit = parseInt($('#activityLimit').val());
        const searchQuery = $('#activitySearch').val();
        const page = ActivityService.currentPage;
        
        const result = searchQuery ? 
            ActivityService.search(searchQuery, limit, page) : 
            ActivityService.getActivities(limit, page);
        
        ActivityService.renderActivities(result.activities);
        ActivityService.renderPagination(page, result.totalPages);
    };

    // Initial render
    updateActivities();

    // Handle limit change
    $('#activityLimit').on('change', function() {
        const limit = $(this).val();
        $('#activityCount').text(limit);
        ActivityService.currentPage = 1;
        updateActivities();
    });

    // Update search functionality
    $('#activitySearch').on('input', function() {
        ActivityService.currentPage = 1;
        updateActivities();
    });

    // Pagination handlers
    $(document).on('click', '.pagination .page-item:not(.disabled)', function(e) {
        e.preventDefault();
        const $this = $(this);
        
        if ($this.attr('id') === 'prevPage' && ActivityService.currentPage > 1) {
            ActivityService.currentPage--;
        } else if ($this.attr('id') === 'nextPage') {
            ActivityService.currentPage++;
        } else {
            const page = parseInt($this.data('page'));
            if (page) {
                ActivityService.currentPage = page;
            }
        }
        
        updateActivities();
    });

    // Update refresh button functionality
    $('#refreshActivity').on('click', function() {
        const $button = $(this);
        const $icon = $button.find('.refresh-icon');
        const limit = parseInt($('#activityLimit').val());
        
        $button.prop('disabled', true);
        $icon.removeClass('spinning');
        void $icon[0].offsetWidth;
        $icon.addClass('spinning');
        
        ActivityService.showLoading(limit);
        
        setTimeout(() => {
            updateActivities();
            $('#lastUpdateTime').text('Just now');
            
            $icon.removeClass('spinning');
            $button.prop('disabled', false);
        }, 1000);
    });

    // Update last update time
    setInterval(() => {
        $('#lastUpdateTime').text(new Date().toLocaleTimeString());
    }, 60000);
});