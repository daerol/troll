$(function(){
    populateBookings();
    
    $('#confirmSubmit').click(function() {
        const myObj = {courseName: $('#courseName').val(), tabletNo: $('#tabletNo').val()};

        $.ajax({
            xhrFields: {
                withCredentials: true,
            },
            method:'PUT',
            url: 'http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/booking/' + $('#allBookings option:selected').val(),
            data: JSON.stringify(myObj),
            dataType: 'json',
            contentType: 'application/json',
            }).done(function(json){
                if(json.result.type === 'success') {
                   alert('Record have been successfully updated!');
                    window.location.href='../../views/user/mainpage.html';
                }
            }).fail(function(json){
                const errorJSON = JSON.parse(JSON.stringify(json.responseJSON));
                //redirect user back to login page to try to login
                console.log(errorJSON);
                if(errorJSON.verifyError) {
                    window.location.href= '../../views/loginpage/index.html';
                }
            });
    });
    
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
                    $('#tabletNo').val(jsonObject.tabletNo);
                    if(window.location.pathname === "/views/user/editbooking.html") {
                        $('#courseName').val(jsonObject.courseName);
                    }
                }
            }).fail(function(json){
                const errorJSON = JSON.parse(JSON.stringify(json.responseJSON));
                //redirect user back to login page to try to login
                if(errorJSON.verifyError.auth.toLowerCase() === 'failed') {
                    window.location.href= '../../views/loginpage/index.html';
                }
            });
    });
    
    $('#submitBtn').click(function() {
        checkForm(); 
    });
    
});

function populateBookings() {
    $.ajax({
        xhrFields: {
            withCredentials: true,
        },
        method:'GET',
        url: 'http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/booking/getDataByUser',
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

function checkForm() {
    var cn = document.getElementById("courseName");
    var tn = document.getElementById("tabletNo");
    
    if(cn.value === "" || tn.value === "") {
        //validate whether the 
        if(cn.value === "") {
            document.getElementById("errorCN").innerHTML = "This is a required field!";
            cn.focus();
        } else {
            document.getElementById("errorCN").innerHTML = "";
        }

        if(tn.value === "") {
            document.getElementById("errorTN").innerHTML = "This is a required field!";
            tn.focus();
        } else {
            document.getElementById("errorTN").innerHTML = "";
        } 
        return;
    }
    
    confirmForm();
}

function confirmForm() {
    $('#confirmCourse').html($('#courseName').val());
    $('#confirmTablet').html($('#tabletNo').val());
    $('#myModal').modal('show');
}

function moveCursor(event, nextElement) {
    //to move to the next element of the form
    if(event.keyCode === 13) {
        document.getElementById(nextElement).focus();
    }
}

function moveSelect(element, nextElement) {
    $(element.id).blur();
    document.getElementById(nextElement).focus();
}
