//Функция для загрузки данных из json на страницу
function fillform(count) {
	$("#forma").addClass("fadeOutLeft");
	setTimeout('removeClassFadeOut()',500);
	
	// вызов json
	$("#forma").addClass("fadeInRight");
	$.getJSON('json/test1.json', 
				function(data){
                	data1 = data;
					row = data[count];
					obj = new Object;
					obj.num = row.number;
					setTimeout('addinformation()',500);
               });
	
	setTimeout('removeClassFadeIn()',1000);
}

function removeClassFadeOut(){
$("#forma").removeClass("fadeOutLeft");
}

function removeClassFadeIn(){
$("#forma").removeClass("fadeInRight");
}

function addinformation(){
	$('#forma').html('');
	$("#forma").append(row.question + "<br> <input type=\"radio\" id=\"radio1\" name=\"answer\">" + row.ans1+ "</input><br>	<input type=\"radio\" id=\"radio2\"  name=\"answer\">" + row.ans2 + "</input><br>	<input type=\"radio\" id=\"radio3\"  name=\"answer\">" + row.ans3 + "</input><br>		<input type=\"button\" value=\"Ответить\" id=\"send\"></input> <p id=\"results\"></p>");
}

//Вынос на форму поля ФИО
function fio(){
	$("#forma").append("<p>Введите Ваши ФИО<p> <p><input type=\"text\" id=\"fio\"></p><p><input type=\"button\" value=\"ok\" id=\"sendfio\"></p>");
}

//Обработка ввода ФИО
$("#forma").on("click", "#sendfio", function(){
$("#description").addClass("animated zoomOut");
$("#forma").removeClass("bounceIn");
fiotext = $("#fio").val();
if(fiotext == ""){
		alert("Введите ФИО");
	} else {
		fillform(i);
	}

});

//Функция при загрузке страницы
$(function() {
i = 0;
fiotext = "";
answers = new Array();
$("#forma").attr("class","animated bounceIn");
fio();
});

//Функция нажатия на кнопку
$("#forma").on("click", "#send", function(){
	answers.push(obj);
	if(i+1<data1.length){ 
		i=i+1;
		fillform(i);
	} else {
		var k = 0;
		$.each(answers, function(key, value){
			switch (value.num) {
				case 1:
					if(value.ans == 3){k++;}
					break
				case 2:
					if(value.ans == 1){k++;}
					break
				}				
		});
	alert("Уважаемый "+fiotext + " Вы набрали " + k + " Баллов");	
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