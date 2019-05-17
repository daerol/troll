 $(function() {
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true,
        },
        url: 'http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/user/checkCookies',
        dataType: 'json',
        contentType: 'application/json',
        }).done(function(json) {
            const jsonObject = JSON.parse(JSON.stringify(json));
            if(jsonObject.result.type.toLowerCase() === 'success'){
                if(window.location.pathname.indexOf('/views/admin/mainpage.html') !== -1 || 
                window.location.pathname.indexOf('/views/user/mainpage.html') !== -1) {
                    $('#nameTag').html(jsonObject.result.userName);
                    $('#unitTag').html(jsonObject.result.unit);
                } else {
                    if(jsonObject.result.userRole.toLowerCase() === 'admin') {
                       window.location.href= '../../views/admin/mainpage.html';
                    }
                    else if(jsonObject.result.userRole.toLowerCase() === 'user') {
                       window.location.href = '../../views/user/mainpage.html';
                    }
                }
            }
        }).fail(function(json) {
            const errorJSON = JSON.parse(JSON.stringify(json.responseJSON));
            //redirect user back to login page to try to login
            if(errorJSON.verifyError) {
                if(window.location.pathname.indexOf('/views/loginpage/index.html') !== -1) {
                    alert('Please try to login again');
                } else {
                    window.location.href = '../../views/loginpage/index.html';
                }
            }
        });
});
