<<<<<<< HEAD
/* =========================================================
   STUDENT REPORT SYSTEM
   JAVASCRIPT
========================================================= */


/* =========================================================
   DEFAULT ADMIN ACCOUNT
========================================================= */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


/* =========================================================
   PAGE ELEMENTS
========================================================= */

const homePage =
    document.getElementById("homePage");

const loginPage =
    document.getElementById("loginPage");

const adminDashboard =
    document.getElementById("adminDashboard");

const studentDashboard =
    document.getElementById("studentDashboard");

const parentDashboard =
    document.getElementById("parentDashboard");


/* =========================================================
   LOAD STUDENT DATA
========================================================= */

let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];


/* =========================================================
   HOME PAGE
========================================================= */

function showHome() {

    homePage.classList.remove("hidden");

    loginPage.classList.add("hidden");

    adminDashboard.classList.add("hidden");

    studentDashboard.classList.add("hidden");

    parentDashboard.classList.add("hidden");
}


/* =========================================================
   SHOW LOGIN PAGE
========================================================= */

function showLoginPage() {

    homePage.classList.add("hidden");

    loginPage.classList.remove("hidden");

    adminDashboard.classList.add("hidden");

    studentDashboard.classList.add("hidden");

    parentDashboard.classList.add("hidden");

}


/* =========================================================
   LOGIN FORM
========================================================= */

function changeLoginForm() {

    const role =
        document.getElementById("loginRole").value;

    const username =
        document.getElementById("loginUsername");

    const password =
        document.getElementById("loginPassword");


    username.value = "";
    password.value = "";

    document.getElementById("loginError").innerText = "";


    if (role === "admin") {

        username.placeholder =
            "Admin username";

        password.placeholder =
            "Admin password";

    }

    else if (role === "student") {

        username.placeholder =
            "Student username";

        password.placeholder =
            "Student password";

    }

    else {

        username.placeholder =
            "Parent username";

        password.placeholder =
            "Parent password";

    }

}


/* =========================================================
   LOGIN FUNCTION
========================================================= */

function loginUser() {

    const role =
        document.getElementById("loginRole").value;

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();

    const error =
        document.getElementById("loginError");


    error.innerText = "";


    /* =====================================================
       ADMIN LOGIN
    ===================================================== */

    if (role === "admin") {

        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD
        ) {

            loginPage.classList.add("hidden");

            adminDashboard.classList.remove("hidden");

            showAdminSection("addStudent");

            displayStudentList();

            return;

        }

        else {

            error.innerText =
                "❌ Invalid admin username or password.";

            return;
        }

    }


    /* =====================================================
       STUDENT LOGIN
    ===================================================== */

    if (role === "student") {

        const student =
            students.find(function(s) {

                return (
                    s.username === username &&
                    s.password === password
                );

            });


        if (student) {

            loginPage.classList.add("hidden");

            studentDashboard.classList.remove("hidden");

            displayStudentDashboard(student);

        }

        else {

            error.innerText =
                "❌ Invalid student username or password.";

        }

        return;
    }


    /* =====================================================
       PARENT LOGIN
    ===================================================== */

    if (role === "parent") {

        const student =
            students.find(function(s) {

                return (
                    s.parentUsername === username &&
                    s.parentPassword === password
                );

            });


        if (student) {

            loginPage.classList.add("hidden");

            parentDashboard.classList.remove("hidden");

            displayParentDashboard(student);

        }

        else {

            error.innerText =
                "❌ Invalid parent username or password.";

        }

        return;
    }

}


/* =========================================================
   ADMIN SECTION
========================================================= */

function showAdminSection(sectionId) {

    const sections =
        document.querySelectorAll(".admin-section");


    sections.forEach(function(section) {

        section.classList.add("hidden");

    });


    document
        .getElementById(sectionId)
        .classList.remove("hidden");


    if (sectionId === "studentList") {

        displayStudentList();

    }

}


/* =========================================================
   SAVE STUDENT
========================================================= */

function saveStudent() {

    /* =====================================================
       GET STUDENT INFORMATION
    ===================================================== */

    const name =
        document.getElementById("studentName")
        .value.trim();

    const roll =
        document.getElementById("studentRoll")
        .value.trim();

    const username =
        document.getElementById("studentUsername")
        .value.trim();

    const password =
        document.getElementById("studentPassword")
        .value.trim();

    const parentUsername =
        document.getElementById("parentUsername")
        .value.trim();

    const parentPassword =
        document.getElementById("parentPassword")
        .value.trim();


    /* =====================================================
       GET MARKS
    ===================================================== */

    const fed =
        Number(document.getElementById("fed").value);

    const aiml =
        Number(document.getElementById("aiml").value);

    const os =
        Number(document.getElementById("os").value);

    const iot =
        Number(document.getElementById("iot").value);

    const oop =
        Number(document.getElementById("oop").value);

    const maths =
        Number(document.getElementById("maths").value);


    /* =====================================================
       ATTENDANCE
    ===================================================== */

    const attendance =
        Number(
            document.getElementById(
                "studentAttendance"
            ).value
        );


    /* =====================================================
       REMARKS
    ===================================================== */

    const remarks =
        document.getElementById(
            "studentRemarks"
        ).value.trim();


    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
        name === "" ||
        roll === "" ||
        username === "" ||
        password === "" ||
        parentUsername === "" ||
        parentPassword === ""
    ) {

        alert(
            "Please fill all student and login details."
        );

        return;
    }


    /* =====================================================
       MARK VALIDATION
    ===================================================== */

    const marks =
        [
            fed,
            aiml,
            os,
            iot,
            oop,
            maths
        ];


    for (let i = 0; i < marks.length; i++) {

        if (
            isNaN(marks[i]) ||
            marks[i] < 0 ||
            marks[i] > 100
        ) {

            alert(
                "All subject marks must be between 0 and 100."
            );

            return;
        }

    }


    /* =====================================================
       ATTENDANCE VALIDATION
    ===================================================== */

    if (
        isNaN(attendance) ||
        attendance < 0 ||
        attendance > 100
    ) {

        alert(
            "Attendance must be between 0 and 100."
        );

        return;
    }


    /* =====================================================
       CHECK DUPLICATE USERNAME
    ===================================================== */

    const duplicateStudent =
        students.find(function(s) {

            return s.username === username;

        });


    if (duplicateStudent) {

        alert(
            "Student username already exists."
        );

        return;
    }


    const duplicateParent =
        students.find(function(s) {

            return s.parentUsername === parentUsername;

        });


    if (duplicateParent) {

        alert(
            "Parent username already exists."
        );

        return;
    }


    /* =====================================================
       TOTAL
    ===================================================== */

    const total =
        fed +
        aiml +
        os +
        iot +
        oop +
        maths;


    /* =====================================================
       PERCENTAGE
    ===================================================== */

    const percentage =
        total / 6;


    /* =====================================================
       GRADE
    ===================================================== */

    const grade =
        calculateGrade(percentage);


    /* =====================================================
       CREATE STUDENT OBJECT
    ===================================================== */

    const student = {

        id: Date.now(),

        name: name,

        roll: roll,

        username: username,

        password: password,

        parentUsername:
            parentUsername,

        parentPassword:
            parentPassword,

        marks: {

            FED: fed,

            AIML: aiml,

            OS: os,

            IOT: iot,

            OOP: oop,

            MATHS: maths

        },

        total: total,

        percentage:
            percentage,

        grade:
            grade,

        attendance:
            attendance,

        remarks:
            remarks

    };


    /* =====================================================
       ADD STUDENT
    ===================================================== */

    students.push(student);


    /* =====================================================
       SAVE TO LOCAL STORAGE
    ===================================================== */

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

    document.getElementById(
        "adminMessage"
    ).innerText =
        "✅ Student report saved successfully!";


    alert(
        "Student report added successfully!"
    );


    /* =====================================================
       CLEAR FORM
    ===================================================== */

    clearStudentForm();


    /* =====================================================
       UPDATE TABLE
    ===================================================== */

    displayStudentList();

}


/* =========================================================
   CALCULATE GRADE
========================================================= */

function calculateGrade(percentage) {

    if (percentage >= 90) {

        return "A+";

    }

    else if (percentage >= 80) {

        return "A";

    }

    else if (percentage >= 70) {

        return "B";

    }

    else if (percentage >= 60) {

        return "C";

    }

    else if (percentage >= 50) {

        return "D";

    }

    else {

        return "F";

    }

}


/* =========================================================
   CLEAR FORM
========================================================= */

function clearStudentForm() {

    document.getElementById(
        "studentName"
    ).value = "";

    document.getElementById(
        "studentRoll"
    ).value = "";

    document.getElementById(
        "studentUsername"
    ).value = "";

    document.getElementById(
        "studentPassword"
    ).value = "";

    document.getElementById(
        "parentUsername"
    ).value = "";

    document.getElementById(
        "parentPassword"
    ).value = "";

    document.getElementById(
        "fed"
    ).value = "";

    document.getElementById(
        "aiml"
    ).value = "";

    document.getElementById(
        "os"
    ).value = "";

    document.getElementById(
        "iot"
    ).value = "";

    document.getElementById(
        "oop"
    ).value = "";

    document.getElementById(
        "maths"
    ).value = "";

    document.getElementById(
        "studentAttendance"
    ).value = "";

    document.getElementById(
        "studentRemarks"
    ).value = "";

}


/* =========================================================
   DISPLAY STUDENT LIST
========================================================= */

function displayStudentList() {

    const tableBody =
        document.getElementById(
            "studentTableBody"
        );


    tableBody.innerHTML = "";


    if (students.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    No students added yet.
                </td>
            </tr>
        `;

        return;
    }


    students.forEach(function(student) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.roll}
            </td>

            <td>
                ${student.name}
            </td>

            <td>
                ${student.username}
            </td>

            <td>
                ${student.percentage.toFixed(2)}%
            </td>

            <td>
                ${student.attendance}%
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">

                    Delete

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================================
   DELETE STUDENT
========================================================= */

function deleteStudent(id) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmation) {

        return;

    }


    students =
        students.filter(function(student) {

            return student.id !== id;

        });


    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    displayStudentList();

}


/* =========================================================
   STUDENT DASHBOARD
========================================================= */

function displayStudentDashboard(student) {

    const container =
        document.getElementById(
            "studentDashboardContent"
        );


    const attendanceClass =
        student.attendance >= 75
            ? "attendance-good"
            : "attendance-low";


    container.innerHTML = `

        <div class="report-container">


            <!-- STUDENT INFORMATION -->

            <div class="report-title">

                <h2>
                    📊 My Academic Report
                </h2>

                <div class="student-info">

                    <div class="info-box">

                        <small>
                            Student Name
                        </small>

                        <strong>
                            ${student.name}
                        </strong>

                    </div>


                    <div class="info-box">

                        <small>
                            Roll Number
                        </small>

                        <strong>
                            ${student.roll}
                        </strong>

                    </div>


                    <div class="info-box">

                        <small>
                            Username
                        </small>

                        <strong>
                            ${student.username}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- SUMMARY -->

            <div class="summary-grid">

                <div class="summary-card">

                    <div class="label">
                        Total Marks
                    </div>

                    <div class="number">
                        ${student.total}/600
                    </div>

                </div>


                <div class="summary-card">

                    <div class="label">
                        Percentage
                    </div>

                    <div class="number">
                        ${student.percentage.toFixed(2)}%
                    </div>

                </div>


                <div class="summary-card">

                    <div class="label">
                        Grade
                    </div>

                    <div class="number">
                        ${student.grade}
                    </div>

                </div>


                <div class="summary-card">

                    <div class="label">
                        Attendance
                    </div>

                    <div class="number
                        ${attendanceClass}">

                        ${student.attendance}%

                    </div>

                </div>

            </div>


            <!-- MARKS -->

            <div class="report-table">

                <h3>
                    📚 Subject-wise Marks
                </h3>

                <table>

                    <thead>

                        <tr>

                            <th>
                                Subject
                            </th>

                            <th>
                                Marks
                            </th>

                            <th>
                                Maximum
                            </th>

                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${createSubjectRow(
                            "FED",
                            student.marks.FED
                        )}

                        ${createSubjectRow(
                            "AIML",
                            student.marks.AIML
                        )}

                        ${createSubjectRow(
                            "OS",
                            student.marks.OS
                        )}

                        ${createSubjectRow(
                            "IOT",
                            student.marks.IOT
                        )}

                        ${createSubjectRow(
                            "OOP",
                            student.marks.OOP
                        )}

                        ${createSubjectRow(
                            "MATHS",
                            student.marks.MATHS
                        )}

                    </tbody>

                </table>

            </div>


            <!-- REMARKS -->

            <div class="remarks-box">

                <h3>
                    📝 Teacher Remarks
                </h3>

                <p>
                    ${student.remarks || "No remarks added."}
                </p>

            </div>

        </div>

    `;

}


/* =========================================================
   CREATE SUBJECT ROW
========================================================= */

function createSubjectRow(subject, marks) {

    let status;

    if (marks >= 40) {

        status =
            `<span class="attendance-good">
                Pass
            </span>`;

    }

    else {

        status =
            `<span class="attendance-low">
                Fail
            </span>`;

    }


    return `

        <tr>

            <td>
                <strong>
                    ${subject}
                </strong>
            </td>

            <td>
                ${marks}
            </td>

            <td>
                100
            </td>

            <td>
                ${status}
            </td>

        </tr>

    `;

}


/* =========================================================
   PARENT DASHBOARD
========================================================= */

function displayParentDashboard(student) {

    const container =
        document.getElementById(
            "parentDashboardContent"
        );


    const attendanceClass =
        student.attendance >= 75
            ? "attendance-good"
            : "attendance-low";


    container.innerHTML = `

        <div class="report-container">


            <!-- CHILD INFORMATION -->

            <div class="report-title">

                <h2>
                    👨‍👩‍👦 Child Academic Report
                </h2>

                <div class="student-info">

                    <div class="info-box">

                        <small>
                            Student Name
                        </small>

                        <strong>
                            ${student.name}
                        </strong>

                    </div>


                    <div class="info-box">

                        <small>
                            Roll Number
                        </small>

                        <strong>
                            ${student.roll}
                        </strong>

                    </div>


                    <div class="info-box">

                        <small>
                            Attendance
                        </small>

                        <strong
                            class="${attendanceClass}">

                            ${student.attendance}%

                        </strong>

                    </div>

                </div>

            </div>


            <!-- PERFORMANCE SUMMARY -->

            <div class="summary-grid">

                <div class="summary-card">

                    <div class="label">
                        Total Marks
                    </div>

                    <div class="number">
                        ${student.total}/600
                    </div>

                </div>


                <div class="summary-card">

                    <div class="label">
                        Percentage
                    </div>

                    <div class="number">
                        ${student.percentage.toFixed(2)}%
                    </div>

                </div>


                <div class="summary-card">

                    <div class="label">
                        Grade
                    </div>

                    <div class="number">
                        ${student.grade}
                    </div>

                </div>


                <div class="summary-card">

                    <div class="label">
                        Attendance
                    </div>

                    <div class="number
                        ${attendanceClass}">

                        ${student.attendance}%

                    </div>

                </div>

            </div>


            <!-- MARKS -->

            <div class="report-table">

                <h3>
                    📚 Subject Performance
                </h3>

                <table>

                    <thead>

                        <tr>

                            <th>
                                Subject
                            </th>

                            <th>
                                Marks
                            </th>

                            <th>
                                Maximum
                            </th>

                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${createSubjectRow(
                            "FED",
                            student.marks.FED
                        )}

                        ${createSubjectRow(
                            "AIML",
                            student.marks.AIML
                        )}

                        ${createSubjectRow(
                            "OS",
                            student.marks.OS
                        )}

                        ${createSubjectRow(
                            "IOT",
                            student.marks.IOT
                        )}

                        ${createSubjectRow(
                            "OOP",
                            student.marks.OOP
                        )}

                        ${createSubjectRow(
                            "MATHS",
                            student.marks.MATHS
                        )}

                    </tbody>

                </table>

            </div>


            <!-- ATTENDANCE -->

            <div class="remarks-box">

                <h3>
                    📅 Attendance Information
                </h3>

                <p>

                    Student attendance:
                    
                    <strong
                        class="${attendanceClass}">

                        ${student.attendance}%

                    </strong>

                </p>

                <br>

                <p>
                    ${
                        student.attendance >= 75
                        ? "Attendance is above the minimum level."
                        : "Attendance is below 75%. Please monitor attendance."
                    }
                </p>

            </div>


            <!-- REMARKS -->

            <div class="remarks-box">

                <h3>
                    📝 Teacher Remarks
                </h3>

                <p>
                    ${student.remarks || "No remarks added."}
                </p>

            </div>

        </div>

    `;

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    adminDashboard.classList.add("hidden");

    studentDashboard.classList.add("hidden");

    parentDashboard.classList.add("hidden");

    loginPage.classList.remove("hidden");


    document.getElementById(
        "loginUsername"
    ).value = "";

    document.getElementById(
        "loginPassword"
    ).value = "";

    document.getElementById(
        "loginError"
    ).innerText = "";

}


/* =========================================================
   INITIAL PAGE
========================================================= */

=======
/* =========================================================
   STUDENT REPORT SYSTEM
   JAVASCRIPT
========================================================= */


/* =========================================================
   DEFAULT ADMIN ACCOUNT
========================================================= */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


/* =========================================================
   PAGE ELEMENTS
========================================================= */

const homePage =
    document.getElementById("homePage");

const loginPage =
    document.getElementById("loginPage");

const adminDashboard =
    document.getElementById("adminDashboard");

const studentDashboard =
    document.getElementById("studentDashboard");

const parentDashboard =
    document.getElementById("parentDashboard");


/* =========================================================
   LOAD STUDENT DATA
========================================================= */

let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];


/* =========================================================
   HOME PAGE
========================================================= */

function showHome() {

    homePage.classList.remove("hidden");

    loginPage.classList.add("hidden");

    adminDashboard.classList.add("hidden");

    studentDashboard.classList.add("hidden");

    parentDashboard.classList.add("hidden");
}


/* =========================================================
   SHOW LOGIN PAGE
========================================================= */

function showLoginPage() {

    homePage.classList.add("hidden");

    loginPage.classList.remove("hidden");

    adminDashboard.classList.add("hidden");

    studentDashboard.classList.add("hidden");

    parentDashboard.classList.add("hidden");

}


/* =========================================================
   LOGIN FORM
========================================================= */

function changeLoginForm() {

    const role =
        document.getElementById("loginRole").value;

    const username =
        document.getElementById("loginUsername");

    const password =
        document.getElementById("loginPassword");


    username.value = "";
    password.value = "";

    document.getElementById("loginError").innerText = "";


    if (role === "admin") {

        username.placeholder =
            "Admin username";

        password.placeholder =
            "Admin password";

    }

    else if (role === "student") {

        username.placeholder =
            "Student username";

        password.placeholder =
            "Student password";

    }

    else {

        username.placeholder =
            "Parent username";

        password.placeholder =
            "Parent password";

    }

}


/* =========================================================
   LOGIN FUNCTION
========================================================= */

function loginUser() {

    const role =
        document.getElementById("loginRole").value;

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();

    const error =
        document.getElementById("loginError");


    error.innerText = "";


    /* =====================================================
       ADMIN LOGIN
    ===================================================== */

    if (role === "admin") {

        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD
        ) {

            loginPage.classList.add("hidden");

            adminDashboard.classList.remove("hidden");

            showAdminSection("addStudent");

            displayStudentList();

            return;

        }

        else {

            error.innerText =
                "❌ Invalid admin username or password.";

            return;
        }

    }


    /* =====================================================
       STUDENT LOGIN
    ===================================================== */

    if (role === "student") {

        const student =
            students.find(function(s) {

                return (
                    s.username === username &&
                    s.password === password
                );

            });


        if (student) {

            loginPage.classList.add("hidden");

            studentDashboard.classList.remove("hidden");

            displayStudentDashboard(student);

        }

        else {

            error.innerText =
                "❌ Invalid student username or password.";

        }

        return;
    }


    /* =====================================================
       PARENT LOGIN
    ===================================================== */

    if (role === "parent") {

        const student =
            students.find(function(s) {

                return (
                    s.parentUsername === username &&
                    s.parentPassword === password
                );

            });


        if (student) {

            loginPage.classList.add("hidden");

            parentDashboard.classList.remove("hidden");

            displayParentDashboard(student);

        }

        else {

            error.innerText =
                "❌ Invalid parent username or password.";

        }

        return;
    }

}


/* =========================================================
   ADMIN SECTION
========================================================= */

function showAdminSection(sectionId) {

    const sections =
        document.querySelectorAll(".admin-section");


    sections.forEach(function(section) {

        section.classList.add("hidden");

    });


    document
        .getElementById(sectionId)
        .classList.remove("hidden");


    if (sectionId === "studentList") {

        displayStudentList();

    }

}


/* =========================================================
   SAVE STUDENT
========================================================= */

function saveStudent() {

    /* =====================================================
       GET STUDENT INFORMATION
    ===================================================== */

    const name =
        document.getElementById("studentName")
        .value.trim();

    const roll =
        document.getElementById("studentRoll")
        .value.trim();

    const username =
        document.getElementById("studentUsername")
        .value.trim();

    const password =
        document.getElementById("studentPassword")
        .value.trim();

    const parentUsername =
        document.getElementById("parentUsername")
        .value.trim();

    const parentPassword =
        document.getElementById("parentPassword")
        .value.trim();


    /* =====================================================
       GET MARKS
    ===================================================== */

    const fed =
        Number(document.getElementById("fed").value);

    const aiml =
        Number(document.getElementById("aiml").value);

    const os =
        Number(document.getElementById("os").value);

    const iot =
        Number(document.getElementById("iot").value);

    const oop =
        Number(document.getElementById("oop").value);

    const maths =
        Number(document.getElementById("maths").value);


    /* =====================================================
       ATTENDANCE
    ===================================================== */

    const attendance =
        Number(
            document.getElementById(
                "studentAttendance"
            ).value
        );


    /* =====================================================
       REMARKS
    ===================================================== */

    const remarks =
        document.getElementById(
            "studentRemarks"
        ).value.trim();


    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
        name === "" ||
        roll === "" ||
        username === "" ||
        password === "" ||
        parentUsername === "" ||
        parentPassword === ""
    ) {

        alert(
            "Please fill all student and login details."
        );

        return;
    }


    /* =====================================================
       MARK VALIDATION
    ===================================================== */

    const marks =
        [
            fed,
            aiml,
            os,
            iot,
            oop,
            maths
        ];


    for (let i = 0; i < marks.length; i++) {

        if (
            isNaN(marks[i]) ||
            marks[i] < 0 ||
            marks[i] > 100
        ) {

            alert(
                "All subject marks must be between 0 and 100."
            );

            return;
        }

    }


    /* =====================================================
       ATTENDANCE VALIDATION
    ===================================================== */

    if (
        isNaN(attendance) ||
        attendance < 0 ||
        attendance > 100
    ) {

        alert(
            "Attendance must be between 0 and 100."
        );

        return;
    }


    /* =====================================================
       CHECK DUPLICATE USERNAME
    ===================================================== */

    const duplicateStudent =
        students.find(function(s) {

            return s.username === username;

        });


    if (duplicateStudent) {

        alert(
            "Student username already exists."
        );

        return;
    }


    const duplicateParent =
        students.find(function(s) {

            return s.parentUsername === parentUsername;

        });


    if (duplicateParent) {

        alert(
            "Parent username already exists."
        );

        return;
    }


    /* =====================================================
       TOTAL
    ===================================================== */

    const total =
        fed +
        aiml +
        os +
        iot +
        oop +
        maths;


    /* =====================================================
       PERCENTAGE
    ===================================================== */

    const percentage =
        total / 6;


    /* =====================================================
       GRADE
    ===================================================== */

    const grade =
        calculateGrade(percentage);


    /* =====================================================
       CREATE STUDENT OBJECT
    ===================================================== */

    const student = {

        id: Date.now(),

        name: name,

        roll: roll,

        username: username,

        password: password,

        parentUsername:
            parentUsername,

        parentPassword:
            parentPassword,

        marks: {

            FED: fed,

            AIML: aiml,

            OS: os,

            IOT: iot,

            OOP: oop,

            MATHS: maths

        },

        total: total,

        percentage:
            percentage,

        grade:
            grade,

        attendance:
            attendance,

        remarks:
            remarks

    };


    /* =====================================================
       ADD STUDENT
    ===================================================== */

    students.push(student);


    /* =====================================================
       SAVE TO LOCAL STORAGE
    ===================================================== */

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

    document.getElementById(
        "adminMessage"
    ).innerText =
        "✅ Student report saved successfully!";


    alert(
        "Student report added successfully!"
    );


    /* =====================================================
       CLEAR FORM
    ===================================================== */

    clearStudentForm();


    /* =====================================================
       UPDATE TABLE
    ===================================================== */

    displayStudentList();

}


/* =========================================================
   CALCULATE GRADE
========================================================= */

function calculateGrade(percentage) {

    if (percentage >= 90) {

        return "A+";

    }

    else if (percentage >= 80) {

        return "A";

    }

    else if (percentage >= 70) {

        return "B";

    }

    else if (percentage >= 60) {

        return "C";

    }

    else if (percentage >= 50) {

        return "D";

    }

    else {

        return "F";

    }

}


/* =========================================================
   CLEAR FORM
========================================================= */

function clearStudentForm() {

    document.getElementById(
        "studentName"
    ).value = "";

    document.getElementById(
        "studentRoll"
    ).value = "";

    document.getElementById(
        "studentUsername"
    ).value = "";

    document.getElementById(
        "studentPassword"
    ).value = "";

    document.getElementById(
        "parentUsername"
    ).value = "";

    document.getElementById(
        "parentPassword"
    ).value = "";

    document.getElementById(
        "fed"
    ).value = "";

    document.getElementById(
        "aiml"
    ).value = "";

    document.getElementById(
        "os"
    ).value = "";

    document.getElementById(
        "iot"
    ).value = "";

    document.getElementById(
        "oop"
    ).value = "";

    document.getElementById(
        "maths"
    ).value = "";

    document.getElementById(
        "studentAttendance"
    ).value = "";

    document.getElementById(
        "studentRemarks"
    ).value = "";

}


/* =========================================================
   DISPLAY STUDENT LIST
========================================================= */

function displayStudentList() {

    const tableBody =
        document.getElementById(
            "studentTableBody"
        );


    tableBody.innerHTML = "";


    if (students.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    No students added yet.
                </td>
            </tr>
        `;

        return;
    }


    students.forEach(function(student) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.roll}
            </td>

            <td>
                ${student.name}
            </td>

            <td>
                ${student.username}
            </td>

            <td>
                ${student.percentage.toFixed(2)}%
            </td>

            <td>
                ${student.attendance}%
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">

                    Delete

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================================
   DELETE STUDENT
========================================================= */

function deleteStudent(id) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmation) {

        return;

    }


    students =
        students.filter(function(student) {

            return student.id !== id;

        });


    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    displayStudentList();

}


/* =========================================================
   STUDENT DASHBOARD
========================================================= */

function displayStudentDashboard(student) {

    const container =
        document.getElementById(
            "studentDashboardContent"
        );


    const attendanceClass =
        student.attendance >= 75
            ? "attendance-good"
            : "attendance-low";


    container.innerHTML = `

        <div class="report-container">


            <!-- STUDENT INFORMATION -->

            <div class="report-title">

                <h2>
                    📊 My Academic Report
                </h2>

                <div class="student-info">

                    <div class="info-box">

                        <small>
                            Student Name
                        </small>

                        <strong>
                            ${student.name}
                        </strong>

                    </div>


                    <div class="info-box">

                        <small>
                            Roll Number
                        </small>

                        <strong>
                            ${student.roll}
                        </strong>

                    </div>


                    <div class="info-box">

                        <small>
                            Username
                        </small>

                        <strong>
                            ${student.username}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- SUMMARY -->

            <div class="summary-grid">

                <div class="summary-card">

                    <div class="label">
                        Total Marks
                    </div>

                    <div class="number">
                        ${student.total}/600
                    </div>

                </div>


                <div class="summary-card">

                    <div class="label">
                        Percentage
                    </div>

                    <div class="number">
                        ${student.percentage.toFixed(2)}%
                    </div>

                </div>


                <div class="summary-card">

                    <div class="label">
                        Grade
                    </div>

                    <div class="number">
                        ${student.grade}
                    </div>

                </div>


                <div class="summary-card">

                    <div class="label">
                        Attendance
                    </div>

                    <div class="number
                        ${attendanceClass}">

                        ${student.attendance}%

                    </div>

                </div>

            </div>


            <!-- MARKS -->

            <div class="report-table">

                <h3>
                    📚 Subject-wise Marks
                </h3>

                <table>

                    <thead>

                        <tr>

                            <th>
                                Subject
                            </th>

                            <th>
                                Marks
                            </th>

                            <th>
                                Maximum
                            </th>

                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${createSubjectRow(
                            "FED",
                            student.marks.FED
                        )}

                        ${createSubjectRow(
                            "AIML",
                            student.marks.AIML
                        )}

                        ${createSubjectRow(
                            "OS",
                            student.marks.OS
                        )}

                        ${createSubjectRow(
                            "IOT",
                            student.marks.IOT
                        )}

                        ${createSubjectRow(
                            "OOP",
                            student.marks.OOP
                        )}

                        ${createSubjectRow(
                            "MATHS",
                            student.marks.MATHS
                        )}

                    </tbody>

                </table>

            </div>


            <!-- REMARKS -->

            <div class="remarks-box">

                <h3>
                    📝 Teacher Remarks
                </h3>

                <p>
                    ${student.remarks || "No remarks added."}
                </p>

            </div>

        </div>

    `;

}


/* =========================================================
   CREATE SUBJECT ROW
========================================================= */

function createSubjectRow(subject, marks) {

    let status;

    if (marks >= 40) {

        status =
            `<span class="attendance-good">
                Pass
            </span>`;

    }

    else {

        status =
            `<span class="attendance-low">
                Fail
            </span>`;

    }


    return `

        <tr>

            <td>
                <strong>
                    ${subject}
                </strong>
            </td>

            <td>
                ${marks}
            </td>

            <td>
                100
            </td>

            <td>
                ${status}
            </td>

        </tr>

    `;

}


/* =========================================================
   PARENT DASHBOARD
========================================================= */

function displayParentDashboard(student) {

    const container =
        document.getElementById(
            "parentDashboardContent"
        );


    const attendanceClass =
        student.attendance >= 75
            ? "attendance-good"
            : "attendance-low";


    container.innerHTML = `

        <div class="report-container">


            <!-- CHILD INFORMATION -->

            <div class="report-title">

                <h2>
                    👨‍👩‍👦 Child Academic Report
                </h2>

                <div class="student-info">

                    <div class="info-box">

                        <small>
                            Student Name
                        </small>

                        <strong>
                            ${student.name}
                        </strong>

                    </div>


                    <div class="info-box">

                        <small>
                            Roll Number
                        </small>

                        <strong>
                            ${student.roll}
                        </strong>

                    </div>


                    <div class="info-box">

                        <small>
                            Attendance
                        </small>

                        <strong
                            class="${attendanceClass}">

                            ${student.attendance}%

                        </strong>

                    </div>

                </div>

            </div>


            <!-- PERFORMANCE SUMMARY -->

            <div class="summary-grid">

                <div class="summary-card">

                    <div class="label">
                        Total Marks
                    </div>

                    <div class="number">
                        ${student.total}/600
                    </div>

                </div>


                <div class="summary-card">

                    <div class="label">
                        Percentage
                    </div>

                    <div class="number">
                        ${student.percentage.toFixed(2)}%
                    </div>

                </div>


                <div class="summary-card">

                    <div class="label">
                        Grade
                    </div>

                    <div class="number">
                        ${student.grade}
                    </div>

                </div>


                <div class="summary-card">

                    <div class="label">
                        Attendance
                    </div>

                    <div class="number
                        ${attendanceClass}">

                        ${student.attendance}%

                    </div>

                </div>

            </div>


            <!-- MARKS -->

            <div class="report-table">

                <h3>
                    📚 Subject Performance
                </h3>

                <table>

                    <thead>

                        <tr>

                            <th>
                                Subject
                            </th>

                            <th>
                                Marks
                            </th>

                            <th>
                                Maximum
                            </th>

                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${createSubjectRow(
                            "FED",
                            student.marks.FED
                        )}

                        ${createSubjectRow(
                            "AIML",
                            student.marks.AIML
                        )}

                        ${createSubjectRow(
                            "OS",
                            student.marks.OS
                        )}

                        ${createSubjectRow(
                            "IOT",
                            student.marks.IOT
                        )}

                        ${createSubjectRow(
                            "OOP",
                            student.marks.OOP
                        )}

                        ${createSubjectRow(
                            "MATHS",
                            student.marks.MATHS
                        )}

                    </tbody>

                </table>

            </div>


            <!-- ATTENDANCE -->

            <div class="remarks-box">

                <h3>
                    📅 Attendance Information
                </h3>

                <p>

                    Student attendance:
                    
                    <strong
                        class="${attendanceClass}">

                        ${student.attendance}%

                    </strong>

                </p>

                <br>

                <p>
                    ${
                        student.attendance >= 75
                        ? "Attendance is above the minimum level."
                        : "Attendance is below 75%. Please monitor attendance."
                    }
                </p>

            </div>


            <!-- REMARKS -->

            <div class="remarks-box">

                <h3>
                    📝 Teacher Remarks
                </h3>

                <p>
                    ${student.remarks || "No remarks added."}
                </p>

            </div>

        </div>

    `;

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    adminDashboard.classList.add("hidden");

    studentDashboard.classList.add("hidden");

    parentDashboard.classList.add("hidden");

    loginPage.classList.remove("hidden");


    document.getElementById(
        "loginUsername"
    ).value = "";

    document.getElementById(
        "loginPassword"
    ).value = "";

    document.getElementById(
        "loginError"
    ).innerText = "";

}


/* =========================================================
   INITIAL PAGE
========================================================= */

>>>>>>> b1ac613734c7546b0ea27b15645e15242433b80e
showHome();