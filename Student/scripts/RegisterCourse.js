let LoggedUser = JSON.parse(localStorage.getItem('loggedInStudent'));

if(!LoggedUser){
  window.location.href = "../LOGIN/Login.html";
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

/* Main Functionality */


let studentList = [];

let courseList = [];

let registerCourse = [];

let storedList= JSON.parse(localStorage.getItem('studentList3'));

let storedList2 = JSON.parse(localStorage.getItem('courseList1'));

let storedList3 = JSON.parse(localStorage.getItem('registerCourse'));

if(storedList){
  studentList = storedList;
  console.log(studentList);
}

if(storedList2){
  courseList = storedList2;
  console.log(courseList);
}

if(storedList3){
  registerCourse = storedList3;
  console.log(registerCourse);
}

function CheckTermination(){
  for(let i = registerCourse.length - 1; i >= 0; i--){
    for(let j = 0 ; j < courseList.length ; j++){
      if(registerCourse[i].courseName === courseList[j].name && registerCourse[i].section === courseList[j].section && courseList[j].status.toLowerCase() === 'terminate'){
        registerCourse.splice(i,1);
        break;
      }
    }
  }

  localStorage.setItem('registerCourse',JSON.stringify(registerCourse));
}

function CourseHome(){

  //Checking if the course has been terminated so the registeration should also be deleted.
  CheckTermination();

  const course = document.querySelector('.course-body');
  course.innerHTML = '';
  count=0;
  let section = getSection(LoggedUser);
  console.log(section);

  for(let  i = 0;i<courseList.length;i++){
    if(section===courseList[i].section && courseList[i].status.toLowerCase()==='running'){
      if(!checkRegisteration(LoggedUser,courseList[i].name)){
        count++;
        course.innerHTML +=`
        <tr>
          <td>${count}</td>
          <td>${courseList[i].name}</td>
          <td>${courseList[i].teacher}</td>
          <td><button class="register-btn" onclick="Register('${courseList[i].name}','${section}')">Register</button></td>
        </tr>
        `;
      }else{
        count++;
        course.innerHTML +=`
        <tr>
          <td>${count}</td>
          <td>${courseList[i].name}</td>
          <td>${courseList[i].teacher}</td>
          <td><button class="unregister-btn" onclick="Unregister('${courseList[i].name}','${LoggedUser}')">Unregister</button></td>
        </tr>
        `;
      }
     }
  }
  
}

CourseHome();

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

function getSection(value){
  for(let i = 0 ; i < studentList.length;i++){
    if(studentList[i].rollNumber == value){
      return studentList[i].section;
    }
  }
}

function Register(name,section){

  if(alreadyRegistered(name,LoggedUser)){
    alert('Course Already registered!');
    return;
  }

  registerCourse.push({
    section:section,
    studentRollNumber : LoggedUser,
    courseName:name
  });

  localStorage.setItem('registerCourse',JSON.stringify(registerCourse));
  alert(`Course : ${name} is registered successfully!`);
  CourseHome();
  return;
}

function checkRegisteration(rollNumber,name){
  for(let i=0 ; i<registerCourse.length;i++){
    if(registerCourse[i].studentRollNumber === rollNumber && registerCourse[i].courseName === name){
      return true;
    }
  }
  return false;
}

function Unregister(name,rollNumber){
  let check = confirm('Are you sure you want to unregitser?');
  if(!check){
    return;
  }
  for(let i = 0;i<registerCourse.length;i++){
    if(registerCourse[i].studentRollNumber === rollNumber && registerCourse[i].courseName === name){
      registerCourse.splice(i,1);
      break;
    }
  }
  
  localStorage.setItem('registerCourse',JSON.stringify(registerCourse));
  CourseHome();
  return;
}

function alreadyRegistered(name,rollNumber){
  for(let i = 0 ; i < registerCourse.length ; i++){
    if(registerCourse[i].courseName === name && registerCourse[i].studentRollNumber===rollNumber){
      return true;
    }
  }
  return false;
}