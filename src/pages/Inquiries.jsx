import { useState, useEffect } from "react";

import { DataGrid, esES } from "@mui/x-data-grid";

import useProposal from "@features/dashboard/proposal/hooks/useProposal";
import dateTimeFormat from "@utils/dateTimeFormat";

const Inquiries = () => {
    const [pageSize, setPageSize] = useState(10);
    const { loading, proposals, readProposals } = useProposal();

    useEffect(() => {
        readProposals();
    }, []);

    const columns = [
        { field: "address", headerName: "Dirección", flex: 1 },
        { field: "createdAt", headerName: "Fecha de consulta", flex: 1, valueFormatter: (params) => dateTimeFormat(params.value) },
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
            loading={true}
        />
    );
};

export default Inquiries;
