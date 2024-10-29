import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
  CircleIcon,
} from "lucide-react"
import { type Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cva, type VariantProps } from "class-variance-authority"

const dataTableColumnSimpleHeaderVariants = cva(
  "", 
  {
    variants: {
      align: {
        start: "text-start",
        center: "text-center",
        end: "text-end",
      },
    },
    defaultVariants: {
      align: "start",
    },
  },
)


const dataTableColumnComplexHeaderVariants = cva(
  "flex items-center space-x-2",
  {
    variants: {
      align: {
        start: "text-start justify-start",
        center: "text-center justify-center",
        end: "text-end justify-end",
      },
    },
    defaultVariants: {
      align: "start",
    },
  },
) 

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement>, 
    VariantProps<typeof dataTableColumnSimpleHeaderVariants>,
    VariantProps<typeof dataTableColumnComplexHeaderVariants> {
  column: Column<TData, TValue>
  children: React.ReactNode
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  className,
  children,
  align,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(dataTableColumnSimpleHeaderVariants({ align, className }))}>{children}</div>
  }

  return (
    <div className={cn(dataTableColumnComplexHeaderVariants({ align, className }))}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              column.getIsSorted() === "desc"
                ? "Sorted descending. Click to sort ascending."
                : column.getIsSorted() === "asc"
                  ? "Sorted ascending. Click to sort descending."
                  : "Not sorted. Click to sort ascending."
            }
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{children}</span>
            {column.getCanSort() && column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 size-4" aria-hidden="true" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 size-4" aria-hidden="true" />
            ) : (
              <ChevronsUpDownIcon className="ml-2 size-4" aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align ?? undefined}>
          {column.getCanSort() && (
            <>
              <DropdownMenuItem
                aria-label="Sort ascending"
                onClick={() => column.getIsSorted() === "asc" ? column.clearSorting() : column.toggleSorting(false)}
              >
                <div className="h-2 w-2 mx-1">
                  { column.getIsSorted() === "asc" && <CircleIcon className="!h-2 !w-2 fill-current" aria-hidden="true" /> }
                </div>
                Asc
                <ArrowUpIcon
                  className="ml-auto size-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
              </DropdownMenuItem>
              <DropdownMenuItem
                aria-label="Sort descending"
                onClick={() => column.getIsSorted() === "desc" ? column.clearSorting() : column.toggleSorting(true)}
              >
                <div className="h-2 w-2 mx-1">
                  { column.getIsSorted() === "desc" && <CircleIcon className="!h-2 !w-2 fill-current" aria-hidden="true" /> }
                </div>
                Desc
                <ArrowDownIcon
                  className="ml-auto size-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
              </DropdownMenuItem>
            </>
          )}
          {column.getCanSort() && column.getCanHide() && (
            <DropdownMenuSeparator />
          )}
          {column.getCanHide() && (
            <DropdownMenuItem
              aria-label="Hide column"
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeOffIcon
                className="mr-2 size-3.5 text-muted-foreground/70"
                aria-hidden="true"
              />
              Hide
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}