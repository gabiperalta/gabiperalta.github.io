/*
var v = {
	date_created : "2019-04-11 13:51:16.310"
};
if (v.date_created==null){
	v.date_created = '';
} 
else{
    var lista = v.date_created.split('-',3);
	document.write(lista[2].split(' ',1),lista[1],lista[0]);
}
*/
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
	maxZoom: 20,
	subdomains:['mt0','mt1','mt2','mt3']
});


var mymap;
var mapa;
var marca;
var sacar_foto;
window.addEventListener("load",function(){
	console.log("prueba");

	mapa = document.querySelector("#mapid");
	
	//mymap = L.map("mapid").setView([51.505, -0.09], 13);
	mymap = L.map("mapid").setView([-34.616, -58.44], 16);

	/*
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    	maxZoom: 18,
    	id: 'mapbox/streets-v11',
    	accessToken: 'your.mapbox.access.token'
	}).addTo(mymap);
	*/

	googleStreets.addTo(mymap);

	//var punto = L.marker([-34.616, -58.44]).addTo(mymap);

	//L.Control.geocoder().addTo(mymap);

	// Add in a crosshair for the map
	var crosshairIcon = L.icon({
		iconUrl: 'Imagenes/pin-rojo.png',
		iconSize:     [50, 50], // size of the icon
		iconAnchor:   [25, 50], // point of the icon which will correspond to marker's location
	});
	crosshair = new L.marker(mymap.getCenter(), {icon: crosshairIcon, clickable:false});
	crosshair.addTo(mymap);

	// Move the crosshair to the center of the map when the user pans
	mymap.on('move', function(e) {
		crosshair.setLatLng(mymap.getCenter());
	});

	var streaming = false,
	video        = document.querySelector('#video'),
	canvas       = document.querySelector('#canvas'),
	photo        = document.querySelector('#photo'),
	startbutton  = document.querySelector('#startbutton'),
	width = 320,
	height = 0;

	navigator.getMedia = ( navigator.getUserMedia ||
						navigator.webkitGetUserMedia ||
						navigator.mozGetUserMedia ||
						navigator.msGetUserMedia);

	navigator.getMedia(
	{
		video: true,
		audio: false
	},
	function(stream) {
		if (navigator.mozGetUserMedia) {
			video.mozSrcObject = stream;
		} else {
			var vendorURL = window.URL || window.webkitURL;
			//video.src = vendorURL.createObjectURL(stream);
			video.srcObject = stream;
		}
		video.play();
	},
	function(err) {
		console.log("An error occured! " + err);
	}
	);

	video.addEventListener('canplay', function(ev){
	if (!streaming) {
		height = video.videoHeight / (video.videoWidth/width);
		video.setAttribute('width', width);
		video.setAttribute('height', height);
		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);
		streaming = true;
	}
	}, false);

	function takepicture() {
	canvas.width = width;
	canvas.height = height;
	canvas.getContext('2d').drawImage(video, 0, 0, width, height);
	var data = canvas.toDataURL('image/png');
	photo.setAttribute('src', data);
	}

	startbutton.addEventListener('click', function(ev){
		takepicture();
	ev.preventDefault();
	}, false);

	
	function takepicture() {
		canvas.width = width;
		canvas.height = height;
		canvas.getContext('2d').drawImage(video, 0, 0, width, height);
		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);
	}
});


