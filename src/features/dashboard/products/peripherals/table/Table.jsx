import { DataGrid, esES } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Switch from "@mui/material/Switch";
import useHeader from "@hooks/useHeader";
import usePeripherals from "@features/dashboard/products/peripherals/hooks/usePeripherals";
import Footer from "@features/dashboard/products/peripherals/table/Footer";

const Table = () => {
    const { searchText } = useHeader();
    const {
        pageSize,
        setPageSize,
        setSelected,
        openMenu,
        loading,
        peripherals,
        handleOpenMenu,
        updateActive,
    } = usePeripherals();

    const columns = [
        { field: "description", headerName: "Descripción", flex: 2, minWidth: 480 },
        { field: "type", headerName: "Tipo", flex: 1, minWidth: 140 },
        { field: "current", headerName: "Corriente", flex: 1, minWidth: 120 },
        { field: "price", headerName: "PVP neto", flex: 1, minWidth: 120 },
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
            field: "active",
            headerName: "Activo",
            flex: 1,
            minWidth: 100,
            onClick: (e) => {
                e.stopPropagation();
            },
            renderCell: (params) => {
                return (
                    <Switch
                        checked={params.row.active}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={() => updateActive(params.row._id)}
                        inputProps={{ "aria-label": "controlled" }}
                    />
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

    const filteredPeripherals = peripherals.filter((peripheral) => {
        return Object.values(peripheral).some((val) =>
            val.toString().toLowerCase().includes(searchText.toLowerCase())
        );
    });

    return (
        <DataGrid
            rows={filteredPeripherals}
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
