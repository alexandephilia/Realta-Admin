document.getElementById('contentStatus').addEventListener('change', function() {
    const statusText = this.closest('.form-check').querySelector('.status-text');
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