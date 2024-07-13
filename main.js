// Add a new task
function addItem() {
  var add = document.querySelector("#addhogia");
  var txt = add.value;
  if (txt === "") {
    alert("Field cannot be empty!");
  } else {
    var expireTime = prompt("Enter the expiration time in minutes:", "30");
    if (expireTime === null || expireTime === "") {
      alert("Expiration time is required!");
      return;
    }

    var expireDate = new Date(Date.now() + expireTime * 60000); // Calculate the expiration time
    var lis = document.createElement("li");
    add.value = ""; // Clear the input field after adding a task

    // Create a div for the text
    var textDiv = document.createElement("div");
    textDiv.className = "task-text";
    textDiv.appendChild(document.createTextNode(txt));
    lis.appendChild(textDiv);

    // Create a span for the remaining time
    var timeSpan = document.createElement("span");
    timeSpan.className = "time-remaining";
    timeSpan.setAttribute("data-expire", expireDate); // Store the expiration time
    lis.appendChild(timeSpan);

    // Create a div for buttons
    var buttonDiv = document.createElement("div");
    buttonDiv.className = "buttons";

    // Edit button
    var editBut = document.createElement("button");
    editBut.textContent = "Edit";
    editBut.setAttribute("onclick", "editItem(this)");
    editBut.setAttribute("class", "But editButton");
    buttonDiv.appendChild(editBut);

    // Delete button
    var delBut = document.createElement("button");
    delBut.textContent = "Delete";
    delBut.setAttribute("onclick", "delItem(this)");
    delBut.setAttribute("class", "But delButton");
    buttonDiv.appendChild(delBut);

    lis.appendChild(buttonDiv);

    // Add list item to task list
    var ul = document.querySelector("#taskList");
    ul.appendChild(lis);
  }
}

// Delete a task
function delItem(e) {
  e.parentNode.parentNode.remove();
}

// Edit a task
function editItem(e) {
  var li = e.parentNode.parentNode;
  var currentText = li.querySelector(".task-text").textContent;
  var currentExpireDate = new Date(
    li.querySelector(".time-remaining").getAttribute("data-expire")
  );

  // Change background color when editing
  li.classList.add("editing");

  // Create an input field with the current text as its value
  var inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Edit Task";
  inputField.value = currentText;

  // Create an input field for expiration time
  var expireField = document.createElement("input");
  expireField.type = "number";
  expireField.placeholder = "Expiration Time (minutes)";
  expireField.value = Math.floor((currentExpireDate - Date.now()) / 60000);

  // Save button
  var saveBut = document.createElement("button");
  saveBut.textContent = "Save";
  saveBut.setAttribute("onclick", "saveItem(this)");
  saveBut.setAttribute("class", "But saveButton");

  // Create a container for input and button with flex properties
  var editContainer = document.createElement("div");
  editContainer.className = "edit-container"; // New container for flex properties
  editContainer.appendChild(inputField);
  editContainer.appendChild(expireField);
  editContainer.appendChild(saveBut);

  // Clear the current contents of the list item and add the edit container
  li.innerHTML = "";
  li.appendChild(editContainer); // Add the container instead of the input field and save button directly
}

// Save edited task
function saveItem(e) {
  var li = e.parentNode.parentNode; // Changed from e.parentNode to e.parentNode.parentNode
  var inputField = li.querySelector("input[type='text']");
  var expireField = li.querySelector("input[type='number']");

  // Get the new text from the input field
  var newText = inputField.value;
  var newExpireTime = expireField.value;
  if (newText === "" && newExpireTime === "") {
    alert("Please enter Tasks and Expiration Time!");
  } else if (newText === "") {
    alert("Please enter Tasks!");
  } else if (newExpireTime === "") {
    alert("Please enter Expiration Time!");
  } else {
    var newExpireDate = new Date(Date.now() + newExpireTime * 60000); // Calculate the new expiration time

    var textDiv = document.createElement("div");
    textDiv.className = "task-text";
    textDiv.appendChild(document.createTextNode(newText));

    var timeSpan = document.createElement("span");
    timeSpan.className = "time-remaining";
    timeSpan.setAttribute("data-expire", newExpireDate); // Store the new expiration time

    // Clear the current contents of the list item
    li.innerHTML = "";

    // Add the new text div
    li.appendChild(textDiv);
    li.appendChild(timeSpan);

    // Recreate the button div
    var buttonDiv = document.createElement("div");
    buttonDiv.className = "buttons";

    // Edit button
    var editBut = document.createElement("button");
    editBut.textContent = "Edit";
    editBut.setAttribute("onclick", "editItem(this)");
    editBut.setAttribute("class", "But editButton");
    buttonDiv.appendChild(editBut);

    // Delete button
    var delBut = document.createElement("button");
    delBut.textContent = "Delete";
    delBut.setAttribute("onclick", "delItem(this)");
    delBut.setAttribute("class", "But delButton");
    buttonDiv.appendChild(delBut);

    // Append the button div to the li
    li.appendChild(buttonDiv);

    // Remove the class name of editing class so it will become to its original position
    li.classList.remove("editing");
  }
}

function updateTime() {
  var now = new Date();
  var taskItems = document.querySelectorAll(".time-remaining");

  taskItems.forEach(function (item) {
    var expireDate = new Date(item.getAttribute("data-expire"));
    var TimeMilli = expireDate - now;

    if (TimeMilli <= 0) {
      item.textContent = "Expired";
      item.style.color = "red";
      item.style.paddingTop = "8px";
      item.style.paddingBottom = "8px";
      item.style.letterSpacing = "0.8px";
      var buttonsDiv = item.parentNode.querySelector(".buttons");
      if (buttonsDiv) {
        buttonsDiv.style.display = "none";
      }
    } else {
      var hours = Math.floor(TimeMilli / (1000 * 60 * 60));
      var minutes = Math.floor((TimeMilli % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((TimeMilli % (1000 * 60)) / 1000);
      item.style.color = "#6f6c6c"; // Change color for active tasks

      item.textContent = `Remaining Time: ${hours}h ${minutes}m ${seconds}s`;
    }
  });
}

setInterval(updateTime, 1000); // Update every second
updateTime(); // Call immediately to update times on load
