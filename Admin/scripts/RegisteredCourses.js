let LoggedUser = JSON.parse(localStorage.getItem('loggedInAdmin'));

if (!LoggedUser) {
  window.location.href = '../LOGIN/Login.html';
}
/* Sidebar Functions */
// Separate visibility flags
let isStudentVisible = false;
let isAdminVisible = false;
let isCourseVisible = false;
//For Displaying ceratin section courses;
let issectionA = false;
let issectionB = false;
let issectionC = false;
let issectionD = false;

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
      <button class="submenu-btn" onclick="window.location.href = '../Admin/Admin-RegisteredCourses.html';">Registered Courses</button>
      `;
    courseMenu.classList.remove('display-none');
    courseMenu.classList.add('display-flex');
  }

  isCourseVisible = !isCourseVisible;
}


/* Main Content Functions */

let secA = document.querySelector('#secA');
let secB = document.querySelector('#secB');
let secC = document.querySelector('#secC');
let secD = document.querySelector('#secD');

let registeredCourseList = [];
let studentList = [];
let courseList = [];

let storedList = JSON.parse(localStorage.getItem('registerCourse'));
let storedList2 = JSON.parse(localStorage.getItem('studentList3'));
let storedList3 = JSON.parse(localStorage.getItem('courseList1'));

if(storedList){
  registeredCourseList = storedList;
  console.log('Registerations : '+registeredCourseList);
}

if(storedList2){
  studentList = storedList2;
  console.log('Student : '+studentList);
}

if(storedList3){
  courseList = storedList3;
  console.log('Courses : '+courseList);
}

let count = 0;

DisplayRegisteredCourse();

function DisplayRegisteredCourse(){
  let std = document.querySelector('.student-body');
  std.innerHTML = '';
  for(let i = 0 ; i < registeredCourseList.length; i++){
    
    let courseTeacher = getTeacher(registeredCourseList[i].courseName,registeredCourseList[i].section);
    let studentName = getName(registeredCourseList[i].studentRollNumber);

    std.innerHTML += `
    <tr>
      <td>${i+1}.</td>
      <td>${registeredCourseList[i].courseName}</td>
      <td>${courseTeacher}</td>
      <td>${registeredCourseList[i].studentRollNumber}</td>
      <td>${studentName}</td>
      <td>${registeredCourseList[i].section}</td>
    </tr>`;
  }
}


function DisplaySecA(){
  /* Removing CSS */
  secB.classList.remove('bg-black');
  secC.classList.remove('bg-black');
  secD.classList.remove('bg-black');
  secA.classList.add('bg-black');

  /*  */
  let std = document.querySelector('.student-body');
  std.innerHTML = '';
  for(let i = 0 ; i < registeredCourseList.length; i++){

    if(registeredCourseList[i].section==='Section A'){

      let courseTeacher = getTeacher(registeredCourseList[i].courseName,'Section A');
      let studentName = getName(registeredCourseList[i].studentRollNumber);

      std.innerHTML += `
      <tr>
        <td>${++count}.</td>
        <td>${registeredCourseList[i].courseName}</td>
        <td>${courseTeacher}</td>
        <td>${registeredCourseList[i].studentRollNumber}</td>
        <td>${studentName}</td>
        <td>${registeredCourseList[i].section}</td>
      </tr>`;
    }
  }
};

function sectionA(){

  if(issectionA){
    DisplayRegisteredCourse();
    secA.classList.remove('bg-black');
  }else{
    DisplaySecA();
  }

  issectionA = !issectionA;
  issectionB = false;
  issectionC = false;
  issectionD = false;
  
}

function DisplaySecB(){
  /* Removing CSS */
  secA.classList.remove('bg-black');
  secC.classList.remove('bg-black');
  secD.classList.remove('bg-black');
  secB.classList.add('bg-black');

  /*  */
  let std = document.querySelector('.student-body');
  std.innerHTML = '';
  for(let i = 0 ; i < registeredCourseList.length; i++){

    if(registeredCourseList[i].section==='Section B'){

      let courseTeacher = getTeacher(registeredCourseList[i].courseName,'Section B');
      let studentName = getName(registeredCourseList[i].studentRollNumber);

      std.innerHTML += `
      <tr>
        <td>${++count}.</td>
        <td>${registeredCourseList[i].courseName}</td>
        <td>${courseTeacher}</td>
        <td>${registeredCourseList[i].studentRollNumber}</td>
        <td>${studentName}</td>
        <td>${registeredCourseList[i].section}</td>
      </tr>`;
    }
  }
};

function sectionB(){

  if(issectionB){
    DisplayRegisteredCourse();
    secB.classList.remove('bg-black');
  }else{
    DisplaySecB();
  }

  issectionA = false;
  issectionB = !issectionB;
  issectionC = false;
  issectionD = false;
};

function DisplaySecC(){
  /* Removing CSS */
  secA.classList.remove('bg-black');
  secB.classList.remove('bg-black');
  secD.classList.remove('bg-black');
  secC.classList.add('bg-black');

  /*  */
  let std = document.querySelector('.student-body');
  std.innerHTML = '';
  for(let i = 0 ; i < registeredCourseList.length; i++){

    if(registeredCourseList[i].section==='Section C'){

      let courseTeacher = getTeacher(registeredCourseList[i].courseName,'Section C');
      let studentName = getName(registeredCourseList[i].studentRollNumber);

      std.innerHTML += `
      <tr>
        <td>${++count}.</td>
        <td>${registeredCourseList[i].courseName}</td>
        <td>${courseTeacher}</td>
        <td>${registeredCourseList[i].studentRollNumber}</td>
        <td>${studentName}</td>
        <td>${registeredCourseList[i].section}</td>
      </tr>`;
    }
  }
};

function sectionC(){

  if(issectionC){
    DisplayRegisteredCourse();
    secC.classList.remove('bg-black');
  }else{
    DisplaySecC();
  }
  issectionA = false;
  issectionB = false;
  issectionC = !issectionC;
  issectionD = false; 
}

function DisplaySecD(){ 
  /* Removing CSS */
  secA.classList.remove('bg-black');
  secB.classList.remove('bg-black');
  secC.classList.remove('bg-black');
  secD.classList.add('bg-black');

  /*  */
  let std = document.querySelector('.student-body');
  std.innerHTML = '';
  for(let i = 0 ; i < registeredCourseList.length; i++){

    if(registeredCourseList[i].section==='Section D'){

      let courseTeacher = getTeacher(registeredCourseList[i].courseName,'Section D');
      let studentName = getName(registeredCourseList[i].studentRollNumber);

      std.innerHTML += `
      <tr>
        <td>${++count}.</td>
        <td>${registeredCourseList[i].courseName}</td>
        <td>${courseTeacher}</td>
        <td>${registeredCourseList[i].studentRollNumber}</td>
        <td>${studentName}</td>
        <td>${registeredCourseList[i].section}</td>
      </tr>`;
    }
  }
};

function sectionD(){

  if(issectionD){
    DisplayRegisteredCourse();
    secD.classList.remove('bg-black');
  }else{
    DisplaySecD();
  }
  issectionA = false;
  issectionB = false;
  issectionC = false;
  issectionD = !issectionD;
}



function LOGOUT(){
  localStorage.removeItem('loggedInAdmin');
  window.location.href = '../LOGIN/Login.html';
  return;
}

function getName(rollNumber){
  let student = studentList.find((student) => student.rollNumber === rollNumber);
  return student.name;
}

function getTeacher(courseName,section){
  let course = courseList.find((course) => course.name === courseName && course.section === section);
  console.log(course)
  return course.teacher;
}