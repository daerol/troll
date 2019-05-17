var storeUser;

$(function() {
    
});


function redirectNavigation(result) {
    if(result === "newbooking") { location.href = "../../views/user/newbooking.html"; }
    else if(result === "adminnewbooking") { location.href = "../../views/admin/newbooking.html"; }
    else if(result === "updatebooking") { location.href = "../../views/user/editbooking.html"; }
    else if(result === "extendbooking") { location.href = "../../views/user/extendbooking.html"; }
    else if(result === "overwritebooking") { location.href = "../../views/admin/overwritebooking.html"; }
    else if(result === "viewinventory") { location.href = "../../views/admin/viewinventory.html"; }
    else if(result === "updateinventory") { location.href = "../../views/admin/updateinventory.html"; }
    else if(result === "returntablets") { location.href = "../../views/admin/returntablets.html"; }
    else if(result === "monthlyreport") { location.href = "../../views/admin/monthlyreport.html"; }
    else if(result === "archive") { location.href = "../../views/admin/archivemain.html"; }
    else if(result === "archivebookings") { location.href = "../../views/admin/archivebooking.html"; }
    else if(result === "archiveinventory") { location.href = "../../views/admin/archiveinventory.html"; }
    else { location.href = "#"; }

}

function backNavigation(result) {
    if(result === "backAdminPage") { location.href = "../../views/admin/mainpage.html"; }
    else if(result === "backUserPage") { location.href = "../../views/user/mainpage.html"; }
    else if(result === "backArchivePage") { location.href = "../../views/admin/archivemain.html"; }
}

$('#logoutBtn').click(function() {
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true,
        },
        url: `http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/logout`,
        dataType: 'json',
        contentType: 'application/json',
        }).done(function() {
            window.location.href="../../views/loginpage/index.html";
        }).fail(function(){
            alert('failed');
        });
});

$('#loginBtn').click(function() {
    var myObj = {userName: $('#userName').val()};
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true,
        },
        url: `http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/user`,
        data: myObj,
        dataType: 'json',
        contentType: 'application/json',
        }).done(function(json) {
            if(json.result.type === "success") {
                window.location.href = "../../views/loginpage/OTP.html"; 
            } else {
                alert("Please contact the TST team or POC in assisting you with this issue");
            }
        }).fail(function(json) {
            console.log(json.responseText);
        });
});

$('#OTPBtn').click(function(){
    var OTP = $('#OTP').val();
    var myObj = {code: OTP};
    $.ajax({
        xhrFields: {
            withCredentials: true,
        },
        method:'POST',
        url: `http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/user/verifyOTP`,
        data: JSON.stringify(myObj),
        dataType: 'json',
        contentType: 'application/json',
    }).done(function(json){
        if(json.result.TOS.toUpperCase() === 'COMPLETED') {
            if(json.result.userRole.toLowerCase() === 'admin') {
                window.location.href = "../../views/admin/mainpage.html";
            } else {
                window.location.href = "../../views/user/mainpage.html";
            }
        } else {
            window.location.href = "../../views/loginpage/tos.html";
        }
    }).fail(function(json){
        console.log(json.responseText);
    });
});

$('#TOSBtn').click(function(){
    $.ajax({
        xhrFields: {
                withCredentials: true,
        },
        method:'PUT',
        url: `http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/user/updateTOS`,
        dataType: 'json',
        contentType: 'application/json',
    }).done(function(json){
        if(json.result.type === 'success') {
            if(json.result.role.toLowerCase() === "admin") {
                window.location.href = "/admin/mainpage.html";
            } else {
                window.location.href = "/user/mainpage.html";
            }
        }
    }).fail(function(){
        const errorJSON = JSON.parse(JSON.stringify(json.responseJSON));
        //redirect user back to login page to try to login
        if(errorJSON.verifyError.auth === 'failed') {
            window.location.href= host + '/views/index.html';
        }
    });
});

$('#inventorySubmitBtn').click((event) => {
    var username = storeUser;
    var availableTablets = $('#availableTablets').val();
    var loanTablets = $('#loanTablets').val();
    var maintainanceTablets = $('#maintainanceTablets').val();
    var apiUrl = "http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/inventory";

    //console.log(availableTablets + loanTablets + maintainanceTablets + username);


    event.preventDefault();

    $.ajax({
        url: apiUrl,
        type: 'POST',
        data: {
            username : username,
            availableTablets : availableTablets,
            loanTablets : loanTablets,
            maintainanceTablets : maintainanceTablets,
            recorddts : today
        },
        success: (response) => { console.log(response)},
        error: () => {}
    });
})

