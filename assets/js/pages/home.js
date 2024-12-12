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
        }
    ],

    search(query) {
        query = query.toLowerCase();
        return this.activities.filter(activity => 
            activity.user.toLowerCase().includes(query) ||
            activity.page.toLowerCase().includes(query) ||
            activity.time.toLowerCase().includes(query)
        );
    },

    // Show skeleton loading
    showLoading() {
        const tbody = $('#activityTable tbody');
        const skeletonTemplate = $('#skeleton-template').html();
        
        // Clear existing content
        tbody.empty();
        
        // Create 5 skeleton rows - matching the number of actual rows
        for (let i = 0; i < 5; i++) {
            tbody.append(skeletonTemplate);
        }
    },

    // Format the activity data into HTML
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

    // Render activities to the table
    renderActivities(activities) {
        $('#activityTable tbody').html(activities.map(this.formatActivity).join(''));
    }
};

// Initialize when the page loads
$(document).ready(function() {
    // Initial render
    ActivityService.renderActivities(ActivityService.activities);

    // Search functionality
    $('#activitySearch').on('input', function() {
        const searchResults = ActivityService.search($(this).val());
        ActivityService.renderActivities(searchResults);
    });

    // Refresh button functionality
    $('#refreshActivity').on('click', function() {
        const $button = $(this);
        const $icon = $button.find('.refresh-icon');
        
        $button.prop('disabled', true);
        
        // Force a reflow to restart the animation
        $icon.removeClass('spinning');
        // This line forces the browser to reflow the element
        void $icon[0].offsetWidth;
        $icon.addClass('spinning');
        
        // Show skeleton loading
        ActivityService.showLoading();
        
        // Simulate data refresh
        setTimeout(() => {
            ActivityService.renderActivities(ActivityService.activities);
            $('#lastUpdateTime').text('Just now');
            
            // Stop spinning and re-enable button
            $icon.removeClass('spinning');
            $button.prop('disabled', false);
        }, 1000);
    });

    // Update last update time
    setInterval(() => {
        $('#lastUpdateTime').text(new Date().toLocaleTimeString());
    }, 60000);
});