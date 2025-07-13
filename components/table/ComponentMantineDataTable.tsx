import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

interface ComponentMantineDataTableProps{
    Datarow:any,
    DataColumns:any,
    in_id:string,
    in_column_sort:string
}
const ComponentMantineDataTable : React.FC<ComponentMantineDataTableProps> = ({Datarow,DataColumns,in_id,in_column_sort}) =>{
    return (
        <div className="mt-6 panel rounded-3xl">
            <div id={in_id} className="datatables">
                
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={Datarow}
                        columns={DataColumns}
                        minHeight={200}
                    />
            </div>
        </div>
      );
};
export default ComponentMantineDataTable;

// export default function MyTable() {
//   const [data, setData] = useState([
//     { id: 1, name: 'John' },
//     { id: 2, name: 'Jane' },
//   ]);

//   const addRow = () => {
//     const newRow = {
//       id: Date.now(),
//       name: `User ${data.length + 1}`,
//     };
//     setData((prev) => [...prev, newRow]); // ✅ Immutable update
//   };

//   return (
//     <>
//       {/* <button className='btn btn-primary' onClick={addRow}>Add Row</button> */}
//         <div className="mt-6 panel rounded-3xl">
//             <div id={in_id} className="datatables">
//                  {isMounted && (
//                     <DataTable
//                         noRecordsText="No results match your search query"
//                         highlightOnHover
//                         className="table-hover whitespace-nowrap"
//                         records={recordsData}
//                         columns={DataColumns}
//                         totalRecords={initialRecords.length}
//                         recordsPerPage={pageSize}
//                         page={page}
//                         onPageChange={(p) => setPage(p)}
//                         recordsPerPageOptions={PAGE_SIZES}
//                         onRecordsPerPageChange={setPageSize}
//                         sortStatus={sortStatus}
//                         onSortStatusChange={setSortStatus}
//                         minHeight={200}
//                         paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
//                     />
//                 )}
//             </div>
//         </div>  
//       {/* <DataTable
//         withBorder
//         borderRadius="sm"
//         striped
//         highlightOnHover
//         columns={[
//           { accessor: 'id', title: 'ID' },
//           { accessor: 'name', title: 'Name' },
//         ]}
//         records={data} // ✅ This must be bound to state
//       /> */}
//     </>
//   );
// }
