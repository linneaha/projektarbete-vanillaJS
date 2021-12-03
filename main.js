let showStudentsBtn = document.querySelector("#showStudents");
let studentList = document.querySelector("#studentList");
let filterContent = document.querySelector("#filterContent");
let studentContent = document.querySelector("#studentContent");
let filterButton = document.querySelector("#filter");
let inputs = document.querySelectorAll("[name = 'filter']");
let programme = document.querySelectorAll("[name='programme']")
let dropDown = document.querySelector("select");
let searchField = document.querySelector("#searchField");
let searchBtn = document.querySelector("#searchBtn")

let filteredStudents = [];
let filterOptions = "";
let programmeFilter = "";

let getData = async (URL) => {
    let response = await fetch(URL);
    let data = await response.json();
    return data;
};

let list = (arr) => {
    arr.forEach((student) => {
        let li = document.createElement("li")
        li.textContent = `${student.firstName} ${student.lastName}, ${student.age}`
        studentList.appendChild(li)

        li.addEventListener("click", () => {
            let ul = document.createElement("ul");
            let childLi = document.createElement("li");

            li.appendChild(ul);
            ul.appendChild(childLi);

            childLi.textContent = student.hobbies;
            // jag behöver få ut dessa två arrays och filrera så matchande kommer i en ny array som jag forEach
        })
    })
}

let filter = () => {
    if (dropDown.value === "stigande"){ 
    if (filterOptions === "age") {
        filteredStudents.sort((a, b) => a.age - b.age);
    } else if (filterOptions === "firstName") {
        filteredStudents.sort((a, b) => a.firstName.localeCompare(b.firstName))
    } else {
        filteredStudents.sort((a, b) => a.lastName.localeCompare(b.lastName))
    }
} else {
    if (filterOptions === "age") {
        filteredStudents.sort((a, b) => b.age - a.age);
    } else if (filterOptions === "firstName") {
        filteredStudents.sort((a, b) => b.firstName.localeCompare(a.firstName))
    } else {
        filteredStudents.sort((a, b) => b.lastName.localeCompare(a.lastName))
    }
}
}

let renderData = async () => {
    let students = await getData("https://api.mocki.io/v2/01047e91/students");
    let schools = await getData("https://api.mocki.io/v2/01047e91/schools");

    showStudentsBtn.addEventListener("click", () => {
        studentList.textContent = "";
        list(students);    
    });

    filterButton.addEventListener("click", () => {
        studentList.textContent = "";

        inputs.forEach((input) => {
            if (input.checked) {
                filterOptions = input.value;
            }
        })
        programme.forEach((input) => {
            if(input.checked) {
                programmeFilter = input.value;
            }
        })

        if (programmeFilter === "frontend") {
            filteredStudents = students.filter((student) => student.programme === "Frontend");
            filter();
        } else if (programmeFilter === ".net") {
            filteredStudents = students.filter((student) => student.programme === ".NET");
            filter();
        } else if (programmeFilter === "backend") {
            filteredStudents = students.filter((student) => student.programme === "Backend");
            filter();
        } else {

            if (dropDown.value === "stigande"){ 
                if (filterOptions === "age") {
                    filteredStudents = students.sort((a, b) => a.age - b.age);
                } else if (filterOptions === "firstName") {
                    filteredStudents = students.sort((a, b) => a.firstName.localeCompare(b.firstName))
                } else {
                    filteredStudents = students.sort((a, b) => a.lastName.localeCompare(b.lastName))
                }
            } else {
                if (filterOptions === "age") {
                    filteredStudents = students.sort((a, b) => b.age - a.age);
                } else if (filterOptions === "firstName") {
                    filteredStudents = students.sort((a, b) => b.firstName.localeCompare(a.firstName))
                } else {
                    filteredStudents = students.sort((a, b) => b.lastName.localeCompare(a.lastName))
                }
            }
        }
        list(filteredStudents);
    })

    searchBtn.addEventListener("click", () => {
        let input = searchField.value.toUpperCase();
        students.forEach((student) =>{
            let name = student.firstName;
            let surname = student.lastName;
            if (input === name) {
                let li = document.createElement("li")
                li.textContent = `${student.firstName} ${student.lastName}, ${student.age}`
                studentList.appendChild(li)
            }
        })
    })
}
renderData();


// if (ul.style.display === "none") {
//     ul.style.display = "block";
//   } else {
//     ul.style.display = "none";
//   }

// li.addEventListener("click", () => {
//     let shared = students.filter((hobby) => schools.includes(hobby));
//     console.log(shared)
// });
// if varuiabel ==== hobby
// för att plocka upp stringen i skolorna


// shared.forEach((match) =>
//      let sharedUl = document.createElement("ul");
//      studentList
//    let li = document.createElement("li")
//    li.textContent = match;
//    studentList.appendChild(li);
// });

// students.forEach((student)=> {
//     let hobby = student.hobbies;
//     schools.forEach((school)=> {
//      let activity = school.activities;
//      shared = hobby.filter((match)=> activity.includes(match));
//      console.log(shared)
//     })
// })

// let hobby = student.hobbies;
// schools.forEach((school)=> {
//     let activity = school.activities;
//     let shared = hobby.filter((match)=> activity.includes(match));
//     shared.forEach(match=> {
//         let matchli = document.createElement("li")
//         let ul = document.createElement("ul")
//         li.appendChild(ul);
//         ul.appendChild(matchli)
//         matchli.textContent = match.name;
// })
// console.log(shared)
// })