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
    $('#js-login-button').click(function (event) {
        event.preventDefault();
        console.log('clicked the login button');
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
