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
        getAndDisplayLeads();

        // populate the dashboard with contents of the user's database
        // requires making an API call to the DB
        function getAndDisplayLeads() {
            console.log('retrieving job lead items');
            $.getJSON("/leads", function(res) {
                    console.log('logging the data now');
                    console.log(res);
                    var htmlOutput = '';
                    for (var i=0; i<res.leads.length; i++) {
                       // console.log(res.leads[i].company + ' is the company name!');
                        if (res.leads[i].funnelStage == 1) {
                            htmlOutput = '<p class="job-lead"><a href="#">' + res.leads[i].company + '</a></p>';
                            $('#new-leads').append(htmlOutput);
                        // stage 2: qualified leads
                        } else if (res.leads[i].funnelStage == 2) {
                            htmlOutput = '<p class="job-lead">' + res.leads[i].company + '</p>';
                            $('#qualified-leads').append(htmlOutput);
                        // stage 3: contact/apply
                        } else if (res.leads[i].funnelStage == 3) {
                            htmlOutput = '<p class="job-lead">' + res.leads[i].company + '</p>';
                            $('#contact-apply').append(htmlOutput);
                        // stage 4: interview
                        } else if (res.leads[i].funnelStage == 4) {
                            htmlOutput = '<p class="job-lead">' + res.leads[i].company + '</p>';
                            $('#interview').append(htmlOutput);
                        // stage 5: offer
                        } else if (res.leads[i].funnelStage == 5) {
                            htmlOutput = '<p class="job-lead">' + res.leads[i].company + '</p>';
                            $('#offer').append(htmlOutput);
                        // stage 6: negotiate
                        } else if (res.leads[i].funnelStage == 6) {
                            htmlOutput = '<p class="job-lead">' + res.leads[i].company + '</p>';
                            $('#negotiate').append(htmlOutput);
                        // anything other than 1-6 should throw an error
                        } else {
                            console.warn('error in funnel stages for API data!');
                        }
                    };
                });
        }

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
                var funnelStage = $('select[name="funnel-stage"]').find('option:selected').val();
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
                var leadObject = {
                    position: position,
                    company: company,
                    funnelStage: funnelStage,
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
                console.log(leadObject);
                // step b3: make local API call using user input
                $.ajax({
                    type: "POST",
                    url: "/leads",
                    dataType: 'json',
                    data: JSON.stringify(leadObject),
                    contentType: 'application/json'
                })
                // step b8: display results
                .done(function(result) {
                    console.log('made the lead POST request');
                    console.log(result);
                    // need to output the new job lead object
                    // ... using just the position title
                    // ... in a new rectangle on the dashboard
                    console.log(result.company);
                    console.log(result.funnelStage + ' is the funnel stage');
                    var htmlOutput = '';
                    // stage 1: new leads
                    if (result.funnelStage == 1) {
                        htmlOutput += '<p class="job-lead">' + result.company + '</p>';
                        $('#new-leads').append(htmlOutput);
                    // stage 2: qualified leads
                    } else if (result.funnelStage == 2) {
                        htmlOutput += '<p class="job-lead">' + result.company + '</p>';
                        $('#qualified-leads').append(htmlOutput);
                    // stage 3: contact/apply
                    } else if (result.funnelStage == 3) {
                        htmlOutput += '<p class="job-lead">' + result.company + '</p>';
                        $('#contact-apply').append(htmlOutput);
                    // stage 4: interview
                    } else if (result.funnelStage == 4) {
                        htmlOutput += '<p class="job-lead">' + result.company + '</p>';
                        $('#interview').append(htmlOutput);
                    // stage 5: offer
                    } else if (result.funnelStage == 5) {
                        htmlOutput += '<p class="job-lead">' + result.company + '</p>';
                        $('#offer').append(htmlOutput);
                    // stage 6: negotiate
                    } else if (result.funnelStage == 6) {
                        htmlOutput += '<p class="job-lead">' + result.company + '</p>';
                        $('#negotiate').append(htmlOutput);
                    // anything other than 1-6 should throw an error
                    // user should go back and try again
                    } else {
                        console.warn('error in funnel stages!');
                    }
                })
                .fail(function(jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
            // reset the form so user can input a new lead
            $('#edit-form').trigger('reset');
            console.log('now leaving edit screen');
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