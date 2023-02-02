import Dialog from "@mui/material/Dialog";
import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { gray } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const StyledConfirm = styled(Dialog)`
    .MuiBackdrop-root {
        background-color: rgba(0, 0, 0, 0.2);
    }
    
    .MuiDialog-paper {
        max-width: 400px;
        margin: 8px;
        border-radius: 8px;
        box-shadow: ${shadows.md};

        ${media(breakpoints.sm)} {
            margin: 16px;
        }
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px 8px 24px;
`;

export const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${gray[900]};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    padding: 16px 24px 24px 24px;

    .MuiButton-outlined {
        color: ${gray[400]};
        border-color: ${gray[300]};

        &:hover {
            color: #324475;
            border-color: #3c528c;
        }
    }
`;
