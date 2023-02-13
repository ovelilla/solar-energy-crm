import { DataGrid, esES } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useHeader from "@hooks/useHeader";
import useProposal from "@features/dashboard/proposal/hooks/useProposal";
import Footer from "@features/dashboard/proposal/inquiries/table/Footer";
import dateTimeFormat from "@utils/dateTimeFormat";

const Table = () => {
    const { searchText } = useHeader();
    const { pageSize, setPageSize, setSelected, openMenu, loading, proposals, handleOpenMenu } =
        useProposal();

    const columns = [
        {
            field: "address",
            headerName: "Dirección",
            flex: 2,
            minWidth: 400,
            valueGetter: ({ value }) => {
                return value.formattedAddress;
            },
        },
        {
            field: "clientIp",
            headerName: "IP",
            flex: 1,
            minWidth: 150,
            maxWidth: 190,
        },
        {
            field: "counter",
            headerName: "Cambios",
            flex: 1,
            minWidth: 110,
            maxWidth: 150,
        },
        {
            field: "createdAt",
            headerName: "Fecha de consulta",
            flex: 1,
            minWidth: 180,
            maxWidth: 220,
            valueFormatter: (params) => dateTimeFormat(params.value),
        },
        {
            field: "updatedAt",
            headerName: "Última actualización",
            flex: 1,
            minWidth: 200,
            maxWidth: 240,
            valueFormatter: (params) => dateTimeFormat(params.value),
        },
        {
            field: "actions",
            headerName: "Acciones",
            flex: 1,
            minWidth: 100,
            maxWidth: 140,
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

    const filteredProposals = proposals.filter((proposal) => {
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
