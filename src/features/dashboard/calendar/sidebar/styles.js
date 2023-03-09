import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";

export const StyledSidebar = styled.div`
    display: flex;
    flex: 0 0 340px;
    width: 340px;
    border-right: 1px solid #ddd;

    ${(p) => {
        if (p.open) {
            return `
                margin-left: 0;
                transition: margin-left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
            `;
        } else {
            return `
                margin-left: -280px;
                transition: margin-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
            `;
        }
    }}

    ${media(breakpoints.xl)} {
        ${(p) => {
            if (p.open) {
                return `
                margin-left: 0;
                transition: margin-left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
            `;
            } else {
                return `
                margin-left: -340px;
                transition: margin-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
            `;
            }
        }}
    }
`;
