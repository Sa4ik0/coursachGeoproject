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
  tableBody.innerHTML = ''; // Очищаем содержимое tbody перед перерисовкой

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

    // Добавляем ячейку для кнопки "Заказ выполнен" или "Вернуть заказ"
    let actionCell = document.createElement('td');
    let actionButton = document.createElement('button');
    actionButton.textContent = item.completed ? 'Вернуть заказ' : 'Заказ выполнен';
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

// Вызываем fetchData() для загрузки данных при загрузке страницы
fetchData();