const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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
}

// Event listeners
itemForm.addEventListener('submit', addItem);
