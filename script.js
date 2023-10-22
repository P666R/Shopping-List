const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const clearBtn = document.getElementById('clear');

function createButton(...classes) {
  const button = document.createElement('button');
  button.className = classes.join(' ');
  return button;
}

function createIcon(...classes) {
  const icon = document.createElement('i');
  icon.className = classes.join(' ');
  return icon;
}

// add item
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  if (!newItem) {
    return alert('Please add an item');
  }

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item', 'btn-link', 'text-red');
  li.appendChild(button);

  const icon = createIcon('fa-solid', 'fa-xmark');
  button.appendChild(icon);

  itemList.appendChild(li);
  itemInput.value = '';
  checkUI();
}

// remove item
function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure ?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
}

// clear all items
function clearItems() {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  checkUI();
}

function checkUI() {
  const hasItems = itemList.firstElementChild;
  clearBtn.style.display = hasItems ? 'block' : 'none';
  itemFilter.style.display = hasItems ? 'block' : 'none';
}

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase().trim();
    item.style.display = itemName.includes(text) ? 'flex' : 'none';
  });
}

// Event listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
