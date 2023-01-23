import { useEffect } from "react";

import { DataGrid, GridFooterContainer, GridFooter, esES } from "@mui/x-data-grid";

import useProposal from "@features/dashboard/proposal/hooks/useProposal";

const Inquiries = () => {
    const { proposals, readProposals } = useProposal();

    useEffect(() => {
        readProposals();
    }, []);

    const columns = [
        { field: "address", headerName: "Dirección", flex: 1 },
        { field: "createdAt", headerName: "Fecha de creación", flex: 1 },
    ];

    return (
        <DataGrid
            rows={proposals}
            columns={columns}
            getRowId={(row) => row._id}
            localeText={esES.components.MuiDataGrid.localeText}
            checkboxSelection
            disableColumnMenu
            headerHeight={64}
            rowHeight={56}
        />
    );
};

export default Inquiries;
