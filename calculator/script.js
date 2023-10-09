function calculate() {
    const area = parseFloat(document.getElementById('area').value);
    const baseCost = parseFloat(document.getElementById('baseCost').value);
    const complexity = parseFloat(document.getElementById('complexity').value);

    const totalCost = area * baseCost * complexity;

    document.getElementById('result').innerText = `Стоимость заказа: ${totalCost.toFixed(2)} в вашей валюте`;
}
