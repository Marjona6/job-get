"use strict";

// Triggers
$(document).ready(function () {

// -----------------------------------------------------------------
// Function and object definitions

function populateEditScreen(dataPassedIn) {
    // populating the edit screen with fillable fields
    var funnelStageHtmlOutput = '';
    funnelStageHtmlOutput += '<select required name="funnel-stage">';
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

    $('#js-position-header').html('<input type="text" name="position" placeholder="Position" value="' + dataPassedIn.position + '">');
    $('#js-company-header').html('<input type="text" name="company" placeholder="Company Name" value="' + dataPassedIn.company + '">');
    for (var i = 1; i <= 6; i++) {
        if (dataPassedIn.funnelStage == i) {
            // first search for the index where i occurs
            var indx = funnelStageHtmlOutput.search(i);
            // then pass that index (+2 to account for closing double quotes and a space following)
            funnelStageHtmlOutput = funnelStageHtmlOutput.slice(0, indx + 2) + ' selected="selected"' + funnelStageHtmlOutput.slice(indx + 2);
        }
    };
    $('#js-funnel-stage').html(funnelStageHtmlOutput);
    $('#js-company-overview').html('<input type="textarea" name="company-overview" placeholder="What kind of company is this? What is the company culture like?" value="' + dataPassedIn.companyOverview + '">');
    $('#js-company-size').html('<input type="text" name="company-size" placeholder="About how many?" value="' + dataPassedIn.companySize + '">  employees');
    $('#js-position-location').html('<input type="text" name="position-location" placeholder="Ganymede Station" value="' + dataPassedIn.positionLocation + '">');
    $('#js-salary-benefits').html('<input type="text" name="salary-benefits" placeholder="$1,000,000 + a helicopter" value="' + dataPassedIn.salaryBenefits + '">');
    $('#js-job-description').html('<input type="textarea" name="job-description" placeholder="What are the duties and requirements?" value="' + dataPassedIn.jobDescription + '">');
    if (dataPassedIn.applicationDate != null) {
        var dateForEditScreen = ((dataPassedIn.applicationDate).split('T'))[0];
        $('#js-application-date').html('<input type="date" name="application-date" value="' + dateForEditScreen + '">');
    } else {
        $('#js-application-date').html('<input type="date" name="application-date" value="" placeholder="2017-09-15">');
    };
    $('#js-contact-name').html('<input type="text" name="contact-name" placeholder="James Bond" value="' + dataPassedIn.contactName + '">');
    $('#js-contact-email').html('<input type="email" name="contact-email" placeholder="example@example.com" value="' + dataPassedIn.contactEmail + '">');
    $('#js-application-materials').html('<input type="text" name="application-materials" placeholder="CV, resume, cover letter..." value="' + dataPassedIn.applicationMaterials + '">');
    if (dataPassedIn.interviewDate != null) {
            var dateForEditScreen = ((dataPassedIn.interviewDate).split('T'))[0];
            $('#js-interview-date').html('<input type="date" name="interview-date" value="' + dateForEditScreen + '">');
        } else {
            $('#js-interview-date').html('<input type="date" name="interview-date" value="" placeholder="2017-09-15">');
        };
    $('#js-interview-follow-up').html('<input type="text" name="interview-follow-up" placeholder="Did you send a thank-you note?" value="' + dataPassedIn.interviewFollowUp + '">');
    $('#js-lead-source').html('<input type="text" name="lead-source" placeholder="Friend? Google?" value="' + dataPassedIn.leadSource + '">');
    $('#js-notes').html('<input type="textarea" name="notes" placeholder="Note to self!" value="' + dataPassedIn.notes + '">');
    for (var i = 1; i <= 4; i++) {
        if (dataPassedIn.rating == i) {
            // first search for the index where i occurs
            var indx = ratingHtmlOutput.search(i);
            // then pass that index (+2 to account for closing double quotes and a space following)
            ratingHtmlOutput = ratingHtmlOutput.slice(0, indx + 2) + ' selected="selected"' + ratingHtmlOutput.slice(indx + 2);
        }
    };
    $('#js-rating').html(ratingHtmlOutput);
}

// populating the edit screen with empty data
// variables here first
var emptyData = {
    position: '',
    company: '',
    funnelStage: '',
    companyOverview: '',
    companySize: '',
    positionLocation: '',
    salaryBenefits: '',
    jobDescription: '',
    applicationDate: '',
    contactName: '',
    contactEmail: '',
    applicationMaterials: '',
    interviewDate: '',
    interviewFollowUp: '',
    leadSource: '',
    notes: '',
    rating: '',
    username: ''
};

function formatDate(str) {
    if (str != null && str != undefined) {
        var parts = ((str).split('T'))[0].split('-');
        var month = '';
        if (parts[1] == '01') {
            month = "January";
        } else if (parts[1] == '02') {
            month = "February";
        } else if (parts[1] == '03') {
            month = "March";
        } else if (parts[1] == '04') {
            month = "April";
        } else if (parts[1] == '05') {
            month = "May";
        } else if (parts[1] == '06') {
            month = "June";
        } else if (parts[1] == '07') {
            month = "July";
        } else if (parts[1] == '08') {
            month = "August";
        } else if (parts[1] == '09') {
            month = "September";
        } else if (parts[1] == '10') {
            month = "October";
        } else if (parts[1] == '11') {
            month = "November";
        } else if (parts[1] == '12') {
            month = "December";
        } else {
            month = '';
        };
        var day = '';
        if ((parts[2])[0] == 0) {
            day = (parts[2])[1];
        } else {
            day = parts[2];
        }
        var textDate = month + ' ' + day + ', ' + parts[0];
        return textDate;
    };
}

function populateViewScreen(data) {

    // now replace the previous html added to the DOM with text
    // how to deal with empty variables? currently these still display the fillable fields (html)
    $('#js-position-header').text(data.position);
    $('#js-company-header').text(data.company);
    var funnelStageText = '';
    if (data.funnelStage == 1) {
        funnelStageText = 'New Leads';
    } else if (data.funnelStage == 2) {
        funnelStageText = 'Qualified Leads';
    } else if (data.funnelStage == 3) {
        funnelStageText = 'Contact/Apply';
    } else if (data.funnelStage == 4) {
        funnelStageText = 'Interview';
    } else if (data.funnelStage == 5) {
        funnelStageText = 'Offer';
    } else if (data.funnelStage == 6) {
        funnelStageText = 'Negotiate';
    } else {
        funnelStageText = '';
    }
    $('#js-funnel-stage').text(funnelStageText);
    $('#js-company-overview').text(data.companyOverview);
    if (data.companySize != '') {
        $('#js-company-size').text(data.companySize + ' employees');
    } else {
        $('#js-company-size').text(data.companySize);
    };
    $('#js-position-location').text(data.positionLocation);
    $('#js-salary-benefits').text(data.salaryBenefits);
    $('#js-job-description').text(data.jobDescription);
    if (data.applicationDate != undefined && data.applicationDate != null) {
        var textAppDate = formatDate(data.applicationDate);
        $('#js-application-date').text(textAppDate);
    } else {
        $('#js-application-date').text('');
    };
    $('#js-contact-name').text(data.contactName);
    $('#js-contact-email').text(data.contactEmail);
    $('#js-application-materials').text(data.applicationMaterials);
    if (data.interviewDate != undefined && data.interviewDate != null) {
            var textIntDate = formatDate(data.interviewDate);
            $('#js-interview-date').text(textIntDate);
    } else {
        $('#js-interview-date').text('');
    };
    $('#js-interview-follow-up').text(data.interviewFollowUp);
    $('#js-lead-source').text(data.leadSource);
    $('#js-notes').text(data.notes);
    var ratingText = '';
    if (data.rating == 1) {
        ratingText = 'Dream job!';
    } else if (data.rating == 2) {
        ratingText = 'Good fit';
    } else if (data.rating == 3) {
        ratingText = 'Take it or leave it';
    } else if (data.rating == 4) {
        ratingText = 'Only if I\'m desperate';
    } else {
        funnelStageText = '';
    }
    $('#js-rating').text(ratingText);

    // add the id to the edit, save, delete buttons for targeting
    $('.js-edit-button').attr('id', data._id);
    $('.js-save-button').attr('id', data._id);
    $('.js-delete-button').attr('id', data._id);
}

// populate the dashboard with contents of the user's database
function getAndDisplayLeads() {
    $.getJSON("/leads", function (res) {
        var htmlOutput = '';
        // what I need to do to clear this out is to .html a blank htmlOutput for each section first
        $('#new-leads').html('<p class="category">New Leads</p>');
        $('#qualified-leads').html('<p class="category">Qualified Leads</p>');
        $('#contact-apply').html('<p class="category">Contact/Apply</p>');
        $('#interview').html('<p class="category">Interview</p>');
        $('#offer').html('<p class="category">Offer</p>');
        $('#negotiate').html('<p class="category">Negotiate</p>');
            for (var i = 0; i < res.leads.length; i++) {
                if (res.leads[i].username == username) {
                    if (res.leads[i].funnelStage == 1) {
                        htmlOutput = '<p class="job-lead" id="' + res.leads[i]._id + '"><a href="#"><span>' + res.leads[i].company + '</span></a></p>';
                        $('#new-leads').append(htmlOutput);
                        // stage 2: qualified leads
                    } else if (res.leads[i].funnelStage == 2) {
                        htmlOutput = '<p class="job-lead" id="' + res.leads[i]._id + '"><a href="#"><span>' + res.leads[i].company + '</span></a></p>';
                        $('#qualified-leads').append(htmlOutput);
                        // stage 3: contact/apply
                    } else if (res.leads[i].funnelStage == 3) {
                        htmlOutput = '<p class="job-lead" id="' + res.leads[i]._id + '"><a href="#"><span>' + res.leads[i].company + '</span></a></p>';
                        $('#contact-apply').append(htmlOutput);
                        // stage 4: interview
                    } else if (res.leads[i].funnelStage == 4) {
                        htmlOutput = '<p class="job-lead" id="' + res.leads[i]._id + '"><a href="#"><span>' + res.leads[i].company + '</span></a></p>';
                        $('#interview').append(htmlOutput);
                        // stage 5: offer
                    } else if (res.leads[i].funnelStage == 5) {
                        htmlOutput = '<p class="job-lead" id="' + res.leads[i]._id + '"><a href="#"><span>' + res.leads[i].company + '</span></a></p>';
                        $('#offer').append(htmlOutput);
                        // stage 6: negotiate
                    } else if (res.leads[i].funnelStage == 6) {
                        htmlOutput = '<p class="job-lead" id="' + res.leads[i]._id + '"><a href="#"><span>' + res.leads[i].company + '</span></a></p>';
                        $('#negotiate').append(htmlOutput);
                        // anything other than 1-6 should throw an error
                    } else {
                        console.warn('error in funnel stages for API data!');
                    };     
            };
        };
    });
}

function getJobLeadForViewScreen(searchId) {
    var result;
    $.getJSON("/leads/" + searchId, function (res) {
        populateViewScreen(res);
    });
}

function getJobLeadForEditScreen(searchId) {
    var result;
    $.getJSON("/leads/" + searchId, function (res) {
        populateEditScreen(res);
    });
}

// the below variable is used to flag whether or not the edit button has been clicked;
// if it has, clicking save makes a PUT request;
// if it has not, clicking save makes a POST request for a new lead
var editToggle = false;
console.log(editToggle);
// ----------------------------------------------------------------
// END FUNCTION AND VARIABLE DEFINITIONS

    // when page loads
    // show and hide sections as needed
    $('#dashboard').hide();
    $('#edit-screen').hide();
    $('#nav').hide();
    $('#thanks').hide();
    $('#guidance').hide();
    $('#login-screen').show();
    var username = $('input[name="email"]').val();
    if (username != '') {
        $('#welcome').html('<p>Welcome, ' + username + '!</p>');
        $('#welcome').show();
    };

    // CREATING A NEW USER
    // step 1: login trigger
    document.getElementById('js-signup-button').addEventListener('click', function (event) {
        event.preventDefault();
        // step 2: taking input from the user
        var inputEmail = $('input[name="email"]').val();
        var inputPassword = $('input[name="password"]').val();
        if ((!inputEmail) || (inputEmail.length < 1) || (inputEmail.indexOf(' ') > 0)) {
            alert('Invalid email');
        }
        else if ((!inputPassword) || (inputPassword.length < 1) || (inputPassword.indexOf(' ') > 0)) {
            alert('Invalid password');
        } else {
            var usernamePwObject = {
                username: inputEmail,
                password: inputPassword
            };
            // step 3: using user input, make the local login API call
            $.ajax({
                    type: "POST",
                    url: "/users/create",
                    dataType: 'json',
                    data: JSON.stringify(usernamePwObject),
                    contentType: 'application/json'
                })
                // step 8 (continuing from server.js): display results
                .done(function (result) {
                    $('#login-screen').hide();
                    $('#thanks').show();
                })
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
            };
    });

    document.getElementById('js-redirect').addEventListener('click', function(event) {
        event.preventDefault();
        $('#thanks').hide();
        $('#login-screen').show();
    });

    document.getElementById('js-signin-button').addEventListener('click', function(event) {
        event.preventDefault();
        // step 2: taking input from the user
        var inputEmail = $('input[name="email"]').val();
        var inputPassword = $('input[name="password"]').val();
        // check for spaces, empty, undefined
        if ((!inputEmail) || (inputEmail.length < 1) || (inputEmail.indexOf(' ') > 0)) {
            alert('Invalid email');
        }
        else if ((!inputPassword) || (inputPassword.length < 1) || (inputPassword.indexOf(' ') > 0)) {
            alert('Invalid password');
        } else {
            var usernamePwObject = {
                username: inputEmail,
                password: inputPassword
            };
            username = inputEmail;
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
                // set global username variable from result object
                username = result.username;
                $('#login-screen').hide();
                $('#guidance').show();
                $('#nav').show();
                $('#dashboard').show();
                if (username != '') {
                    $('#welcome').html('<p>Welcome, ' + username + '!</p>');
                    $('#welcome').show();
                };
                getAndDisplayLeads();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('User does not exist! Please sign up using the sign-up button.');
            });
        };

        // all the other event listeners go inside the sign-in event listener
        // so we can pass the username variable to every function that needs it

        // when user clicks "back" button on view/edit screen
        // returns user to dashboard and resets form
        document.getElementById('got-it').addEventListener('click', function(event) {
            event.preventDefault();
            $('#guidance').hide();
        });

        document.getElementById('js-show-help').addEventListener('click', function(event) {
            event.preventDefault();
            $('#guidance').show();
        });

        document.getElementById('js-back-button').addEventListener('click', function (event) {
            event.preventDefault();
            if (editToggle == true) {
                if (confirm('Are you sure you want to go back? Your changes will not be saved.') == true) 
                {
                    $('#edit-form').trigger('reset');
                    $('#edit-screen').hide();
                    $('#dashboard').show();
                    editToggle = false;
                    console.log(editToggle + ' I was clicked');
                };
            } else {
                $('#edit-form').trigger('reset');
                $('#edit-screen').hide();
                $('#dashboard').show();
            };
        });

        // when user clicks "edit" button, displays prepopulated fillable fields
        $(document).on('click', ".js-edit-button", function (event) {
            event.preventDefault();
            editToggle = true;
            console.log(editToggle);
            var idFromEditButton = $('.js-edit-button').attr('id');
            getJobLeadForEditScreen(idFromEditButton);
            $('.js-edit-button').hide();
            $('.js-save-button').show();
        });

        // when user clicks "delete" button
        // should confirm with user that they want to delete the job lead
        // should send a DELETE request to the database
        // and delete that job lead
        // should then reset the form, hide the edit screen, show the dashboard
        // the DOM should show that the job lead is now gone
        $(document).on('click', ".js-delete-button", function (event) {
            event.preventDefault();
            if (confirm('Are you sure you want to delete this job lead? Deleting is PERMANENT. You will not be able to recover this data.') == true) {
                var idFromDeleteButton = $('.js-delete-button').attr('id');
                // make the AJAX call to delete the lead by id
                $.ajax({
                    method: "DELETE",
                    url: "/leads/" + idFromDeleteButton,
                    success: getAndDisplayLeads
                });
                $('#edit-form').trigger('reset');
                $('#edit-screen').hide();
                $('#dashboard').show();
                editToggle = false;
                console.log(editToggle);
            };
        });

        // when user clicks "create new job lead" in nav
        document.getElementById('js-create-new').addEventListener('click', function (event) {
            event.preventDefault();
            $('#dashboard').hide();
            // hide the edit and delete buttons;
            // these are unnecessary when creating a brand new lead
            $('.js-edit-button').hide();
            $('.js-delete-button').hide();
            $('#edit-screen').show();
            $('.js-save-button').show();
            // calling the function to populate the edit screen with fillable fields
            // passing in testData, which is an object shaped like our schema but each item is empty string
            // should result in all fields empty of value and only having placeholders
            populateEditScreen(emptyData);
        });

        // when user clicks "save changes" in edit screen
        // should also send the data as a POST request on server side
        // step b1: new lead trigger
        $(document).on('click', ".js-save-button", function (event) {
            event.preventDefault();
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
                rating: rating,
                username: username
            };
            // if the bool has been toggled, make a PUT request to the same object by ID
            if (editToggle == true) {
                // get the id for the lead from the save button id
                var idFromSaveButton = $('.js-save-button').attr('id');
                $.ajax({
                    method: "PUT",
                    url: "/leads/" + idFromSaveButton,
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(leadObject),
                    success: function(data) {getAndDisplayLeads}
                })
                .done(function (result) {
                    // need to re-render the dashboard here
                    getAndDisplayLeads();
                    editToggle = false;
                    console.log(editToggle);
                })
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
            } else {
            // if it has NOT been toggled, make a POST request
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
                        console.warn('Error in funnel stages!');
                    }
                    getAndDisplayLeads();
                })
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
                };
            // reset the form so user can input a new lead
            $('#edit-form').trigger('reset');
            $('#edit-screen').hide();
            $('#dashboard').show();
        });
    editToggle = false;
    console.log(editToggle);
    });

    // when user clicks  a .job-lead box
    // should take user to that job lead's view screen
    $(document).on('click', ".job-lead", function (event) {
        if (event.target.nodeName == "SPAN") {
            getJobLeadForViewScreen(event.target.parentNode.parentNode.id);
        } else if (event.target.nodeName == "A") {
            getJobLeadForViewScreen(event.target.parentNode.id);
        } else if (event.target.nodeName == "P") {
            getJobLeadForViewScreen(event.target.id);
        }
        populateViewScreen(getJobLeadForViewScreen);
        $('#dashboard').hide();
        $('.js-save-button').hide();
        $('#edit-screen').show();
        $('.js-edit-button').show();
        $('.js-delete-button').show();
    });

    });

// when user clicks log out
document.getElementById('js-log-out').addEventListener('click', function () {
    location.reload();
});

// Always striving to be better and better.
// If you find a bug or room for improvement in this code,
// ... please let me know.
// GitHub: Marjona6