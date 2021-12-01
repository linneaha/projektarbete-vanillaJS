let getData = async (URL) => {
    let response = await fetch(URL);
    let data = await response.json();
    return data;
};

let showStudentsBtn = document.querySelector("#showStudents");
let studentList = document.querySelector("#studentList");
let filterContent = document.querySelector("#filterContent");
let studentContent = document.querySelector("#studentContent");

// filtrering radiobutton
let age = document.createElement("input");
let firstName = document.createElement("input");
let lastName = document.createElement("input");
let filterButton = document.createElement("button");

age.setAttribute("type", "radio");
age.setAttribute("type", "radio");
age.setAttribute("name", "filter")
age.setAttribute("value", "age")

firstName.setAttribute("type", "radio");
firstName.setAttribute("type", "radio");
firstName.setAttribute("name", "filter")
firstName.setAttribute("value", "Firstname")

lastName.setAttribute("type", "radio");
lastName.setAttribute("type", "radio");
lastName.setAttribute("name", "filter")
lastName.setAttribute("value", "Lastname")

// dropdown med skolor som filtrering
let dropDown = document.createElement("select");
   
let chooseOption = document.createElement("option")
let frontendOption = document.createElement("option");
let netOption = document.createElement("option");
let backendOption = document.createElement("option");

chooseOption.setAttribute("value", "Choose")
frontendOption.setAttribute("value", "Frontend");
netOption.setAttribute("value", ".NET");
backendOption.setAttribute("value", "Backend");

chooseOption.textContent = "Choose school";
frontendOption.textContent = "Frontend";
netOption.textContent = ".NET";
backendOption.textContent = "Backend";

dropDown.add(chooseOption);
dropDown.add(frontendOption);
dropDown.add(netOption);
dropDown.add(backendOption); 

let filteredSchools = [];

let renderData = async () => {
    let students = await getData("https://api.mocki.io/v2/01047e91/students");
    let schools = await getData("https://api.mocki.io/v2/01047e91/schools");

// Visa studenter-knapp
    showStudentsBtn.addEventListener("click", () => {
        filterContent.innerHTML = "";
        studentList.innerHTML = "";
        filterContent.append(dropDown, age, firstName, lastName);
     
        students.forEach((student) => {
           let li = document.createElement("li")
           li.textContent = `${student.firstName} ${student.lastName}`
           studentList.appendChild(li);
        });
    });

    dropDown.addEventListener("click", ()=>{
        studentList.textContent = "";
    if (dropDown.value === "Frontend") {
        filteredSchools = students.filter((student) => student.programme === "Frontend");
    } else if (dropDown.value === ".NET") {
        filteredSchools = students.filter((student) => student.programme === ".NET");
    } else if (dropDown.value === "Backend"){
        filteredSchools = students.filter((student) => student.programme === "Backend");
    } else {
        studentList.textContent = "";
    }
    filteredSchools.forEach((student)=> {
        let li = document.createElement("li")
           li.textContent = `${student.firstName} ${student.lastName}`
           studentList.appendChild(li);
    })
});
}
renderData();