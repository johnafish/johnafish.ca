$(document).ready(function() {
	$(".sort").val("all");
	$(".sort").change(function() {
		category = $(".sort").val();
		if(category=="all"){
	 		$(".articleitem").show(500);
	 	} else {
	 		$("."+category).show(500);
	 		$(".articleitem:not(."+category+")").hide(500);
	 	}
	});
});