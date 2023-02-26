/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel
} from '@tanstack/react-table';

import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';

import { FC, Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material';
import { IconCaretDown, IconCaretUp, IconChevronLeft, IconChevronRight } from '@tabler/icons';

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank
  });
  return itemRank.passed;
};

const AppTable = ({
  columns,
  initialData,
  columnVisibility,
  globalFilter,
  disablePagination = false,
  stickyHeader = false,
  getRowCanExpand = () => false,
  renderSubComponent
}) => {
  const [data, setData] = useState([]);

  const table = useReactTable({
    data,
    columns,
    // filterFns: {
    //   fuzzy: fuzzyFilter
    // },
    state: {
      globalFilter,
      columnVisibility
    },
    // globalFilterFn: fuzzyFilter,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: !disablePagination ? getPaginationRowModel() : undefined,
    initialState: {
      pagination: {
        pageSize: 25
      }
    }
  });

  useEffect(() => {
    setData(initialData);
  }, [table, initialData]);

  return (
    <>
      <TableContainer sx={{ maxHeight: stickyHeader ? 440 : 'auto' }}>
        <Table stickyHeader={stickyHeader} sx={{ minWidth: 750 }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableCell key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <TableSortLabel
                          {...{
                            onClick: header.column.getToggleSortingHandler(),
                            direction: header.column.getSortIndex() === index - 0 ? header.column.getIsSorted() : 'asc',
                            active: header.column.getSortIndex() === index - 0
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <IconCaretUp v />,
                            desc: <IconCaretDown />
                          }[header.column.getIsSorted()] ?? null}
                        </TableSortLabel>
                      </>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow hover>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow>
                    {/* 2nd row is a custom 1 cell row */}
                    <TableCell colSpan={row.getVisibleCells().length}>{renderSubComponent({ row })}</TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>{`${globalFilter || 'Data'} tidak ditemukan`}</Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!disablePagination && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Typography>Data per halaman:</Typography>
          <FormControl sx={{ m: 1, minWidth: 75, mr: 4 }} size="small">
            <Select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              size="small"
            >
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <Typography>{`${
            table.getCanPreviousPage
              ? table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1
              : table.getState().pagination.pageIndex + 1
          } - ${
            table.getCanNextPage() ? table.getState().pagination.pageSize * (table.getState().pagination.pageIndex + 1) : initialData.length
          } / ${initialData.length} data`}</Typography>
          <IconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <IconChevronLeft size={18} />
          </IconButton>
          <IconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <IconChevronRight size={18} />
          </IconButton>
        </Box>
      )}
    </>
  );
};

AppTable.propTypes = {
  columns: PropTypes.any,
  initialData: PropTypes.any,
  columnVisibility: PropTypes.object,
  globalFilter: PropTypes.string,
  onGlobalFilterChange: PropTypes.func,
  disablePagination: PropTypes.bool,
  stickyHeader: PropTypes.bool,
  getRowCanExpand: PropTypes.func,
  renderSubComponent: PropTypes.any
};

export default AppTable;
