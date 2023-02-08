import Dialog from "@mui/material/Dialog";
import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { gray } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const StyledDialog = styled(Dialog)`
    .MuiBackdrop-root {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .MuiDialog-paper {
        width: 100%;
        max-width: ${(p) => (p.fullScreen ? "100%" : "640px")};
        max-height: 100%;
        margin: ${(p) => (p.fullScreen ? "0" : "8px")};
        border-radius: ${(p) => (p.fullScreen ? "0" : "8px")};
        box-shadow: ${shadows.md};

        ${media(breakpoints.sm)} {
            margin: ${(p) => (p.fullScreen ? "0" : "16px")};
        }
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    height: 72px;
    padding: 0 16px 0 24px;
    border-bottom: 1px solid ${gray[200]};
    cursor: ${(p) => (p.fullScreen ? "default" : "move")};

    ${media(breakpoints.sm)} {
        padding: 0 16px 0 24px;
    }
`;

export const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${gray[900]};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Actions = styled.div`
    display: flex;
    gap: 8px;
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    padding: 24px;

    ${media(breakpoints.lg)} {
        &::-webkit-scrollbar {
            width: 16px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 8px;
            border: 4px solid transparent;
            background-clip: content-box;
            background-color: ${gray[300]};
        }

        &::-webkit-scrollbar-thumb:hover {
            background-color: ${gray[400]};
        }
    }
`;

export const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;
    gap: 24px;
    height: 80px;
    padding: 0 24px;
    border-top: 1px solid ${gray[200]};

    .MuiButton-outlined {
        color: ${gray[400]};
        border-color: ${gray[300]};

        &:hover {
            color: #324475;
            border-color: #3c528c;
        }
    }

    .MuiCircularProgress-root {
        width: 24px !important;
        height: 24px !important;
    }
`;
