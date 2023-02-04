import { GridFooterContainer, GridFooter } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import useBatteries from "@features/dashboard/products/batteries/hooks/useBatteries";
import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { TrashCan } from "@icons";

const Footer = () => {
    const { selected, deleteBatteries } = useBatteries();

    const FooterContainer = styled(GridFooterContainer)`
        display: flex;
        justify-content: space-between;
        min-height: 60px;
        align-items: initial;
    `;

    const Footer = styled(GridFooter)`
        min-height: initial;
        border: none;

        ${media(breakpoints.md)} {
            flex-grow: 1;
        }

        .MuiTablePagination-selectLabel {
            display: none;

            ${media(breakpoints.md)} {
                display: block;
            }
        }

        .MuiDataGrid-selectedRowCount {
            display: none;

            ${media(breakpoints.md)} {
                display: block;
            }
        }

        .MuiTablePagination-displayedRows {
            font-size: 16px;
        }

        .MuiTablePagination-select {
            font-size: 16px;
        }
    `;

    const Icon = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: stretch;
        width: 48px;
        margin: 0 8px;
    `;

    return (
        <FooterContainer>
            {selected.length > 0 && (
                <Icon>
                    <Tooltip title="Eliminar">
                        <IconButton aria-label="actions" onClick={deleteBatteries}>
                            <TrashCan />
                        </IconButton>
                    </Tooltip>
                </Icon>
            )}

            <Footer />
        </FooterContainer>
    );
};

export default Footer;
