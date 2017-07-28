"use strict";

// Function and object definitions
function populateEditScreen() {
    // populating the edit screen with fillable fields
    // variables here first
    var funnelStageHtmlOutput = '';
    funnelStageHtmlOutput += '<select name="funnel-stage">';
    funnelStageHtmlOutput += '<option value="0">Select</option>';
    funnelStageHtmlOutput += '<option value="1">New Leads</option>';
    funnelStageHtmlOutput += '<option value="2">Qualified Leads</option>';
    funnelStageHtmlOutput += '<option value="3">Contact/Apply</option>';
    funnelStageHtmlOutput += '<option value="4">Interview</option>';
    funnelStageHtmlOutput += '<option value="5">Offer</option>';
    funnelStageHtmlOutput += '<option value="6">Negotiate</option>';
    funnelStageHtmlOutput += '</select>';
    var ratingHtmlOutput = '';
    ratingHtmlOutput += '<select name="rating">';
    ratingHtmlOutput += '<option value="0">Select</option>';
    ratingHtmlOutput += '<option value="1">Dream job!</option>';
    ratingHtmlOutput += '<option value="2">Good fit</option>';
    ratingHtmlOutput += '<option value="3">Take it or leave it</option>';
    ratingHtmlOutput += '<option value="4">Only if I\'m desperate</option>';
    ratingHtmlOutput += '</select>';

    $('#js-position-header').html('<input type="text" name="position" placeholder="Position">');
    $('#js-company-header').html('<input type="text" name="company" placeholder="Company Name">');
    $('#js-funnel-stage').html(funnelStageHtmlOutput);
    $('#js-company-overview').html('<input type="textarea" name="company-overview" placeholder="What kind of company is this? What is the company culture like?">');
    $('#js-company-size').html('<input type="text" name="company-size" placeholder="About how many?">  employees');
    $('#js-position-location').html('<input type="text" name="position-location" placeholder="Ganymede Station">');
    $('#js-salary-benefits').html('<input type="text" name="salary-benefits" placeholder="$1,000,000 + a helicopter">');
    $('#js-job-description').html('<input type="textarea" name="job-description" placeholder="What are the duties and requirements?">');
    $('#js-application-date').html('<input type="date" name="application-date">');
    $('#js-contact-name').html('<input type="text" name="contact-name" placeholder="James Bond">');
    $('#js-contact-email').html('<input type="email" name="contact-email" placeholder="example@example.com">');
    $('#js-application-materials').html('<input type="text" name="application-materials" placeholder="CV, resume, cover letter...">');
    $('#js-interview-date').html('<input type="date" name="interview-date">');
    $('#js-interview-follow-up').html('<input type="text" name="interview-follow-up" placeholder="Did you send a thank-you note?">');
    $('#js-lead-source').html('<input type="text" name="lead-source" placeholder="Friend? Google?">');
    $('#js-notes').html('<input type="textarea" name="notes" placeholder="Note to self!">');
    $('#js-rating').html(ratingHtmlOutput);
}

// populating the edit screen with data
// variables here first
var testData = {
    position: 'Junior Full-Stack Developer',
    company: 'X-Team',
    funnelStage: 'New Leads',
    companyOverview: 'Fully remote team working on cutting-edge technology',
    companySize: '100',
    positionLocation: ' ',
    salaryBenefits: ' ',
    jobDescription: ' ',
    applicationDate: ' ',
    contactName: ' ',
    contactEmail: ' ',
    applicationMaterials: '',
    interviewDate: '',
    interviewFollowUp: '',
    leadSource: '',
    notes: '',
    rating: 2
};

function populateViewScreen(data) {

    // now replace the previous html added to the DOM with text
    // how to deal with empty variables? currently these still display the fillable fields (html)
    $('#js-position-header').text(data.position);
    $('#js-company-header').text(data.company);
    $('#js-funnel-stage').text(data.funnelStage);
    $('#js-company-overview').text(data.companyOverview);
    $('#js-company-size').text(data.companySize + ' employees');
    $('#js-position-location').text();
    $('#js-salary-benefits').text();
    $('#js-job-description').text();
    $('#js-application-date').text();
    $('#js-contact-name').text();
    $('#js-contact-email').text();
    $('#js-application-materials').text();
    $('#js-interview-date').text();
    $('#js-interview-follow-up').text();
    $('#js-lead-source').text();
    $('#js-notes').text();
    $('#js-rating').text(data.rating);
}

// populate the dashboard with contents of the user's database
// requires making an API call to the DB
function getAndDisplayLeads() {
    console.log('retrieving job lead items');
    $.getJSON("/leads", function (res) {
        console.log('logging the data now');
        console.log(res);
        var htmlOutput = '';
        for (var i = 0; i < res.leads.length; i++) {
            // console.log(res.leads[i].company + ' is the company name!');
            if (res.leads[i].funnelStage == 1) {
                htmlOutput = '<p class="job-lead" id="' + res.leads[i]._id + '">' + res.leads[i].company + '</p>';
                $('#new-leads').append(htmlOutput);
                // stage 2: qualified leads
            } else if (res.leads[i].funnelStage == 2) {
                htmlOutput = '<p class="job-lead" id="' + res.leads[i]._id + '">' + res.leads[i].company + '</p>';
                $('#qualified-leads').append(htmlOutput);
                // stage 3: contact/apply
            } else if (res.leads[i].funnelStage == 3) {
                htmlOutput = '<p class="job-lead" id="' + res.leads[i]._id + '">' + res.leads[i].company + '</p>';
                $('#contact-apply').append(htmlOutput);
                // stage 4: interview
            } else if (res.leads[i].funnelStage == 4) {
                htmlOutput = '<p class="job-lead" id="' + res.leads[i]._id + '">' + res.leads[i].company + '</p>';
                $('#interview').append(htmlOutput);
                // stage 5: offer
            } else if (res.leads[i].funnelStage == 5) {
                htmlOutput = '<p class="job-lead" id="' + res.leads[i]._id + '">' + res.leads[i].company + '</p>';
                $('#offer').append(htmlOutput);
                // stage 6: negotiate
            } else if (res.leads[i].funnelStage == 6) {
                htmlOutput = '<p class="job-lead" id="' + res.leads[i]._id + '">' + res.leads[i].company + '</p>';
                $('#negotiate').append(htmlOutput);
                // anything other than 1-6 should throw an error
            } else {
                console.warn('error in funnel stages for API data!');
            }
        };
    });
}


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
    //$('#js-login-button').click(function (event) {
    document.getElementById('js-login-button').addEventListener('click', function () {
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
            .done(function (result) {
                console.log('made the user POST request');
                console.log(result);
            })
            .fail(function (jqXHR, error, errorThrown) {
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
    });

    // when user clicks "back" button on view/edit screen
    // returns user to dashboard and resets form
    document.getElementById('js-back-button').addEventListener('click', function () {
        event.preventDefault();
        // the confirm should only happen if the person has clicked the edit button
        // should not happen if the person is only viewing
        // how to do this?
        if (confirm('Are you sure you want to go back? Your changes will not be saved.') == true) {
            console.log('user has canceled; going back to dashboard');
            $('#edit-form').trigger('reset');
            $('#edit-screen').hide();
            $('#dashboard').show();
        } else {
            console.log('user decided not to go back after all');
        };
    });

    function getJobLead(searchId) {
        $.ajax({
                type: "GET",
                url: "/leads/" + searchId,
                dataType: 'json',
                contentType: 'application/json',
                success: function () {
                    console.log('what up I\'m in yer .ajax call');
                }
            })
            // step 8 (continuing from server.js): display results
            .done(function (result) {
                console.log('made the GET request for the clicked job lead');
                console.log(result);
                // need a function here to populate the view screen with job lead data from GET request
                populateViewScreen(result);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }

    // when user clicks `a` anchor tag in a .job-lead box
    // should take user to that job lead's view screen
    $(document).on('click', ".job-lead", function () {
        console.log(event.target);
        console.log('you clicked a job lead!');
        // now target the id, which is the _id of the job lead object
        console.log(event.target.id);
        var currentId = event.target.id;
        console.log(currentId);
        getJobLead(currentId);

        console.log('showing the view screen now for a selected job lead');
        $('#dashboard').hide();
        // after this is hidden here, trigger for js-edit-button does not show it again :(
        console.log('about to hide js-save-button');
        $('#js-save-button').hide();
        $('#edit-screen').show();
        $('.edit-button').show();
        // call the function to populate the view screen with text
        // will need to replace this call to function populateViewScreen(testData) with the GET call that contains it with real data
        populateViewScreen(testData);
    });

    // when user clicks "edit" button
    // should change text to fillable fields
    // existing data should prepopulate or...???
    document.getElementById('js-edit-button').addEventListener('click', function () {
        event.preventDefault();
        console.log('about to edit a job lead');
        $('#js-edit-button').hide();
        $('#js-save-button').show();
        populateEditScreen();
    });

    // when user clicks "delete" button
    // should confirm with user that they want to delete the job lead
    // should send a DELETE request to the database
    // and delete that job lead
    // should then reset the form, hide the edit screen, show the dashboard
    // the DOM should show that the job lead is now gone
    document.getElementById('js-delete-button').addEventListener('click', function () {
        event.preventDefault();
        console.log('about to delete a job lead');
        if (confirm('Are you sure you want to delete this job lead? Deleting is PERMANENT. You will not be able to recover this data.') == true) {
            console.log('user has deleted; going back to dashboard');
            $('#edit-form').trigger('reset');
            $('#edit-screen').hide();
            $('#dashboard').show();
        } else {
            console.log('user decided not to delete after all');
        };
    });

    // when user clicks "create new job lead" in nav
    document.getElementById('js-create-new').addEventListener('click', function () {
        event.preventDefault();
        console.log('clicked to create new job lead');
        $('#dashboard').hide();
        // hide the edit and delete buttons;
        // these are unnecessary when creating a brand new lead
        $('#js-edit-button').hide();
        $('#js-delete-button').hide();
        $('#edit-screen').show();
        $('#js-save-button').show();
        // calling the function to populate the edit screen with fillable fields
        populateEditScreen();
    });

    // when user clicks "save changes" in edit screen
    // should also send the data as a POST request on server side
    // step b1: new lead trigger
    document.getElementById('js-save-button').addEventListener('click', function () {
        //$('#js-save-button').click(function (event) {
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
            .done(function (result) {
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
            .fail(function (jqXHR, error, errorThrown) {
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
document.getElementById('js-log-out').addEventListener('click', function () {
    location.reload();
});

// to do:
// From dashboard, users should be able to click the name of a company to see the view
// ... screen for that company, with data populated by a GET call to the DB.
// From that view screen for a particular job lead, users should be able to click the
// ... 'edit' button to turn the view screen into an editable one like the
// ... 'create new lead' screen, only with existing data for that job lead already
// ... filled in from the database.
// API calls should work:
// --DELETE on js-delete-button trigger
// --PUT on js-save-button trigger from edit screen (how to differentiate this from a POST request
// ... when creating a brand-new job lead object?)
// --GET for a particular job lead when user clicks its company name on dashboard
// Users should be able to choose whether to sign in or sign up at login screen
// Should send a POST request to users (to create a new user) when a user signs up
// Should validate email and PW formats when a user tries to sign in or sign up
// Should send a GET request to users (to check for an existing user) when a user signs in
// Should check user input email against email addresses in users DB when user tries to sign in
// Should check user input password against password in users DB when user tries to sign in
// Should include password security features
// Including: should not display password entered when user signs in or signs up
// Including: should not directly send plain-text password in GET request or POST request
