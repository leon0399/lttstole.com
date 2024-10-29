
import { parseMarkdownTable } from '@/lib/markdown';
import stolenData from '../STOLEN.md'
import { timecodeToSeconds } from '@/lib/datetime';

export type RawStolenProperty = {
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
  Timecodes: string[];
  TimecodesAsSeconds: number[];

  Who: string;
  
  Product: string;
  
  EstimatedPrice: string;
  EstimatedPriceAsNumber: number;

  Qty: number;
  
  Total: string;
  TotalAsNumber: number;
  
  Justification: string;
}

const stolen = (parseMarkdownTable(stolenData) as RawStolenProperty[])
  .map(row => {
    const timecodes = row["Timecode(s)"].split(', ');
    const estimatedPrice = parseFloat(row["Est. price"].replace('$', '').replace(',', ''));
    const qty = parseInt(row.Qty, 10);

    const total = estimatedPrice * qty;
    const totalFormatted = `$${total.toFixed(2)}`;

    return {
      ...row,
      Timecodes: timecodes,
      TimecodesAsSeconds: timecodes.map(timecode => timecodeToSeconds(timecode)),
      EstimatedPrice: row["Est. price"],
      EstimatedPriceAsNumber: estimatedPrice,
      Qty: qty,
      Total: totalFormatted,
      TotalAsNumber: total,
    } satisfies StolenProperty;
  }) as StolenProperty[];

export default stolen;