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

//var roads = L.gridLayer.googleMutant({
//	type: 'roadmap'	// valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
//});

var osmStreets = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; DAI(derivado de OSM)'
});

var mymap;
var mapa;
var marca;
var sacar_foto;
window.addEventListener("load",function(){
	console.log("prueba");

    mapa = document.querySelector("#mapid");
    
	mymap = L.map("mapid").setView([-34.616, -58.44], 16);

    //googleStreets.addTo(mymap);
    //roads.addTo(mymap);
    osmStreets.addTo(mymap);

	//var punto = L.marker([-34.616, -58.44]).addTo(mymap);

	function onLocationFound(e) {
		var radius = e.accuracy;
	
		L.marker(e.latlng).addTo(mymap)
			.bindPopup("Estas a menos de " + radius + " metros de este punto").openPopup();
	
		L.circle(e.latlng, radius).addTo(mymap);
	}
	
	mymap.on('locationfound', onLocationFound);

	function onLocationError(e) {
		alert(e.message);
	}
	
	mymap.on('locationerror', onLocationError);

	mymap.locate({setView: true, maxZoom: 16});

	L.Control.geocoder().addTo(mymap);

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

    // tomar foto (funciona solo para la compu)
    /*
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

	navigator.getMedia({
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
	});

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
	}*/
});


