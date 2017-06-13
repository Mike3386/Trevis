function register() {
    var params = $('#registerForm').serialize();
    $.ajax({
        url: '/api/sessions',
        type: 'PUT',
        data: params,
        success: function(data) {
            alert(data);
        }
    });
}