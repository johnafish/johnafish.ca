String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};
var usedNames = [];
function populateOpenList() {
	if(localStorage.getItem("articlelist")===null){
		var articlelist = [];
		localStorage.setItem("articlelist", JSON.stringify(articlelist))
	}
	var articlelist = JSON.parse(localStorage.getItem("articlelist"));
	usedNames = articlelist;
	for (var i = articlelist.length - 1; i >= 0; i--) {
		$("#open").append("<option value='{0}'>{0}</option>".f(articlelist[i]));
	};
}
function populateInputs(i_article) {
	article = JSON.parse(localStorage.getItem(i_article));
	if(article!=null){
		$("#section").val(article.a_section);
		$("#file").val(article.a_file);
		$("#title").val(article.a_title);
		$("#feature").val(article.a_feature);
		$("#article").html(article.a_text)
	} else {
		$("#section").val("code");
		$("#file").val("");
		$("#title").val("");
		$("#feature").val("");
		$("#article").html("Enter the article here...")
	}
}

$(function(){
	$("input").val("");
	$("#export").click(function(){
		var  section=$("#section").val();
		var  file=$("#file").val();
		var  title=$("#title").val();
		var  feature=$("#feature").val();
		var  text=$("#article").html()
		var blob = new Blob([section+"\n"+title+"\n"+feature+"\n"+text], {type: "text/plain;charset=utf-8", endings: "native"});
		saveAs(blob, file);
	});
	$("#save").click(function(){
		var section=$("#section").val();
		var file=$("#file").val();
		var title=$("#title").val();
		var feature=$("#feature").val();
		var text=$("#article").html()
		var article={
			a_section: section,
			a_file: file,
			a_title: title,
			a_feature: feature,
			a_text: text
		};
		var articlelist = JSON.parse(localStorage.getItem("articlelist"));
		articlelist.push(article.a_file);
		console.log(articlelist);
		articlelist= $.unique(articlelist);
		localStorage.setItem(article.a_file, JSON.stringify(article));	
		localStorage.setItem("articlelist", JSON.stringify(articlelist));
		if ($.inArray(article.a_file, usedNames)==-1){
			$("#open").append("<option value='{0}'>{0}</option>".f(article.a_file));
			usedNames.push(article.a_file);
		}
		$("#open").val(article.a_file);
	});
	
	if(localStorage.getItem("articlelist")===null){
		var articlelist = [];
		localStorage.setItem("articlelist", JSON.stringify(articlelist));
	}
	populateOpenList();
	$("#open").val("new");
	$("#open").change(function() {
		populateInputs($("#open").val());
	});
	$("#article").focusin(function(){
		if($(this).text()=="Enter the article here..."){
			$(this).text(" ");
		}
	});
	$("#h1").click(function(){
		$("<h1>h1</h1>p").appendTo("#article");
	});
	$("#h2").click(function(){
		$("#article").append("<h2>h2</h2>");
	});
	$("#h3").click(function(){
		$("#article").append("<h3>h3</h3>");
	});
	$("#a").click(function(){
		var href= prompt("Please enter the url", "http://www.google.com");
		$("#article").append("<a href='"+href+"'>link text</a>");
	});
	$("#img").click(function(){
		var src= prompt("Please enter the url", "http://www.google.com");
		$("#article").append("<img src='"+src+"'>");
	});
	$("#blockquote").click(function(){
		$("#article").append("<blockquote>blockquote</blockquote>");
	});
	$("#clear").click(function(){
		var confirm = window.confirm("Do you really want to clear all data?");
		if (confirm==true){
			localStorage.clear();
			location.reload();
		}
	});
});
