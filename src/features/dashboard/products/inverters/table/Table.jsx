import { DataGrid, esES } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import useHeader from "@hooks/useHeader";
import useInverters from "@features/dashboard/products/inverters/hooks/useInverters";
import Footer from "@features/dashboard/products/inverters/table/Footer";

const Table = () => {
    const { searchText } = useHeader();
    const { pageSize, setPageSize, setSelected, openMenu, loading, inverters, handleOpenMenu } =
        useInverters();

    const columns = [
        { field: "description", headerName: "Descripción", flex: 2, minWidth: 320 },
        { field: "power", headerName: "Potencia W", flex: 1, minWidth: 120 },
        { field: "minCC", headerName: "CC Mínima Wp", flex: 1, minWidth: 150 },
        { field: "maxCC", headerName: "CC Máxima Wp", flex: 1, minWidth: 150 },
        { field: "warranty", headerName: "Garantía", flex: 1, minWidth: 100 },
        { field: "current", headerName: "Corriente", flex: 1, minWidth: 120 },
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

    const filteredInverters = inverters.filter((inverter) => {
        return Object.values(inverter).some((val) =>
            val.toString().toLowerCase().includes(searchText.toLowerCase())
        );
    });

    return (
        <DataGrid
            rows={filteredInverters}
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
