var database = firebase.database();
var followersReference = firebase.database().ref('followers');
var statusReference = firebase.database().ref('status');
var followerTrendReference = firebase.database().ref('followerTrend');
var subscribersReference = firebase.database().ref('subscribers');
var subscriberTrendReference = firebase.database().ref('subscriberTrend');
var data;
var charts={};
var drawn = 0;
var total = 2;
var options = {
				'titleposition': 'none',
				'width':800,
				'height':600,
				'legend':{
					position: 'none',
				},
				'curveType': 'function',
				'animation':{
					duration: 1000,
					easing: 'out',
				}
			};
var currentData={};
var currentSubscribers = 0;
var currentFollowers = 0;
var instaGraphName = "instaFollowers"
var ytGraphName = "subscribers"

function updateInstaFollowerCount(value){
	$("#instaFollowers").text(value["count"]);
	currentFollowers=value["count"];
}

function updateSubscribeCount(value){
	$("#subscribers").text(value["count"]);
	currentSubscribers=value["count"];
}

function updateStatus(value){
	$("#status").text(value["message"]);
}

function updateChart(value,name){
	if(drawn>=total){
		data= new google.visualization.DataTable();
		data.addColumn('date', 'Time');
		data.addColumn('number', 'Followers');
		console.log(value)
		for(var key in value){
			var sK = value[key]["date"].split(" ");
			var date = new Date(sK[0],sK[1]-1,sK[2],sK[3],sK[4],sK[5]);
			var numFollowers = parseInt(value[key]["followers"]);
			data.addRow([date,numFollowers]);
		}
		data.sort({column:0, desc:true})
		console.log(options)
		charts[name].draw(data, options);
		currentData=JSON.parse(JSON.stringify(value));
	}
}

function drawChart(value, name, elementId){
	console.log(name)
	console.log(value)
	currentData = JSON.parse(JSON.stringify(value));
	data = new google.visualization.DataTable();
	data.addColumn('date', 'Time');
	data.addColumn('number', 'Followers');

	for(var key in value){
		var sK = value[key]["date"].split(" ");
		var date = new Date(sK[0],sK[1]-1,sK[2],sK[3],sK[4],sK[5]);
		var numFollowers = parseInt(value[key]["followers"]);
		data.addRow([date,numFollowers]);
	}
	data.sort({column:0, desc:true})
	charts[name] = new google.visualization.LineChart(document.getElementById(elementId));
	charts[name].draw(data, options);
	drawn++;
}

function paintCharts(){
	subscriberTrendReference.once('value').then(function(snapshot) {
		drawChart(snapshot.val(),ytGraphName,"graphSubscribers")
	});
	followerTrendReference.once('value').then(function(snapshot) {
		drawChart(snapshot.val(),instaGraphName,"graphInstaFollowers")
	});
}

$(function(){
	followersReference.once('value').then(function(snapshot) {
		updateInstaFollowerCount(snapshot.val());
	});

	subscribersReference.once('value').then(function(snapshot) {
		updateSubscribeCount(snapshot.val());
	});

	statusReference.once('value').then(function(snapshot) {
		updateStatus(snapshot.val());
	});
	
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(paintCharts());
});

statusReference.on('value', function(snapshot) {
  updateStatus(snapshot.val());
});

followersReference.on('value', function(snapshot) {
  updateInstaFollowerCount(snapshot.val());
});

followerTrendReference.on('value', function(snapshot) {
  updateChart(snapshot.val(),instaGraphName);
});

subscribersReference.on('value', function(snapshot){
	updateSubscribeCount(snapshot.val());
});

subscriberTrendReference.on('value', function(snapshot) {
  updateChart(snapshot.val(),ytGraphName);
});
