let getData = async (URL) => {
    let response = await fetch(URL);
    let data = await response.json();
    return data;
};

let showStudentsBtn = document.querySelector("#showStudents");

async function renderData() {
    let students = await getData("https://api.mocki.io/v2/01047e91/students");
    let schools = await getData("https://api.mocki.io/v2/01047e91/schools")

    showStudentsBtn.addEventListener("click", () => {
        students.forEach((student) => {
           let li = document.createElement("li")
           li.textContent = `${student.firstName} ${student.lastName}`
           document.querySelector("#studentList").appendChild(li);
        });
    })
}