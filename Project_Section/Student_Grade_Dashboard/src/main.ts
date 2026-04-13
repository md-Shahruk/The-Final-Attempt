
const inputName = document.getElementById("input-name") as HTMLInputElement;
const inputMark = document.getElementById("input-mark") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const tableBody = document.getElementById("student-table") as HTMLTableSectionElement;
const filterBtns = document.querySelectorAll<HTMLButtonElement>(".filter-btn");

const statTotal = document.getElementById("stat-total") as HTMLElement;
const statAvg = document.getElementById("stat-avg") as HTMLElement;
const statPass = document.getElementById("stat-pass") as HTMLElement;
const statFail = document.getElementById("stat-fail") as HTMLElement;

const toast = document.getElementById("toast") as HTMLElement;
const toastMsg = document.getElementById("toast-msg") as HTMLElement;
const toastDot = document.getElementById("toast-dot") as HTMLElement;

interface Student {
    id: number;
    name: string;
    mark: number;
    grade: string;
    status: "Pass" | "Fail";
}

/// Student add
let students: Student[] = [];
let currentFilter: string = "all"; 

addBtn?.addEventListener('click', function () {
    addStudentFunction();
});


const findGrade = (mark: number): string =>
    mark >= 80 ? "A" :
        mark >= 70 ? "B" :
            mark >= 60 ? "C" :
                mark >= 50 ? "D" : "F";

function addStudentFunction() {

    const inputNameValue = inputName.value;
    const inputMarkValue = inputMark.value;
    const g = findGrade(Number(inputMarkValue));
    const status = g === 'F' ? "Fail" : "Pass";

    const newId = Date.now();

    const student: Student = {
        id: newId,
        name: inputNameValue,
        mark: Number(inputMarkValue),
        grade: g,
        status: status
    }

    students.push(student);
    renderTable();
    updateStats();

    inputName.value = '';
    inputMark.value = '';
}

function renderTable(data: Student[] = students) {
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
        const delBtn = row.querySelector('.del-btn') as HTMLButtonElement;
        delBtn.addEventListener('click', () => {
            deleteStudent(student.id);
        });

        tableBody.appendChild(row);
    });
}
// delete student
function deleteStudent(id: number): void {
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

function myFilter(arr: Student[], fnn: (item: Student) => boolean): Student[] {
    const res: Student[] = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item && fnn(item)) {
            res.push(item);
        }
    }
    return res;
}

function myReduce(arr: Student[], fnn: (acc: number, item: Student) => number, initial: number): number {
    let acc: number = initial;
    for (let i = 0; i < arr.length; i++) {

        acc = fnn(acc, arr[i]);
    }
    return acc;
}


/// filter apply



function applyFilter(filter: string): void {
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
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter ?? "all";
        applyFilter(currentFilter);
    });
});