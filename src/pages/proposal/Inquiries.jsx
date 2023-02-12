import { useState, useEffect } from "react";

import { DataGrid, esES } from "@mui/x-data-grid";

import useHeader from "@hooks/useHeader";
import useProposal from "@features/dashboard/proposal/hooks/useProposal";
import dateTimeFormat from "@utils/dateTimeFormat";

const Inquiries = () => {
    const [pageSize, setPageSize] = useState(20);

    const { searchText } = useHeader();
    const { loading, proposals, readProposals } = useProposal();

    console.log(proposals);

    useEffect(() => {
        readProposals();
    }, []);

    const columns = [
        {
            field: "address",
            headerName: "Dirección",
            flex: 1,
            minWidth: 260,
            valueGetter: ({ value }) => {
                return value.formattedAddress;
            },
        },
        {
            field: "clientIp",
            headerName: "IP",
            flex: 1,
            minWidth: 260,
        },
        {
            field: "createdAt",
            headerName: "Fecha de consulta",
            flex: 1,
            minWidth: 180,
            valueFormatter: (params) => dateTimeFormat(params.value),
        },
    ];

    const filteredProposals = proposals.filter((proposal) => {
        console.log(proposal);
        return proposal.address.formattedAddress.toLowerCase().includes(searchText.toLowerCase());
    });

    return (
        <DataGrid
            rows={filteredProposals}
            columns={columns}
            getRowId={(row) => row._id}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            checkboxSelection
            disableColumnMenu
            headerHeight={64}
            rowHeight={56}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[20, 50, 100]}
            loading={loading}
        />
    );
};

export default Inquiries;
