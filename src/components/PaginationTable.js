import React, {useMemo} from 'react'
//step1 import all
import { useTable, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS} from './Columns';
import './Table.css';

const PaginationTable = () => {
    //step 2 
    const columns = useMemo(()=> COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    //step3 creating a tableInstance
    //step 5 destructuring couple of propertes and instance for tableInstance
    const  { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow 
    } = useTable({
        columns,
        data,
        initialState: {pageIndex: 0}
    }, usePagination)

    const {pageIndex, pageSize} = state;
    
  return (
    //step 4 creating a table
    <>
    <table {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup)=>(
                // tr tag we destructure header group
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) =>(        
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))
                }
            </tr>
  ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                page.map(row => {
                    prepareRow(row)
                    return(
                 <tr {...row.getRowProps()}>
                    {
                        row.cells.map((cell)=>{
                            return (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            )
                        })
                    }
                 </tr>
                    )
                })
            }
            
        </tbody>
    </table>
    <div>
        <span>
            Page{' '}
            <strong>
                {pageIndex+1} of {pageOptions.length}
            </strong>
        </span>
        <span>
            |Go to page: {' '}
            <input type='number' defaultValue={pageIndex+1} 
            onChange={e=>{
                const pageNumber = e.target.value? Number(e.target.value) -1 :0
                gotoPage(pageNumber)
            }}/>
        </span>
        <select 
        value={pageSize} 
        onChange={(e) => setPageSize(Number(e.target.value))}>
            {[10, 25, 50].map((pageSize)=>(
                <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                </option>
                ))}
        </select>
        <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
        </button>
        <button onClick={()=>previousPage()} disabled={!canPreviousPage}>previous</button>
        <button onClick={()=>nextPage()} disabled={!canNextPage}>next</button>
        <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>
            {'>>'}
        </button>
    </div>
    </>
  )
}

export default PaginationTable;