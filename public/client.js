"use strict";

// Function and object definitions


// Triggers
$(document).ready(function () {
    // when page loads
    // show and hide sections as needed
    $('#dashboard').hide();
    $('#edit-screen').hide();
    $('#nav').hide();
    $('#login-screen').show();

    // when user signs in
    // step 1: login trigger
    $('#js-login-button').click(function (event) {
        event.preventDefault();
        console.log('clicked the login button');
        // step 2: taking input from the user
        var inputEmail = $('input[name="email"]').val();
        var inputPassword = $('input[name="password"]').val();
          var usernamePwObject = {
            username: inputEmail,
            password: inputPassword
        };
        // step 3: using user input, make the local login API call
        $.ajax({
            type: "POST",
            url: "/login",
            dataType: 'json',
            data: JSON.stringify(usernamePwObject),
            contentType: 'application/json'
        })
        // step 8 (continuing from server.js): display results
        .done(function(result) {
            console.log('made the POST request');
            console.log(result);
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
        console.log(inputEmail);
        console.log('password is ' + inputPassword);
        $('#login-screen').hide();
        $('#nav').show();
        $('#dashboard').show();

        // when user clicks "create new job lead" in nav
        $('#js-create-new').click(function (event) {
            event.preventDefault();
            console.log('clicked to create new job lead');
            $('#dashboard').hide();
            $('#edit-screen').show();

            // when user clicks "save changes" in edit screen
            // should also send the data as a POST request on server side
            $('#js-save-button').click(function (event) {
                event.preventDefault();
                console.log('clicked to save changes');
                $('#edit-screen').hide();
                $('#dashboard').show();
            });
        });

        // when user clicks log out
        // should also log them out from DB on server side
        $('#js-log-out').click(function (event) {
            location.reload();
        });
    });
});
