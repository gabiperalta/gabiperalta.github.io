
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
	maxZoom: 20,
	subdomains:['mt0','mt1','mt2','mt3']
});

//var roads = L.gridLayer.googleMutant({
//	type: 'roadmap'	// valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
//});

var osmStreets = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
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

    googleStreets.addTo(mymap);
    //roads.addTo(mymap);
    //osmStreets.addTo(mymap);

	//var punto = L.marker([-34.616, -58.44]).addTo(mymap);

	// ubicacion actual
	/*
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
	*/
	function onLocationFound(e) {
		var radius = e.accuracy / 2;
		var location = e.latlng
		//L.marker(location).addTo(mymap)
		L.circle(location, radius).addTo(mymap);
		//mymap.setView(location, 16);
	}

	function onLocationError(e) {
		alert(e.message);
	}

	function getLocationLeaflet() {
		mymap.on('locationfound', onLocationFound);
		mymap.on('locationerror', onLocationError);
		mymap.locate({setView: true, maxZoom: 16});
	}

	document.querySelector("#localizar").addEventListener("click",function(){
		getLocationLeaflet();
	});

	/*
	//L.Control.geocoder().addTo(mymap);
	var geocoder = L.Control.geocoder({
		defaultMarkGeocode: false	
	})
	.on('markgeocode', function(e) {
		var bbox = e.geocode.bbox;
		var poly = L.polygon([
		bbox.getSouthEast(),
		bbox.getNorthEast(),
		bbox.getNorthWest(),
		bbox.getSouthWest()
		]).addTo(mymap);
		mymap.fitBounds(poly.getBounds());
	})
	.addTo(mymap);
	*/

	// Pin en el centro del mapa
	var crosshairIcon = L.icon({
		iconUrl: 'Imagenes/pin-rojo.png',
		iconSize:     [50, 50], // tamano del icono
		iconAnchor:   [25, 50], // punto del icono que corresponde al centro del mapa
	});
	crosshair = new L.marker(mymap.getCenter(), {icon: crosshairIcon, clickable:false});
	crosshair.addTo(mymap);

	mymap.on('move', function(e) {
		crosshair.setLatLng(mymap.getCenter());
	});

	// Buscar una direccion
	var direccion = document.querySelector("#direccion");
	var buscar_direccion = document.querySelector("#buscar_direccion");
	buscar_direccion.addEventListener("click",()=>{
		var geocodigo = new L.Control.Geocoder.Nominatim(); //direccion.innerHTML
		geocodigo.geocode(direccion.value,function(result){
			console.log(direccion.value);
			console.log(result);
			mymap.setView([result[0].center.lat, result[0].center.lng], 16);
			direccion.value = result[0].name.split(", ")[1] + " " + result[0].name.split(", ")[0];
		})
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


