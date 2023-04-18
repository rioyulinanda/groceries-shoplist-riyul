// select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
const EDIT = "fa-pencil edit";

// variables
let LIST = [],
  id = 0;

// show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add event listener to clear button to reload page
clear.addEventListener("click", function () {
  location.reload();
});

// add to do function
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
    <li class="item">
      <i class="fa ${DONE} co" job="complete" id="${id}"></i>
      <p class="text ${LINE}">${toDo}</p>
      <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
      <i class="fa fa-pencil edit" job="edit" id=${id}></i>
    </li>
  `;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);

  // Select the newly added edit icon and bind the editToDo function
  const editButton = document.querySelector(`[id='${id}'].edit`);
  editButton.addEventListener("click", function (event) {
    editToDo(event.target);
  });
}

// fetch data from API
async function fetchShoppinglist() {
  try {
    const response = await fetch(
      "https://64244be047401740433818a7.mockapi.io/ShoppingLists"
    );
    const jsonData = await response.json();

    // update LIST array and render list items
    LIST = jsonData;
    LIST.forEach((item) => addToDo(item.name, item.id, item.done, item.trash));
  } catch (e) {
    console.error(e.message);
  }
}

fetchShoppinglist();

// hit the enter key
document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const toDo = input.value;

    // if the input isn't empty
    if (toDo) {
      // add the new item to the server
      fetch("https://64244be047401740433818a7.mockapi.io/ShoppingLists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: toDo,
          done: false,
          trash: false,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // add the new item to the local list
          LIST.push(data);
          addToDo(data.name, data.id, data.done, data.trash);
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });

      // update item id for next item
      id++;
    }
    input.value = "";
  }
});

// complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// edit to do
async function editToDo(element) {
  const itemId = element.id;

  // get the current text and replace it with an input field
  const currentText = LIST[itemId].name;
  element.parentNode.querySelector(".text").innerHTML = `
    <input type="text" placeholder="Edit To-Do" value="${currentText}" class="editInput" style="font-family: 'Changa', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.5; color: #455c6a;">
  `;

  // focus on the input field
  const editInput = element.parentNode.querySelector(".editInput");
  editInput.focus();
  editInput.setSelectionRange(0, editInput.value.length);

  // add event listener for input field
  editInput.addEventListener("keyup", async function (event) {
    if (event.key === "Enter") {
      const newText = editInput.value.trim();

      if (newText) {
        try {
          // update the item in the server
          await fetch(
            `https://64244be047401740433818a7.mockapi.io/ShoppingLists/${itemId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: newText,
                done: LIST[itemId].done,
                trash: LIST[itemId].trash,
              }),
            }
          );

          // update the item in the local list
          LIST[itemId].name = newText;
          element.parentNode.querySelector(".text").innerHTML = newText;
        } catch (e) {
          console.error(e.message);
        }
      }
    }
  });
}

// remove to do
async function removeToDo(element) {
  const itemId = element.id;

  try {
    await fetch(
      `https://64244be047401740433818a7.mockapi.io/ShoppingLists/${itemId}`,
      {
        method: "DELETE",
      }
    );

    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[itemId].trash = true;
  } catch (e) {
    console.error(e.message);
  }
}

// remove to do
async function removeToDo(element) {
  const itemId = element.id;

  try {
    await fetch(
      `https://64244be047401740433818a7.mockapi.io/ShoppingLists/${itemId}`,
      {
        method: "DELETE",
      }
    );

    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[itemId].trash = true;
  } catch (e) {
    console.error(e.message);
  }
}

// remove to do
async function removeToDo(element) {
  const itemId = element.id;

  try {
    await fetch(
      `https://64244be047401740433818a7.mockapi.io/ShoppingLists/${itemId}`,
      {
        method: "DELETE",
      }
    );

    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[itemId].trash = true;
  } catch (e) {
    console.error(e.message);
  }
}

// target the items created dynamically
list.addEventListener("click", function (event) {
  const element = event.target; // return the clicked element inside list
  const elementJob = element.attributes.job.value; // complete, delete or edit

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  } else if (elementJob == "edit") {
    editToDo(element);
  }
});
