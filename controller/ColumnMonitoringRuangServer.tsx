import ClickableImageZoom from "@/components/image/ClickableImageZoom";
import ImageComponent from "@/components/image/ImageComponent";


export function Def_Columns_ReportMonitoringUPSServer(){
    let columns = [
        { field: 'id', headerName: 'id', flex: 1 },
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
        { field: 'SEGMENT', headerName: 'SEGMENT', width: 120, minWidth: 120, maxWidth: 120 },
        { field: 'ID_REPORT', headerName: 'ID_REPORT', flex: 0, width: 220, minWidth: 220, maxWidth: 220 },
        { field: 'PING', headerName: 'PING', flex: 0, width: 250, minWidth: 250, maxWidth: 250,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <span className={cellValues.value === 'Request timed out' ? 'badge bg-danger' : 'badge bg-success'}  >{cellValues.value === 'Request timed out' ? 'RTO' : cellValues.value.toString().toUpperCase()}</span>
                );
            }
        },
        { field: 'COMPUTER_NAME', headerName: 'COMPUTER_NAME', flex: 0, width: 280, minWidth: 280, maxWidth: 280,headerAlign:'left',align:'left'},
        { field: 'IP', headerName: 'IP',flex: 0, width: 130, minWidth: 130, maxWidth: 130 },

        { field: 'MODEL', headerName: 'MODEL',flex: 0, width: 180, minWidth: 180, maxWidth: 180 },
        { field: 'LOCATION', headerName: 'LOCATION',flex: 0, width: 180, minWidth: 180, maxWidth: 180 },
        { field: 'DATE', headerName: 'DATE',flex: 0, width: 130, minWidth: 130, maxWidth: 130 },
        { field: 'TIME', headerName: 'TIME',flex: 0, width: 130, minWidth: 130, maxWidth: 130 },
        { field: 'BATTERY_REPLACEMENT_DATE', headerName: 'BATTERY_REPLACEMENT_DATE',flex: 0, width: 200, minWidth: 200, maxWidth: 200 },
        { field: 'STATE_OF_CHARGE', headerName: 'STATE_OF_CHARGE',flex: 0, width: 130, minWidth: 130, maxWidth: 130,align:'right',headerAlign:'left' },
        { field: 'BATTERY_TEMPERATURE', headerName: 'BATTERY_TEMPERATURE',flex: 0, width: 180, minWidth: 180, maxWidth: 180,align:'right',headerAlign:'left' },
        { field: 'BATTERY_VOLTAGE', headerName: 'BATTERY_VOLTAGE',flex: 0, width: 130, minWidth: 130, maxWidth: 130,align:'right',headerAlign:'left' },
        { field: 'BATTERY_SKU', headerName: 'BATTERY_SKU',flex: 0, width: 130, minWidth: 130, maxWidth: 130,align:'center',headerAlign:'center' },
        { field: 'SERIAL_NUMBER', headerName: 'SERIAL_NUMBER',flex: 0, width: 130, minWidth: 130, maxWidth: 130,align:'center',headerAlign:'center' },

        { field: 'MANUFACTURE_DATE', headerName: 'MANUFACTURE_DATE',flex: 0, width: 140, minWidth: 140, maxWidth: 140 },
        { field: 'INSTALLATION_DATE', headerName: 'INSTALLATION_DATE',flex: 0, width: 140, minWidth: 140, maxWidth: 140 },
        { field: 'FIRMWARE_VERSION', headerName: 'FIRMWARE_VERSION',flex: 0, width: 200, minWidth: 200, maxWidth: 200 },
        { field: 'RUNTIME_REMAINING', headerName: 'RUNTIME_REMAINING',flex: 0, width: 180, minWidth: 180, maxWidth: 180 },
        { field: 'OUTPUT_VOLTAGE', headerName: 'OUTPUT_VOLTAGE',flex: 0, width: 130, minWidth: 130, maxWidth: 130,align:'right',headerAlign:'left' },
        { field: 'OUTPUT_FREQUENCY', headerName: 'OUTPUT_FREQUENCY',flex: 0, width: 130, minWidth: 130, maxWidth: 130,align:'right',headerAlign:'left' },
        { field: 'OUTPUT_VA', headerName: 'OUTPUT_VA',flex: 0, width: 130, minWidth: 130, maxWidth: 130,align:'right',headerAlign:'left' },
        { field: 'OUTPUT_ENERGY_USAGE', headerName: 'OUTPUT_ENERGY_USAGE',flex: 0, width: 180, minWidth: 180, maxWidth: 180,align:'right',headerAlign:'left' },
        { field: 'INPUT_VOLTAGE', headerName: 'INPUT_VOLTAGE',flex: 0, width: 130, minWidth: 130, maxWidth: 130,align:'right',headerAlign:'left' },
        { field: 'INPUT_FREQUENCY', headerName: 'INPUT_FREQUENCY',flex: 0, width: 130, minWidth: 130, maxWidth: 130,align:'right',headerAlign:'left' },
        { field: 'LOAD_CURRENT', headerName: 'LOAD_CURRENT',flex: 0, width: 130, minWidth: 130, maxWidth: 130,align:'right',headerAlign:'left' },
    ];
    let columnGroupingModel: any[] = [];
    let arr_ret = [columns,columnGroupingModel];
    return arr_ret;
}


export function Def_Columns_ReportMonitoringCCTVRuangServer(){
    let columns = [
        { field: 'id', headerName: 'id', flex: 1 },
        {
            field: 'CODE', headerName: 'CODE', width: 60, minWidth: 60, maxWidth: 60,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <span className={cellValues.value === 200 ? 'text-green-800 dark:text-success' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                );
            }
        },
        {
            field: 'DESCRIPTION', headerName: 'DESCRIPTION', width: 250, minWidth: 250, maxWidth: 250,headerAlign:'center',align:'center',
            renderCell: (cellValues: any) => {
                return (
                    <span className={cellValues.value.includes('Succ') || cellValues.value.includes('succ')   ? 'text-green-800 dark:text-Succeed' : 'text-red-800 dark:text-danger'}  >{cellValues.value}</span>
                );
            }
        },
        { field: 'UPDTIME', headerName: 'UPDTIME', flex: 0,  width: 170, minWidth: 170, maxWidth: 170 },
        { field: 'KDCAB', headerName: 'KDCAB', width: 60, minWidth: 60, maxWidth: 60 },
        { field: 'IP', headerName: 'IP',flex: 0, width: 130, minWidth: 130, maxWidth: 130 },

        { field: 'LOCATION', headerName: 'LOCATION',flex: 0, width: 180, minWidth: 180, maxWidth: 180 },
        { field: 'CAMERA', headerName: 'CAMERA',flex: 0, width: 90, minWidth: 90, maxWidth: 90,align:'center',headerAlign:'center' },
        { field: 'MERK', headerName: 'MERK',flex: 0, width: 130, minWidth: 130, maxWidth: 130,align:'center',headerAlign:'center' },
        { field: 'SCHEDULER_06', headerName: '06:00',flex: 0, width: 300, minWidth: 300, maxWidth: 300,align:'center',headerAlign:'center',
            renderCell: (cellValues: any) => {
                return (
                    // <ImageMagnifier smallImageUrl={"data:image/png;base64,"+cellValues.value} largeImageUrl={"data:image/png;base64,"+cellValues.value} altText={(cellValues.value.toString().includes('404-') ? cellValues.value : 'NO IMAGE')} />
                    <ClickableImageZoom data_SCHEDULER={"06:00"} data_image={cellValues} smallImageUrl={(cellValues.value.toString().includes('404-') ? '' : "data:image/png;base64,"+cellValues.value)} largeImageUrl={(cellValues.value.toString().includes('404-') ? '' : "data:image/png;base64,"+cellValues.value)} altText={(cellValues.value.toString().includes('404-') ? cellValues.value : 'NO IMAGE')} />
                    //<ImageComponent dataURL={(cellValues.value.toString().includes('404-') ? '' : "data:image/png;base64,"+cellValues.value)} authorAlt={(cellValues.value.toString().includes('404-') ? cellValues.value : 'NO IMAGE')} imageQuality={8} type_loading={'lazy'} />
                    
                );
            }
         },
        { field: 'SCHEDULER_15', headerName: '15:00',flex: 0, width: 300, minWidth: 300, maxWidth: 300,align:'center',headerAlign:'center',
            renderCell: (cellValues: any) => {
                return (
                    <ClickableImageZoom data_SCHEDULER={"15:00"} data_image={cellValues}  smallImageUrl={(cellValues.value.toString().includes('404-') ? '' : "data:image/png;base64,"+cellValues.value)} largeImageUrl={(cellValues.value.toString().includes('404-') ? '' : "data:image/png;base64,"+cellValues.value)} altText={(cellValues.value.toString().includes('404-') ? cellValues.value : 'NO IMAGE')} />
                );
            }
         },
        { field: 'SCHEDULER_23', headerName: '23:00',flex: 0, width: 300, minWidth: 300, maxWidth: 300,align:'center',headerAlign:'center',
            renderCell: (cellValues: any) => {
                return (
                    <ClickableImageZoom data_SCHEDULER={"23:00"} data_image={cellValues}  smallImageUrl={(cellValues.value.toString().includes('404-') ? '' : "data:image/png;base64,"+cellValues.value)} largeImageUrl={(cellValues.value.toString().includes('404-') ? '' : "data:image/png;base64,"+cellValues.value)} altText={(cellValues.value.toString().includes('404-') ? cellValues.value : 'NO IMAGE')} />
                );
            }
         },
        { field: 'TYPE', headerName: 'TYPE',flex: 0, width: 100, minWidth: 100, maxWidth: 100,align:'center',headerAlign:'center' },
    ];
    let columnGroupingModel: any[] = [
        { 
            groupId: 'Internal',
            description: '',
            children: [{ field: 'id' }],
        },

        {
            groupId: ' ',
            children: [{ field: 'CODE' }, { field: 'DESCRIPTION' },  {field: 'UPDTIME'}, {field: 'KDCAB'}, { field: 'IP' }, { field: 'LOCATION' }, { field: 'CAMERA' }, { field: 'MERK' }],
        },
        {
            groupId: 'SCHEDULER',headerAlign:'center',
            children: [{ field: 'SCHEDULER_06' }, { field: 'SCHEDULER_15' }, { field: 'SCHEDULER_23' }],
        }
    ];
    let arr_ret = [columns,columnGroupingModel];
    return arr_ret;
}
