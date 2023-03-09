import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ResponsiveRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
`;

export const ColorIcon = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: ${(p) => p.color};
`;
