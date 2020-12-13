export class Project {
  name: string;
  type: ProjectType;
  description: string;
  progress: ProgressType;
  startDate: Date;
  endDate: Date;
  constructor(
    name: string,
    type: ProjectType,
    description: string,
    progress: ProgressType,
    startDate: Date,
    endDate: Date
  ) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.progress = progress;
    this.startDate = startDate;
    this.endDate = endDate;
  }
  // toJSON is automatically used by JSON.stringify
  toJSON(): ProjectJSON {
    // copy all fields from `this` to an empty object and return in
    return Object.assign({}, this, {
      // convert fields that need converting
      type: this.type.toString(),
      startDate: this.startDate.toString(),
      endDate: this.endDate.toString(),
      progress: this.progress.toString(),
    });
  }
  // fromJSON is used to convert an serialized version
  // of the Project to an instance of the class
  static fromJSON(json: ProjectJSON | string): Project {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, Project.reviver);
    } else {
      // create an instance of the Project class
      const project = Object.create(Project.prototype);
      // copy all the fields from the json object
      return Object.assign(project, json, {
        // convert fields that need converting
        type: <ProjectType>json.type,
        progress: <ProgressType>json.progress,
        startDate: new Date(json.startDate),
        endDate: new Date(json.endDate),
      });
    }
  }
  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call Project.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? Project.fromJSON(value) : value;
  }
}

export enum ProjectType {
  SUN = 'SUN',
  WATER = 'WATER',
}

export enum ProgressType {
  PLANNED = 'PLANNED',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  FAILED = 'FAILED',
  FINISHED = 'FINISHED',
}

export interface ProjectJSON {
  name: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: string;
}
