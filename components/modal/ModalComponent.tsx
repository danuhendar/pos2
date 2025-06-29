'use client'
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import IconSend from "../Icon/IconSend";
import IconX from "../Icon/IconX";
import DataTables from "../table/DataTables";
import DataTablesColourCell from "../table/DataTablesColurCell";

interface ModalComponentProps{
    state_modal:boolean,
    event_close_modal: any,
    isRtl:boolean,
    in_classname_title_modal:string,
    in_title_modal:string,
    isBC:boolean,
    TipeBC:string,
    progressbarData:string,
    data_rows_detail:any,
    data_columns_detail:any,
    loadingDetail:boolean,
    in_content_not_bc:any,
    in_size_modal:string
}

const ModalComponent: React.FC<ModalComponentProps> = ({state_modal,event_close_modal,isRtl,in_classname_title_modal,in_title_modal,isBC,TipeBC,progressbarData,data_rows_detail,data_columns_detail,loadingDetail,in_content_not_bc,in_size_modal}) => {
    const { t, i18n } = useTranslation();
    return (
        <>
           <Transition appear show={state_modal} as={Fragment}>
                <Dialog as="div" open={state_modal} onClose={event_close_modal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="fadein_up_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60 text-xs">
                        <div className="flex min-h-screen items-start justify-center px-4 text-xs">
                            <Dialog.Panel className={in_size_modal}
                            >
                                <div className="flex items-center justify-between bg-primary text-white px-5 py-3 dark:bg-[#121c2c]">
                                    <div className="flex flex-row gap-3">
                                        <div>
                                        <IconSend />
                                        </div>
                                        <div>
                                            <h5 className={in_classname_title_modal}>{in_title_modal}</h5>
                                        </div>
                                    </div>
                                    <button onClick={event_close_modal} type="button" className="text-white-dark hover:text-dark">
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">
                                {
                                    isBC ? 
                                    TipeBC === 'BC_SQL' ? 
                                        <>
                                            <div className="flex flex-row gap-3">
                                                <div className="flex item-center p-3.5 rounded text-white bg-primary">
                                                    <span className="ltr:pr-2 rtl:pl-2">
                                                        <strong className="ltr:mr-1 rtl:ml-1 sm:text-xl">{t('Timer')} : </strong><span id="lbl_timer" className="text-center text-xl text-white dark:text-white-light sm:text-xl">00:00</span>
                                                    </span>
                                                </div>
                                                <div className="flex item-center p-3.5 rounded text-white bg-warning">
                                                    <span className="ltr:pr-2 rtl:pl-2">
                                                        <strong className="ltr:mr-1 rtl:ml-1 sm:text-xl">{t('Information')} : </strong><span id="lbl_total_client" className="text-center text-xl text-white dark:text-white-light sm:text-xl">{progressbarData}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                            <DataTables in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false, IN_ID: false }} jenis_laporan={'Report Detail Broadcast'} data_rows={data_rows_detail} data_columns={data_columns_detail} isLoading={loadingDetail} progressbar={''} field_auto_sorting={''} type_sorting={'desc'} iscolumns_grouping={false} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={null} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={true} in_prosentase_progress={0} in_rows_spanning={false} />
                                            </div>
                                        </>
                                        :
                                        <DataTablesColourCell in_content_selected_rows={[]} in_is_checkboxSelection={false} in_column_hidden={{ id: false, ID: false }} jenis_laporan={'Report Detail Broadcast'} data_rows={data_rows_detail} data_columns={data_columns_detail} isLoading={loadingDetail} progressbar={progressbarData} field_auto_sorting={''} type_sorting={'desc'} iscolumns_grouping={false} arr_columnGroupingModel={[]} isHiddenID={false} timelapsed={null} in_class={"max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"} data_row_height={52} isDisableBorder={true} sizeBorderRadius={3} row_per_page={[5, 10, 25, 50, 100]} in_showQuickFilter={true} in_handleRowClick={null} in_csvOptions={false} in_printOptions={true} in_is_same_colouring_all_rows={false} in_name_column_cek={"STATUS"} />    
                                    :
                                    in_content_not_bc
                                }    
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
export default ModalComponent;