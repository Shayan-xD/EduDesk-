let LoggedUser = JSON.parse(localStorage.getItem('loggedInAdmin'));

if (!LoggedUser) {
  window.location.href = '../LOGIN/Login.html';
}

let adminList = [];

let storedList= JSON.parse(localStorage.getItem('adminList'));

if(storedList){
  adminList = storedList;
  console.log(adminList);
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
      <button class="submenu-btn" onclick="window.location.href = '../Admin/Admin-RegisteredCourses.html';">Registered Courses</button>
      `;
    courseMenu.classList.remove('display-none');
    courseMenu.classList.add('display-flex');
  }

  isCourseVisible = !isCourseVisible;
}


function AdminHome(){
  
  let { name,email,password,imageURL } = getVal(LoggedUser);
  console.log('Returend Image:'+imageURL);
  let adminProfile = document.querySelector('.admin');

  adminProfile.innerHTML = `
  <div class="profile">
  
    <div class="profile-1">
      <img class="profile-image"src="${imageURL}" alt="Admin Profile" >
      <div style="display :flex; flex-direction:column; gap:6px;">
        <div style="font-size:25px; font-family: 'Courier New', Courier, monospace; font-weight:bold;">${name.toUpperCase()}</div>
        <div style="display :flex; gap:5px; text-align:center;">
          <i class="fa-solid fa-envelope email-icon"></i>
          <div class="proflie-1-email">${email}</div>
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
        <label for=""><b>Email :</b></label>
        <label for=""><b>Password :</b></label>
      </div>

      <div class="input-container">

        <input type="text" name="" id="name-input" value="${name}">
        <input type="email" name="" id="email-input" value="${email}">

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

AdminHome();

function LOGOUT(){
  localStorage.removeItem('loggedInAdmin');
  window.location.href = '../LOGIN/Login.html';
  return;
}

function getVal(value){
  let name,email,password,imageURL;

  for(let i = 0 ; i < adminList.length;i++){
    if(adminList[i].email == value){
      name = adminList[i].name;
      email = adminList[i].email;
      password = adminList[i].password;
      imageURL = adminList[i].image;
    }
  }

  return { name,email,password,imageURL };
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

    const confirmval = confirm('Are you sure you want to update the profile image?');
    if(!confirmval){
      return;
    }


    for (let i = 0; i < adminList.length; i++) {
      if (adminList[i].email.trim() === LoggedUser.trim()) {
        adminList[i].image = e.target.result;
        break; // No need to loop further
      }
    }
    // Save updated list
    localStorage.setItem('adminList', JSON.stringify(adminList));

    // Refresh UI
    AdminHome();
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

  for(let i=0;i<adminList.length;i++){
    if(adminList[i].email === LoggedUser){
      adminList[i].name = name.value;
      adminList[i].password = password.value;
      break;
    }
  }

  localStorage.setItem('adminList',JSON.stringify(adminList));

  alert('Data Fields Changed Successfully');
  changeButton.innerHTML= '<button onclick="ChangeProfileData();">Change Data</button>';
  AdminHome();
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



