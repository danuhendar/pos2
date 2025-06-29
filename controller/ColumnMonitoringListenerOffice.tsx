export function Def_Columns_ReportMonitoringListenerOffice(){
        let columns = [
            { field: 'id', headerName: 'id', flex: 1 },
            {
                field: 'CLICK_FOR_ACTION', headerName: 'CLICK_FOR_ACTION', flex: 1, width: 150, minWidth: 150, maxWidth: 150,align:'center',headerAlign:'center',
                renderCell: (cellValues: any) => {
                   

                    return (
                        <span id={'btn_refresh_' + cellValues.id} className='badge bg-primary'>
                            <a className="cursor-pointer" onClick={(event) => {
                                
                            }} >
                                
                               Trigger
                            </a>
                        </span>
                    )
                }
            },
            {
                field: 'KODE', headerName: 'KODE', width: 80, minWidth: 80, maxWidth: 80,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 200 ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            {
                field: 'KETERANGAN', headerName: 'KETERANGAN', width: 200, minWidth: 200, maxWidth: 200,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value.includes('Suc') ? 'text-green-800 dark:text-Succeed' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                    );
                }
            },
            { field: 'REQUEST', headerName: 'REQUEST', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'RESPONSE', headerName: 'RESPONSE', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
            { field: 'KDCAB', headerName: 'KDCAB', width: 60, minWidth: 60, maxWidth: 60 },
            { field: 'LOKASI', headerName: 'LOKASI', width: 180, minWidth: 180, maxWidth: 180 },
            { field: 'ID_REPORT', headerName: 'ID_REPORT', flex: 0, width: 220, minWidth: 220, maxWidth: 220 },
            { field: 'COMPUTER_NAME', headerName: 'COMPUTER_NAME', flex: 0, width: 280, minWidth: 280, maxWidth: 280,headerAlign:'left',align:'left'},
            { field: 'IP', headerName: 'IP',flex: 0, width: 130, minWidth: 130, maxWidth: 130 },
            { field: 'PING', headerName: 'PING', flex: 0, width: 250, minWidth: 250, maxWidth: 250,headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value === 'Request timed out' ? 'badge bg-danger' : 'badge bg-success'}  >{cellValues.value === 'Request timed out' ? 'RTO' : cellValues.value.toString().toUpperCase()}</span>
                    );
                }
            },
            { field: 'STATUS', headerName: 'STATUS', flex: 0, width: 150, minWidth: 150,maxWidth: 150, headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value.includes('RUNNING') ? 'badge bg-success' : 'badge bg-danger'}  >{(cellValues.value.includes('RUNNING') ? 'RUNNING' : cellValues.value)}</span>
                    );
                }
            }, 
            { field: 'VERSI_SERVICE', headerName: 'VERSI_SERVICE', flex: 0, width: 130, minWidth: 130,maxWidth: 130, headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value !== '' || cellValues.value !== '-' ? 'badge bg-success' : 'badge bg-danger'}  >{cellValues.value}</span>
                    );
                }
            }, 
            { field: 'PATH', headerName: 'PATH', flex: 0, width: 350, minWidth: 350,maxWidth: 350, headerAlign:'center',align:'center'}, 
            
            { field: 'VERSI_TRAY', headerName: 'VERSI_TRAY', flex: 0, width: 130, minWidth: 130,maxWidth: 130, headerAlign:'center',align:'center',
                renderCell: (cellValues: any) => {
                    return (
                        <span className={cellValues.value !== '' || cellValues.value !== '-' ? 'badge bg-success' : 'badge bg-danger'}  >{cellValues.value}</span>
                    );
                }
            }, 
        ];
        let columnGroupingModel: any[] = [   {
                    groupId: 'Internal',
                    description: '',
                    children: [{ field: 'id' }],
                    },

                    {
                        groupId: ' ',
                        children: [{ field: 'KODE' }, { field: 'KETERANGAN' },  {field: 'REQUEST'}, {field: 'RESPONSE'}, { field: 'KDCAB' }, { field: 'LOKASI' }, { field: 'ID_REPORT' }, { field: 'COMPUTER_NAME' }, { field: 'IP' }, { field: 'PING' }],
                    },
                    {
                        groupId: 'SERVICE',headerAlign:'center',
                        children: [{ field: 'STATUS' }, { field: 'VERSI_SERVICE' }],
                    },
                    {
                        groupId: 'AGENT',headerAlign:'center',
                        children: [{ field: 'PATH' }, { field: 'VERSI_TRAY' }],
                    },

        ];
        let arr_ret = [columns,columnGroupingModel];
        return arr_ret;
}

export function Def_Columns_ReportMonitoringHardwareInfo(){
    let columns = [
        { field: 'id', headerName: 'id', flex: 1 },
        {
            field: 'CLICK_FOR_ACTION', headerName: 'CLICK_FOR_ACTION', flex: 1, width: 150, minWidth: 150, maxWidth: 150,align:'center',headerAlign:'center',
            renderCell: (cellValues: any) => {
               

                return (
                    <span id={'btn_refresh_' + cellValues.id} className='badge bg-primary'>
                        <a className="cursor-pointer" onClick={(event) => {
                            
                        }} >
                            Trigger
                        </a>
                    </span>
                )
            }
        },
        {
            field: 'KODE', headerName: 'KODE', width: 80, minWidth: 80, maxWidth: 80,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <span className={cellValues.value === 200 ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                );
            }
        },
        {
            field: 'KETERANGAN', headerName: 'KETERANGAN', width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <span className={cellValues.value.includes('Suc') ? 'text-green-800 dark:text-Succeed' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                );
            }
        },
        { field: 'REQUEST', headerName: 'REQUEST', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
        { field: 'RESPONSE', headerName: 'RESPONSE', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
        { field: 'KDCAB', headerName: 'KDCAB', width: 60, minWidth: 60, maxWidth: 60 },
        { field: 'LOKASI', headerName: 'LOKASI', width: 180, minWidth: 180, maxWidth: 180 },
        { field: 'ID_REPORT', headerName: 'ID_REPORT', flex: 0, width: 1, minWidth: 1, maxWidth: 1 },
        { field: 'COMPUTER_NAME', headerName: 'COMPUTER_NAME', flex: 0, width: 280, minWidth: 280, maxWidth: 280,headerAlign:'left',align:'left'},
        { field: 'IP', headerName: 'IP',flex: 0, width: 130, minWidth: 130, maxWidth: 130 },
        { field: 'PING', headerName: 'PING', flex: 0, width: 250, minWidth: 250, maxWidth: 250,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <a onClick={(event) => {
                            
                    }} >
                    <span className={cellValues.value === 'Request timed out' ? 'badge bg-danger' : 'badge bg-success'}  >{cellValues.value === 'Request timed out' ? 'RTO' : cellValues.value.toString().toUpperCase()}</span>
                    </a>
                );
            }
        },
        { field: 'OS', headerName: 'OS', flex: 0, width: 200, minWidth: 200, maxWidth: 200,headerAlign:'left',align:'left'},
        { field: 'ARSITEKTUR', headerName: 'ARCH', flex: 0, width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
        { field: 'CPU_NAME', headerName: 'NAME', flex: 0, width: 260, minWidth: 260, maxWidth: 260,headerAlign:'left',align:'left'},
        { field: 'CPU_USAGE', headerName: 'USAGE(%)', flex: 0, width: 100, minWidth: 100, maxWidth: 100,headerAlign:'center',align:'center'},
        { field: 'CPU_TEMPERATURE', headerName: 'SUHU °C', flex: 0, width: 110, minWidth: 110, maxWidth: 110,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <span className={cellValues.value.includes('NOK') || cellValues.value.includes('-') ? 
                        'badge bg-danger' 
                        :
                        (parseFloat(cellValues.value) > 60 ? 'badge bg-warning' : 'badge bg-success') 
                    }  >{cellValues.value}</span>
                );
            }
        },
        { field: 'MEMORY_USAGE', headerName: 'USAGE(%)', flex: 0, width: 100, minWidth: 100, maxWidth: 100,headerAlign:'center',align:'center'},
        { field: 'TOTAL_MEMORY', headerName: 'TOTAL', flex: 0, width: 80, minWidth: 80, maxWidth: 80,headerAlign:'center',align:'center'},
        { field: 'MEMORY_TERBACA', headerName: 'TERBACA', flex: 0, width: 80, minWidth: 80, maxWidth: 80,headerAlign:'center',align:'center'},
        { field: 'HDD_NAME', headerName: 'NAME', flex: 0, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center'},
        { field: 'HDD_TOTAL', headerName: 'TOTAL', flex: 0, width: 80, minWidth: 80, maxWidth: 80,headerAlign:'center',align:'center'},
        { field: 'HDD_TERPAKAI', headerName: 'TERPAKAI', flex: 0, width: 80, minWidth: 80, maxWidth: 80,headerAlign:'center',align:'center'},
        { field: 'HDD_FREE', headerName: 'FREE', flex: 0, width: 80, minWidth: 80, maxWidth: 80,headerAlign:'center',align:'center'},
        { field: 'UPS_STATUS', headerName: 'STATUS', flex: 1, width: 200, minWidth: 200, maxWidth: 200,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    //Windows(R), Professional edition: The machine is permanently activated.
                    <span className={cellValues.value.includes('NOK') || cellValues.value.includes('-') ? 'badge bg-danger' : 'badge bg-success'}  >{cellValues.value}</span>
                );
            }
        },
        { field: 'DEVICE_ID', headerName: 'DEVICE_ID', flex: 0, width: 150, minWidth: 150, maxWidth: 150,headerAlign:'center',align:'center'},
        { field: 'UPTIME', headerName: 'UPTIME', flex: 0, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    //Windows(R), Professional edition: The machine is permanently activated.
                    <span className={cellValues.value !== '-' ? '' : 'badge bg-danger'}  >{cellValues.value}</span>
                );
            }
        },
        { field: 'AKTIVASI_WINDOWS', headerName: 'AKTIVASI', flex: 1, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center',},
        { field: 'KEY_WINDOWS', headerName: 'KEY', flex: 0, width: 230, minWidth: 230, maxWidth: 230,headerAlign:'center',align:'center'},        
        { field: 'BOOT_TIME', headerName: 'BOOT_TIME', flex: 0, width: 100, minWidth: 100, maxWidth: 100,headerAlign:'center',align:'center'},
        { field: 'INTERFACE', headerName: 'INTERFACE', flex: 0, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center'},
        { field: 'RECEIVED', headerName: 'RECEIVED', flex: 0, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center'},
        { field: 'SENT', headerName: 'SENT', flex: 0, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center'},
    ];
    let columnGroupingModel: any[] = [   {
            groupId: 'Internal',
            description: '',
            children: [{ field: 'id' }],
            },

            {
                groupId: ' ',
                children: [{ field: 'KODE' }, { field: 'KETERANGAN' },  {field: 'REQUEST'}, {field: 'RESPONSE'}, { field: 'KDCAB' }, { field: 'LOKASI' }, { field: 'ID_REPORT' }, { field: 'COMPUTER_NAME' }, { field: 'IP' }, { field: 'PING' }],
            },
            {
                groupId: 'CPU',headerAlign:'center',
                children: [{ field: 'OS' }, { field: 'ARSITEKTUR' },{ field: 'CPU_NAME' }, { field: 'CPU_USAGE' }, { field: 'CPU_TEMPERATURE' }],
            },
            {
                groupId: 'MEMORY (GB)',headerAlign:'center',
                children: [{ field: 'MEMORY_USAGE' }, { field: 'TOTAL_MEMORY' }, { field: 'MEMORY_TERBACA' }],
            },
            {
                groupId: 'HDD (GB)',headerAlign:'center',
                children: [{ field: 'HDD_NAME' }, { field: 'HDD_TOTAL' }, { field: 'HDD_TERPAKAI' }, { field: 'HDD_FREE' }],
            },
            {
                groupId: 'UPS',headerAlign:'center',
                children: [{ field: 'UPS_STATUS' }, { field: 'DEVICE_ID' }],
            },
            {
                groupId: 'WINDOWS',headerAlign:'center',
                children: [{ field: 'AKTIVASI_WINDOWS' }, { field: 'KEY_WINDOWS' }],
            },
             {
                groupId: 'NETWORK_TRAFFIC',headerAlign:'center',
                children: [{ field: 'INTERFACE' }, { field: 'RECEIVED' }, { field: 'SENT' }],
            },


    ];
    let arr_ret = [columns,columnGroupingModel];
    return arr_ret;
}

export function Def_Columns_ReportInstallasiTrendMicro(){
    let columns = [
        { field: 'id', headerName: 'id', flex: 1 },
        {
            field: 'CLICK_FOR_ACTION', headerName: 'CLICK_FOR_ACTION', flex: 1, width: 150, minWidth: 150, maxWidth: 150,align:'center',headerAlign:'center',
            renderCell: (cellValues: any) => {
               

                return (
                    <span id={'btn_refresh_' + cellValues.id} className='badge bg-primary'>
                        <a className="cursor-pointer" onClick={(event) => {
                            
                        }} >
                            
                           Trigger
                        </a>
                    </span>
                )
            }
        },
        {
            field: 'KODE', headerName: 'KODE', width: 80, minWidth: 80, maxWidth: 80,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <span className={cellValues.value === 200 ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                );
            }
        },
        {
            field: 'KETERANGAN', headerName: 'KETERANGAN', width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <span className={cellValues.value.includes('Suc') ? 'text-green-800 dark:text-Succeed' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                );
            }
        },
        { field: 'REQUEST', headerName: 'REQUEST', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
        { field: 'RESPONSE', headerName: 'RESPONSE', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
        { field: 'KDCAB', headerName: 'KDCAB', width: 60, minWidth: 60, maxWidth: 60 },
        { field: 'LOKASI', headerName: 'LOKASI', width: 180, minWidth: 180, maxWidth: 180 },
        { field: 'ID_REPORT', headerName: 'ID_REPORT', flex: 0, width: 1, minWidth: 1, maxWidth: 1 },
        { field: 'COMPUTER_NAME', headerName: 'COMPUTER_NAME', flex: 0, width: 280, minWidth: 280, maxWidth: 280,headerAlign:'left',align:'left'},
        { field: 'IP', headerName: 'IP',flex: 0, width: 130, minWidth: 130, maxWidth: 130 },
        { field: 'PING', headerName: 'PING', flex: 0, width: 250, minWidth: 250, maxWidth: 250,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <span className={cellValues.value === 'Request timed out' ? 'badge bg-danger' : 'badge bg-success'}  >{cellValues.value === 'Request timed out' ? 'RTO' : cellValues.value.toString().toUpperCase()}</span>
                );
            }
        },
        { field: 'OS', headerName: 'OS', flex: 0, width: 200, minWidth: 200, maxWidth: 200,headerAlign:'left',align:'left'},
        { field: 'ARCH', headerName: 'ARCH', flex: 0, width: 90, minWidth: 90, maxWidth: 90,headerAlign:'center',align:'center'},
        { field: 'CPU_USAGE', headerName: 'CPU_USAGE(%)', flex: 0, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center'},
        { field: 'MEMORY_USAGE', headerName: 'MEMORY_USAGE(%)', flex: 0, width: 140, minWidth: 140, maxWidth: 140,headerAlign:'center',align:'center'},
        { field: 'PATH', headerName: 'PATH', flex: 0, width: 220, minWidth: 220, maxWidth: 220,headerAlign:'center',align:'center'},
        { field: 'DEEP_SECURITY_AGENT', headerName: 'DEEP_SECURITY_AGENT', flex: 0, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <span className={cellValues.value.includes('Running') ? 'badge bg-success' : 'badge bg-danger'}  >{cellValues.value.toString().toUpperCase()}</span>
                );
            }
        },
        { field: 'DEEP_SECURITY_MONITOR', headerName: 'DEEP_SECURITY_MONITOR', flex: 0, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <span className={cellValues.value.includes('Running') ? 'badge bg-success' : 'badge bg-danger'}  >{cellValues.value.toString().toUpperCase()}</span>
                );
            }
        },
        { field: 'DEEP_SECURITY_NOTIFIER', headerName: 'DEEP_SECURITY_NOTIFIER', flex: 0, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <span className={cellValues.value.includes('Running') ? 'badge bg-success' : 'badge bg-danger'}  >{cellValues.value.toString().toUpperCase()}</span>
                );
            }
        },
        { field: 'SOLUTION_PLATFORM', headerName: 'SOLUTION_PLATFORM', flex: 0, width: 180, minWidth: 180, maxWidth: 180,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <span className={cellValues.value.includes('Running') ? 'badge bg-success' : 'badge bg-danger'}  >{cellValues.value.toString().toUpperCase()}</span>
                );
            }
        },  
    ];
    let columnGroupingModel: any[] = [   {
            groupId: 'Internal',
            description: '',
            children: [{ field: 'id' }],
            },

            {
                groupId: ' ',
                children: [{ field: 'KODE' }, { field: 'KETERANGAN' },  {field: 'REQUEST'}, {field: 'RESPONSE'}, { field: 'KDCAB' }, { field: 'LOKASI' }, { field: 'ID_REPORT' }, { field: 'COMPUTER_NAME' }, { field: 'IP' }, { field: 'PING' }],
            },
            {
                groupId: 'CPU',headerAlign:'center',
                children: [{ field: 'OS' }, { field: 'ARCH' }],
            },
            {
                groupId: 'RESOURCES',headerAlign:'center',
                children: [{ field: 'CPU_USAGE' }, { field: 'MEMORY_USAGE' }],
            },
            {
                groupId: 'SERVICE',headerAlign:'center',
                children: [{ field: 'DEEP_SECURITY_AGENT' }, { field: 'DEEP_SECURITY_MONITOR' }, { field: 'DEEP_SECURITY_NOTIFIER' }, { field: 'SOLUTION_PLATFORM' }],
            },
    ];
    let arr_ret = [columns,columnGroupingModel];
    return arr_ret;
}


