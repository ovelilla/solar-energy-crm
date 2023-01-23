import styled from "@emotion/styled";

import { breakpoints, media } from "@styles/sizes";
import { white, slate } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    position: relative;
    height: 64px;
    background-color: ${white};
    box-shadow: ${shadows.md};
`;

export const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1 1 auto;
    width: 100%;
    padding: 0 16px;
`;

export const Items = styled.div`
    display: flex;
    gap: 8px;
`;
