/* Sidebar Functions */

let LoggedUser = JSON.parse(localStorage.getItem('loggedInAdmin'));

if (!LoggedUser) {
  window.location.href = '../LOGIN/Login.html';
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
      <button class="submenu-btn" onclick="window.location.href = '';">Registered Courses</button>
      `;
    courseMenu.classList.remove('display-none');
    courseMenu.classList.add('display-flex');
  }

  isCourseVisible = !isCourseVisible;
}


/* Main Content Functions */

let adminList = [];

let storedList = JSON.parse(localStorage.getItem('adminList'));

if(storedList){
  adminList = storedList;
  console.log(adminList);
}

DisplayAdmin();

function DisplayAdmin(){
  let std = document.querySelector('.student-body');
  std.innerHTML = '';
  let count = 0;
  for(let i = 0 ; i < adminList.length; i++){
    
    if(LoggedUser!==adminList[i].email){
      let { value,status } = checkStatus(i);
      std.innerHTML += `
      <tr>
        <td>${count+1}</td>
        <td>${adminList[i].name}</td>
        <td>${adminList[i].email}</td>
        <td>${adminList[i].password}</td>
        <td><img src="${adminList[i].image}" height="20px" width="20px"></td>
        <td><button class="${status}" onclick="Block(${i});">${value.toUpperCase()}</button></td>
        <td><button class="edit-btn" onclick="Edit(${count},${i});">EDIT</button></td>
        <td><button class="delete-btn" onclick="Delete(${i});">DELETE</button></td>
      </tr>`;
      count++;
    }
  }
}

function Block(index){

  if(adminList[index].status.toLowerCase() === 'block'){
    adminList[index].status = 'unblock';
  }else{
    adminList[index].status = 'block';
  }
  localStorage.setItem('adminList', JSON.stringify(adminList));
  DisplayAdmin();

};

function checkStatus(index){

  let status;
  let value;
  if(adminList[index].status.toLowerCase()==='block'){
      value = 'unblock';
      status = 'status-unblock';
  }else{
      value = 'block';
      status = 'status-block';
  }
  return { value,status };
}

function Edit(count,index){

  let std = document.querySelector('.student-body');
  let rows = std.querySelectorAll('tr');

  let row = rows[count];

  if(!row){
    alert('row not found!');
    return;
  }

  let nameCell = row.cells[1];
  let emailCell = row.cells[2];
  let passwordCell = row.cells[3];
  let imageCell = row.cells[4];
  let statusCell = row.cells[5];
  let saveCell = row.cells[6];

  nameCell.innerHTML =`<input type="text" id="nameInput" value="" placeholder="Enter Name">`;
  emailCell.innerHTML =`<input type="email" id="emailInput" value="" placeholder="Enter Eamil">`;
  passwordCell.innerHTML =`<input type="password" id="passwordInput" value="" placeholder="Enter Password">`;
  imageCell.innerHTML =`<input type="file" id="imageInput" accept=".png, .jpg, .jpeg, image/*">`;
  let { value,status } = checkStatus(index);
  statusCell.innerHTML = `<button class="${status}" onclick="Block(${index});">${value.toUpperCase()}</button>`
  saveCell.innerHTML =`<button class="saveButton" onclick="Save(${index})">SAVE</button>`
}

function Save(index) {

  let nameVal = document.querySelector('#nameInput').value;
  let emailVal = document.querySelector('#emailInput').value;
  let passwordVal = document.querySelector('#passwordInput').value;
  
  let fileinput = document.querySelector('#imageInput');
  let imageFile = fileinput.files[0];

  if (!checkData(nameVal, emailVal, passwordVal, imageFile)) {
    alert('Please fill all the fields correctly');
    document.querySelector('#nameInput').value = '';
    document.querySelector('#emailInput').value = '';
    document.querySelector('#passwordInput').value = '';
    document.querySelector('#imageInput').value = '';
    return;
  }

  // Convert image file to base64 before saving
  const reader = new FileReader();

  reader.onload = function () {
    const base64Image = reader.result;

    // Update admin data with base64 image
    adminList[index].name = nameVal;
    adminList[index].email = emailVal;
    adminList[index].password = passwordVal;
    adminList[index].image = base64Image;

    localStorage.setItem('adminList', JSON.stringify(adminList));
    alert(`Changes for Admin ${adminList[index].name} saved successfully`);

    DisplayAdmin();
  };

  reader.readAsDataURL(imageFile);  // Start reading the image as base64
}


function checkData(name,email,password,image){
  if(!name || !email || !password  || !image){
    return false;
  }

  const regex = /^[A-Za-z\s]+$/;
  if (!regex.test(name)) {
    alert('Name must contain only letters and spaces');
    return false;
  }

  if(password.length < 0 && password.length > 13){
    return false;
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(image.type)) {
    fileInput.value = ''; // Clear the input
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    return false
  }

  // ✅ Optional: File size limit (e.g., 2 MB)
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (image.size > maxSize) {
    alert("File size must be less than 2MB.");
    fileInput.value = '';
    return false;
  }

  return true;
}

function LOGOUT(){
  localStorage.removeItem('loggedInAdmin');
  window.location.href = '../LOGIN/Login.html';
  return;
}

function Delete(index){

  const email = adminList[index].email;
  const confirmVal = confirm(`Are you sure you want to delete user : ${email}?`);
  if(!confirmVal){
    return;
  }
  adminList.splice(index,1);
  localStorage.setItem('adminList',JSON.stringify(adminList));
  alert(`User => ${email} Has been deleted.`);
  DisplayAdmin();
  return;
}