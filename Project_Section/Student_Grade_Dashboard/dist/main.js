const inputName = document.getElementById("input-name");
const inputMark = document.getElementById("input-mark");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("student-table");
const filterBtns = document.querySelectorAll(".filter-btn");
const statTotal = document.getElementById("stat-total");
const statAvg = document.getElementById("stat-avg");
const statPass = document.getElementById("stat-pass");
const statFail = document.getElementById("stat-fail");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toast-msg");
const toastDot = document.getElementById("toast-dot");
/// Student add
let students = [];
let currentFilter = "all";
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener('click', function () {
    addStudentFunction();
});
const findGrade = (mark) => mark >= 80 ? "A" :
    mark >= 70 ? "B" :
        mark >= 60 ? "C" :
            mark >= 50 ? "D" : "F";
function addStudentFunction() {
    const inputNameValue = inputName.value;
    const inputMarkValue = inputMark.value;
    const g = findGrade(Number(inputMarkValue));
    const status = g === 'F' ? "Fail" : "Pass";
    const newId = Date.now();
    const student = {
        id: newId,
        name: inputNameValue,
        mark: Number(inputMarkValue),
        grade: g,
        status: status
    };
    students.push(student);
    renderTable();
    updateStats();
    inputName.value = '';
    inputMark.value = '';
}
function renderTable(data = students) {
    tableBody.innerHTML = "";
    data.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.mark}</td>
        <td><span class="grade-badge grade-${student.grade}">${student.grade}</span></td>
        
        <td><span class="status-${student.status.toLowerCase()}">${student.status}</span></td>
        <td><button class="del-btn">✕</button></td>
        `;
        const delBtn = row.querySelector('.del-btn');
        delBtn.addEventListener('click', () => {
            deleteStudent(student.id);
        });
        tableBody.appendChild(row);
    });
}
// delete student
function deleteStudent(id) {
    students = myFilter(students, (student) => student.id !== id);
    renderTable();
    updateStats();
}
function updateStats() {
    statTotal.textContent = String(students.length);
    const passedStudents = myFilter(students, (student) => student.status === "Pass");
    statPass.textContent = String(passedStudents.length);
    const failStudents = myFilter(students, (student) => student.status === "Fail");
    statFail.textContent = String(failStudents.length);
    const total = myReduce(students, (acc, student) => acc + student.mark, 0);
    const avg = total / students.length;
    statAvg.textContent = avg.toFixed(1);
}
function myFilter(arr, fnn) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item && fnn(item)) {
            res.push(item);
        }
    }
    return res;
}
function myReduce(arr, fnn, initial) {
    let acc = initial;
    for (let i = 0; i < arr.length; i++) {
        acc = fnn(acc, arr[i]);
    }
    return acc;
}
/// filter apply
function applyFilter(filter) {
    if (filter === "all") {
        renderTable(students);
        return;
    }
    if (filter === "Pass" || filter === "Fail") {
        const filtered = myFilter(students, (student) => student.status === filter);
        renderTable(filtered);
        return;
    }
    const filtered = myFilter(students, (student) => student.grade === filter);
    renderTable(filtered);
}
filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        var _a;
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = (_a = btn.dataset.filter) !== null && _a !== void 0 ? _a : "all";
        applyFilter(currentFilter);
    });
});
export {};
//# sourceMappingURL=main.js.map