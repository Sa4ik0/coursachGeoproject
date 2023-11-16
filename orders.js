function fetchData() {
  fetch('http://localhost:3000/getOrders')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderTable(data);
    })
    .catch(error => {
      console.error('Error fetching orders:', error);
    });
}

function renderTable(data) {
  let tableBody = document.getElementById('dataBody');
  tableBody.innerHTML = ''; 

  // Перебираем каждый элемент массива
  data.forEach(function(item) {
    let row = document.createElement('tr');

    // Создаем ячейки и заполняем их данными
    let properties = ['id', 'price', 'phone', 'surname', 'name', 'lastname', 'town', 'size', 'hard'];
    properties.forEach(function(prop) {
      let cell = document.createElement('td');
      cell.textContent = item[prop];
      row.appendChild(cell);
    });

    // Добавляем класс "completed" для выполненных заказов
    if (item.completed) {
      row.classList.add('completed');
    }

    // Добавляем ячейкии
    let actionCell = document.createElement('td');
    let editCell = document.createElement('td');

    let actionButton = document.createElement('button');
    let editButton = document.createElement('button');

    actionButton.textContent = item.completed ? 'ГОТОВ' : 'НЕ ГОТОВ';
    editButton.textContent = 'Редакт'

    actionButton.onclick = function() {
      toggleOrderStatus(item.id, !item.completed);
    };

    editButton.onclick = () => {
      editOrder(item.id);
    };

    actionCell.appendChild(actionButton);
    editCell.appendChild(editButton);

    row.appendChild(editCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}

function renderTable(data) {
  let tableBody = document.getElementById('dataBody');
  tableBody.innerHTML = '';

  data.forEach(function(item) {
    let row = document.createElement('tr');

    let properties = ['id', 'price', 'phone', 'surname', 'name', 'lastname', 'town', 'size', 'hard'];
    properties.forEach(function(prop) {
      let cell = document.createElement('td');

      // Создаем редактируемый элемент
      let editableElement = document.createElement('input');
      editableElement.value = item[prop];
      editableElement.readOnly = true; // по умолчанию не редактируемый

      editableElement.ondblclick = function() {
        // Двойной клик для начала редактирования
        editableElement.readOnly = false;
      }

      editableElement.onblur = function() {
        // Потеря фокуса для сохранения изменений
        editableElement.readOnly = true;
        updateOrderProperty(item.id, prop, editableElement.value);
      }

      editableElement.onkeypress = function(e) {
        // Нажатие Enter для сохранения изменений
        if (e.key === 'Enter') {
          editableElement.readOnly = true;
          updateOrderProperty(item.id, prop, editableElement.value);
        }
      }

      cell.appendChild(editableElement);
      row.appendChild(cell);
    });

    let actionCell = document.createElement('td');

    let actionButton = document.createElement('button');

    actionButton.textContent = item.completed ? 'ГОТОВ' : 'НЕ ГОТОВ';

    actionButton.onclick = function() {
      toggleOrderStatus(item.id, !item.completed);
    };

    actionCell.appendChild(actionButton);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}


function toggleOrderStatus(orderId, newStatus) {
  // Обновляем статус заказа на сервере
  updateOrderStatusOnServer(orderId, newStatus);

  // Обновляем локальные данные и интерфейс
  fetchData();
}

function updateOrderProperty(orderId, property, value) {
  fetch(`http://localhost:3000/updateOrderProperty/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ property: property, value: value }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Order property updated:', data);
    // При необходимости обновите данные в таблице или уведомите пользователя
  })
  .catch(error => {
    console.error('Error updating order property:', error);
  });
}

function updateOrderStatusOnServer(orderId, newStatus) {
  fetch(`http://localhost:3000/updateOrderStatus/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Order status updated on server:', data);
  })
  .catch(error => {
    console.error('Error updating order status on server:', error);
  });
}

fetchData();