import { CourseData } from './interfaces';
export function getRoundTwoDeci(num: number): number {
  return getRoundPercent(num) / 100;
}

export function getRoundPercent(num: number): number {
  return Math.round(num * 100);
}

// wrap constants
export function getS3URL(imageID: string, imageName: string): string {
  //FIXME: use constants
  return `path to S3/${imageID}/${imageName}`;
}

// caching data from the backend
let cache = new Map<string, CourseData>();
export default cache;
