function initMap() {
	var map = L.map('map_results').setView([37.37, -5.963333], 12);
	var Thunderforest_OpenCycleMap = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
	}).addTo(map);
	var opl = new L.OverPassLayer({
		query: 'http://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"="bicycle_rental"](37.28880407455673,-6.1022186279296875,37.45496527884147,-5.844383239746094);way["amenity"="bicycle_rental"](37.28880407455673,-6.1022186279296875,37.45496527884147,-5.844383239746094);relation["amenity"="bicycle_rental"](37.28880407455673,-6.1022186279296875,37.45496527884147,-5.844383239746094););out body;>;out;',
		minzoom: 1,
		callback: function(data) {
	        for(i=0;i<data.elements.length;i++) {
	          e = data.elements[i];
	          if (e.id in this.instance._ids) return;
	          this.instance._ids[e.id] = true;
	          var pos = new L.LatLng(e.lat, e.lon);
	          var popup = L.popup({
	          	minWidth: 350
	          }).setContent(this.instance._poiInfo(e.tags,e.id));
	          var myicon = L.icon({
	              iconUrl: 'images/cycling.png',
	              iconSize: [32, 37],
	              iconAnchor: [16, 32],
	              popupAnchor: [0, -30]
	          });
	          var marker = L.marker(pos, {icon: myicon}).bindPopup(popup);
	          this.instance.addLayer(marker);
	        }	
	    }
	}).addTo(map);
}
window.onload = initMap;