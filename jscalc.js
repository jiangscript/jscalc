var state = '';

function update() {
	try {
		$('#result').val(eval(state));
	}
	catch (exception) {
		$('#result').val(state);
	}
}

$('.number, .operator').click(function() {
  state = String(state) + $(this).text();
	update()
});

$('#equals').click(function() { 
	update();
});

$('#clear').click(function(){
  state = '';
  update();
});
