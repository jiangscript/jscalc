var numbers = []; //Stores individual digits of a single number
var calculations = []; //Stores numbers and operations to join them
var result = 0;

var add = function(a, b) {
	var sum = a + b;
	return sum;
};

var multiply = function(a, b) {
	var product = a * b;
	return product;
};

var divide = function(a, b) {
	var quotient = a / b;
	return quotient;
};

var subtract = function(a, b) {
	var difference = a - b;
	return difference;
};

var buttonPress = function () {
	var text = $(this).text();
	numbers.push(text);
};

var operatorPress = function () {
	consolidateNumbers();
	var text = $(this).text();
	calculations.push(text);
};

var clearPress = function (){
	calculations = [];
	numbers = [];
	$('#result').val('');
};

var equalsPress = function () {
	consolidateNumbers();

	var result = calculations[0];
	if (typeof result !== 'number') {
		result = 0;
	}
	for (var i = 0; i < calculations.length; i++) {
		var n = calculations[i];

		if (typeof n === 'string') {
			//Operator detected!
			if (n === '+') {
				result = add(result, calculations[ i + 1]);
			} else if (n === '-') {
				result = subtract(result, calculations[i + 1]);
			} else if (n === '*') {
				result = multiply(result, calculations[i + 1]);
			} else if (n ==='/') {
				result = divide(result, calculations[i + 1]);
			}
		}
	}
	clearPress();
	$('#result').val(result);
};

var consolidateNumbers = function() {
	//Store the previous number.
	if (numbers.length > 0) {
		var n = parseFloat(numbers.join(''));
		calculations.push(n);
		numbers = [];
	}
};

$('.button').click(buttonPress);
$('.operator').click(operatorPress);
$('#clear').click(clearPress);
$('#equals').click(equalsPress);