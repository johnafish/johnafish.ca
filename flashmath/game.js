$(function(){
	MathJax.Hub.Typeset()
});
var yourAnswers = [];
var answers = [];
var questions = [];
var questionMistakes = [];
var time = 60;
var operations = [];

function launch() {
	$("body").append("<h2 class='question' id='MathDiv'>`5...`</h1>");
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	countDown();
}

function countDown() {
	var time = 5;
	var timer = setInterval(function(){
		time -= 1;
		if (time==0){
			play();
			clearInterval(timer);
		} else {
			var math = MathJax.Hub.getAllJax("h2")[0];
			MathJax.Hub.Queue(["Text",math,time+"..."]);
		}
	},1000);
}

function generateQuestion() {
	var randomOperation = Math.floor(Math.random()*operations.length);
	var firstNumber = Math.floor(Math.random()*12+1);
	var secondNumber = Math.floor(Math.random()*12+1);
	var plusMinus = Math.floor(Math.random()*5)
	//Fancy operation cases
	if (operations[randomOperation]=="/"){
		if (secondNumber == 0){
			secondNumber = 1;
		}
		firstNumber = secondNumber * Math.floor(Math.random()*12+1);
	}
	//Make stuff negative
	if (plusMinus==1){
		firstNumber*=-1;
	} else if (plusMinus==2){
		secondNumber*=-1;
		secondNumber= "("+secondNumber+")"
	}
	var expression = firstNumber+operations[randomOperation]+secondNumber;
	var evaluation = eval(expression)
	return[expression, evaluation];
}

function getQuestion() {
	var question = generateQuestion();
	questions.push(question[0]);
	answers.push(question[1]);
	var yourAnswer = $(".answer").val();
	if (yourAnswer!=undefined){
		yourAnswers.push(yourAnswer);
	} else if (yourAnswers.length > 0) {
		yourAnswers.push("");
	}
	if (answers.length == 1){
		$("body").append("<input class='answer' onKeyPress='checkSubmit(event);' type='number' autofocus>")
		$("body").append("<input type='button' value='>' class='next' onclick='getQuestion()' />")
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	}
	$(".answer").val("")
	var math = MathJax.Hub.getAllJax("h2")[0];
	MathJax.Hub.Queue(["Text",math,question[0]]);
	$(".answer").focus();
}


function checkSubmit(e)
{
   if(e && e.keyCode == 13)
   {
      getQuestion();
   }
}

function play() {
	getQuestion();
	setTimeout(function(){
		finish();
	}, time*1000);

}
function reset() {
	yourAnswers = [];
	answers = [];
	questions = [];
	questionMistakes = [];
	$("h2").remove();
	$("h3").remove();
	$("input").remove();
	$(".ad").hide();
	launch();
}

function finish() {
	$(".question").remove();
	$(".answer").remove();
	$(".next").remove();
	var score = 0;
	for (var i = yourAnswers.length - 1; i >= 0; i--) {
		if(yourAnswers[i]==answers[i]){
			score+=1;
		} else {
			questionMistakes.push([questions[i], answers[i], yourAnswers[i]]);
		}
	};
	$("body").append("<h2>Score of: "+score+"/"+yourAnswers.length+"("+Math.floor(score*100/yourAnswers.length)+"%) in 60 seconds. You used operation(s): "+operations)
	if (questionMistakes.length > 0){
		$("body").append("<h2>You goofed: </h2><br />")
		for (var i = questionMistakes.length - 1; i >= 0; i--) {
			$("body").append("<h3>"+questionMistakes[i][0]+"="+questionMistakes[i][1]+" but you said: "+questionMistakes[i][2]+"</h3>");
		};
	}
	$("body").append("<input type='button' class='next' value='Try again?' onclick='reset();'>")
}
