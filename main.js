let showStudentsBtn = document.querySelector("#showStudents");
let studentList = document.querySelector("#studentList");
let filterButton = document.querySelector("#filter");
let inputs = document.querySelectorAll("[name = 'filter']");
let programme = document.querySelectorAll("[name='programme']");
let dropDown = document.querySelector("select");
let searchField = document.querySelector("#searchField");

let filteredStudents = [];
let filterOptions = "";
let programmeFilter = "";

const getData = async (URL) => {
    let response = await fetch(URL);
    let data = await response.json();
    return data;
};

const list = (arr) => {
    arr.forEach((student) => {
        let li = document.createElement("li");
        li.textContent = `${student.firstName} ${student.lastName}, ${student.age}`;
        studentList.appendChild(li);
    })
}

const filter = () => {
    if (dropDown.value === "ascending") { 
        if (filterOptions === "age") {
            filteredStudents.sort((a, b) => a.age - b.age);
        } else if (filterOptions === "firstName") {
            filteredStudents.sort((a, b) => a.firstName.localeCompare(b.firstName));
        } else {
            filteredStudents.sort((a, b) => a.lastName.localeCompare(b.lastName));
        }
    } else {
        if (filterOptions === "age") {
            filteredStudents.sort((a, b) => b.age - a.age);
        } else if (filterOptions === "firstName") {
            filteredStudents.sort((a, b) => b.firstName.localeCompare(a.firstName));
        } else {
            filteredStudents.sort((a, b) => b.lastName.localeCompare(a.lastName));
        }
    }
}

const renderData = async () => {
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

            if (dropDown.value === "ascending"){ 
                if (filterOptions === "age") {
                    filteredStudents = students.sort((a, b) => a.age - b.age);
                } else if (filterOptions === "firstName") {
                    filteredStudents = students.sort((a, b) => a.firstName.localeCompare(b.firstName));
                } else {
                    filteredStudents = students.sort((a, b) => a.lastName.localeCompare(b.lastName));
                }
            } else {
                if (filterOptions === "age") {
                    filteredStudents = students.sort((a, b) => b.age - a.age);
                } else if (filterOptions === "firstName") {
                    filteredStudents = students.sort((a, b) => b.firstName.localeCompare(a.firstName));
                } else {
                    filteredStudents = students.sort((a, b) => b.lastName.localeCompare(a.lastName));
                }
            }
        }

        filteredStudents.forEach((student) => {
            let li = document.createElement("li");
            li.textContent = `${student.firstName} ${student.lastName}, ${student.age}`;
            studentList.appendChild(li);

            let ul = document.createElement("ul");
            ul.style.display = "none"; 
            li.appendChild(ul);

            schools.forEach(school => {
                let childLi = document.createElement("li");
                childLi.textContent = school.name; 
                ul.appendChild(childLi);
                
                if (student.hobbies.every(match => school.activities.includes(match)) && school.programmes.indexOf(student.programme) > -1) {
                    childLi.style.color = "green";
                    ul.insertBefore(childLi, ul.childNodes[0]);

                } else if (school.programmes.indexOf(student.programme) > -1) {
                    childLi.style.color = "darkOrange";

                    if (ul.firstChild.style.color === "green" || ul.childNodes[0].style.color === "green" && ul.childNodes[1].style.color === "green") {
                        ul.insertBefore(childLi, ul.childNodes[1]);
                    } else {
                        ul.insertBefore(childLi, ul.childNodes[0]);
                    }

                } else { 
                    childLi.style.color = "red";
                    ul.appendChild(childLi, ul.lastChild);
                }

                li.addEventListener("click", () => {
                    if (ul.style.display === "none") {
                        ul.style.display = "block";
                    } else {
                        ul.style.display = "none";
                    }
                })
            })
        })
    })

    searchField.addEventListener("keyup", () => {
        studentList.textContent = "";
        let input = searchField.value.toLowerCase();
        
        let searchStudents = students.filter((student) => {
            let firstName = student.firstName.toLowerCase();
            let lastName = student.lastName.toLowerCase();
            let programme = student.programme.toLowerCase();
            let wholeName = student.firstName.toLowerCase() + " " + student.lastName.toLowerCase();
            let hobby = student.hobbies.find(match => match.includes(input));

            return firstName === input || lastName === input || wholeName === input || programme.includes(input) || hobby;
        });
        list(searchStudents);
    })
}
renderData();