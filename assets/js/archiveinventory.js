$(document).ready(()=> {
    showInventoryLogs();
});

// To display all the booking logs available into the div


function showBookingsLogs() {
    const url = 'http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/logs/bookings';


    $.ajax({
        type: 'GET',
        url: url,
        data: { get_param: 'value' },
        xhrFields: {
            withCredentials: true,
        },
        dataType: 'json',
        success: function (data) {

        },
        error: function(jqXHR,error, errorThrown) {
            if(jqXHR.status&&jqXHR.status==400){
                console.log(jqXHR.responseText);
            }else{
                console.log("Something went wrong");
            }
        }
    });
}



function showInventoryLogs() {
    const url = 'http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/logs/';


    $.ajax({
        type: 'GET',
        url: url,
        data: { get_param: 'value' },
        xhrFields: {
            withCredentials: true,
        },
        dataType: 'json',
        success: function (data) {
            data.forEach(function(log){
                $('#inventoryLog').append('<li>' + log.message + '</li><hr/>');
            });
        },
        error: function(jqXHR,error, errorThrown) {
            if(jqXHR.status&&jqXHR.status==400){
                console.log(jqXHR.responseText);
            }else{
                console.log("Something went wrong");
            }
        }
    });
}
