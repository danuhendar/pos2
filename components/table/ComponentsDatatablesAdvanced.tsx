'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useTranslation } from 'react-i18next';

interface ComponentsDatatablesAdvancedProps{
    Datarow:any,
    DataColumns:any
}
const ComponentsDatatablesAdvanced : React.FC<ComponentsDatatablesAdvancedProps> = ({Datarow,DataColumns}) =>{
    const rowData = Datarow//[{"KODE_GERAI":"G001","CONTENT":"FRESH DAU SENGKALING 99","STATUS":"AKTIF","id":"87494840"},{"KODE_GERAI":"G4AF","CONTENT":"DANAU TOBA","STATUS":"AKTIF","id":"16249159"},{"KODE_GERAI":"GAA1","CONTENT":"TLOGOWARU TIMUR","STATUS":"AKTIF","id":"09159339"},{"KODE_GERAI":"GDS1","CONTENT":"TUMAPEL SINGOSARI","STATUS":"AKTIF","id":"39283431"},{"KODE_GERAI":"GEWQ","CONTENT":"BANDARA ABD. SALEH MALANG","STATUS":"AKTIF","id":"56667779"},{"KODE_GERAI":"GFDS","CONTENT":"DANAU TONDANO SAWOJAJAR","STATUS":"AKTIF","id":"61617089"},{"KODE_GERAI":"GH42","CONTENT":"SUHAT 01","STATUS":"AKTIF","id":"05214778"},{"KODE_GERAI":"GLMR","CONTENT":"DANAU KERINCI MALANG","STATUS":"AKTIF","id":"99395152"},{"KODE_GERAI":"GMMB","CONTENT":"BATU 1","STATUS":"AKTIF","id":"87485190"},{"KODE_GERAI":"GTRE","CONTENT":"PAKIS MALANG","STATUS":"AKTIF","id":"32628589"},{"KODE_GERAI":"GUKL","CONTENT":"TLOGOWARU BARAT","STATUS":"AKTIF","id":"90294211"}]
    const { t, i18n } = useTranslation();
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(search.toLowerCase())
                ))
            });
           
        });
    }, [search]);

    return (
        <div className="mt-6 panel rounded-3xl">
            <div className="flex flex-col gap-5 mb-5 md:flex-row md:items-center">
                <h5 className="text-lg font-semibold dark:text-white-light">&nbsp;</h5>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <input type="text" className="w-auto form-input rounded-3xl" placeholder={t("Search")} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="datatables">
                 {isMounted && (
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={DataColumns}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                )}
            </div>
        </div>
    );
};

export default ComponentsDatatablesAdvanced;
