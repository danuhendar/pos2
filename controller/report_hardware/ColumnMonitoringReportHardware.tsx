import ButtonTrigger from "@/components/button/ButtonTrigger";

export function Def_Columns_ReportMonitoringVersiPowershell(rows:any){
        let columns = [
            { field: 'id', headerName: 'id', flex: 1 },
            {
                field: 'CLICK_FOR_ACTION', headerName: 'CLICK_FOR_ACTION', flex: 1, width: 150, minWidth: 150, maxWidth: 150,align:'center',headerAlign:'center',
                renderCell: (cellValues: any) => {
                    return (
                        // <span id={'btn_refresh_' + cellValues.id} className={cellValues.value === 200 ? 'badge bg-primary cursor-pointer' : 'badge bg-danger cursor-pointer'}>
                        //     <a className="cursor-pointer" onClick={(event) => {
                        //         //NewhandleRowClick(event, cellValues, rows);
                        //     }} >
                        //         Trigger
                        //     </a>
                        // </span>
                        // <ButtonTrigger in_classname={cellValues.value === 200 ? 'badge bg-primary' : 'badge bg-danger'} idComponent={'btn_refresh_' + cellValues.id} isLoading={false} isDisabled={false} HandleClick={''} cellValues={cellValues} rows={rows} />
                    <></>
                    )
                }
            },
            {
                field: 'KODE', headerName: 'KODE', width: 80, minWidth: 80, maxWidth: 80,
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 200 ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            {
                field: 'KETERANGAN', headerName: 'KETERANGAN', width: 240, minWidth: 240, maxWidth: 240,
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 'Succes' ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            { field: 'REQUEST', headerName: 'REQUEST', width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'RESPONSE', headerName: 'RESPONSE', width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'KDCAB', headerName: 'KDCAB', width: 60, minWidth: 60, maxWidth: 60 },
            { field: 'KDTK', headerName: 'KDTK', width: 80, minWidth: 80, maxWidth: 80 },
            { field: 'NAMA', headerName: 'NAMA', flex: 1, width: 250, minWidth: 250, maxWidth: 250 },
            { field: 'STATION', headerName: 'STATION', width: 90, minWidth: 90, maxWidth: 90 },
            { field: 'IP', headerName: 'IP', width: 150, minWidth: 150, maxWidth: 150 },
            { field: 'VERSI_POWERSHELL', headerName: 'VERSI_POWERSHELL', flex: 1, width: 220, minWidth: 220, maxWidth: 220 },
            { field: 'WINDOWS', headerName: 'WINDOWS', flex: 1, width: 300, minWidth: 300, maxWidth: 300 },
        ];
        let columnGroupingModel: any[] = [];
        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
}