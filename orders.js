const fetchData = () => {
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

const renderTable = (data) => {
  let tableBody = document.getElementById('dataBody');
  tableBody.innerHTML = '';

  data.forEach((item) => {
    let row = document.createElement('tr');

    let properties = ['id', 'price', 'phone', 'surname', 'name', 'lastname', 'town', 'size', 'hard'];
    properties.forEach((prop) => {
      let cell = document.createElement('td');

      // Создаем редактируемый элемент
      let editableElement = document.createElement('input');
      if (prop == 'id' || prop == 'price' || prop == "size" || prop == 'hard') {
        cell.innerText = item[prop];
        if (prop == "price") {
          cell.classList = 'price'
        } else if (prop == "hard") {
          cell.classList = 'hard'
        } else if (prop == "size") {
          cell.classList = 'size'
        }
      }  else {
        if (prop == 'town') {
          cell.classList = 'town'
        } else if (prop == 'surname') {
          cell.classList = 'surname'
        } else if (prop == 'name') {
          cell.classList = 'name'
        } else if (prop == 'lastname') {
          cell.classList = 'lastname'
        } 
        editableElement.value = item[prop];
        editableElement.readOnly = true;
        cell.appendChild(editableElement);
      }
      // editableElement.value = item[prop];
      // editableElement.readOnly = true; // по умолчанию не редактируемый

      editableElement.ondblclick = () => {
        // Двойной клик для начала редактирования
        editableElement.readOnly = false;
      }

      editableElement.addEventListener('blur', () => {
        // Потеря фокуса для сохранения изменений
        editableElement.readOnly = true;
        updateOrderProperty(item.id, prop, editableElement.value);
      })

      editableElement.onkeypress = (e) => {
        // Нажатие Enter для сохранения изменений
        if (e.key === 'Enter') {
          editableElement.readOnly = true;
          updateOrderProperty(item.id, prop, editableElement.value);
        }
      }
      row.appendChild(cell);
    });

    let actionCell = document.createElement('td');

    let actionButton = document.createElement('button');

    actionButton.textContent = item.completed ? 'ГОТОВ' : 'НЕ ГОТОВ';

    actionButton.onclick = () => {
      toggleOrderStatus(item.id, !item.completed);
    };

    actionCell.appendChild(actionButton);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}

let side = true;
let hardSide = true;

$('th').click((e) =>{
  if (e.target.textContent == "Цена") {
    const table = $('#dataBody');
    const rows = table.find('tr').toArray();

    rows.sort((a, b) => {
      const priceA = parseFloat($(a).find('td.price').text());
      const priceB = parseFloat($(b).find('td.price').text());

      if (side) {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    table.empty();

    $.each(rows, (index, row) => {
      table.append(row);
    });

    side = !side; // Изменяем направление сортировки
  } else if (e.target.textContent == "Сложность") {
    const table = $('#dataBody');
    const rows = table.find('tr').toArray();
    rows.sort((a, b) => {
      const difficultyA = $(a).find('td.hard').text().trim(); // Получаем текст из столбца "Сложность"
      const difficultyB = $(b).find('td.hard').text().trim();

      if (side) {
        return difficultyA.localeCompare(difficultyB); // Сортировка по алфавиту
      } else {
        return difficultyB.localeCompare(difficultyA); // Обратная сортировка
      }
    });

    table.empty();

    $.each(rows, (index, row) => {
      table.append(row);
    });

    side = !side; // Переключаем направление сортировки
  } else if (e.target.textContent == "Город") {
    const table = $('#dataBody');
    const rows = table.find('tr').toArray();
    rows.sort((a, b) => {
      const cityA = $(a).find('td.town input').val().trim(); // Получаем значение из input внутри ячейки "Город"
      const cityB = $(b).find('td.town input').val().trim();

      if (side) {
        return cityA.localeCompare(cityB); // Сортировка по алфавиту
      } else {
        return cityB.localeCompare(cityA); // Обратная сортировка
      }
    });

    table.empty();

    $.each(rows, (index, row) => {
      table.append(row);
    });

    side = !side; // Переключаем направление сортировки
  } else if (e.target.textContent == "Фамилия") {
    const table = $('#dataBody');
    const rows = table.find('tr').toArray();
    rows.sort((a, b) => {
      const cityA = $(a).find('td.surname input').val().trim(); // Получаем значение из input внутри ячейки "Город"
      const cityB = $(b).find('td.surname input').val().trim();

      if (side) {
        return cityA.localeCompare(cityB); // Сортировка по алфавиту
      } else {
        return cityB.localeCompare(cityA); // Обратная сортировка
      }
    });

    table.empty();

    $.each(rows, (index, row) => {
      table.append(row);
    });

    side = !side; // Переключаем направление сортировки
  } else if (e.target.textContent == "Имя") {
    const table = $('#dataBody');
    const rows = table.find('tr').toArray();
    rows.sort((a, b) => {
      const cityA = $(a).find('td.name input').val().trim(); // Получаем значение из input внутри ячейки "Город"
      const cityB = $(b).find('td.name input').val().trim();

      if (side) {
        return cityA.localeCompare(cityB); // Сортировка по алфавиту
      } else {
        return cityB.localeCompare(cityA); // Обратная сортировка
      }
    });

    table.empty();

    $.each(rows, (index, row) => {
      table.append(row);
    });

    side = !side; // Переключаем направление сортировки
  } else if (e.target.textContent == "Отчество") {
    const table = $('#dataBody');
    const rows = table.find('tr').toArray();
    rows.sort((a, b) => {
      const cityA = $(a).find('td.lastname input').val().trim(); // Получаем значение из input внутри ячейки "Город"
      const cityB = $(b).find('td.lastname input').val().trim();

      if (side) {
        return cityA.localeCompare(cityB); // Сортировка по алфавиту
      } else {
        return cityB.localeCompare(cityA); // Обратная сортировка
      }
    });

    table.empty();

    $.each(rows, (index, row) => {
      table.append(row);
    });

    side = !side; // Переключаем направление сортировки
  } else if (e.target.textContent == "Площадь") {
    const table = $('#dataBody');
    const rows = table.find('tr').toArray();

    rows.sort((a, b) => {
      const priceA = parseFloat($(a).find('td.size').text());
      const priceB = parseFloat($(b).find('td.size').text());

      if (side) {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    table.empty();

    $.each(rows, (index, row) => {
      table.append(row);
    });

    side = !side; // Изменяем направление сортировки
  }
})

const toggleOrderStatus = (orderId, newStatus) => {
  // Обновляем статус заказа на сервере
  updateOrderStatusOnServer(orderId, newStatus);

  // Обновляем локальные данные и интерфейс
  fetchData();
}

const updateOrderProperty = (orderId, property, value) => {
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

const updateOrderStatusOnServer = (orderId, newStatus) => {
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