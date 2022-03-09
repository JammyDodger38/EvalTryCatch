//первый переданный параметр помещается в type, всё остальное с помощью spread в values
//затем происходит добавление только тех элементов values, тип которых совпадает с type
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	//функция для скрытия блоков OK, ERROR и NO-RESULTS в зависимости от условий
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	//функция для вывода резуьтата в соответствующий блок и отображения соответствующего блока
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	// в блок с результатами выводится ошибка путем передачи текста ошибки в функцию showResponseBlock
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// в блок с результатами выводятся либо найденные слова либо, что ничего не нашлось, путем передачи текста ошибки в функцию showResponseBlock
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// в блок с результатами выводится сообщение о том, что нечего показать, так как ничего не введено, путем передачи текста ошибки в функцию showResponseBlock
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	tryFilterByType = (type, values) => {
		//выполнение кода с возможным перехватом ошибки
		try {
			//в переменнуб записывается результат выполнения функции с переданной в нее типа данных и введенной строки (разбитой по словам разделенных запятой)
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//если нашелся хоть один элемент то он выводится, иначе выводится, что данные выбранного типа отсутствуют
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			//вывод соответствующего сообщения в блок результата
			showResults(alertMsg);
			//вывод ошибки
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};

	//получние кнопки Фильтровать
const filterButton = document.querySelector('#filter-btn');

//обработка клика по кнопку фильтровать
filterButton.addEventListener('click', e => {
	//получение select с типами данных и полем ввода
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	//создание кастомного оповещения об ошибки с собственным текстом
	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {
		dataInput.setCustomValidity('');
		e.preventDefault();
		//отправка в функцию выбранного типа и введенной строки с удалением внешних пробелов
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

