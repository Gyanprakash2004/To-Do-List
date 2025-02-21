const inputBox = document.getElementById("input-box");
const listContainor = document.getElementById("list-containor");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainor.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // use the "×" character
        li.appendChild(span);

        // Add the event listener for the newly added task
        li.addEventListener("click", function () {
            li.classList.toggle("checked");
            saveData(); // Save the task's state when clicked
        });
    }

    inputBox.value = "";
    saveData(); // Save the updated list after adding the task
}

listContainor.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); // Remove the task when the span is clicked
        saveData(); // Save after removal
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainor.innerHTML); // Save list data to localStorage
}

function showTask() {
    listContainor.innerHTML = localStorage.getItem("data") || ''; // Load list data from localStorage

    // Add event listeners for any tasks that were loaded from localStorage
    let liItems = listContainor.querySelectorAll("li");
    liItems.forEach(function (li) {
        li.addEventListener("click", function () {
            li.classList.toggle("checked");
            saveData(); // Save after toggling the checked state
        });
    });
}

// Load tasks on page load
showTask();
