const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const clearBtn = document.getElementById('clear');
const formbtn = itemForm.querySelector('button');
let isEditMode = false;

// retrieve items from localstorage and display
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDom(item);
  });
  checkUI();
}

// create button
function createButton(...classes) {
  const button = document.createElement('button');
  button.className = classes.join(' ');
  return button;
}

// create icon
function createIcon(...classes) {
  const icon = document.createElement('i');
  icon.className = classes.join(' ');
  return icon;
}

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  if (!newItem) {
    return alert('Please add an item');
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    itemToEdit.classList.remove('edit-mode');

    if (checkIfItemExists(newItem)) {
      alert('That item already exists');
      return checkUI();
    }

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.remove();
    isEditMode = false;
  } else if (checkIfItemExists(newItem)) {
    return alert('That item already exists');
  }

  addItemToDom(newItem);
  addItemToStorage(newItem);
  itemInput.value = '';
  checkUI();
}

// add item to dom
function addItemToDom(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item', 'btn-link', 'text-red');
  li.appendChild(button);

  const icon = createIcon('fa-solid', 'fa-xmark');
  button.appendChild(icon);

  itemList.appendChild(li);
}

// add item to storage
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// get items from storage
function getItemsFromStorage() {
  const itemsFromStorage = localStorage.getItem('items');

  return itemsFromStorage === null ? [] : JSON.parse(itemsFromStorage);
}

// set item to edit
function setItemToEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll('li')
    .forEach((el) => el.classList.remove('edit-mode'));

  item.classList.add('edit-mode');

  formbtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update item';
  formbtn.style.backgroundColor = '#228b22';

  itemInput.value = item.textContent;
  itemInput.focus();
}

// get the target item
function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.tagName === 'LI') {
    setItemToEdit(e.target);
  }
}

// check for duplicate item
function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  const lowerCaseItem = item.toLowerCase();

  return itemsFromStorage.some((item) => item.toLowerCase() === lowerCaseItem);
}

// remove item from dom
function removeItem(item) {
  if (confirm('Are you sure ?')) {
    item.remove();
    removeItemFromStorage(item.textContent);
    checkUI();
  }
}

// remove item from storage
function removeItemFromStorage(item) {
  const updatedItems = getItemsFromStorage().filter((el) => el !== item);

  localStorage.setItem('items', JSON.stringify(updatedItems));
}

// clear all items from dom
function clearItems() {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }

  localStorage.removeItem('items');
  checkUI();
}

// if no items clear filter and clearall btn
function checkUI() {
  itemInput.value = '';

  const hasItems = itemList.firstElementChild;
  clearBtn.style.display = hasItems ? 'block' : 'none';
  itemFilter.style.display = hasItems ? 'block' : 'none';

  formbtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formbtn.style.backgroundColor = '#333';
  isEditMode = false;
}

// filter items
function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase().trim();
    item.style.display = itemName.includes(text) ? 'flex' : 'none';
  });
}

// initialize app
(function () {
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  checkUI();
})();
