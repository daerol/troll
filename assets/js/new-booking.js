$(function() {
    executeScript();
});

function executeScript() {
    
    $('#insertBooking').click(function(){
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var tabletNo = $('#tabletNo').val();
        var courseName = $('#courseName').val();
        
        var myObj = {startDate: startDate, endDate: endDate, tabletNo: tabletNo, courseName: courseName};
        console.log(JSON.stringify(myObj));
        
        $.ajax({
            xhrFields: {
                withCredentials: true,
            },
            method: 'POST',
            url: `http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/booking`,
            data: JSON.stringify(myObj),
            dataType: 'json',
            contentType: 'application/json',
        }).done(function(json) {
            if(json.result.type === 'success') {
                alert('The booking have been made to the system');
                window.location.href = "mainpage.html"
            } else {
                alert(json);
            }
        }).fail(function(json) {
            var jsonObject = JSON.parse(JSON.stringify(json.responseJSON));
            if(jsonObject.verifyError) {
                //route the user back to the loginpage
                window.location.href='../../views/loginpage/index.html';
            } 
        });
    });
    
    $('#submitBtn').click(function(){
        validateForm();
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
}

function validateForm() {
    var sd = document.getElementById("startDate");
    var ed = document.getElementById("endDate");
    var cn = document.getElementById("courseName");
    var tn = document.getElementById("tabletNo");

    if(sd.value === "" || ed.value === "" || cn.value === "" || tn.value === "") {
        if(tn.value === "") {
            document.getElementById("errorTN").innerHTML = "This is a required field!";
            tn.focus();
        } else {
             document.getElementById("errorTN").innerHTML = "";
        }

        if(cn.value === "") {
            document.getElementById("errorCN").innerHTML = "This is a required field!";
            cn.focus();
        } else {
            document.getElementById("errorCN").innerHTML = "";
        }
        //validate whether the 
        if(ed.value === "") {
            document.getElementById("errorED").innerHTML = "This is a required field!";
            ed.focus();
        } else {
            document.getElementById("errorED").innerHTML = "";
        }

        if(sd.value === "") {
            document.getElementById("errorSD").innerHTML = "This is a required field!";
            sd.focus();
        } else {
            document.getElementById("errorSD").innerHTML = "";
        } 
        return;
    }

    confirmBooking();
}

function confirmBooking() {
    $('#confirmStart').html($('#startDate').val());
    $('#confirmEnd').html($('#endDate').val());
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