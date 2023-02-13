import { GridFooterContainer, GridFooter } from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";

export const FooterContainer = styled(GridFooterContainer)`
    display: flex;
    justify-content: space-between;
    min-height: 60px;
    align-items: initial;
`;

export const StyledFooter = styled(GridFooter)`
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

export const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    width: 48px;
    margin: 0 8px;
`;
