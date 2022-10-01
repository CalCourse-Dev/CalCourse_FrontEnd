import { IAnalysisData } from './interfaces';

export function getEmotionString(data: IAnalysisData): string {
  let emotionString = '';
  let emotion_X = getRoundTwoDeci(data.emotion[0]);
  let emotion_Y = getRoundTwoDeci(data.emotion[1]);
  if (emotion_X > 0 && emotion_Y > 0) {
    emotionString += 'Happy Excited';
  } else if (emotion_X > 0 && emotion_Y < 0) {
    emotionString += 'Relaxed Calm';
  } else if (emotion_X < 0 && emotion_Y > 0) {
    emotionString += 'Alarmed Frustrated';
  } else if (emotion_X < 0 && emotion_Y < 0) {
    emotionString += 'Bored Tired';
  } else if (emotion_X === 0 && emotion_Y > 0) {
    // TODO: add more emotion strings
  } else if (emotion_X === 0 && emotion_Y < 0) {
    // TODO: add more emotion strings
  } else if (emotion_X > 0 && emotion_Y === 0) {
    // TODO: add more emotion strings
  } else if (emotion_X < 0 && emotion_Y === 0) {
    // TODO: add more emotion strings
  }
  return emotionString;
}

export function getRoundTwoDeci(num: number): number {
  return getRoundPercent(num) / 100;
}

export function getRoundPercent(num: number): number {
  return Math.round(num * 100);
}

// wrap constants
export function getS3URL(imageID: string, imageName: string): string {
  return `https://markit-analysis.s3.us-west-1.amazonaws.com/${imageID}/${imageName}`;
}

// caching data from the backend
let cache = new Map<string, IAnalysisData>();
export default cache;
