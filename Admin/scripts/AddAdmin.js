let LoggedUser = JSON.parse(localStorage.getItem('loggedInAdmin'));

let adminList = [];

let storedList = JSON.parse(localStorage.getItem('adminList'));

if (storedList) {
  adminList = storedList;
}

console.log(adminList);

if(adminList){
  NormalAdmin();
}else{
  Dummy();
}
/* 1.Function to run if the there is data in adminList */
function NormalAdmin(){

  if(!LoggedUser){
    window.location.href = "../LOGIN/Login.html";
    return;
  }

  document.querySelector('#register').addEventListener('click', () => {
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    /* Image Values */
    let fileInput = document.querySelector('#imageFile');
    let image = fileInput.files[0];

    /* Check contraints */
    if (!checkData(name, email, password, image)) {
      alert('Invalid Data');
      document.querySelector('#name').value = '';
      document.querySelector('#email').value = '';
      document.querySelector('#password').value = '';
      document.querySelector('#imageFile').value = '';
      return;
    }

    /* Check if student already exists */
    if (!checkRollNumber(email)) {
      alert('Email Already Exists!');
      document.querySelector('#email').value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const imageBase64 = e.target.result;

      adminList.push({
        name: name,
        email: email,
        password: password,
        image: imageBase64,
        status: 'unblock'
      });

      localStorage.setItem('adminList', JSON.stringify(adminList));

      alert('Admin Registered');

      window.location.href = '../Admin/Admin-ViewAdmin.html';
    };
    reader.readAsDataURL(image);

  });

  function checkData(name, email, password, image) {
    if (!name || !email || !password || !image) {
      return false;
    }

    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(name)) {
      alert('Name must contain only letters and spaces');
      return false;
    }

    if (password.length < 0 && password.length > 13) {
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

  function checkRollNumber(email) {

    for (let i = 0; i < adminList.length; i++) {
      if (adminList[i].email === email) {
        return false;
      }
    }
    return true;
  }
}


/* 2. If there is a dummy admin for say if you are running website for the first time and have no admin to add admin and then login and start the website */
function Dummy(){

  let adminList = [];

  document.querySelector('#register').addEventListener('click', () => {
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    /* Image Values */
    let fileInput = document.querySelector('#imageFile');
    let image = fileInput.files[0];

    /* Check contraints */
    if (!checkData(name, email, password, image)) {
      alert('Invalid Data');
      document.querySelector('#name').value = '';
      document.querySelector('#email').value = '';
      document.querySelector('#password').value = '';
      document.querySelector('#imageFile').value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const imageBase64 = e.target.result;

      adminList.push({
        name: name,
        email: email,
        password: password,
        image: imageBase64,
        status: 'unblock'
      });

      localStorage.setItem('adminList', JSON.stringify(adminList));

      alert('Admin Registered');

      localStorage.removeItem('DummyAdmin')
      window.location.href = '../LOGIN/Login.html';
    };
    reader.readAsDataURL(image);

  });

  function checkData(name, email, password, image) {
    if (!name || !email || !password || !image) {
      return false;
    }

    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(name)) {
      alert('Name must contain only letters and spaces');
      return false;
    }

    if (password.length < 0 && password.length > 13) {
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

  function checkRollNumber(email) {

    for (let i = 0; i < adminList.length; i++) {
      if (adminList[i].email === email) {
        return false;
      }
    }
    return true;
  }
}