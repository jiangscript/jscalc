var numbers = []; //Stores individual digits of a single number
var calculations = []; //Stores numbers and operations to join them
var result = 0; //Stores result of calculation, set to 0 to begin with


//Operators
var add = function(a, b) { //'add' is a function of a and b
	var sum = a + b; //Actual calculation
	return sum; //Returning result
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

//Event handlers
var numberPress = function () {
	var text = $(this).text(); //Pulling text from element clicked - a number.
	numbers.push(text); //Pushing the digit to the numbers array.
};

var operatorPress = function () {
	consolidateNumbers(); //Runs consolidateNumbers function (below) to give first number of a calculation.
	var text = $(this).text(); //Pulls text from element clicked - a mathematical operator.
	calculations.push(text); //Pushes operator into the calculation array. 
};

var clearPress = function (){
	calculations = []; //Clears calculations array.
	numbers = []; //Clears numbers array.
	$('#result').val(''); //Clears the result field using .val to place '' in the field. 
};

var equalsPress = function () {
	consolidateNumbers(); //Runs consolidateNumbers function (below) to give second number of a calculation.

	//Sets value of result to the 0th element in the calculations array (i.e. first number). 
	//If the 0th element is not a number (and is an operator such as '+' or '-'), set it to 0 so that '-' or '+' 3 does not return an error.
	var result = calculations[0];
	if (typeof result !== 'number') {
		result = 0;
	}
	//for loop to run through each element in the calculations array.
	for (var i = 0; i < calculations.length; i++) {
		var n = calculations[i]; //Creates var 'n' to avoid typing out calculations[i].

		if (typeof n === 'string') {
			//Operator detected! Depending on the actual string, run the operator functions using a = result (first element in calculations array) and b = next element in the array after the operator.
			if (n === '+') {
				result = add(result, calculations[i + 1]); 
			} else if (n === '-') {
				result = subtract(result, calculations[i + 1]);
			} else if (n === '*') {
				result = multiply(result, calculations[i + 1]);
			} else if (n ==='/') {
				result = divide(result, calculations[i + 1]);
			}
		}
	}
	clearPress(); //Runs clear function as if the clear button were pressed so that the calculations and numbers arrays are both cleared.
	$('#result').val(result); //Displays result in the field with the id of 'result'.
};


//Helpers
var consolidateNumbers = function() {
	//Store the previous number. Necessary because only individual digits are stored in the numbers array.
	if (numbers.length > 0) { //Runs only if there are elements in the numbers array.
		var n = parseFloat(numbers.join('')); //Variable n created, uses parseFloat function on all digits in the numbers array, joined together with no spaces.
		calculations.push(n); //Pushes the new number to the calculations array.
		numbers = []; //Empty numbers array for reuse.
	}
};

//Event listeners
$('.number').click(numberPress); //When the element with class '.number' is clicked, run the defined function.
$('.operator').click(operatorPress);
$('#clear').click(clearPress);
$('#equals').click(equalsPress);


