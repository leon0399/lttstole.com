"use client"

import { DataTable } from "@/components/data-table/data-table";
import { StolenProperty } from "@/data/stolen-stuff";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import videos from "@/data/videos";
import products from "@/data/products";

interface StolenStuffTableProps {
  data: StolenProperty[]
}

export default function StolenStuffTable({
  data,
}: StolenStuffTableProps) {
  const columnHelper = useMemo(() => createColumnHelper<StolenProperty>(), [])

  const columns = useMemo(() => [
    columnHelper.accessor("Video", {
      header: "Video",
      cell: (info) => (
        <a 
          href={info.getValue()} 
          target="_blank" 
          rel="noreferrer"
        >
          {videos[info.getValue()]?.Title ?? info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor("Timecodes", {
      header: () => (<div className="text-right">Timecode</div>),
      cell: (info) => (<div className="text-right">{
        info.getValue()
          .map((timecode, j) => (
            <a 
              key={`stolen-${info.row.id}-timecode-${j}`} 
              href={`${info.row.original.Video}?t=${info.row.original.TimecodesAsSeconds[j]}`} 
              target="_blank" 
              rel="noreferrer"
            >
              {timecode}
            </a>
          ))
          .reduce<React.ReactNode[]>((prev, curr) => prev.length === 0 ? [curr] : [...prev, ', ', curr], [])
      }</div>),
    }),
    columnHelper.accessor("Who", {
      header: "Who",
    }),
    columnHelper.accessor("Product", {
      header: "Product",
      cell: (info) => (
        products[info.getValue()]?.url ? (
          <a 
            href={products[info.getValue()]?.url} 
            target="_blank" 
            rel="noreferrer"
          >
            {info.getValue()}
          </a>
        ) : info.getValue()
      ),
    }),
    columnHelper.accessor("Qty", {
      header: () => (<div className="text-right">Quantity</div>),
      cell: (info) => (<div className="text-right">{info.getValue()}</div>),
    }),
    columnHelper.accessor("EstimatedPrice", {
      header: () => (<div className="text-right">Estimated Price</div>),
      cell: (info) => (<div className="text-right">{info.getValue()}</div>),
    }),
    columnHelper.accessor("Total", {
      header: () => (<div className="text-right">Total</div>),
      cell: (info) => (<div className="text-right">{info.getValue()}</div>),
    }),
    columnHelper.accessor("Justification", {
      header: "Justification",
    }),
  ], [columnHelper])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <DataTable table={table} />
  )
}