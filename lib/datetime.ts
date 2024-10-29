export function timecodeToSeconds(timecode: string): number {
  const parts = timecode.split(':');
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}