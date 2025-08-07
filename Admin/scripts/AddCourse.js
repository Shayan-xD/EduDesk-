/* Sidebar Functions */
let LoggedUser = JSON.parse(localStorage.getItem('loggedInAdmin'));

if (!LoggedUser) {
  window.location.href = '../LOGIN/Login.html';
}

let isCourse = false;
//For Displaying ceratin section courses;
let issectionA = false;
let issectionB = false;
let issectionC = false;
let issectionD = false;
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
      <button class="submenu-btn" onclick="window.location.href = '../Admin/Admin-RegisteredCourses.html';">Registered Courses</button>
      `;
    courseMenu.classList.remove('display-none');
    courseMenu.classList.add('display-flex');
  }

  isCourseVisible = !isCourseVisible;
}



/* Main Functionalities */

let courseList =[];

let storedList = JSON.parse(localStorage.getItem('courseList1'));
if(storedList){
  courseList = storedList;
  console.log(courseList);
}

let secA = document.querySelector('#secA');
let secB = document.querySelector('#secB');
let secC = document.querySelector('#secC');
let secD = document.querySelector('#secD');

/* Course Addition Button */
document.querySelector('#cr-btn').addEventListener('click',()=>{
  const cr_add = document.querySelector('#cr-add');

  if(isCourse){
    cr_add.classList.remove('add-height');
    cr_add.innerHTML='';
  }else{
    cr_add.classList.add('add-height');
    cr_add.innerHTML = `
          <div class="add-1">
            <input type="text" name="" id="name" placeholder="--Enter Name--">
            <input type="text" name="" id="teacher" placeholder="--Teacher--">
            <input type="text" name="" id="creditHour" placeholder="--Credit Hour--">
            <select name="" id="section">
              <option value="">--Select Section--</option>
              <option value="Section A">Section A</option>
              <option value="Section B">Section B</option>
              <option value="Section C">Section C</option>
              <option value="Section D">Section D</option>
            </select>
            <select name="" id="status">
              <option value="">--Select Status--</option>
              <option value="Running">Running</option>
              <option value="Terminate">Terminate</option>
            </select>
          </div>
          <div class="add-2">
            <button onclick="Save();">Save</button>
          </div>`;
  };
  isCourse = !isCourse;
});

function Save(){
  const name = document.querySelector('#name');
  const teacher = document.querySelector('#teacher');
  const creditHour = Number(document.querySelector('#creditHour').value);
  const section = document.querySelector('#section');
  const status = document.querySelector('#status');

  if(!checkVal(name.value,teacher.value,creditHour,section.value,status.value)){
    alert('Please fill all fields correctly');
    name.value = '';
    teacher.value = '';
    document.querySelector('#creditHour').value ='';
    section.selectedIndex = 0;
    status.selectedIndex = 0;
    return;
  }

  if(checkCourse(name.value,section.value)){
    alert(`${name.value} already exists for ${section.value}.`);
    name.value = '';
    section.value ='';
    return;
  }

  courseList.push({
    name:name.value,
    teacher:teacher.value,
    creditHour: Number(creditHour),
    section:section.value,
    status:status.value
  });

    localStorage.setItem('courseList1',JSON.stringify(courseList));
    name.value = '';
    teacher.value = '';
    creditHour.value = '';
    section.selectedIndex = 0;
    status.selectedIndex = 0;
    alert('Course Added Successfully!');
    DisplayCourse();
    return;
};

function DisplayCourse(){
  const cr = document.querySelector('.course-body');
  cr.innerHTML = '';
  let count = 1;

  for(let i=0; i<courseList.length;i++){
    let { status,value } = checkStatus(i);
    cr.innerHTML +=`
    <tr>
    <td>${count++}</td>
    <td>${courseList[i].name}</td>
    <td>${courseList[i].teacher}</td>
    <td>${courseList[i].creditHour}</td>
    <td>${courseList[i].section}</td>
    <td><button class="${value}" onclick="Terminate(${i})">${status}</button></td>
    <td><button class="delete-btn" onclick="deleteCourse(${i})">Delete</button></td>
    </tr>
    `;
  };
}

DisplayCourse();

function checkVal(name,teacher,creditHour,section,status){
  if (!name || !teacher || !creditHour || !section || !status) {
    return false;
  }

  const regex = /^[A-Za-z\s]+$/;

  if (!regex.test(name)){
    return false;
  }
  
  if (!regex.test(teacher)){
    return false;
  }

  const ch = creditHour;
  if (!Number.isInteger(ch) || ch < 0 || ch > 3){
    return false;
  }

  return true;
}

function checkStatus(index){
  let status,value;
  let currentCourse = courseList[index] || '';
  if(currentCourse.status.toLowerCase()==='running'){
    status = 'Running';
    value = 'running';
  }else{
    status = 'Terminate';
    value = 'terminate';
  }
  return { status,value };
}

function Terminate(index){
  if(courseList[index].status.toLowerCase()==='terminate'){
    courseList[index].status = 'Running';
  }else{
    courseList[index].status = 'Terminate';
  }
  localStorage.setItem('courseList1',JSON.stringify(courseList));
  DisplayCourse();
}

function checkCourse(name,section){
  for(let i=0;i<courseList.length;i++){
    if(courseList[i].name.toLowerCase() === name.toLowerCase() && courseList[i].section.toLowerCase() === section.toLowerCase()){
      return true;
    }
  }
  return false;
}

function sectionA(){

  if(issectionA){
    secA.classList.remove('bg-black');
    DisplayCourse();
  }else{
   DisplaySecA();
  }

  issectionA = !issectionA;
  issectionB = false;
  issectionC = false;
  issectionD = false;
}

function TerminateA(index){

  if(courseList[index].status.toLowerCase()==='terminate'){
    courseList[index].status = 'Running';
  }else{
    courseList[index].status = 'Terminate';
  }
  localStorage.setItem('courseList1',JSON.stringify(courseList));
  DisplaySecA();
};

function DisplaySecA(){
    /* Removing CSS */
  secB.classList.remove('bg-black');
  secC.classList.remove('bg-black');
  secD.classList.remove('bg-black');
  secA.classList.add('bg-black');

  /* Lisiting Courses of Section A */
    let cr = document.querySelector('.course-body');
    cr.innerHTML = '';
    let count = 1;
    for(let i = 0 ; i < courseList.length; i++){

      if(courseList[i].section==='Section A'){
        let { value,status } = checkStatus(i);
        cr.innerHTML += `
        <tr>
          <td>${count++}</td>
          <td>${courseList[i].name}</td>
          <td>${courseList[i].teacher}</td>
          <td>${courseList[i].creditHour}</td>
          <td>${courseList[i].section}</td>
          <td><button class="${value}" onclick="TerminateA(${i})">${status}</button></td>
          <td><button class="delete-btn" onclick="deleteCourseA(${i})">Delete</button></td>
        </tr>
      `;
      }
    }
}

function sectionB(){

  if(issectionB){
    secB.classList.remove('bg-black');
    DisplayCourse();
  }else{
    DisplaySecB();
  }

  issectionA = false;
  issectionB = !issectionB;
  issectionC = false;
  issectionD = false;
}

function TerminateB(index){

  if(courseList[index].status.toLowerCase()==='terminate'){
    courseList[index].status = 'Running';
  }else{
    courseList[index].status = 'Terminate';
  }
  localStorage.setItem('courseList1',JSON.stringify(courseList));
  DisplaySecB();
};

function DisplaySecB(){
  /* Removing CSS */
    secA.classList.remove('bg-black');
    secC.classList.remove('bg-black');
    secD.classList.remove('bg-black');
    secB.classList.add('bg-black');

    /* Lisiting Courses of Section A */
    let cr = document.querySelector('.course-body');
    cr.innerHTML = '';
    let count = 1;
    for(let i = 0 ; i < courseList.length; i++){

      if(courseList[i].section==='Section B'){
        let { value,status } = checkStatus(i);
        cr.innerHTML += `
        <tr>
          <td>${count++}</td>
          <td>${courseList[i].name}</td>
          <td>${courseList[i].teacher}</td>
          <td>${courseList[i].creditHour}</td>
          <td>${courseList[i].section}</td>
          <td><button class="${value}" onclick="TerminateB(${i})">${status}</button></td>
          <td><button class="delete-btn" onclick="deleteCourseB(${i})">Delete</button></td>
        </tr>
      `;
      }
    }
}

function sectionC(){

    if(issectionC){
  secC.classList.remove('bg-black');
  DisplayCourse();
  }else{
    DisplaySecC();
  }

  issectionA = false;
  issectionB = false;
  issectionC = !issectionC;
  issectionD = false;
}

function TerminateC(index){

  if(courseList[index].status.toLowerCase()==='terminate'){
    courseList[index].status = 'Running';
  }else{
    courseList[index].status = 'Terminate';
  }
  localStorage.setItem('courseList1',JSON.stringify(courseList));
  DisplaySecC();
};

function DisplaySecC(){
    /* Removing CSS */
    secB.classList.remove('bg-black');
    secA.classList.remove('bg-black');
    secD.classList.remove('bg-black');
    secC.classList.add('bg-black');

    /* Lisiting Courses of Section A */
    let cr = document.querySelector('.course-body');
    cr.innerHTML = '';
    let count = 1;
    for(let i = 0 ; i < courseList.length; i++){

      if(courseList[i].section==='Section C'){
        let { value,status } = checkStatus(i);
        cr.innerHTML += `
        <tr>
          <td>${count++}</td>
          <td>${courseList[i].name}</td>
          <td>${courseList[i].teacher}</td>
          <td>${courseList[i].creditHour}</td>
          <td>${courseList[i].section}</td>
          <td><button class="${value}" onclick="TerminateC(${i})">${status}</button></td>
          <td><button class="delete-btn" onclick="deleteCourseC(${i})">Delete</button></td>
        </tr>
      `;
      }
    }
}

function sectionD(){

  if(issectionD){
    secD.classList.remove('bg-black');
    DisplayCourse();
  }else{
    DisplaySecD();
  }

  issectionA = false;
  issectionB = false;
  issectionC = false;
  issectionD = !issectionD;
  
}

function TerminateD(index){

  if(courseList[index].status.toLowerCase()==='terminate'){
    courseList[index].status = 'Running';
  }else{
    courseList[index].status = 'Terminate';
  }
  localStorage.setItem('courseList1',JSON.stringify(courseList));
  DisplaySecD();
};

function DisplaySecD(){
  /* Removing CSS */
    secB.classList.remove('bg-black');
    secC.classList.remove('bg-black');
    secA.classList.remove('bg-black');
    secD.classList.add('bg-black');

    /* Lisiting Courses of Section A */
    let cr = document.querySelector('.course-body');
    cr.innerHTML = '';
    let count = 1;
    for(let i = 0 ; i < courseList.length; i++){

      if(courseList[i].section==='Section D'){
        let { value,status } = checkStatus(i);
        cr.innerHTML += `
        <tr>
          <td>${count++}</td>
          <td>${courseList[i].name}</td>
          <td>${courseList[i].teacher}</td>
          <td>${courseList[i].creditHour}</td>
          <td>${courseList[i].section}</td>
          <td><button class="${value}" onclick="TerminateD(${i})">${status}</button></td>
          <td><button class="delete-btn" onclick="deleteCourseD(${i})">Delete</button></td>
        </tr>
      `;
      }
    }
}

function deleteCourse(index){

  courseList.splice(index,1);
  localStorage.setItem('courseList1',JSON.stringify(courseList));
  DisplayCourse();
}

function deleteCourseA(index){

  courseList.splice(index,1);
  localStorage.setItem('courseList1',JSON.stringify(courseList));
  DisplaySecA();
}

function deleteCourseB(index){

  courseList.splice(index,1);
  localStorage.setItem('courseList1',JSON.stringify(courseList));
  DisplaySecB();
}

function deleteCourseC(index){

  courseList.splice(index,1);
  localStorage.setItem('courseList1',JSON.stringify(courseList));
  DisplaySecC();
}

function deleteCourseD(index){

  courseList.splice(index,1);
  localStorage.setItem('courseList1',JSON.stringify(courseList));
  DisplaySecD();
}

function Logout(){
  localStorage.removeItem('loggedInAdmin');
  window.location.href = '../LOGIN/Login.html';
  return;
}