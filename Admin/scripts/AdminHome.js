let LoggedUser = JSON.parse(localStorage.getItem('loggedInAdmin'));

if (!LoggedUser) {
  window.location.href = '../LOGIN/Login.html';
}

let adminList = [];

let storedList= JSON.parse(localStorage.getItem('adminList'));

if(storedList){
  adminList = storedList;
}

// Separate visibility flags
let isStudentVisible = false;
let isAdminVisible = false;
let isCourseVisible = false;

function Student(event){
  event.preventDefault();

  const studentMenu = document.querySelector('.std-submenu');
  const adminMenu = document.querySelector('.admin-submenu');
  const courseMenu = document.querySelector('.section-submenu');

  // Close others
  adminMenu.classList.remove('display-flex');
  adminMenu.classList.add('display-none');
  adminMenu.innerHTML = '';
  isAdminVisible = false;

  courseMenu.classList.remove('display-flex');
  courseMenu.classList.add('display-none');
  courseMenu.innerHTML = '';
  isCourseVisible = false;

  // Toggle student
  if(isStudentVisible){
    studentMenu.classList.remove('display-flex');
    studentMenu.innerHTML = '';
    studentMenu.classList.add('display-none');
  }else{
    studentMenu.innerHTML = `
      <button class="submenu-btn" onclick="window.location.href = '../Admin/Admin-AddStudent.html';">Add Student</button> 
      <button class="submenu-btn" onclick="window.location.href = '../Admin/Admin-ViewStudent.html';">View Student</button>`;
    studentMenu.classList.remove('display-none');
    studentMenu.classList.add('display-flex');
  }

  isStudentVisible = !isStudentVisible;
};

function Admin(event){
  event.preventDefault();

  const studentMenu = document.querySelector('.std-submenu');
  const adminMenu = document.querySelector('.admin-submenu');
  const courseMenu = document.querySelector('.section-submenu');

  // Close others
  studentMenu.classList.remove('display-flex');
  studentMenu.classList.add('display-none');
  studentMenu.innerHTML = '';
  isStudentVisible = false;

  courseMenu.classList.remove('display-flex');
  courseMenu.classList.add('display-none');
  courseMenu.innerHTML = '';
  isCourseVisible = false;

  // Toggle admin
  if(isAdminVisible){
    adminMenu.classList.remove('display-flex');
    adminMenu.innerHTML = '';
    adminMenu.classList.add('display-none');
  }else{
    adminMenu.innerHTML = `
      <button class="submenu-btn" onclick="window.location.href = '../Admin/Admin-AddAdmin.html';">Add Admin</button> 
      <button class="submenu-btn" onclick="window.location.href = '../Admin/Admin-ViewAdmin.html';">View Admin</button>`;
    adminMenu.classList.remove('display-none');
    adminMenu.classList.add('display-flex');
  }

  isAdminVisible = !isAdminVisible;
}

function Course(event){
  event.preventDefault();

  const studentMenu = document.querySelector('.std-submenu');
  const adminMenu = document.querySelector('.admin-submenu');
  const courseMenu = document.querySelector('.section-submenu');

  // Close others
  studentMenu.classList.remove('display-flex');
  studentMenu.classList.add('display-none');
  studentMenu.innerHTML = '';
  isStudentVisible = false;

  adminMenu.classList.remove('display-flex');
  adminMenu.classList.add('display-none');
  adminMenu.innerHTML = '';
  isAdminVisible = false;

  // Toggle course
  if(isCourseVisible){
    courseMenu.classList.remove('display-flex');
    courseMenu.innerHTML = '';
    courseMenu.classList.add('display-none');
  }else{
    courseMenu.innerHTML = `
      <button class="submenu-btn" onclick="window.location.href = '../Admin/Admin-AddCourse.html';">Add Course</button>
      <button class="submenu-btn" onclick="window.location.href = '../Admin/Admin-RegisteredCourses.html';">Registered Courses</button>`;
    courseMenu.classList.remove('display-none');
    courseMenu.classList.add('display-flex');
  }

  isCourseVisible = !isCourseVisible;
}


function AdminHome(){
  
  document.querySelector('.admin').innerHTML = `
  <div class="admin-content">
    <div class="dashboard-heading">Welocme To Admin Dashboard: ${getName(LoggedUser)}! </div>
    <div class="dashboard-desc">This dashboard allows administrators to efficiently manage the entire academic system. You can:</div>
    <div>
      <ul class="dashboard-list">
        <li>➤ Add, view, and manage student records</li>
        <li>➤ Add and manage other admin users</li>
        <li>➤ Add and assign courses to different sections</li>
        <li>➤ Edit and update your own profile</li>
      </ul>
    </div>
  </div>`;
}

AdminHome();

function LOGOUT(){
  localStorage.removeItem('loggedInAdmin');
  window.location.href = '../LOGIN/Login.html';
  return;
}

function getName(value){
  for(let i = 0 ; i < adminList.length;i++){
    if(adminList[i].email == value){
      return adminList[i].name;
    }
  }
}