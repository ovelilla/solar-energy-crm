import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { white } from "@styles/colors";

export const Row = styled.div`
    display: flex;
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
`;

export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    transition: flex-basis 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;

    ${media(breakpoints.xl)} {
        flex: ${(p) => (p.open ? "0 0 320px" : "0 0 0px")};
    }
`;

export const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    width: 100%;
`;

export const Main = styled.main`
    display: flex;
    flex: 1 1 auto;
    background-color: ${white};
    overflow-y: auto;
`;
