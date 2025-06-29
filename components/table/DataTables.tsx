'use client'
import React, { useEffect, useState } from "react";
import { DataGrid, gridClasses, GridColDef, GridEventListener, GridRowId, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider, alpha, createTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import { IRootState } from "@/store";
import IconRefresh from "../Icon/IconRefresh";
import { Box, CircularProgress, CircularProgressProps, colors, Skeleton, Typography } from "@mui/material";
import * as XLSX from 'xlsx';
import { get_format_tanggal_jam } from "@/lib/global";
import { useTranslation } from "react-i18next";
import { blue, blueGrey } from "@mui/material/colors";


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
});

interface DataTablesProps{
    in_column_hidden:any,
    jenis_laporan: string,
    data_columns: any,
    data_rows: any,
    isLoading: boolean,
    progressbar:string,
    field_auto_sorting:string,
    type_sorting:any,
    iscolumns_grouping:boolean,
    arr_columnGroupingModel: any,
    isHiddenID: any,
    timelapsed: string,
    in_class:string,
    data_row_height:number,
    isDisableBorder:boolean,
    sizeBorderRadius:number,
    row_per_page:any,
    in_showQuickFilter:boolean,
    in_handleRowClick:any,
    in_csvOptions:boolean,
    in_printOptions:boolean,
    in_is_checkboxSelection:boolean,
    in_content_selected_rows:any,
    in_prosentase_progress:number,
    in_rows_spanning:boolean,
}



const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: (theme as any).palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
  backgroundColor: 'rgba(18, 18, 18, 0.7)',
  ...theme.applyStyles('light', {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  }),
}));

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          component="div"
          color="text.primary"
          fontFamily={'monospace'}
          fontSize={15}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}


function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="200"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}


const ODD_OPACITY = 0.3;
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[300],
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      }, 
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
})); 


const DataTables: React.FC<DataTablesProps> = ({in_column_hidden,jenis_laporan,data_rows,data_columns,isLoading,progressbar,field_auto_sorting,type_sorting,iscolumns_grouping,arr_columnGroupingModel,isHiddenID,timelapsed,in_class,data_row_height,isDisableBorder,sizeBorderRadius,row_per_page,in_showQuickFilter,in_handleRowClick,in_csvOptions,in_printOptions,in_is_checkboxSelection,in_content_selected_rows,in_prosentase_progress,in_rows_spanning}) => {
const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
const { t, i18n } = useTranslation();
const [progress, setProgress] = React.useState(0);

useEffect(() => {
  CustomLoadingOverlay()
},[]);
function CustomLoadingOverlay() {
  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) => (prevProgress >= 100 ? 0 : (in_prosentase_progress) ));
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  setProgress((prevProgress) => (prevProgress >= 100 ? 0 : (in_prosentase_progress) ));

  return (
    <StyledGridOverlay>
      <CircularProgressWithLabel value={progress} />
      <Box sx={{ mt: 2 }}><Typography fontFamily={'monospace'} fontSize={15}>{t('Loading rows')}…</Typography></Box>
    </StyledGridOverlay>
  );
}
const ExportKeExcel = (idComponent:string) => {
  const wb = XLSX.utils.book_new()
  const data = data_rows;
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, jenis_laporan+"_"+get_format_tanggal_jam()+".xlsx");
}

return (
    <>
         <div className="flex items-center mb-3 justify-left">
                {
                  isDisableBorder ? 
                  <div className={in_class}>
                      <div className="flex flex-col items-center p-2 sm:flex-row">
                          <div className="flex-1 w-full pr-4 text-center ltr:sm:pl-4 rtl:sm:pr-1 sm:text-left">
                          
                              <div className="mb-3">
                                <div className="grid grid-cols-2">
                                  <div>
                                      <div className="flex items-center">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                          </svg> 
                                          <span className="mt-1 ml-1 text-dark text-1xl dark:text-white-light">{jenis_laporan}</span>
                                      </div>
                                  </div>
                                  {

                                      progressbar == '' ? '' :  
                                              <div className="mt-1">
                                                  <h4 className="mt-1 ml-1 text-dark text-1xl dark:text-white-light text-end">
                                                  {
                                                  progressbar == 'button' ? 
                                                  <button
                                                      className="w-full rounded-full btn btn-primary text-end"
                                                  >
                                                      <IconRefresh />
                                                      Refresh
                                                  </button>
                                                  : 
                                                  <>
                                                  <span className="badge bg-success">
                                                      {progressbar}{'|'}{timelapsed === 'NaN' ? '0 Detik' : timelapsed+' Detik'}
                                                  </span>
                                                  </>      
                                                  }
                                                  </h4>
                                              </div>
                                  }
                                  </div>
                              </div>

                              <div className="w-full mb-3">
                                    {
                                      data_rows.length > 0 ?
                                      <>
                                          <div className="grid grid-cols-4 gap-3 mb-3">
                                              <div>
                                                <button id="btn_export_excel" onClick={() => {
                                                                                    ExportKeExcel('btn_export_excel')
                                                                                  }}  type="button" className={!isDark ? 'btn btn-success w-full rounded-full text-end text-xs' : 'btn btn-outline-success w-full rounded-full text-xs'}>
                                                    {t('Export to Excel')}
                                                </button>
                                              </div>
                                          </div>
                                        
                                      </>
                                      :
                                      ''
                                    }
                                    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                                    {
                                      isDark ? 
                                      <DataGrid
                                          onRowClick={in_handleRowClick} 
                                          rowHeight={data_row_height}
                                          
                                          sx={{ fontSize: 12, boxShadow: 4,border: 0,fontFamily:"monospace", '--DataGrid-overlayHeight': '300px',
                                             '& .MuiDataGrid-columnHeader': {
                                              backgroundColor: "var(--primary-selected, #3b3f5c)",
                                              }
                                          }}
                                          unstable_rowSpanning={in_rows_spanning}
                                          rows={data_rows}
                                          columns={data_columns}
                                          initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 10 },
                                            },
                                            sorting: {sortModel: [{ field: field_auto_sorting , sort: type_sorting }]},
                                          }}
                                          pageSizeOptions={row_per_page}
                                          checkboxSelection={in_is_checkboxSelection}
                                          density="compact"
                                          columnVisibilityModel={in_column_hidden}
                                          //components={{ Toolbar: GridToolbar,LoadingOverlay: LinearProgress }}
                                          loading = {isLoading}
                                          columnGroupingModel={arr_columnGroupingModel}
                                          disableRowSelectionOnClick={true}
                                          slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay }}
                                          onRowSelectionModelChange={(id) => {
                                            const selectedIDs = new Set(id);
                                            const selectedRowData = data_rows.filter((row: { id: GridRowId; }) =>
                                                selectedIDs.has(row.id)
                                            );
                                            selectedRowData.forEach((eachItem: any)=> {
                                              if(JSON.stringify(in_content_selected_rows).includes(eachItem.id)){
                                                
                                              }else{
                                                in_content_selected_rows.push(eachItem);
                                              }
                                            
                                            });
                                          }}
                                          slotProps={{
                                            toolbar: {
                                                printOptions: { disableToolbarButton: in_printOptions },
                                                csvOptions: { disableToolbarButton: in_csvOptions },
                                                showQuickFilter: in_showQuickFilter,
                                            },
                                          }}
                                          autoHeight={true}
                                          showCellVerticalBorder={true}
                                          showColumnVerticalBorder={true}
                                      />
                                      :
                                      //-- jika menggunakan mode light, table akan di arsir per row nya --//
                                      //-- jika prosentase progress bernilai 0, maka menggunakan loading linear-progress overlay --//
                                      in_prosentase_progress === 0 ? 
                                      //-- jika menggunakan mode light, dan rowspanning = true , maka table tidak menggunakan mode arsiran atau NOK stripe --//    
                                      in_rows_spanning ? 
                                      <DataGrid
                                          onRowClick={in_handleRowClick} 
                                          getRowClassName={
                                            (params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                          }
                                          rowHeight={data_row_height}
                                          //getRowHeight={() => 50}
                                          unstable_rowSpanning={in_rows_spanning}
                                          //experimentalFeatures={{ columnGrouping: iscolumns_grouping }}
                                          sx={{fontSize: 12, boxShadow: 8,border: 0,fontFamily:"monospace", '--DataGrid-overlayHeight': '300px',
                                              "& .MuiDataGrid-columnHeader": {
                                                fontWeight: 400,
                                                borderRadius: "var(--none, 0px)",
                                                //borderBottom: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                //borderLeft: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                //borderRight: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                //borderTop: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                alignItems: 'space-between !important',
                                                fontSize:12,
                                                backgroundColor: "var(--primary-selected, #deeffd)",
                                                fontStyle:'bold'
                                                
                                            },
                                          }}
                                          rows={data_rows}
                                          columns={data_columns}
                                          initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 10 },
                                            },
                                            sorting: {sortModel: [{ field: field_auto_sorting , sort: type_sorting }]},
                                          }}
                                          pageSizeOptions={row_per_page}
                                          checkboxSelection={in_is_checkboxSelection}
                                          density="compact"
                                          columnVisibilityModel={in_column_hidden}
                                          //components={{ Toolbar: GridToolbar,LoadingOverlay: LinearProgress }}
                                          loading = {isLoading}
                                          columnGroupingModel={arr_columnGroupingModel}
                                          disableRowSelectionOnClick={true}
                                          slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay}}
                                          //loadingOverlay:(in_prosentase_progress === 0 ? LinearProgress : CustomLoadingOverlay)
                                          slotProps={{
                                            toolbar: {
                                                printOptions: { disableToolbarButton: in_printOptions },
                                                csvOptions: { disableToolbarButton: in_csvOptions },
                                                showQuickFilter: in_showQuickFilter,
                                            },
                                            loadingOverlay:{variant:'linear-progress'}
                                          }}
                                          onRowSelectionModelChange={(id) => {
                                            const selectedIDs = new Set(id);
                                            const selectedRowData = data_rows.filter((row: { id: GridRowId; }) =>
                                                selectedIDs.has(row.id)
                                            );
                                            selectedRowData.forEach((eachItem: any)=> {
                                              if(JSON.stringify(in_content_selected_rows).includes(eachItem.id)){
                                                
                                              }else{
                                                in_content_selected_rows.push(eachItem);
                                              }
                                            
                                            });
                                          }}
                                          autoHeight={true}
                                          showCellVerticalBorder={true}
                                          showColumnVerticalBorder={true}
                                      />
                                      :
                                      //-- jika menggunakan mode light, dan rowspanning = false , maka table menggunakan mode arsiran atau stripe --//    
                                      <StripedDataGrid
                                          onRowClick={in_handleRowClick} 
                                          getRowClassName={
                                            (params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                          }
                                          rowHeight={data_row_height}
                                          //getRowHeight={() => 50}
                                          unstable_rowSpanning={in_rows_spanning}
                                          //experimentalFeatures={{ columnGrouping: iscolumns_grouping }}
                                          sx={{fontSize: 12, boxShadow: 8,border: 0,fontFamily:"monospace", '--DataGrid-overlayHeight': '300px',
                                              "& .MuiDataGrid-columnHeader": {
                                                fontWeight: 400,
                                                borderRadius: "var(--none, 0px)",
                                                //borderBottom: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                //borderLeft: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                //borderRight: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                //borderTop: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                alignItems: 'space-between !important',
                                                fontSize:12,
                                                backgroundColor: "var(--primary-selected, #deeffd)",
                                                fontStyle:'bold'
                                                
                                            },
                                          }}
                                          rows={data_rows}
                                          columns={data_columns}
                                          initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 10 },
                                            },
                                            sorting: {sortModel: [{ field: field_auto_sorting , sort: type_sorting }]},
                                          }}
                                          pageSizeOptions={row_per_page}
                                          checkboxSelection={in_is_checkboxSelection}
                                          density="compact"
                                          columnVisibilityModel={in_column_hidden}
                                          //components={{ Toolbar: GridToolbar,LoadingOverlay: LinearProgress }}
                                          loading = {isLoading}
                                          columnGroupingModel={arr_columnGroupingModel}
                                          disableRowSelectionOnClick={true}
                                          slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay}}
                                          //loadingOverlay:(in_prosentase_progress === 0 ? LinearProgress : CustomLoadingOverlay)
                                          slotProps={{
                                            toolbar: {
                                                printOptions: { disableToolbarButton: in_printOptions },
                                                csvOptions: { disableToolbarButton: in_csvOptions },
                                                showQuickFilter: in_showQuickFilter,
                                            },
                                            loadingOverlay:{variant:'linear-progress'}
                                          }}
                                          onRowSelectionModelChange={(id) => {
                                            const selectedIDs = new Set(id);
                                            const selectedRowData = data_rows.filter((row: { id: GridRowId; }) =>
                                                selectedIDs.has(row.id)
                                            );
                                            selectedRowData.forEach((eachItem: any)=> {
                                              if(JSON.stringify(in_content_selected_rows).includes(eachItem.id)){
                                                
                                              }else{
                                                in_content_selected_rows.push(eachItem);
                                              }
                                            
                                            });
                                          }}
                                          autoHeight={true}
                                          showCellVerticalBorder={true}
                                          showColumnVerticalBorder={true}
                                      />
                                      :
                                      //-- jika prosentase progress > 0, maka menggunakan loading custom overlay --//
                                      //-- jika menggunakan mode light, dan rowspanning = true , maka table tidak menggunakan mode arsiran atau NOK stripe --//    
                                      in_rows_spanning ? 
                                      <DataGrid
                                          onRowClick={in_handleRowClick} 
                                          getRowClassName={
                                            (params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                          }
                                          rowHeight={data_row_height}
                                          //getRowHeight={() => 50}
                                          unstable_rowSpanning={in_rows_spanning}
                                          //experimentalFeatures={{ columnGrouping: iscolumns_grouping }}
                                          sx={{ fontSize: 12, boxShadow: 4,border: 0,fontFamily:"monospace", '--DataGrid-overlayHeight': '300px',
                                             "& .MuiDataGrid-columnHeader": {
                                                  fontWeight: 400,
                                                  borderRadius: "var(--none, 0px)",
                                                  //borderBottom: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                  //borderLeft: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                  //borderRight: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                  //borderTop: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                  alignItems: 'space-between !important',
                                                  fontSize:12,
                                                  backgroundColor: "var(--primary-selected, #deeffd)",
                                                  fontStyle:'bold'
                                                  
                                              },
                                          }}
                                          rows={data_rows}
                                          columns={data_columns}
                                          initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 10 },
                                            },
                                            sorting: {sortModel: [{ field: field_auto_sorting , sort: type_sorting }]},
                                          }}
                                          pageSizeOptions={row_per_page}
                                          checkboxSelection={in_is_checkboxSelection}
                                          density="compact"
                                          columnVisibilityModel={in_column_hidden}
                                          //components={{ Toolbar: GridToolbar,LoadingOverlay: LinearProgress }}
                                          loading = {isLoading}
                                          columnGroupingModel={arr_columnGroupingModel}
                                          disableRowSelectionOnClick={true}
                                          slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay,loadingOverlay:CustomLoadingOverlay}}
                                          slotProps={{
                                           toolbar: {
                                                printOptions: { disableToolbarButton: in_printOptions },
                                                csvOptions: { disableToolbarButton: in_csvOptions },
                                                showQuickFilter: in_showQuickFilter,
                                            },
                                          }}
                                          onRowSelectionModelChange={(id) => {
                                            const selectedIDs = new Set(id);
                                            const selectedRowData = data_rows.filter((row: { id: GridRowId; }) =>
                                                selectedIDs.has(row.id)
                                            );
                                            selectedRowData.forEach((eachItem: any)=> {
                                              if(JSON.stringify(in_content_selected_rows).includes(eachItem.id)){
                                                
                                              }else{
                                                in_content_selected_rows.push(eachItem);
                                              }
                                            
                                            });
                                          }}
                                          autoHeight={true}
                                          showCellVerticalBorder={true}
                                          showColumnVerticalBorder={true}
                                      />
                                      :
                                      <StripedDataGrid
                                          onRowClick={in_handleRowClick} 
                                          getRowClassName={
                                            (params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                          }
                                          rowHeight={data_row_height}
                                          //getRowHeight={() => 50}
                                          unstable_rowSpanning={in_rows_spanning}
                                          //experimentalFeatures={{ columnGrouping: iscolumns_grouping }}
                                          sx={{ fontSize: 12, boxShadow: 4,border: 0,fontFamily:"monospace", '--DataGrid-overlayHeight': '300px',
                                             "& .MuiDataGrid-columnHeader": {
                                                  fontWeight: 400,
                                                  borderRadius: "var(--none, 0px)",
                                                  //borderBottom: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                  //borderLeft: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                  //borderRight: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                  //borderTop: "0.5px solid var(--divider, rgba(172, 169, 169, 0.8))",
                                                  alignItems: 'space-between !important',
                                                  fontSize:12,
                                                  backgroundColor: "var(--primary-selected, #deeffd)",
                                                  fontStyle:'bold'
                                                  
                                              },
                                          }}
                                          rows={data_rows}
                                          columns={data_columns}
                                          initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 10 },
                                            },
                                            sorting: {sortModel: [{ field: field_auto_sorting , sort: type_sorting }]},
                                          }}
                                          pageSizeOptions={row_per_page}
                                          checkboxSelection={in_is_checkboxSelection}
                                          density="compact"
                                          columnVisibilityModel={in_column_hidden}
                                          //components={{ Toolbar: GridToolbar,LoadingOverlay: LinearProgress }}
                                          loading = {isLoading}
                                          columnGroupingModel={arr_columnGroupingModel}
                                          disableRowSelectionOnClick={true}
                                          slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay,loadingOverlay:CustomLoadingOverlay}}
                                          slotProps={{
                                            toolbar: {
                                                printOptions: { disableToolbarButton: in_printOptions },
                                                csvOptions: { disableToolbarButton: in_csvOptions },
                                                showQuickFilter: in_showQuickFilter,
                                            },
                                          }}
                                          onRowSelectionModelChange={(id) => {
                                            const selectedIDs = new Set(id);
                                            const selectedRowData = data_rows.filter((row: { id: GridRowId; }) =>
                                                selectedIDs.has(row.id)
                                            );
                                            selectedRowData.forEach((eachItem: any)=> {
                                              if(JSON.stringify(in_content_selected_rows).includes(eachItem.id)){
                                                
                                              }else{
                                                in_content_selected_rows.push(eachItem);
                                              }
                                            
                                            });
                                          }}
                                          autoHeight={true}
                                          showCellVerticalBorder={true}
                                          showColumnVerticalBorder={true}
                                      />
                                    }  
                                    </ThemeProvider>
                              </div>
                          </div>
                      </div>
                  </div>
                  : 
                  <div className="w-full mb-3">
                        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                        {
                          isDark ? 
                          <DataGrid
                              onRowClick={in_handleRowClick} 
                              getRowHeight={() => 'auto'}
                              disableColumnFilter
                              disableColumnSelector
                              disableDensitySelector
                              rowHeight={data_row_height}
                              sx={{ fontSize: 12, boxShadow: 4,border: 0,fontFamily:"monospace", '--DataGrid-overlayHeight': '300px',
                                  '& .MuiDataGrid-columnHeader': {
                                    backgroundColor: "var(--primary-selected, #3b3f5c)",
                                  }
                              }}
                              rows={data_rows}
                              columns={data_columns}
                              initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                                sorting: {sortModel: [{ field: field_auto_sorting , sort: type_sorting }]},
                              }}
                              
                              pageSizeOptions={row_per_page}
                              checkboxSelection={in_is_checkboxSelection}
                              density="compact"
                              columnVisibilityModel={in_column_hidden}
                              loading = {isLoading}
                              columnGroupingModel={arr_columnGroupingModel}
                              disableRowSelectionOnClick={true}
                              slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay  }}
                              onRowSelectionModelChange={(id) => {
                                const selectedIDs = new Set(id);
                              
                                const selectedRowData = data_rows.filter((row: { id: GridRowId; }) =>
                                    selectedIDs.has(row.id)
                                );
                                
                                selectedRowData.forEach((eachItem: any)=> {
                                  if(JSON.stringify(in_content_selected_rows).includes(eachItem.id)){
                                    
                                  }else{
                                    in_content_selected_rows.push(eachItem);
                                  }
                                });
                              }}
                              slotProps={{
                                toolbar: {
                                    printOptions: { disableToolbarButton: in_printOptions },
                                    csvOptions: { disableToolbarButton: in_csvOptions },
                                    showQuickFilter: in_showQuickFilter,
                                },
                              }}
                              autoHeight={true}
                              showCellVerticalBorder={false}
                              showColumnVerticalBorder={false}
                              
                          />
                          :
                          <DataGrid
                            onRowClick={in_handleRowClick} 
                            getRowHeight={() => 'auto'}
                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                            rowHeight={data_row_height}
                            sx={{ fontSize: 12, boxShadow: 4,border: 0,fontFamily:"monospace", '--DataGrid-overlayHeight': '300px'}}
                            rows={data_rows}
                            columns={data_columns}
                            initialState={{
                              pagination: {
                                  paginationModel: { page: 0, pageSize: 10 },
                              },
                              sorting: {sortModel: [{ field: field_auto_sorting , sort: type_sorting }]},
                            }}
                            
                            pageSizeOptions={row_per_page}
                            checkboxSelection={in_is_checkboxSelection}
                            density="compact"
                            columnVisibilityModel={in_column_hidden}
                            loading = {isLoading}
                            columnGroupingModel={arr_columnGroupingModel}
                            disableRowSelectionOnClick={true}
                            slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay  }}
                            onRowSelectionModelChange={(id) => {
                              const selectedIDs = new Set(id);
                             
                              const selectedRowData = data_rows.filter((row: { id: GridRowId; }) =>
                                  selectedIDs.has(row.id)
                              );
                              
                              selectedRowData.forEach((eachItem: any)=> {
                                if(JSON.stringify(in_content_selected_rows).includes(eachItem.id)){
                                  
                                }else{
                                  in_content_selected_rows.push(eachItem);
                                }
                              });
                            }}
                            slotProps={{
                              toolbar: {
                                  printOptions: { disableToolbarButton: in_printOptions },
                                  csvOptions: { disableToolbarButton: in_csvOptions },
                                  showQuickFilter: in_showQuickFilter,
                              },
                            }}
                            autoHeight={true}
                            showCellVerticalBorder={false}
                            showColumnVerticalBorder={false}
                            
                        />
                        }  
                        </ThemeProvider>
                  </div>
                }
                
            </div>
    </>
   
  );
}

export default DataTables;