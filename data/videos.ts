import videosData from './videos.json';

export type Video = {
  Title: string;
  Series: string;
}

export type Videos = Record<string, Video>;

const videos = videosData as Videos;

export default videos
;