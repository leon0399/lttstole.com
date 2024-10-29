"use client"

import { useMemo, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { 
  useReactTable,
  createColumnHelper, 
  getCoreRowModel, 
  getSortedRowModel, 
  SortingState, 
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  ExternalLinkIcon,
} from "lucide-react";

import { type StolenProperty } from "@/data/stolen-stuff";
import videos from "@/data/videos";
import products from "@/data/products";
import { getPreviews, parseId } from "@/lib/youtube";
import Image from "next/image";

const YouTubeLink = ({ url, title }: { url: string, title: string }) => {
  const previews = useMemo(() => getPreviews(parseId(url)), [url])

  return (
    <Button variant={"link"} size={"sm"} asChild className="px-0 h-auto">
      <a 
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <div
          className="w-12 mr-1"
        >
          <Image
            src={previews.maxres} 
            alt={title} 
            layout={"responsive"}
            className="rounded-md"
            width={48}
            height={48}
            loading="lazy"
          />
        </div>

        {title}
  
        <ExternalLinkIcon />
      </a>
    </Button>
  )
}

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
      cell: (info) => (<YouTubeLink url={info.getValue()} title={videos[info.getValue()]?.Title || info.getValue()} />),
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
          <Button variant={"link"} size={"sm"} asChild className="px-0 h-auto">
            <a
              href={products[info.getValue()]?.url} 
              target="_blank" 
              rel="noreferrer"
            >
              {info.getValue()}

              <ExternalLinkIcon />
            </a>
          </Button>
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
    columnHelper.accessor("EstimatedPriceAsNumber", {
      header: ({ column }) => (<DataTableColumnHeader column={column} align="end">Estimated Price</DataTableColumnHeader>),
      cell: (info) => (<div className="text-right pr-11">{info.row.original.EstimatedPrice}</div>),
      enableHiding: false,
    }),
    columnHelper.accessor("TotalAsNumber", {
      header: ({ column }) => (<DataTableColumnHeader column={column} align="end">Total</DataTableColumnHeader>),
      cell: (info) => (<div className="text-right pr-11">{info.row.original.Total}</div>),
      enableHiding: false,
      footer: (info) => {
        const sum = info.table.getFilteredRowModel().rows.reduce((prev, curr) => prev + curr.original.TotalAsNumber, 0)

        return (
          <div className="text-right pr-11">
            <span className="text-sm text-muted-foreground/70">Sum:{' '}</span>
            ${sum.toFixed(2)}
          </div>
        )
      }
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