let LoggedUser = JSON.parse(localStorage.getItem('loggedInStudent'));

if (!LoggedUser) {
  window.location.href = '../LOGIN/Login.html';
}

let studentList = [];

let storedList= JSON.parse(localStorage.getItem('studentList3'));

if(storedList){
  studentList = storedList;
  console.log(studentList);
}

// Separate visibility flags
let isStudentVisible = false;
let isAdminVisible = false;
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
  
  let { name,rollNumber,password,imageURL } = getVal(LoggedUser);
  console.log('Returend Image:'+imageURL);
  let adminProfile = document.querySelector('.student');

  adminProfile.innerHTML = `
  <div class="profile">
  
    <div class="profile-1">
      <img class="profile-image"src="${imageURL}" alt="Admin Profile" >
      <div style="display :flex; flex-direction:column; gap:6px;">
        <div style="font-size:25px; font-family: 'Courier New', Courier, monospace; font-weight:bold;">${name.toUpperCase()}</div>
        <div style="display :flex; gap:5px; text-align:center;">
          <i class="fa-solid fa-id-card rn-icon"></i>
          <div class="proflie-1-email">${rollNumber}</div>
        </div>
      </div>
    </div>

    <div style="padding-left:33px; display : flex; align-items:center;">
      <input type="file" id="profilePic" style="display:none" onchange="FileUpload(event)">
      <button class="edit-image-btn" onclick="document.querySelector('#profilePic').click();">
        <i class="fa-solid fa-pen-to-square icon-fix"></i>
        Edit Image
      </button>
    </div>

    <div class="profile-2">

      <div class="label-container">
        <label for="" ><b>Name :</b></label>
        <label for=""><b>Roll Number :</b></label>
        <label for=""><b>Password :</b></label>
      </div>

      <div class="input-container">

        <input type="text" name="" id="name-input" value="${name}">
        <input type="email" name="" id="email-input" value="${rollNumber}">

        <div class="password-wrapper">
          <input type="password" name="" id="password-input" value="${password}">
          <span class="toggle-password" onclick="togglePassword()">
            <i id="eye-icon" class="fa-solid fa-eye eye-open"></i>
          </span>
        </div>

      </div>

    </div>

    <div class="change-profile">
      <button onclick="ChangeProfileData();">Change Data</button>
    </div>

  </div>`;
}

StudentHome();

function LOGOUT(){
  localStorage.removeItem('loggedInStudent');
  window.location.href = '../LOGIN/Login.html';
  return;
}

function getVal(value){
  let name,rollNumber,password,imageURL;

  for(let i = 0 ; i < studentList.length;i++){
    if(studentList[i].rollNumber == value){
      name = studentList[i].name;
      rollNumber = studentList[i].rollNumber;
      password = studentList[i].password;
      imageURL = studentList[i].image;
    }
  }

  return { name,rollNumber,password,imageURL };
}

function togglePassword(){

  let password = document.querySelector('#password-input');
  let eye = document.querySelector('#eye-icon');

  if(password.type === 'password'){
    password.type = 'text';
    eye.classList.remove('fa-eye');
    eye.classList.add('fa-eye-slash');
    eye.classList.remove('eye-open');
    eye.classList.add('eye-close');
  }else{
    password.type = 'password';
    eye.classList.remove('fa-eye-slash');
    eye.classList.add('fa-eye');
    eye.classList.add('eye-open');
    eye.classList.remove('eye-close');
  }
}

function FileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {

    const confirmUpload = confirm("Are you sure you want to upload this image as your profile picture?");
    if (!confirmUpload) return;

    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].rollNumber === LoggedUser) {
        studentList[i].image = e.target.result;
        break; // No need to loop further
      }
    }
    // Save updated list
    localStorage.setItem('studentList3', JSON.stringify(studentList));

    // Refresh UI
    StudentHome();
  };

  reader.readAsDataURL(file);
}

function ChangeProfileData(){
  let name = document.querySelector('#name-input');
  let password = document.querySelector('#password-input');
  let changeButton = document.querySelector('.change-profile');

  name.value='';
  password.value='';
  
  name.placeholder = 'Fill Name';

  if(password.type === 'password'){
    togglePassword();
  }
  password.placeholder = 'Fill Password';
  changeButton.innerHTML= '<button onclick="SaveData();">Save Data</button>';
}

function SaveData(){
  let name = document.querySelector('#name-input');
  let password = document.querySelector('#password-input');
  let changeButton = document.querySelector('.change-profile');

  if(!check(name.value,password.value)){
    alert('Invalid input');
    return;
  }

  for(let i=0;i<studentList.length;i++){
    if(studentList[i].rollNumber === LoggedUser){
      studentList[i].name = name.value;
      studentList[i].password = password.value;
      break;
    }
  }

  localStorage.setItem('studentList3',JSON.stringify(studentList));

  alert('Data Fields Changed Successfully');
  changeButton.innerHTML= '<button onclick="ChangeProfileData();">Change Data</button>';
  StudentHome();
  return
}

function check(name,password){
  if(!name || !password){
    return false;
  }

  if(password.length<0 && password.length>13){
    return false;
  }

  return true;

}



