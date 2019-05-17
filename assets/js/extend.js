$(function(){
    populateBookings();

    $('#confirmChanges').click(function() {
        const myObj = {startDate: $('#startDate').val(), endDate: $('#endDate').val()};

        $.ajax({
            xhrFields: {
                withCredentials: true,
            },
            method:'PUT',
            url: 'http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/extendBooking/' + $('#allBookings option:selected').val(),
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
                    $('#startDate').val(jsonObject.startDate);
                    $('endDate').val(jsonObject.endDate);
                }
            }).fail(function(json){
                const errorJSON = JSON.parse(JSON.stringify(json.responseJSON));
                //redirect user back to login page to try to login
                if(errorJSON.verifyError || json.verifyError) {
                    window.location.href= '../../views/loginpage/index.html';
                }
            });
    });
    
    $('#submitBtn').click(function() {
        checkForm(); 
    });

    //disable the end date so that the user cannot choose the end date before the start date
    $('#endDate').prop("disabled", true);
    
    if($("#startDate").data("datepicker") != null){
        $("#startDate").val("");
        $("#startDate" ).datepicker( "destroy" );
    }
    
    $('#startDate').datepicker({
        minDate: 'now + 3',
        maxDate: '+1y',
        dateFormat: 'yy-mm-dd',
        dayNamesMin: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
        showOn: 'focus',
        onSelect: function() {
            //checking whether if the datepicker have been initized into the element, if so remove the datepicker so that the datepicker can be updated according to the start date
            if($("#endDate").data("datepicker") != null){
                $("#endDate").val("");
                $("#endDate" ).datepicker( "destroy" );
            }
            
            $('#endDate').datepicker({
                minDate: $('#startDate').val(),
                maxDate: '+1y',
                dateFormat: 'yy-mm-dd',
                dayNamesMin: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                showOn: 'focus'
            });

            $('#endDate').prop("disabled", false);
        }
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
    var sd = document.getElementById("startDate");
    var ed = document.getElementById("endDate");
    
    if(sd.value === "" || ed.value === "") {
        //validate whether the 
        if(sd.value === "") {
            document.getElementById("errorSD").innerHTML = "This is a required field!";
            sd.focus();
        } else {
            document.getElementById("errorSD").innerHTML = "";
        }

        if(ed.value === "") {
            document.getElementById("errorED").innerHTML = "This is a required field!";
            ed.focus();
        } else {
            document.getElementById("errorED").innerHTML = "";
        } 
        return;
    }
    
    confirmForm();
}

function confirmForm() {
    $('#confirmStart').html($('#startDate').val());
    $('#confirmEnd').html($('#endDate').val());
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
