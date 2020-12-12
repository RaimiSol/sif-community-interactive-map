import communities from '../../static/data/communities.json';

import * as L from 'leaflet';
delete (<any>L.Icon.Default.prototype)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [13, 40],
});
L.Marker.prototype.options.icon = DefaultIcon;

import '../../static/scss/main.scss';
import {Community} from './core/community';
import {CommunityMarker} from './core/marker';

const MAP_ID = 'mapid';

function map_component() {
  const element = document.createElement('div');
  element.id = MAP_ID;
  return element;
}

document.body.appendChild(map_component());

const map = L.map(MAP_ID).setView(
  [14.690828817091425, -16.184299667446997],
  13
);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

communities.communities.forEach(community_json => {
  const community = new Community(
    community_json.name,
    community_json.location.latitude,
    community_json.location.longitude
  );
  const marker = new CommunityMarker(community);
  marker.getMarker().addTo(map);
});
