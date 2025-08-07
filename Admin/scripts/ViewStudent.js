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

let studentList = [];

let storedList = JSON.parse(localStorage.getItem('studentList3'));

if(storedList){
  studentList = storedList;
  console.log(studentList);
}

DisplayStudent();

function DisplayStudent(){
  let std = document.querySelector('.student-body');
  std.innerHTML = '';
  for(let i = 0 ; i < studentList.length; i++){
    
    let { value,status } = checkStatus(i);
    std.innerHTML += `
    <tr>
      <td>${studentList[i].rollNumber}</td>
      <td>${studentList[i].name}</td>
      <td>${studentList[i].section}</td>
      <td><img src="${studentList[i].image}" height="20px" width="20px"></td>
      <td><button class="${status}" onclick="Block(${i});">${value.toUpperCase()}</td>
      <td><button class="delete-btn" onclick="Delete('${''}',${i});">DELETE</td>
    </tr>`;
  }
}

function Block(index){

  if(studentList[index].status.toLowerCase() === 'block'){
    studentList[index].status = 'unblock';
  }else{
    studentList[index].status = 'block';
  }
  localStorage.setItem('studentList3', JSON.stringify(studentList));
  DisplayStudent();
};

function DisplaySecA(){
  /* Removing CSS */
  secB.classList.remove('bg-black');
  secC.classList.remove('bg-black');
  secD.classList.remove('bg-black');
  secA.classList.add('bg-black');

  /*  */
  let std = document.querySelector('.student-body');
  std.innerHTML = '';
  for(let i = 0 ; i < studentList.length; i++){

    if(studentList[i].section==='Section A'){
      let { value,status } = checkStatus(i);
      std.innerHTML += `
      <tr>
        <td>${studentList[i].rollNumber}</td>
        <td>${studentList[i].name}</td>
        <td>${studentList[i].section}</td>
        <td><img src="${studentList[i].image}" height="20px" width="20px"></td>
        <td><button class="${status}" onclick="secA_Block(${i});">${value.toUpperCase()}</td>
        <td><button class="delete-btn" onclick="Delete('${'A'}',${i});">DELETE</td>
      </tr>`;
    }
  }
};

function sectionA(){

  if(issectionA){
    DisplayStudent();
    secA.classList.remove('bg-black');
  }else{
    DisplaySecA();
  }

  issectionA = !issectionA;
  issectionB = false;
  issectionC = false;
  issectionD = false;
  
}
function secA_Block(index){

  if(studentList[index].status.toLowerCase() === 'block'){
    studentList[index].status = 'unblock';
  }else{
    studentList[index].status = 'block';
  }
  localStorage.setItem('studentList3', JSON.stringify(studentList));
  DisplaySecA();
};

function DisplaySecB(){
  /* Removing CSS */
  secA.classList.remove('bg-black');
  secC.classList.remove('bg-black');
  secD.classList.remove('bg-black');
  secB.classList.add('bg-black');

  let std = document.querySelector('.student-body');
  std.innerHTML = '';
  for(let i = 0 ; i < studentList.length; i++){

    if(studentList[i].section==='Section B'){
      let { value,status } = checkStatus(i);
      std.innerHTML += `
      <tr>
        <td>${studentList[i].rollNumber}</td>
        <td>${studentList[i].name}</td>
        <td>${studentList[i].section}</td>
        <td><img src="${studentList[i].image}" height="20px" width="20px"></td>
        <td><button class="${status}" onclick="secB_Block(${i});">${value.toUpperCase()}</td>
        <td><button class="delete-btn" onclick="Delete('${'B'}',${i});">DELETE</td>
      </tr>`;
    }
  }
};

function sectionB(){

  if(issectionB){
    DisplayStudent();
    secB.classList.remove('bg-black');
  }else{
    DisplaySecB();
  }

  issectionA = false;
  issectionB = !issectionB;
  issectionC = false;
  issectionD = false;
};

function secB_Block(index){

  if(studentList[index].status.toLowerCase() === 'block'){
    studentList[index].status = 'unblock';
  }else{
    studentList[index].status = 'block';
  }
  localStorage.setItem('studentList3', JSON.stringify(studentList));
  DisplaySecB();
};

function DisplaySecC(){
  /* Removing CSS */
  secA.classList.remove('bg-black');
  secB.classList.remove('bg-black');
  secD.classList.remove('bg-black');
  secC.classList.add('bg-black');

  let std = document.querySelector('.student-body');
  std.innerHTML = '';
  for(let i = 0 ; i < studentList.length; i++){

    if(studentList[i].section==='Section C'){
      let { value,status } = checkStatus(i);
      std.innerHTML += `
      <tr>
        <td>${studentList[i].rollNumber}</td>
        <td>${studentList[i].name}</td>
        <td>${studentList[i].section}</td>
        <td><img src="${studentList[i].image}" height="20px" width="20px"></td>
        <td><button class="${status}" onclick="secC_Block(${i});">${value.toUpperCase()}</td>
        <td><button class="delete-btn" onclick="Delete('${'C'}',${i});">DELETE</td>
      </tr>`;
    }
  }
};

function sectionC(){

  if(issectionC){
    DisplayStudent();
    secC.classList.remove('bg-black');
  }else{
    DisplaySecC();
  }
  issectionA = false;
  issectionB = false;
  issectionC = !issectionC;
  issectionD = false; 
}

function secC_Block(index){

  if(studentList[index].status.toLowerCase() === 'block'){
    studentList[index].status = 'unblock';
  }else{
    studentList[index].status = 'block';
  }
  localStorage.setItem('studentList3', JSON.stringify(studentList));
  DisplaySecC();
};

function DisplaySecD(){ 
  /* Removing CSS */
  secA.classList.remove('bg-black');
  secB.classList.remove('bg-black');
  secC.classList.remove('bg-black');
  secD.classList.add('bg-black');

  let std = document.querySelector('.student-body');
  std.innerHTML = '';
  for(let i = 0 ; i < studentList.length; i++){

    if(studentList[i].section==='Section D'){
      let { value,status } = checkStatus(i);
      std.innerHTML += `
      <tr>
        <td>${studentList[i].rollNumber}</td>
        <td>${studentList[i].name}</td>
        <td>${studentList[i].section}</td>
        <td><img src="${studentList[i].image}" height="20px" width="20px"></td>
        <td><button class="${status}" onclick="secD_Block(${i});">${value.toUpperCase()}</td>
        <td><button class="delete-btn" onclick="Delete('${'D'}',${i});">DELETE</td>
      </tr>`;
    }
  }
};

function sectionD(){

  if(issectionD){
    DisplayStudent();
    secD.classList.remove('bg-black');
  }else{
    DisplaySecD();
  }
  issectionA = false;
  issectionB = false;
  issectionC = false;
  issectionD = !issectionD;
}

function sec_Block(index){

  if(studentList[index].status.toLowerCase() === 'block'){
    studentList[index].status = 'unblock';
  }else{
    studentList[index].status = 'block';
  }
  localStorage.setItem('studentList3', JSON.stringify(studentList));
  DisplaySecD();
};

function checkStatus(index){

  let status;
  let value;

  let currentStudent = studentList[index] || '';

  if(currentStudent.status.toLowerCase()==='block'){
      value = 'unblock';
      status = 'status-unblock';
  }else{
      value = 'block';
      status = 'status-block';
  }
  return { value,status };
}


function LOGOUT(){
  localStorage.removeItem('loggedInAdmin');
  window.location.href = '../LOGIN/Login.html';
  return;
}

function Delete(value,index){

  const rollNumber = studentList[index].rollNumber;
  const confirmVal = confirm(`Are you sure you want to delete student : ${rollNumber}?`);
  if(!confirmVal){
    return;
  }

  //Delete all the registeration of the student
  DeleteRegisterations(index);

  studentList.splice(index,1);
  localStorage.setItem('studentList3',JSON.stringify(studentList));
  alert(`Student => ${rollNumber} Has been deleted.`);

  if (value === 'A') return DisplaySecA();
  if (value === 'B') return DisplaySecB();
  if (value === 'C') return DisplaySecC();
  if (value === 'D') return DisplaySecD();

  DisplayStudent();
  return;
  
}

function DeleteRegisterations(index){
  
  if (!studentList[index]) {
    console.error("Invalid student index:", index);
    return;
  }

  let registerCourse = JSON.parse(localStorage.getItem('registerCourse'));
  let rollNumber = studentList[index].rollNumber;
  let section = studentList[index].section;

  for(let i=registerCourse.length-1;i>-1;i++){
    if(registerCourse[i].studentRollNumber === rollNumber && registerCourse[i].section === section){
      registerCourse.splice(i,1);
      localStorage.setItem('registerCourse',JSON.stringify(registerCourse));
    }
  }
  return;
}