let cars = []
const selectCar = document.getElementById('cars')
const body = document.querySelector('body')
const textCar = document.querySelector('#textCar')

const getCars = () => {
    fetch('cars.json')
        .then(response => response.json())
        .then(data => {
            data.cars.forEach(el => {
                cars.push(el)
            })
            render()
        })
} 

const render = () => {
    for (let i = 0; i < cars.length; i++) {
        selectCar.options[selectCar.options.length] = new Option(cars[i].brand, 'значение')
    }

    selectCar.addEventListener('change', () => {
        if(selectCar.selectedIndex == 0) {
            textCar.innerHTML = ''
        } else {
            textCar.innerHTML = `Машина: ${cars[selectCar.selectedIndex-1].brand} ${cars[selectCar.selectedIndex-1].model} <br>
            Стоимость: ${cars[selectCar.selectedIndex-1].price}`
        }
    })
}

getCars()