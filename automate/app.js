var database = firebase.database();
var followersReference = firebase.database().ref('followers');
var statusReference = firebase.database().ref('status');
var followerTrendReference = firebase.database().ref('followerTrend');
var data;
var chart;
var drawn = false;
var options;
var currentData={};

function updateFollowerCount(value){
	$("#followers").text(value["count"]);
}

function updateStatus(value){
	$("#status").text(value["message"]);
}

function paintChart(){
	followerTrendReference.once('value').then(function(snapshot) {
		drawChart(snapshot.val())
	});
}

function updateChart(value){
	if(drawn){
		data= new google.visualization.DataTable();
		data.addColumn('date', 'Time');
		data.addColumn('number', 'Followers');
		for(var key in value){
			var sK = value[key]["date"].split(" ");
			var date = new Date(sK[0],sK[1]-1,sK[2],sK[3],sK[4],sK[5]);
			var numFollowers = parseInt(value[key]["followers"]);
			data.addRow([date,numFollowers]);
		}
		data.sort({column:0, desc:true})
		chart.draw(data, options);
		currentData=JSON.parse(JSON.stringify(value));
	}
}

function drawChart(value){
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
	// Set chart options
	options = {'title':'Follower Count Over Time',
					'width':800,
					'height':600,
					'animation':{
						duration: 1000,
						easing: 'out',
					}
				};

	// Instantiate and draw our chart, passing in some options.
	chart = new google.visualization.LineChart(document.getElementById('graph'));
	chart.draw(data, options);
	drawn = true;
}

$(function(){
	followersReference.once('value').then(function(snapshot) {
		updateFollowerCount(snapshot.val());
	});

	statusReference.once('value').then(function(snapshot) {
		updateStatus(snapshot.val());
	});
	
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(paintChart());
});

statusReference.on('value', function(snapshot) {
  updateStatus(snapshot.val());
});

followersReference.on('value', function(snapshot) {
  updateFollowerCount(snapshot.val());
});

followerTrendReference.on('value', function(snapshot) {
  updateChart(snapshot.val());
});
