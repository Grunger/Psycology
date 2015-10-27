//Функция для загрузки данных из json на страницу
function fillform(count) {
	//Анимация вылета формы влево. Добавляем класс и удаляем его.
	$("#forma").addClass("fadeOutLeft");
	setTimeout('$("#forma").removeClass("fadeOutLeft")',500);
	
	//Анимация появления справа
	$("#forma").addClass("fadeInRight");
	// вызов json
	$.getJSON('json/test.json', 
				function(data){
                	data1 = data;
					row = data[count];
					obj = new Object;
					obj.num = row.number;
					//Добавляем информацию с задержкой.
					setTimeout('addinformation()',500);
               });
	
	setTimeout('$("#forma").removeClass("fadeInRight")',1000);
	//Логическая переменная - отвечает за то, ответил ли пользователь на вопрос. Обнуляем для нового вопроса
	answered = false;
}

//функция добавления информации. Обнуляем форму и дописываем.
function addinformation(){
	$('#forma').html('');
	$("#forma").append(row.question + "<br> <div class=\"form\"><input type=\"radio\" id=\"radio1\" name=\"answer\" class\"form\">" + row.ans1+ "</input><br>	<input type=\"radio\" id=\"radio2\"  name=\"answer\" class\"form\">" + row.ans2 + "</input>	</div>	<input type=\"button\" value=\"Ответить\" id=\"send\"></input> <br><p>Вопрос "+row.number+" из 4</p><p id=\"results\"></p>");
}

//Обработка ввода ФИО
$("#forma").on("click", "#sendfio", function(){
	//Убираем описание
	$("#description").addClass("animated zoomOut");
	setTimeout('$("#description").addClass("hiden");',500);
	//Удаляем класс
	$("#forma").removeClass("bounceIn");
	//Запоминаем ФИО в переменную
	fiotext = $("#fio").val();
	//Проверка на то, были ли введены ФИО
	if(fiotext == ""){
		alert("Введите ФИО");
	} else {
		fillform(i);
	}

});

$(function() {
//Переменная - количество отвеченных вопросов
i = 0;
//Логическая переменная - ответили ли на вопрос
answered = false;
//Массив для хранения ответов в формате Вопрос - ответ
answers = new Array();
//Анимированный вылет формы с запросом ФИО
$("#forma").attr("class","animated bounceIn");
//Вывод формы для ввода ФИО
$("#forma").append("<p>Введите Ваши ФИО<p> <p><input type=\"text\" id=\"fio\"></p><p><input type=\"button\" value=\"ok\" id=\"sendfio\"></p>");
});

//Функция нажатия на кнопку отправки ответа
$("#forma").on("click", "#send", function(){
	//Проверка на то, ответил ли пользователь на вопрос
	if (answered){
	//Добавляем в массив ответ
	answers.push(obj);
	//Если не последний вопрос
	if(i+1<data1.length){ 
		//Увеличиваем счетчик и выводим следущий вопрос
		i=i+1;
		fillform(i);
	} else {

		$('#forma').html('');
		$('#forma').append("<h2>Результаты тестирования</h2>");
		if((answers[0].ans==1)&&(answers[1].ans==1)&&(answers[2].ans==1)&&(answers[3].ans==1)){$('#forma').append("для типа характерен консерватизм, ориентация на общепринятое мнение (на стереотип). Не любит конфликтовать, спорить и ссориться.")}


	}}});

//Клики по вариантам ответа - запоминание.
$("#forma").on("click", "#radio1", function(){
	obj.ans = 1;
	answered = true;
});

$("#forma").on("click", "#radio2", function(){
	obj.ans = 2;
	answered = true;
});
