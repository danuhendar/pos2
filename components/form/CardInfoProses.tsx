'use client'
import React, { Fragment, useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridColumnGroupingModel, GridEventListener, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import IconUserPlus from "../Icon/IconUserPlus";
import CountUp from "react-countup";
import IconUsers from "../Icon/IconUsers";
import IconCloudDownload from "../Icon/IconCloudDownload";
import IconLock from "../Icon/IconLock";
import IconClock from "../Icon/IconClock";
import { useTranslation } from "react-i18next";

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

interface CardInfoProsesProps{
    total_station:any,
    total_sukses:any,
    total_gagal:any,
    in_classname_content:string
}

const CardInfoProses: React.FC<CardInfoProsesProps> = ({total_station,total_sukses,total_gagal,in_classname_content}) => {
const { t, i18n } = useTranslation();
    return ( <>
           <div className="mb-3 w-1/2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-2xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                    <div className="p-4">
                        <div className="flex-1 ltr:sm:pl-4 pr-4 rtl:sm:pr-1 text-center sm:text-left">
                            <div className="mb-3.5">
                                <div className="flex item-center font-semibold">
                                    <IconUserPlus />
                                    <h2 className="text-dark mt-1 ml-1 text-center text-1xl dark:text-white-light">{t('Status Data Processing')}</h2>
                                </div>
                            </div>
                            <p>&nbsp;</p>
                            {/* SE : "mx-auto grid max-w-[900px] grid-cols-4 justify-items-center gap-3 mb-16" */}
                            {/* NON SE : "mx-auto grid max-w-[900px] grid-cols-4 justify-items-center gap-3" */}
                            <div className={in_classname_content}>
                                <div>
                                    <div className="flex h-[70px] w-[70px] flex-col justify-center rounded-full border border-white-light shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] dark:border-[#1b2e4b] sm:h-[100px] sm:w-[100px]">
                                        <CountUp start={total_station} end={total_station} duration={3} className="text-center text-xl text-primary sm:text-3xl"></CountUp>
                                    </div>
                                    <h4 className="mt-4 text-center text-xs font-semibold text-[#3b3f5c] dark:text-white-dark sm:text-[15px]">
                                        <IconUsers className="sm:w-6 sm:h-6 text-primary mx-auto mb-2" />
                                        {t('Total Station')}
                                    </h4>
                                </div>
                                <div>
                                    <div className="flex h-[70px] w-[70px] flex-col justify-center rounded-full border border-white-light shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] dark:border-[#1b2e4b] sm:h-[100px] sm:w-[100px]">
                                        <CountUp start={total_sukses} end={total_sukses} duration={3} className="text-center text-xl text-success sm:text-3xl"></CountUp>
                                    </div>
                                    <h4 className="mt-4 text-center text-xs font-semibold text-[#3b3f5c] dark:text-white-dark sm:text-[15px]">
                                        <IconCloudDownload className="sm:w-6 sm:h-6 text-success mx-auto mb-2" />
                                        {t('Success')}
                                    </h4>
                                </div>
                                <div>
                                    <div id="value_total_gagal" className="flex h-[70px] w-[70px] flex-col justify-center rounded-full border border-white-light shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] dark:border-[#1b2e4b] sm:h-[100px] sm:w-[100px]">
                                        <CountUp start={total_gagal} end={total_gagal} duration={1} className="text-center text-xl text-danger sm:text-3xl"></CountUp>
                                    </div>
                                    <h4 className="mt-4 text-center text-xs font-semibold text-[#3b3f5c] dark:text-white-dark sm:text-[15px]">
                                        <IconLock className="sm:w-6 sm:h-6 text-danger mx-auto mb-2" />
                                        {t('Failed')}
                                    </h4>
                                </div>
                                <div>
                                    <div className="flex h-[70px] w-[70px] flex-col justify-center rounded-full border border-white-light shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] dark:border-[#1b2e4b] sm:h-[100px] sm:w-[100px]">
                                        <div id="timer" className="text-center text-xl text-warning sm:text-3xl">00:00</div>
                                    </div>
                                    <h4 className="mt-4 text-center text-xs font-semibold text-[#3b3f5c] dark:text-white-dark sm:text-[15px]">
                                        <IconClock className="sm:w-6 sm:h-6 text-warning mx-auto mb-2" />
                                        {t('Timer')}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default CardInfoProses;