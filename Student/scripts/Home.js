let LoggedUser = JSON.parse(localStorage.getItem('loggedInStudent'));

if(!LoggedUser){
  window.location.href = "../LOGIN/Login.html";
}

let studentList = [];

let storedList= JSON.parse(localStorage.getItem('studentList3'));

if(storedList){
  studentList = storedList;
  console.log(studentList);
}

// Separate visibility flags
let isCourseVisible = false;

function Course(event){
  event.preventDefault();

  const courseMenu = document.querySelector('.section-submenu');
  // Toggle course
  if(isCourseVisible){
    courseMenu.classList.remove('display-flex');
    courseMenu.innerHTML = '';
    courseMenu.classList.add('display-none');
  }else{
    courseMenu.innerHTML = `
      <button class="submenu-btn" onclick="window.location.href = '../Student/ViewCourses.html';">View Courses</button>
      <button class="submenu-btn" onclick="window.location.href = '../Student/RegisterCourse.html';">Register Courses</button>`;
    courseMenu.classList.remove('display-none');
    courseMenu.classList.add('display-flex');
  }

  isCourseVisible = !isCourseVisible;
}


function StudentHome(){
  
  document.querySelector('.student').innerHTML = `
  <div class="student-content">
    <div class="dashboard-heading">Welcome to Student Dashboard: ${getName(LoggedUser)}!</div>
    <div class="dashboard-desc">This dashboard allows students to access and manage their academic information. You can:</div>
    <div>
      <ul class="dashboard-list">
        <li>➤ View your registered courses</li>
        <li>➤ Register for new courses</li>
        <li>➤ Edit and update your profile</li>
      </ul>
    </div>
  </div>`;
}

StudentHome();

function LOGOUT(){
  localStorage.removeItem('loggedInStudent');
  window.location.href = '../LOGIN/Login.html';
  return;
}

function getName(value){
  for(let i = 0 ; i < studentList.length;i++){
    if(studentList[i].rollNumber == value){
      return studentList[i].name;
    }
  }
}