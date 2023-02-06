import { DataGrid, esES } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import useHeader from "@hooks/useHeader";
import useMeters from "@features/dashboard/products/meters/hooks/useMeters";
import Footer from "@features/dashboard/products/meters/table/Footer";

const Table = () => {
    const { searchText } = useHeader();
    const { pageSize, setPageSize, setSelected, openMenu, loading, meters, handleOpenMenu } =
        useMeters();

    const columns = [
        { field: "description", headerName: "Descripción", flex: 2, minWidth: 320 },
        { field: "minPanels", headerName: "Paneles min.", flex: 1, minWidth: 140 },
        { field: "maxPanels", headerName: "Paneles max.", flex: 1, minWidth: 140 },
        { field: "current", headerName: "Corriente", flex: 1, minWidth: 120 },
        { field: "type", headerName: "Tipo", flex: 1, minWidth: 140 },
        {
            field: "price",
            headerName: "PVP neto",
            flex: 1,
            minWidth: 100,
            valueFormatter: (params) => parseFloat(params.value).toFixed(2),
        },
        {
            field: "priceIVA",
            headerName: "PVP IVA",
            flex: 1,
            minWidth: 100,
            valueGetter: (params) => {
                const price = parseFloat(params.row.price);
                return (price + price * 0.21).toFixed(2);
            },
            renderCell: (params) => {
                const price = parseFloat(params.row.price);
                const priceIVA = (price + price * 0.21).toFixed(2);
                return (
                    <div title={priceIVA} className="MuiDataGrid-cellContent">
                        {priceIVA}
                    </div>
                );
            },
        },
        {
            field: "actions",
            headerName: "Acciones",
            flex: 1,
            minWidth: 100,
            maxWidth: 160,
            align: "center",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Tooltip title="Abrir menú">
                        <IconButton
                            id="actions-button"
                            aria-controls={openMenu ? "actions-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={openMenu ? "true" : undefined}
                            aria-label="actions"
                            size="large"
                            onClick={(e) => handleOpenMenu(e, params)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Tooltip>
                );
            },
        },
    ];

    const filteredOrientations = meters.filter((orientation) => {
        return Object.values(orientation).some((val) =>
            val.toString().toLowerCase().includes(searchText.toLowerCase())
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
            onSelectionModelChange={(newSelection) => {
                setSelected(newSelection);
            }}
            components={{
                Footer,
            }}
        />
    );
};

export default Table;
