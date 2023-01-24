import { useState, useEffect } from "react";

import { DataGrid, esES } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import useHeader from "@hooks/useHeader";
import useOrientation from "@features/dashboard/parameters/hooks/useOrientation";

const Orientation = () => {
    const [pageSize, setPageSize] = useState(20);

    const { setCreate, search } = useHeader();
    const { loading, orientations, readOrientations } = useOrientation();

    useEffect(() => {
        setCreate(true);
        readOrientations();

        return () => {
            setCreate(false);
        };
    }, []);

    const columns = [
        { field: "orientation", headerName: "Orientación", flex: 1, minWidth: 130 },
        { field: "type", headerName: "Tipo", flex: 1, minWidth: 130 },
        { field: "performance", headerName: "Rendimeinto", flex: 1, minWidth: 130 },
        {
            field: "actions",
            headerName: "Acciones",
            flex: 1,
            minWidth: 100,
            maxWidth: 160,
            align: "center",
            sortable: false,
            renderCell: () => {
                return (
                    <Tooltip title="Abrir menú">
                        <IconButton
                            aria-label="actions"
                            size="large"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Tooltip>
                );
            },
        },
    ];

    const filteredOrientations = orientations.filter((orientation) => {
        return Object.values(orientation).some((val) =>
            val.toString().toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <DataGrid
            rows={filteredOrientations}
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

export default Orientation;
