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

export const Color = styled.div`
    width: 12px;
    height: 12px;
    margin-right: 8px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
`;
