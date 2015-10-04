//Функция для загрузки данных из json на страницу
function fillform(count) {
	if(i!=0){$("#forma").slideUp();}
	// вызов json
	getjson(count);
	$("#forma").slideDown();
}

function getjson(count){
	$.getJSON('json/test.json', 
				function(data){
                	$('#forma').html('');
                	data1 = data;
					row = data[count];
					obj = new Object;
					obj.num = row.number;
					$("#forma").append(row.question + "<br> <input type=\"radio\" id=\"radio1\" name=\"answer\">" + row.ans1+ "</input><br>	<input type=\"radio\" id=\"radio2\"  name=\"answer\">" + row.ans2 + "</input><br>	<input type=\"radio\" id=\"radio3\"  name=\"answer\">" + row.ans3 + "</input><br>		<input type=\"button\" value=\"Ответить\" id=\"send\"></input> <p id=\"results\"></p>");
               });
}

//Вынос на форму поля ФИО
function fio(){
	$("#forma").append("<p>Введите Ваши ФИО<p> <p><input type=\"text\" id=\"fio\"></p><p><input type=\"button\" value=\"ok\" id=\"sendfio\"></p>");
}

//Обработка ввода ФИО
$("#forma").on("click", "#sendfio", function(){
fiotext = $("#fio").val();
if(fiotext == ""){
		alert("Введите ФИО");
	} else {
		fillform(i);
	}

});

//Функция при загрузке страницы
$(function() {
i=0;
fiotext="";
answers = new Array();
fio();
});

//Функция нажатия на кнопку
$("#forma").on("click", "#send", function(){
	answers.push(obj);
	if(i+1<data1.length){ 
		i=i+1;
		fillform(i);
	} else {
		$.each(answers, function(value){
			$.each(value, function(num, value){
				alert(fiotext + " Вопрос " + value.num + "; Ответ" + value.ans);
			});					
		});
	}
});

$("#forma").on("click", "#radio1", function(){
	obj.ans = 1;
});

$("#forma").on("click", "#radio2", function(){
	obj.ans = 2;
});

$("#forma").on("click", "#radio3", function(){
	obj.ans = 3;
});