
let adminList=[];

let studentList = [];

let loggedInAdmin = JSON.parse(localStorage.getItem('loggedInAdmin'));

let loggedInStudent = JSON.parse(localStorage.getItem('loggedInStudent'));

if(loggedInAdmin){
  window.location.href = '../Admin/AdminHome.html';
}

if(loggedInStudent){
  window.location.href = '../Student/StudentHome.html';
}

let storedList = JSON.parse(localStorage.getItem('adminList'));

if(!storedList){
  window.location.href = '../Admin/Admin-AddAdmin.html';
}

let storedList2 = JSON.parse(localStorage.getItem('studentList3'));

if(storedList){
  adminList = storedList;
  console.log(adminList);
}

if(storedList2){
  studentList = storedList2;
  console.log(studentList);
}


let flag = false;


document.querySelector('#login').addEventListener('click',()=>{
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;

  if(!CheckContraints(email,password)){
    alert('Invalid Input! Try Again.')
    return;
  }

  for (let i = 0; i < adminList.length; i++) {
    if (
      email === adminList[i].email &&
      password === adminList[i].password &&
      adminList[i].status.toLowerCase() === 'unblock'
    ) {
      alert('Admin Login Successful');
      loggedInAdmin = adminList[i].email;
      localStorage.setItem('loggedInAdmin',JSON.stringify(loggedInAdmin));
      window.location.href = "../Admin/AdminHome.html";
      return;
    }
  }

  // Check Student Login
  for (let i = 0; i < studentList.length; i++) {
    if (
      email === studentList[i].rollNumber &&
      password === studentList[i].password &&
      studentList[i].status.toLowerCase() === 'unblock'
    ) {
      alert('Student Login Successful');
      loggedInStudent = studentList[i].rollNumber;
      localStorage.setItem('loggedInStudent',JSON.stringify(loggedInStudent));
      window.location.href = "../Student/StudentHome.html";
      return;
    }
  }
  

  if(!flag){
    alert('Invalid Email or Password');
  }
  

});

function CheckContraints(email,password){
  /* Null Values */
  if(email==='' || password===''){
    return false;
  }

  /* Email Validation */
  // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if(!regex.test(email)){
  //   return false;
  // }

  if(password.length < 0 && password.length > 13){
    return false;
  }

  return true;
}