$(function(){
    populateBookings();

    $('#submitBtn').click(function() {
        const myObj = {id: $('#allBookings option:selected').val(), returnTablets: $('#tabletNo').val()};

        $.ajax({
            xhrFields: {
                withCredentials: true,
            },
            method:'PUT',
            url: 'http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/returnTablets',
            data: JSON.stringify(myObj),
            dataType: 'json',
            contentType: 'application/json',
            }).done(function(json){
                if(json.result.type === 'success') {
                   alert('Tablets have been succesfully returned!');
                    window.location.href='../../views/admin/mainpage.html';
                }
            }).fail(function(json){
                const errorJSON = JSON.parse(JSON.stringify(json.responseJSON));
                //redirect user back to login page to try to login
                console.log(errorJSON);
                if(errorJSON.verifyError) {
                    window.location.href= '../../views/loginpage/index.html';
                }
            });
    })
    
    $('#allBookings').change(function(){
        $.ajax({
            xhrFields: {
                withCredentials: true,
            },
            method:'GET',
            url: 'http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/booking/' + $(this).val(),
            dataType: 'json',
            contentType: 'application/json',
            }).done(function(json){
                if(json.result.type === 'success') {
                    const jsonObject = JSON.parse(JSON.stringify(json.result.data));
                    $('#bookedPeriod').html(jsonObject.startDate + " to " + jsonObject.endDate);
                }
            }).fail(function(json){
                const errorJSON = JSON.parse(JSON.stringify(json.responseJSON));
                //redirect user back to login page to try to login
                if(errorJSON.verifyError.auth.toLowerCase() === 'failed') {
                    window.location.href= '../../views/loginpage/index.html';
                }
            });
    });

   
});

function populateBookings() {
    $.ajax({
        xhrFields: {
            withCredentials: true,
        },
        method:'GET',
        url: 'http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/booking/allupcoming',
        dataType: 'json',
        contentType: 'application/json',
    }).done(function(json){
        if(json.result.type === 'success') {
            const jsonArray = JSON.parse(JSON.stringify(json.result.data));
            jsonArray.map(function(obj) {
                $('#allBookings').append(`<option value="${obj.bookingId}">${obj.courseName}</option>`);
            });
        }
    }).fail(function(json){
        const errorJSON = JSON.parse(JSON.stringify(json.responseJSON));
        //redirect user back to login page to try to login
        if(errorJSON.verifyError.auth === 'failed') {
            window.location.href= '../../views/loginpage/index.html';
        }
    });
}

function moveCursor(event, nextElement) {
    //to move to the next element of the form
    if(event.keyCode === 13) {
        document.getElementById(nextElement).focus();
    }
}
