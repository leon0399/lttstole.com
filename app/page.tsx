import { parseMarkdownTable } from '@/lib/markdown';
import { promises as fs } from 'fs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import videosData from '../data/videos.json';

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
  Timecode: string;

  Who: string;
  Product: string;
  "Est. price": string;
  Justification: string;
}

export type Video = {
  Title: string;
  Series: string;
}

export type Videos = Record<string, Video>;

const videos = videosData as Videos;

export default async function Home() {
  const markdownContent = await fs.readFile(process.cwd() + '/STOLEN.md', 'utf8');
  const data = parseMarkdownTable(markdownContent) as StolenProperty[];

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
              <TableHead className="text-right">Estimated Price</TableHead>
              <TableHead>Justification</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell>
                  <a href={row.Video} target="_blank" rel="noreferrer">{videos[row.Video]?.Title ?? row.Video}</a>
                </TableCell>
                <TableCell className="text-right">{row.Timecode}</TableCell>
                <TableCell>{row.Who}</TableCell>
                <TableCell>{row.Product}</TableCell>
                <TableCell className="text-right">{row["Est. price"]}</TableCell>
                <TableCell>{row.Justification}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
