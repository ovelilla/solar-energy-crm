import Dialog from "@mui/material/Dialog";
import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { gray, slate, white } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const StyledAlert = styled(Dialog)`
    .MuiBackdrop-root {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .MuiDialog-paper {
        overflow: hidden;
        max-width: 400px;
        max-height: 100%;
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
    flex-shrink: 0;
    position: relative;
    padding: 24px;

    &::after {
        position: absolute;
        content: "";
        top: 100%;
        left: 50%;
        height: 0;
        width: 0;
        margin-left: -20px;
        border: 20px solid transparent;
        border-top-color: ${white};
    }
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-shrink: 0;
    padding: 32px;
    background-color: ${slate[100]};
`;

export const Title = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: ${gray[900]};
`;

export const Message = styled.div`
    text-align: center;
    color: ${gray[900]};
`;
