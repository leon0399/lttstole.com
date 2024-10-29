/**
 * @param url Url of the YouTube video. Might be a full URL or short URL. 
 *            Examples: https://www.youtube.com/watch?v=dQw4w9WgXcQ, https://youtu.be/dQw4w9WgXcQ
 * @returns The video ID. Example: dQw4w9WgXcQ
 */
export function parseId(url: string): string {
  const match = url.match(/(?:\?v=|\/)([0-9A-Za-z_-]{11})/);
  if (!match) {
    throw new Error("Invalid YouTube URL");
  }
  return match[1];
}

export function getPreviews(id: string) {
  return {
    default: `https://img.youtube.com/vi/${id}/default.jpg`,
    medium: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    high: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    standard: `https://img.youtube.com/vi/${id}/sddefault.jpg`,
    maxres: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  }
}