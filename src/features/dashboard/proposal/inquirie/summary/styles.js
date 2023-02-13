import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";

export const SummaryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const Title = styled.div`
    font-weight: 500;
    text-transform: uppercase;
`;

export const UlPrimary = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0;
    padding: revert;
`;

export const Ul = styled.ul`
    margin: 0;
    padding: revert;
`;

export const Li = styled.li``;

export const LiBold = styled.li`
    margin: revert;
    padding: revert;
    font-weight: 600;
`;
