import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import stolen from "@/data/stolen-stuff";
import videos from "@/data/videos";
import products from "@/data/products";

export default async function Home() {
  // todo: filter data
  const filteredData = stolen;

  const totalPrice = filteredData.reduce((acc, row) => acc + row.TotalAsNumber, 0);

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
                    row.Timecodes
                      .map((timecode, j) => (
                        <a 
                          key={`stolen-${i}-timecode-${j}`} 
                          href={`${row.Video}?t=${row.TimecodesAsSeconds[j]}`} 
                          target="_blank" 
                          rel="noreferrer"
                        >
                          {timecode}
                        </a>
                      ))
                      .reduce<React.ReactNode[]>((prev, curr) => prev.length === 0 ? [curr] : [...prev, ', ', curr], [])
                  }
                </TableCell>
                <TableCell>{row.Who}</TableCell>
                <TableCell>
                  {products[row.Product]?.url ? (
                    <a href={products[row.Product].url} target="_blank" rel="noreferrer">{row.Product}</a>
                  ) : row.Product}
                </TableCell>
                <TableCell className="text-right">{row.Qty}</TableCell>
                <TableCell className="text-right">{row.EstimatedPrice}</TableCell>
                <TableCell className="text-right">{row.Total}</TableCell>
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
