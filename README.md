**🎓 Student Management System**

A web-based Student Management System that includes separate dashboards for Admins and Students. It handles student and course management with role-based access and advanced functionalities like course filtering, registration handling, session control, and PDF export.

**📁 Folder Structure**

📦 Project Root
├── admin
│   ├── style/        # CSS files for admin dashboard
│   ├── scripts/      # JavaScript for admin functionality
│   └── *.html        # HTML pages for admin dashboard
├── student
│   ├── style/        # CSS files for student dashboard
│   ├── scripts/      # JavaScript for student functionality
│   └── *.html        # HTML pages for student dashboard
├── login/
│   ├── login.html    # Login page
│   ├── login.css     # Login page styling
│   └── login.js      # Login functionality

**🚀 Features**

🔐 Authentication

   Secure login for Admin and Student roles.

   Redirects to respective dashboards after login.

   First-time users are required to register an admin account if none exist.

**🛠️ Admin Dashboard**

**Admin Management:**

  Add new admins.

  Delete or temporarily block other admins (self-deletion not allowed).

**Student Management:**

  Full CRUD operations.

  Filter students by four defined sections.

**Course Management:**

  Full CRUD operations.

  Filter courses by sections.

  Toggle course status (Running / Terminated).

**Profile Management:**

  Admin can update their own profile.

**🎓 Student Dashboard**

**Profile Management:**

  Students can update their own profiles.

**Course Registration:**
 
  Can register for only Running courses that match their section.

  Cannot register for Terminated or mismatched-section courses.

**Automatic Unregistration:**

  If a course is deleted or its status is set to Terminated, students are automatically unregistered.

  If a student is deleted, all their course registrations are removed.

**View & Download Courses:**

  Students can view all their current registered courses.

  Can download a PDF of current course registrations.

**🖥️ Technologies Used**

  HTML, CSS, JavaScript

  No frameworks used (vanilla JS)

  File-based structure (no backend yet)

  Session handling (on localhost)

**📌 Notes**

  The project uses client-side session storage (for development purposes).

  Course filtering and validations are section-based.

  Ensure a valid course status and section match for registration.

**🧪 How to Run**

 Clone the repository:

  git clone https://github.com/Shayan-xD/EduDesk.git
  Navigate to the folder and open login/login.html in your browser to start.

**🧑‍💻 Future Improvements**

  Backend integration with a database (Node.js, Flask, or PHP).

  Role-based authentication with JWT or sessions.

  Responsive design for mobile and tablet.

  Admin activity logging and reporting.

**📄 License**

  This project is licensed under the MIT License. Feel free to use and modify it.
