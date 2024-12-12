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
        const $btn = $(this);
        $btn.find('i').addClass('fa-spin');
        
        // Simulate refresh delay
        setTimeout(() => {
            ActivityService.renderActivities(ActivityService.activities);
            $btn.find('i').removeClass('fa-spin');
            $('#lastUpdateTime').text('Just now');
        }, 1000);
    });

    // Update last update time
    setInterval(() => {
        $('#lastUpdateTime').text(new Date().toLocaleTimeString());
    }, 60000);
});