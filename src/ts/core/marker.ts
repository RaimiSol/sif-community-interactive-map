import {Community} from './community';
import * as L from 'leaflet';
export class CommunityMarker {
  community: Community;
  constructor(community: Community) {
    this.community = community;
  }
  getPopupContent(): string {
    return `${this.community.name}`;
  }
  getMarker(): L.Marker {
    return L.marker([
      this.community.latitude,
      this.community.longitude,
    ]).bindPopup(this.getPopupContent());
  }
}
