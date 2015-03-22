'use strict';

$(function(){
	console.log(111);
	$('#choose_categories_btn').click(function(){
		console.log(222);
		$('#choose_categories').click();
	});

	$('table.line-link tbody tr').on('click',function(){
		console.log(333);
		location.href = $(this).attr('goto');
	});
});