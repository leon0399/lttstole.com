"use client"

import {
  flexRender,
  type Table as TanstackTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { type ForwardedRef, forwardRef, type RefAttributes } from "react"

interface DataTableProps<TData> {
  table: TanstackTable<TData>
}

function DataTableInner<TData>(
    { table }: DataTableProps<TData>, 
    ref: ForwardedRef<HTMLTableElement>
) {
  return (
    <Table ref={ref}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getFilteredRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {table.getFooterGroups().length > 0 && (
        <TableFooter>
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <TableCell key={footer.id}>
                  {flexRender(footer.column.columnDef.footer, footer.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      )}
    </Table>
  )
}

export const DataTable = forwardRef(DataTableInner) as <TData>(
  props: DataTableProps<TData> & RefAttributes<HTMLTableElement>
) => ReturnType<typeof DataTableInner>
