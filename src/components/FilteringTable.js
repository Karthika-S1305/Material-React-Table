import React, {useMemo} from 'react'
//step1 import all
import { useTable, useGlobalFilter, useFilters } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS} from './Columns';
import './Table.css';
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';

const FilteringTable = () => {
    //step 2 
    const columns = useMemo(()=> COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])


    const defaultColumn = useMemo(()=>{
        return{
            Filter: ColumnFilter
        }
    }, [])
    //step3 creating a tableInstance
    //step 5 destructuring couple of propertes and instance for tableInstance
    const  { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow ,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data,
        defaultColumn
    },
    useFilters, 
    useGlobalFilter)

    const {globalFilter} = state;
  return (
    //step 4 creating a table
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
     <table {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup)=>(
                // tr tag we destructure header group
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) =>(        
                <th {...column.getHeaderProps()}>{column.render('Header')}
                <div>{column.canFilter ? column.render('Filter') : null}</div></th>
                  ))
                }
            </tr>
  ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                rows.map(row => {
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
    </>
  )
}

export default FilteringTable;