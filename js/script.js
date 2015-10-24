//Функция для загрузки данных из json на страницу
function fillform(count) {
	//Анимация вылета формы влево. Добавляем класс и удаляем его.
	$("#forma").addClass("fadeOutLeft");
	setTimeout('$("#forma").removeClass("fadeOutLeft")',500);
	
	//Анимация появления справа
	$("#forma").addClass("fadeInRight");
	// вызов json
	$.getJSON('json/test1.json', 
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
	$("#forma").append(row.question + "<br> <input type=\"radio\" id=\"radio1\" name=\"answer\">" + row.ans1+ "</input><br>	<input type=\"radio\" id=\"radio2\"  name=\"answer\">" + row.ans2 + "</input><br>	<input type=\"radio\" id=\"radio3\"  name=\"answer\">" + row.ans3 + "</input><br>		<input type=\"button\" value=\"Ответить\" id=\"send\"></input> <p id=\"results\"></p>");
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

//Функция при загрузке страницы
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
		//Обработка ответов
		MD = 0;
		if(answers[0].ans == 1) MD = MD+2;
		if(answers[0].ans == 2) MD = MD+1;
		//Прописать все факторы!
		if((A<7)&&(F<6)&&(H<7)){alert("Сдержанность  в  межличностных контактах, трудности  в  не  посредственном  и  социальном общении,  склонность  к  ин  дивидуальной  работе, замкнутость,  направленность  на  свой  внутренний мир. Интроверсия.");}
		//Прописать все остальные варианты.

	//Вторичные интегральные факторы
	//Интроверсия -экстраверсия
	F1 = (2*A + 3*E + 4*F + 5*H - 2*Q2 - 11)/10;
	//Прописать остальные
	}
	}else{
		//Если пользователь не ответил - анимированное сообщение об этом
		$(".tooltip").addClass("animated zoomIn");
		$(".tooltip").removeClass("hiden");
		setTimeout('$(".tooltip").removeClass("animated zoomIn")',1000);
		setTimeout('$(".tooltip").addClass("animated zoomOut")',2000);
		setTimeout('$(".tooltip").removeClass("animated zoomOut")',3000);
		setTimeout('$(".tooltip").addClass("hiden")',3000);
	}
});

//Клики по вариантам ответа - запоминание.
$("#forma").on("click", "#radio1", function(){
	obj.ans = 1;
	answered = true;
});

$("#forma").on("click", "#radio2", function(){
	obj.ans = 2;
	answered = true;
});

$("#forma").on("click", "#radio3", function(){
	obj.ans = 3;
	answered = true;
});
