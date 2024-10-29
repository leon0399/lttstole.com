import { parseMarkdownTable } from '@/lib/markdown';
import { promises as fs } from 'fs';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import videosData from '../data/videos.json';
import productsData from '../data/products.json';
import { timecodeToSeconds } from '@/lib/datetime';

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

export type Video = {
  Title: string;
  Series: string;
}
export type Videos = Record<string, Video>;
const videos = videosData as Videos;

export type Product = {
  url: string;
}
export type Products = Record<string, Product>;
const products = productsData as Products;

export default async function Home() {
  const markdownContent = await fs.readFile(process.cwd() + '/STOLEN.md', 'utf8');
  const data = parseMarkdownTable(markdownContent) as StolenProperty[];

  // todo: filter data
  const filteredData = data;

  const totalPrice = filteredData.reduce((acc, row) => {
    const price = parseFloat(row["Est. price"].replace('$', '').replace(',', ''));
    const qty = parseInt(row.Qty, 10);
    return acc + price * qty;
  }, 0);

  return (
    <div className="">
      <main className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Video</TableHead>
              <TableHead className="text-right">Timecode</TableHead>
              <TableHead>Who</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Estimated Price</TableHead>
              <TableHead className='text-right'>Total</TableHead>
              <TableHead>Justification</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, i) => (
              <TableRow key={`stolen-${i}`}>
                <TableCell>
                  <a 
                    href={row.Video} 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    {videos[row.Video]?.Title ?? row.Video}
                  </a>
                </TableCell>
                <TableCell className="text-right">
                  {
                    row["Timecode(s)"]
                      .split(', ')
                      .map((timecode, j) => (
                        <a 
                          key={`stolen-${i}-timecode-${j}`} 
                          href={`${row.Video}?t=${timecodeToSeconds(timecode)}`} 
                          target="_blank" 
                          rel="noreferrer"
                        >
                          {timecode}
                        </a>
                      ))
                      .reduce((prev, curr) => [prev, ', ', curr])
                  }
                </TableCell>
                <TableCell>{row.Who}</TableCell>
                <TableCell>
                  {products[row.Product]?.url ? (
                    <a href={products[row.Product].url} target="_blank" rel="noreferrer">{row.Product}</a>
                  ) : row.Product}
                </TableCell>
                <TableCell className="text-right">{row.Qty}</TableCell>
                <TableCell className="text-right">{row["Est. price"]}</TableCell>
                <TableCell className="text-right">
                  ${(parseFloat(row["Est. price"].replace('$', '').replace(',', '')) * parseInt(row.Qty, 10)).toFixed(2)}
                </TableCell>
                <TableCell>{row.Justification}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="text-right">Total:</TableCell>
              <TableCell className="text-right">${totalPrice.toFixed(2)}</TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </main>
    </div>
  );
}
