import { parseMarkdownTable } from '@/lib/markdown';
import { promises as fs } from 'fs';

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

export default async function Home() {
  const markdownContent = await fs.readFile(process.cwd() + '/STOLEN.md', 'utf8');
  const data = parseMarkdownTable(markdownContent) as StolenProperty[];

  return (
    <div className="">
      <main className="">
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      </main>
    </div>
  );
}
