# job-tracker-capstone-app
Interactive full-stack web app to organize your job search. Created as a capstone project for the Thinkful web development course.

For reference: https://timsstrategy.com/how-to-create-a-job-search-funnel/

Epic: Help job seekers organize and track their job leads and applications as they search for their perfect job.

USER POINT OF VIEW
User stories by functionality:
1) As a user, I should be able to register a new username and password with the site/app.
1) As a user, I should be able to log in and log out.
3) As a user, I should be able to reset my password (change it if and when desired or create a new password if I lose or forget mine).
1) As a user, I should be able to create a new job application object to represent one in my real-life search, based on a template provided by the app.
3) As a user, I should be able to customize to some degree the template of my job applications/leads ("jobjects").
1) As a user, I should be able to update, add, or delete information from my "jobjects."
1) As a user, I should be able to reassign a "jobject" from one stage of the funnel to another.
1) As a user, I should be able to delete an entire "jobject."
2) As a user, I should be able to view and read "jobjects" in some organized way--by filtering them, for example.

User stories by priority:
1.6) As a user, I should be able to register a new username and password with the site/app.
1.1) As a user, I should be able to log in and log out.
1.4) As a user, I should be able to create a new job application object to represent one in my real-life search, based on a template provided by the app.
1.3) As a user, I should be able to update, add, or delete information from my "jobjects."
1.2) As a user, I should be able to reassign a "jobject" from one stage of the funnel to another.
1.5) As a user, I should be able to delete an entire "jobject."
2) As a user, I should be able to view and read "jobjects" in some organized way--by filtering them, for example.
3) As a user, I should be able to reset my password (change it if and when desired or create a new password if I lose or forget mine).
3) As a user, I should be able to customize to some degree the template of my job applications/leads ("jobjects").

NEW LEADS
V
QUALIFIED LEADS
V
CONTACT & INTEREST
V
INTERVIEW
V
OFFER
V
NEGOTIATE (SALARY/BENEFITS)



WEBMASTER/BUSINESS POINT OF VIEW

[structure of database below]
Business Objects
*user(s) [SUBJECT]
-->What makes a user a user?
      **name
        **first name
        **last name
      **username
      **password
*job application/lead (the concept of what the user interacts with) [OBJECT]
-->What is a job application?
      **job ID (which user is it associated with?)
      **company
        **company overview
        **technologies used
        **company size
        **company headquarters location
      **position
        **position title
        **position location
        **salary/benefits offered
        **job description
          **duties
          **desired skills
          **desired experience
          **desired education
      **application
        **date of application
        **contact name
        **contact email address
        **application materials required/sent
        **interview 1
          **date
          **follow-up
        **interview 2
          **date
          **follow-up
      **source of lead/posting
      **notes
      **funnel stage/category ID
      **overall rating of how much you want the job
*funnel stages
-->What makes a funnel stage a funnel stage?
      **name
      **ID
      **ordering relative to the other stages
*[VERB?]
