let LoggedUser = JSON.parse(localStorage.getItem('loggedInAdmin'));

if (!LoggedUser) {
  window.location.href = '../LOGIN/Login.html';
}

let studentList = [];

let storedList = JSON.parse(localStorage.getItem('studentList3'));

if(storedList){
  studentList = storedList;
}

console.log(studentList);

document.querySelector('#register').addEventListener('click',()=>{
  let name = document.querySelector('#name').value;
  let rollNumber = document.querySelector('#Roll-No').value;
  let password = document.querySelector('#password').value;
  let section = document.querySelector('#select').value;

  /* Image Values */
  let fileInput = document.querySelector('#imageFile');
  let image = fileInput.files[0];

  /* Check contraints */
  if(!checkData(name,rollNumber,password,section,image)){
    alert('Invalid Data');
    document.querySelector('#name').value='';
    document.querySelector('#Roll-No').value='';
    document.querySelector('#password').value='';
    document.querySelector('#select').value='';
    document.querySelector('#imageFile').value='';
    return;
  }

  /* Check if student already exists */
  if(!checkRollNumber(rollNumber)){
    alert('Invalid Roll Number');
    document.querySelector('#Roll-No').value='';
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
  const imageBase64 = e.target.result; 

  studentList.push({
    name: name,
    rollNumber: rollNumber,
    password: password,
    section: section,
    image: imageBase64,  
    status: 'unblock'
  });

  localStorage.setItem('studentList3',JSON.stringify(studentList));
  
  alert('Student Registered');

  window.location.href = '../Admin/Admin-ViewStudent.html';
 };
  reader.readAsDataURL(image);

});

function checkData(name,rollNumber,password,section,image){
  if(!name || !rollNumber || !password || !section || !image){
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

  // ✅ Optional: File size limit (e.g., 2 MB)
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (image.size > maxSize) {
    alert("File size must be less than 2MB.");
    fileInput.value = '';
    return false;
  }

  return true;
}

function checkRollNumber(rollNumber){

  for(let i = 0; i<studentList.length ; i++){
    if(studentList[i].rollNumber === rollNumber){
      alert('Roll Number Already Exists! Try Again.');
      return false;
    }
  }
  return true;
}