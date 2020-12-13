import {Project, ProjectJSON} from './project';

export class Community {
  /** Implementation is based on blogpost: http://choly.ca/post/typescript-json/*/
  name: string;
  latitude: number;
  longitude: number;
  projects: Project[];
  constructor(
    name: string,
    latitude: number,
    longitude: number,
    projects: Project[]
  ) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.projects = projects;
  }

  // toJSON is automatically used by JSON.stringify
  toJSON(): CommunityJSON {
    // copy all fields from `this` to an empty object and return in
    return Object.assign({}, this, {
      // convert fields that need converting
      location: <CommunityLocation>{
        latitude: this.latitude,
        longitude: this.longitude,
      },
      projects: this.projects.map(project => project.toJSON()),
    });
  }

  // fromJSON is used to convert an serialized version
  // of the Community to an instance of the class
  static fromJSON(json: CommunityJSON | string): Community {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, Community.reviver);
    } else {
      // create an instance of the Community class
      const community = Object.create(Community.prototype);
      // copy all the fields from the json object
      return Object.assign(community, json, {
        // convert fields that need converting
        latitude: json.location.latitude,
        longitude: json.location.longitude,
        projects: json.projects.map(project => Project.fromJSON(project)),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call Community.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? Community.fromJSON(value) : value;
  }
}

interface CommunityLocation {
  latitude: number;
  longitude: number;
}

// A representation of Community's data that can be converted to
// and from JSON without being altered.
export interface CommunityJSON {
  name: string;
  location: CommunityLocation;
  projects: ProjectJSON[];
}
