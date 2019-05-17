
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}
var today = dd + '/' + mm + '/' + yyyy;

$(document).ready(function (){



    const url = 'http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/inventory/stats';


    $.ajax({
        type: 'GET',
        url: url,
        data: { get_param: 'value' },
        xhrFields: {
            withCredentials: true,
        },
        dataType: 'json',
        success: function (data) {
            $('#availableTablets').val(data[0].availableTablets);
            $('#loanTablets').val(data[0].loanTablets);
            $('#maintainanceTablets').val(data[0].maintainanceTablets);
            $('#todaysdate').append(today);
        },
        error: function(jqXHR,error, errorThrown) {
            if(jqXHR.status&&jqXHR.status==400){
                console.log(jqXHR.responseText);
            }else{
                console.log("Something went wrong");
            }
        }
    });

});




