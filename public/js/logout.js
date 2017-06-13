$('#logout').on('click', function () {
    $.ajax({
        url:'/api/sessions/',
        type: 'DELETE',
        success:function(){
            window.location.replace("/index");
        }
    });
});