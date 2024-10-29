"use client"

import { DataTable } from "@/components/data-table/data-table";
import { StolenProperty } from "@/data/stolen-stuff";
import { 
  useReactTable,
  createColumnHelper, 
  getCoreRowModel, 
  getSortedRowModel, 
  SortingState, 
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import videos from "@/data/videos";
import products from "@/data/products";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

interface StolenStuffTableProps {
  data: StolenProperty[]
}

export default function StolenStuffTable({
  data,
}: StolenStuffTableProps) {
  const columnHelper = useMemo(() => createColumnHelper<StolenProperty>(), [])

  const columns = useMemo(() => [
    columnHelper.accessor("Video", {
      header: ({ column }) => (<DataTableColumnHeader column={column}>Video</DataTableColumnHeader>),
      cell: (info) => (
        <a 
          href={info.getValue()} 
          target="_blank" 
          rel="noreferrer"
        >
          {videos[info.getValue()]?.Title ?? info.getValue()}
        </a>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("Timecodes", {
      header: ({ column }) => (<DataTableColumnHeader column={column} align="end">Timecodes</DataTableColumnHeader>),
      cell: (info) => (<div className="text-end">{
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
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("Who", {
      header: ({ column }) => (<DataTableColumnHeader column={column}>Who</DataTableColumnHeader>),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("Product", {
      header: ({ column }) => (<DataTableColumnHeader column={column}>Product</DataTableColumnHeader>),
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
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("Qty", {
      header: ({ column }) => (<DataTableColumnHeader column={column} align="end">Qty</DataTableColumnHeader>),
      cell: (info) => (<div className="text-right">{info.getValue()}</div>),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("EstimatedPrice", {
      header: ({ column }) => (<DataTableColumnHeader column={column} align="end">Estimated Price</DataTableColumnHeader>),
      cell: (info) => (<div className="text-right">{info.getValue()}</div>),
      enableHiding: false,
    }),
    columnHelper.accessor("Total", {
      header: ({ column }) => (<DataTableColumnHeader column={column} align="end">Total</DataTableColumnHeader>),
      cell: (info) => (<div className="text-right">{info.getValue()}</div>),
      enableHiding: false,
    }),
    columnHelper.accessor("Justification", {
      header: ({ column }) => (<DataTableColumnHeader column={column}>Justification</DataTableColumnHeader>),
      enableSorting: false,
      enableHiding: false,
    }),
  ], [columnHelper])

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  return (
    <DataTable table={table} />
  )
}