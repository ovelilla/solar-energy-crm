import { useState, useEffect } from "react";

import { DataGrid, esES } from "@mui/x-data-grid";

import useProposal from "@features/dashboard/proposal/hooks/useProposal";

const Inquiries = () => {
    const [pageSize, setPageSize] = useState(10);
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
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            checkboxSelection
            disableColumnMenu
            headerHeight={64}
            rowHeight={56}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 50]}
        />
    );
};

export default Inquiries;
