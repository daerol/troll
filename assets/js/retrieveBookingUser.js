$(function() {
   $.ajax({
    type: 'GET',
    xhrFields: {
        withCredentials: true,
    },
    url: `http://ec2-3-93-144-196.compute-1.amazonaws.com:3000/api/booking/getDataByUser`,
    dataType: 'json',
    contentType: 'application/json',
    }).done(function(json) {
        const jsonArray = JSON.parse(JSON.stringify(json.result.data));
        if(jsonArray.length === 0 || jsonArray === undefined || jsonArray === null) {
            $('#courses').append('<div class="card shadow">' +
                                    '<div class="card-body"> ' +
                                        'There is no upcoming booking!' +
                                    '</div>' +
                                '</div>');
        } else {
            jsonArray.map((obj) => {
                console.log(obj);
                let jsonObj = JSON.parse(JSON.stringify(obj));
                $('#courses').append('<div class="card shadow">' +
                                        '<div class="card-body">' +
                                            '<div id="courseDetails">' +
                                              '<div class="detailsLeft" style="float:left;">' +
                                                '<span>' + jsonObj.courseName + '</span>' +
                                                '<span>From: ' + jsonObj.startDate + ', To: ' + jsonObj.endDate  +'</span>' +
                                                '<span>' + jsonObj.tabletNo +' Tablets Loaned</span>' +
                                              '</div>' +
                                              '<div class="detailsRight" style="float:right; display:flex; align-items: center;">' +
                                                '<span class="badge" style="float:left; font-size: calc(0.5em + 1vmin);">' + jsonObj.status + '</span>' +
                                              '</div>' +
                                              '<div style="clear:both;"></div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>');
            });

            $('.detailsRight').height($('.detailsLeft').height());

        }
    }).fail(function(json) {
        const errorJSON = JSON.parse(JSON.stringify(json.responseJSON));
        //redirect user back to login page to try to login
        if(errorJSON.verifyError.auth === 'failed') {
            window.location.href = '../../views/loginpage/index.html';
        }
    }); 
});