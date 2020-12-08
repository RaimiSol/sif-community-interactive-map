// Leaflet 
import L from 'leaflet';
import "../../static/css/main.css";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const MAP_ID = "mapid"

function map_component() {
  const element = document.createElement('div');
  element.id = MAP_ID;
  return element;
}
document.body.appendChild(map_component());

var map = L.map(MAP_ID).setView([14.690828817091425, -16.184299667446997], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([14.690828817091425, -16.184299667446997]).addTo(map)
  .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  .openPopup();