import React from 'react';
import Table from "../Table/Table";
import moment from "moment";
import makeData from "../../makeData";

const Feedbacks = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: ' ',
                accessor: ' ',
                disableSortBy: true,

                columns: [
                    {
                        Header: 'id',
                        accessor: 'id',
                    },
                    {
                        Header: 'address',
                        accessor: 'address',
                    },
                ]
            },
            {
                Header: 'feedback',
                accessor: 'feedback',
                disableSortBy: true,

                columns: [
                    {
                        Header: 'starts',
                        accessor: 'starts',
                        sortType: 'number',
                    },
                    {
                        Header: 'note',
                        accessor: 'note',
                        disableSortBy: true,
                    },
                    {
                        Header: 'photo',
                        accessor: 'photo',
                        disableSortBy: true,
                    },
                ],
            },
            {
                Header: ' ',
                accessor: ' ',
                disableSortBy: true,

                columns: [
                    {
                        Header: 'date',
                        accessor: 'date',
                        Cell: row => <span>
                       {
                           moment.utc(row.value).format('MM/DD/YYYY')
                       }
                         </span>
                    },
                    {
                        Header: 'time',
                        accessor: 'time',
                        disableSortBy: true,
                    },
                    {
                        Header: 'reaction',
                        accessor: 'reaction',
                        disableSortBy: true,
                    },
                ]
            },
        ], []);

    const data = React.useMemo(() => makeData(200), []);

    return (
        <div>
            <Table columns={columns} data = {data}/>
        </div>
    );
};

export default Feedbacks;