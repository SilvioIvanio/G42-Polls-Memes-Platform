# Campus Pulse: Polls & Memes Platform

**Module:** WAD621S – Web Application Development

**Group:** 42

| **Student Names** | **Student Names** | **Email** |
| --- | --- | --- |
| Silvio Ivanio | 224046179 | [silvioivanio29@gmail.com](mailto:silvioivanio29@gmail.com) |
| Andris Kaishungu | 223043710 | [kashtheguide@gmail.com](mailto:kashtheguide@gmail.com) |
| Hernane Prata | 224027751 | [hernaneprata05@gmail.com](mailto:hernaneprata05@gmail.com) |

**Lecturer’s Name:**  Josephina Muntuumo

**Date of Submission:** 12 September 2025

# Introduction & Background

We live in an age where the internet has changed the world to what we now know it as. A fraction of those changes brought to the people was the ability to connect to people all over the world. We narrow it down to the youth, specifically university students who maximise its use through high levels of online activity. In current times, university is not just centred around academics alone as it incorporates students who love to engage online through social interactions and sharing good laughs. All these interactions improve connections within the university community by encouraging people to engage and and have fun social exchanges that reflect student culture and what’s trending. 

Most platforms such as Facebook or Instagram provide such engagement, however they are more broad and less catered towards students on campus or the “student life”. Therefore, there aren’t any known campus-specific platforms that create such an ecosystem.

With that in mind, we are proposing the development of a Campus Polls & Memes Platform (centralized, campus-specific platform), a web application that allows students to share or upload memes and participate in polls related to campus and its numerous students.

# Problem Statement / Objectives

**Problem to be solved:** University students lack a dedicated online platform for community interaction where they can share polls and memes while building connections.

**General Objective:** Develop a web-based platform to enhance student interaction and community spirit.
**Specific Objectives:**

- Create a user-friendly interface for generating and engaging with polls and memes
- Ensure full responsiveness across desktop and mobile devices
- Implement secure storage for memes and poll data
- Develop an effective algorithm for content ranking
- Deploy the platform for public access
- Implement a simple administration panel for filtering inappropriate content.
- Implement a simple login/registration system so users can create accounts and access polls/memes securely.

# Proposed Solution

Campus Pulse will be a web application where students can create polls and update memes. The home page features a feed with the latest and most popular content.

It will consist of two main modules:

### Polls Module:

- Users can create their own polls.
- Users can vote in polls and view instant results.
- Poll results to be stored in a MySQL database via PHP.
- Users can delete the polls they’ve created.

### Memes Module:

- Users can upload memes (captioned images).
- Uploaded content to be stored on the server and displayed in the meme feed.
- Users can delete the memes they’ve uploaded.

### Authentication Module:

- Allow students to login/Register and create an account.
- Handle user authentication with PHP and MySQL (password hashing, session management).
- Only registered users can create polls or upload memes. Visitors may have read-only access.
- Implement authentication PHP sessions and password hashing. Possibly extend to third-party authentication services such as Clerk

### Technologies to be used:

- Frontend: HTML, CSS, JavaScript
- Backend: PHP, MySQL
- Database: MySQL
- Authentication: PHP password hashing & session management, Clerk API for scalability (optional)
- Version Control: Git & GitHub
- Design: Figma
- Developer Tools: VS Code, IntelliJ, Trello/Jira
- Hosting: Vercel, Local Server (Preferred)

# Scope & Limitations

In Scope:

- Meme uploads with captions.
- Poll creation, voting, and result display.
- Responsive design for mobile and desktop.
- Basic moderation by admin.
- Basic user login/registration with authentication and secure access.

Out of Scope:

- Advanced social media features (comments, liking system, messaging).
- Large-Scale cloud development.
- Advanced account management (e.g. 2FA, email verification)

Limitations:

- Moderation and authentication tools may be basic in the initial version.
- Limited team size and technical resources.
- Limited development time (semester-based deadline).
- Limited hosting resources.

# System Design (Initial Concept)

### **Site map**

- Login – Login/Registration
- Home – Main feed (view polls and memes)
- Create – Page to create polls and upload memes
- Profile (optional, if time permits) – View user’s own posts
- Admin Panel - for user control privileges

### **Wireframes/mock-ups**

![WhatsApp Image 2025-09-11 at 15.07.18_e387c057.jpg](attachment:e38086b0-3c08-4e8d-84b3-d85f63d132f6:WhatsApp_Image_2025-09-11_at_15.07.18_e387c057.jpg)

![WhatsApp Image 2025-09-11 at 15.07.11_883a0d35.jpg](attachment:831e2642-dc3e-4eda-9505-a0f9a40d3206:WhatsApp_Image_2025-09-11_at_15.07.11_883a0d35.jpg)

![WhatsApp Image 2025-09-11 at 15.07.31_b8c31942.jpg](attachment:02f0a560-bf3e-4e39-83ba-c8c5f16a0089:WhatsApp_Image_2025-09-11_at_15.07.31_b8c31942.jpg)

![WhatsApp Image 2025-09-11 at 15.07.14_94302066.jpg](attachment:74eaf117-3a60-4d0c-a4ab-68a3a28df8c4:WhatsApp_Image_2025-09-11_at_15.07.14_94302066.jpg)

![WhatsApp Image 2025-09-11 at 15.07.09_58d01a46.jpg](attachment:1bda4d39-b93a-4d81-9514-2f5a48258b38:WhatsApp_Image_2025-09-11_at_15.07.09_58d01a46.jpg)

![WhatsApp Image 2025-09-11 at 15.07.25_af0d6fcc.jpg](attachment:a75a9d78-af15-4b51-9a8c-a9a07e072790:WhatsApp_Image_2025-09-11_at_15.07.25_af0d6fcc.jpg)

![WhatsApp Image 2025-09-11 at 15.07.22_d877932c.jpg](attachment:8720f7db-d8a0-4304-8934-c9d8d737c5de:WhatsApp_Image_2025-09-11_at_15.07.22_d877932c.jpg)

### **Navigation flow**

Description:

If a user is not logged in, they are taken to the login/registration page. After logging in or registering, or if already logged in, they are directed to the home page to view platform content. A create button is available for poll creation or meme uploads. Admins log in the same way and are directed to an Admin Panel for moderation tasks. User logs out to end the session and redirect them back to the login page.

Flow:

1. User not logged in → Redirect to Login/Registration page
2. User registers or logs in → Validate account credentials → Start session.
3. User is logged in → Taken to home page.
    
    3.1  From home page:
    
    - → View polls → vote and see results instantly.
    - → View memes → browse uploaded memes.
    - → Use Create button:
        - → Create new poll, OR
        - → Upload new meme.
4. Admin:
    - → Logs in via same login page.
    - → Redirect to Admin Panel for moderation tasks.
5. Logout:
    - → Ends session.
    - → Redirect user back to login page.

# Target Audience / Users

- NUST Students and Staff.

Benefits:

- Encourages engagement.
- Fun digital space for students.
- Increased participation in the student ecosystem.
- Digital community relevant to campus.
- Quick feedback via polls on campus-related topics.

# Methodology / Development Plan

We will build the application through an interactive, collaborative process.

**Tools:**

- **Version Control:** Git & GitHub
- **IDE:** VS Code, IntelliJ
- **Project Management:** Trello to track progress (to-do, in progress, done)

**Collaboration:** We’ll use a shared GitHub repository and check in daily to keep our progress in sync.

# Timeline

| **Phase** | **Weeks** | **Deadlines** |
| --- | --- | --- |
| **Proposal & Planning** | Week 6 | Proposal Submission |
| **Design & Prototyping** | Week 7-8 | Wireframes/HTML Skeleton (**Checkpoint 1**) |
| **Frontend Development** | Week 9-11 | Static Prototype, JS Interactivity (**Checkpoint 2**) |
| **Backend Development** | Week 12-13 | PHP/DB Integration (**Checkpoint 3**) |
| **Testing & Refinement** | Week 14-15 | Debugging, UI Polish |
| **Finalization** | Week 16 | Documentation, Deployment |
| **Presentation** | Week 16-17 | Final Project Presentation |

# Expected Outcomes

- A functional and deployed web application
- Potential for the application to be adopted and used in the student community

# References

W3Schools. (2025). *HTML, CSS, JavaScript tutorials*. Retrieved from [https://www.w3schools.com](https://www.w3schools.com/)

Mozilla. (2024). *MDN Curriculum: Frontend tutorials*. Retrieved from https://developer.mozilla.org/en-US/curriculum/

Reddit. (2025). Inspired by r/polls. Retrieved from https://www.reddit.com/r/polls/