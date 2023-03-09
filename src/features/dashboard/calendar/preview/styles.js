import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { gray } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const StyledPreview = styled.div`
    z-index: 1200;
    position: absolute;
    /* padding: 24px; */
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 8px;
    ${(p) => {
        if (p.isMounted && !p.isResizing) {
            return `transition: opacity 0.3s ease, transform 0.3s ease, top 0.3s ease, left 0.3s ease`;
        } else {
            return `transition: opacity 0.3s ease, transform 0.3s ease`;
        }
    }};

    ${(p) => {
        return `
            top: ${p.positionStyle.top}px;
            left: ${p.positionStyle.left}px;
            width: ${p.positionStyle.width};
            height: ${p.positionStyle.height};
        `;
    }};
`;

export const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 0 0 auto;
    height: 72px;
    padding: 0 16px 0 24px;
`;

export const Actions = styled.div`
    display: flex;
    gap: 8px;

    svg {
        width: 22px;
        height: 22px;
    }
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 24px;
    padding-top: 0;
`;
