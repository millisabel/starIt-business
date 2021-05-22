import React from 'react';
import {useTable, useSortBy, usePagination} from 'react-table';
import table from './Table.module.css';

function Table({columns, data}) {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        allColumns,
        state: {
            pageIndex,
            pageSize},
    } = useTable({
            columns,
            data,
            initialState: {
                pageIndex: 0,
                pageSize: 15,
            },
        },
        useSortBy,
        usePagination,);
    return (
        <div className={table.wrap}>
            <table {...getTableProps()} className={table.box}>
                <thead className={table.header}>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                rowSpan={column.rowspan?'2':null}
                            >
                                {column.render('Header')}
                                <span>{
                                    column.disableSortBy ?
                                        '' : column.isSorted ?
                                        column.isSortedDesc
                                            ? <span className="icons">arrow_downward</span>
                                            : <span className="icons">arrow_upward</span>
                                        : <span className="icons">sort</span>}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell, i) => {
                                return <td {...cell.getCellProps()} data-label = {allColumns[i].id}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className={table.pagination}>
                <div className={table.pagination_item}>
                    <span className={table.pagination_text}>Go to page:{' '}
                    </span>
                    <input
                        min={1}
                        max={pageOptions.length}
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page)
                        }}
                        className={table.pagination_input}
                    />
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                        className={table.pagination_select}
                    >
                        {[5, 10, 15, 20, 25, 30].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={table.pagination_item}>
                    <span className={table.pagination_text}>Page{' '}
                        <strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
                    </span>
                    <button
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                        className={table.pagination_btn}>
                        {'<<'}
                    </button>
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className={table.pagination_btn}>
                        {'<'}
                    </button>
                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className={table.pagination_btn}>
                        {'>'}
                    </button>
                    <button
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                        className={table.pagination_btn}>
                        {'>>'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Table;