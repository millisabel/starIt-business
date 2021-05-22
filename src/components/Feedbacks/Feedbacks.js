import React from 'react';
import Table from "../Table/Table";
import moment from "moment";
import makeData from "../../makeData";

const Feedbacks = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: ' ',
                disableSortBy: true,

                columns: [
                    {
                        Header: 'id',
                        accessor: 'id',
                    },
                    {
                        Header: 'Objects name',
                        accessor: 'objects name',
                    },
                ]
            },
            {
                Header: 'Feedback',
                accessor: 'feedback',
                disableSortBy: true,

                columns: [
                    {
                        Header: 'Stars',
                        accessor: 'stars',
                        sortType: 'number',
                    },
                    {
                        Header: 'Note',
                        accessor: 'note',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Photo',
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
                        Header: 'Date',
                        accessor: 'date',
                        Cell: row => <span>
                       {
                           moment.utc(row.value).format('MM/DD/YYYY')
                       }
                         </span>
                    },
                    {
                        Header: 'Time',
                        accessor: 'time',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Reaction',
                        accessor: 'reaction',
                        disableSortBy: true,
                    },
                ]
            },
        ], []);

    const data = React.useMemo(() => makeData(200), []);

    return (
        <div>
            <Table columns={columns} data={data}/>
        </div>
    );
};

export default Feedbacks;