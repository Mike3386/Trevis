function register() {
    var params = $('#registerForm').serialize();
    $.ajax({
        url: '/api/session',
        type: 'PUT',
        data: params,
        success: function(data) {
            alert(data);
        }
    });
}