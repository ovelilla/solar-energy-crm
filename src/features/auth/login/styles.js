import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { white, slate, gray, blue } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    ${media(breakpoints.lg)} {
        align-items: flex-start;
    }
`;

export const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: ${blue[750]};
    color: ${white};
`;

export const Title = styled.div`
    font-weight: 600;
    line-height: 1.2;
    font-size: 32px;
    letter-spacing: -1px;
`;

export const Body = styled.div`
    display: flex;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    gap: 24px;
    min-width: 0;
`;
