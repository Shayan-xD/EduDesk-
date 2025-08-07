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

// Main Functionalities

let storedList2 = JSON.parse(localStorage.getItem('studentList3'));
let studentList;

if(storedList2){
  studentList = storedList2;
  console.log(studentList);
}

let storedList = JSON.parse(localStorage.getItem('registerCourse'));
let registerCourse;

if(storedList){
  registerCourse = storedList;
  console.log(registerCourse);
}

let storedList3 = JSON.parse(localStorage.getItem('courseList1'));
let courseList;

if(storedList3){
  courseList = storedList3;
  console.log(courseList);
}

ViewCourses();

function ViewCourses(){

  let leftside = document.querySelector('.left-profile');
  let rightside = document.querySelector('.right-profile');

  leftside.innerHTML = '';
  rightside.innerHTML = '';

  let student = getVal();

  leftside.innerHTML += `
  <div class="profile-image">
    <img src="${student.image}" alt="Student Image" class="image">
  </div>
  `
  rightside.innerHTML += `
  <div class="profile-data">
    <div class="profile-name fancy-name">${student.name}</div>
    <div class="profile-rn">
      <i class="fa-solid fa-id-card rn-icon"></i>
      <div class="rn">: ${student.rollNumber}</div>
    </div>
    <div class="profile-sec"> <i class="fa fa-th section-icon"></i> : <span class="sec">${student.section}</span> </div>
  </div>
  `;

  //Registered Courses display
  displayRegisteredCourses();

}

function displayRegisteredCourses(){

  let courseGrid = document.querySelector('.grid');
  let section = getStudentSection();
  let courses = getCourses();

  courseGrid.innerHTML='';

  
  
  courses.filter(course => course.section === section).forEach(course => {
    courseGrid.innerHTML+=`
    <div class="child-grid">

      <div class="course-name">
        <i class="fa fa-book" style="color:#dc3545; margin-right:5px;"></i>
        <div class="c-name">${course.name}</div>
      </div>

      <div class="tr-cr">

        <div class="course-teacher">
          <b>Teacher :</b> <span class="tr">${course.teacher}</span>
        </div>

        <div class="course-creditHour">
          <b><i class="fas fa-hourglass-half" style="color: #11ff00ff; margin-right: 6px;"></i>CH :</b> <span class="cr">${course.creditHour}</span>
        </div>

      </div>

      <div class="section-status">

        <div class="course-section">
          <b><i class="fa-solid fa-id-card rn-icon"></i> :</b> <span class="c-section">${course.section}</span>
        </div>
        
        <div class="course-status">
          <b><i class="fas fa-chalkboard-teacher" style="color: #007bff; margin-right: 5px;"></i> :</b> <span class="c-status">${course.status}</span>
        </div>

      </div>

    </div>
    `
  });
  
}

function getVal(){
  let currentStudent = studentList.find(student => student.rollNumber === LoggedUser);
  return currentStudent;
}

function getCourseNames(){

  let coursenames = registerCourse
  .filter(course => course.studentRollNumber === LoggedUser)
  .map(course => course.courseName);

  console.log(coursenames);

  return coursenames;
}

function getCourses(){
  let coursenames = getCourseNames();

  let courses = courseList
  .filter(course => coursenames.includes(course.name));

  console.log(courses);

  return courses;
}

//Pdf Downloading Function
async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // 1️⃣ Find current student
  const currentStudent = studentList.find(s => s.rollNumber === LoggedUser);
  if (!currentStudent) {
    alert("Student not found!");
    return;
  }
  const { name, rollNumber, section } = currentStudent;

  // 2️⃣ Student Profile Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('Student Profile', 20, 20);

  // 3️⃣ Profile Details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(`Name: ${name}`, 20, 35);
  doc.text(`Roll Number: ${rollNumber}`, 20, 45);
  doc.text(`Section: ${section}`, 20, 55);

  // 4️⃣ Separator Line
  doc.setLineWidth(0.5);
  doc.line(15, 65, 195, 65);

  // 5️⃣ Registered Courses Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Registered Courses:', 20, 75);

  // 6️⃣ List each registered course with its details
  let y = 85;
  const regs = registerCourse.filter(rc => rc.studentRollNumber === rollNumber);

  regs.forEach((rc, idx) => {
    // find full course info
    const info = courseList.find(c =>
      c.name === rc.courseName && c.section === rc.section
    );
    // Print course line
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    if (info) {
      doc.text(
        `${idx + 1}. ${info.name} — Teacher: ${info.teacher}, Credits: ${info.creditHour}`,
        20,
        y
      );
    } else {
      // fallback if no matching course found
      doc.text(`${idx + 1}. ${rc.courseName} — (details not found)`, 20, y);
    }
    y += 10;

    // add page break if near bottom
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  // 7️⃣ Save
  doc.save(`${name}_Courses.pdf`);
}

function LOGOUT(){
  localStorage.removeItem('loggedInStudent');
  window.location.href = '../LOGIN/Login.html';
  return;
}

function getStudentSection(){
  let student =  studentList.find(student=>student.rollNumber === LoggedUser);

  if(student) return student.section;

  return '';
}

