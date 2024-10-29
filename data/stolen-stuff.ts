
import { parseMarkdownTable } from '@/lib/markdown';
import stolenData from '../STOLEN.md'

export type StolenProperty = {
  /**
   * YouTube video URL
   */
  Video: string;

  /**
   * Timecode in the video
   * @example 1:23 represents 1 minute and 23 seconds
   * @example 64:23 represents 64 minutes and 23 seconds
   */
  "Timecode(s)": string;

  Who: string;
  Product: string;
  "Est. price": string;
  Qty: string;
  Justification: string;
}

const stolen = parseMarkdownTable(stolenData) as StolenProperty[];

export default stolen;