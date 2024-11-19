import React, {useMemo} from 'react'
//step1 import all
import { useTable } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS} from './Columns';
import './Table.css';

const BasicTable = () => {
    //step 2 
    const columns = useMemo(()=> COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    //step3 creating a tableInstance
    //step 5 destructuring couple of propertes and instance for tableInstance
    const  { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        footerGroups,
        rows, 
        prepareRow 
    } = useTable({
        columns,
        data
    })

    
  return (
    //step 4 creating a table
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
        <tfoot>
            {
                footerGroups.map(footerGroup =>(
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {
                            footerGroup.headers.map(column =>(
                                <td {...column.getFooterProps}>
                                    {
                                        column.render('Footer')
                                    }
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </tfoot>
    </table>
  )
}

export default BasicTable;