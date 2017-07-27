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
            console.log('made the user POST request');
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
            // step b1: new lead trigger
            $('#js-save-button').click(function (event) {
                event.preventDefault();
                console.log('clicked to save changes');
                // step b2: taking input from the user
                var position = $('input[name="position"]').val();
                var company = $('input[name="company"]').val();
                var companyOverview = $('input[name="company-overview"]').val();
                var companySize = $('input[name="company-size"]').val();
                var positionLocation = $('input[name="position-location"]').val();
                var salaryBenefits = $('input[name="salary-benefits"]').val();
                var jobDescription = $('input[name="job-description"]').val();
                var applicationDate = $('input[name="application-date"]').val();
                var contactName = $('input[name="contact-name"]').val();
                var contactEmail = $('input[name="contact-email"]').val();
                var applicationMaterials = $('input[name="application-materials"]').val();
                var interviewDate = $('input[name="interview-date"]').val();
                var interviewFollowUp = $('input[name="interview-follow-up"]').val();
                var leadSource = $('input[name="lead-source"]').val();
                var notes = $('input[name="notes"]').val();
                var rating = $('select[name="rating"]').find('option:selected').val();
                console.log(position);
                console.log(company);
                console.log(companyOverview);
                console.log(companySize);
                console.log(positionLocation);
                console.log(salaryBenefits);
                console.log(jobDescription);
                console.log(applicationDate);
                console.log(contactName);
                console.log(contactEmail);
                console.log(applicationMaterials);
                console.log(interviewDate);
                console.log(interviewFollowUp);
                console.log(leadSource);
                console.log(notes);
                console.log(rating);
                var leadObject = {
                    position: position,
                    company: company,
                    companyOverview: companyOverview,
                    companySize: companySize,
                    positionLocation: positionLocation,
                    salaryBenefits: salaryBenefits,
                    jobDescription: jobDescription,
                    applicationDate: applicationDate,
                    contactName: contactName,
                    contactEmail: contactEmail,
                    applicationMaterials: applicationMaterials,
                    interviewDate: interviewDate,
                    interviewFollowUp: interviewFollowUp,
                    leadSource: leadSource,
                    notes: notes,
                    rating: rating
                };
                // step b3: make local API call using user input
                $.ajax({
                    type: "POST",
                    url: "/create-new",
                    dataType: 'json',
                    data: JSON.stringify(leadObject),
                    contentType: 'application/json'
                })
                // step b8: display results
                .done(function(result) {
                    console.log('made the lead POST request');
                    console.log(result);
                })
                .fail(function(jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
           
            console.log('ok');
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

// to do: get val of rating
        //do API call and post request with lead input data
        //turn API DB data into objects currently filled with
        //...apple etc.