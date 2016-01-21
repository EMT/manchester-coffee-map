var Map = function(coffeeShops){
	this.center = new google.maps.LatLng(53.482091,-2.2341051);
	this.mapStyles = [
	  {
	    "featureType": "road.highway",
	    "stylers": [
	      { "visibility": "simplified" },
	      { "color": "#ffffff" }
	    ]
	  },{
	    "featureType": "poi",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "featureType": "transit.station",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	  }
	]
	this.coffeeShops = coffeeShops;
	this.markers = [];
	this.infoWindows = [];
	this.init();
}

Map.prototype.init = function(){

	this.map = new google.maps.Map(document.getElementById('js-building-map'), {
		zoom: 17,
		center: this.center,
		styles: this.mapStyles
	});

	this.addMarkers();
}

Map.prototype.addMarkers = function(){
	for (var i = 0 ; i < this.coffeeShops.length ; i++){
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(this.coffeeShops[i].location.lat,this.coffeeShops[i].location.lng),
			title: this.coffeeShops[i].title,
			icon: 'coffee-bean.png'
		})
		this.markers.push(marker);
		var infowindow = new google.maps.InfoWindow({
			content: this.coffeeShops[i].title
		});
		this.infoWindows.push(infowindow);

		marker.setMap(this.map);

		this.setupMarkerEventListeners(marker, infowindow)
	}
}

Map.prototype.setupMarkerEventListeners = function(marker, infowindow){

	_this = this;

	marker.addListener('click', function (event) {

		infowindow.open(_this.map, marker);

	});
}