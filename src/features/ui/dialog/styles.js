import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { gray } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const Overlay = styled.div`
    z-index: 1300;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);

    &.dialog-enter {
        opacity: 0;
    }

    &.dialog-enter-active {
        opacity: 1;
        transition: opacity 0.3s ease;
    }

    &.dialog-enter-done {
        opacity: 1;
    }

    &.dialog-exit {
        opacity: 1;
    }

    &.dialog-exit-active {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &.dialog-exit-done {
        opacity: 0;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 320px;
    height: 100%;
    min-height: 240px;
    background-color: #fff;
    border-radius: ${(p) => (p.fullscreen ? "0" : "8px")};
    box-shadow: ${shadows.md};

    &.dialog-appear {
        transform: translateY(-16px);
    }

    &.dialog-appear-active {
        transform: translateY(0);
        transition: transform 0.3s ease;
    }

    &.dialog-appear-done {
        transform: translateY(0);
    }

    &.dialog-exit {
        transform: translateY(0);
    }

    &.dialog-exit-active {
        transform: translateY(-16px);
        transition: transform 0.3s ease;
    }

    &.dialog-exit-done {
        transform: translateY(-16px);
    }

    /* ${media(breakpoints.sm)} {
        border-radius: ${(p) => (p.fullscreen ? "0" : "8px")};
    } */
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 auto;
    height: 72px;
    padding: 0 16px 0 24px;
    border-bottom: 1px solid ${gray[200]};
    cursor: ${(p) => (p.fullscreen ? "default" : "move")};

    ${media(breakpoints.sm)} {
        padding: 0 16px 0 24px;
    }
`;

export const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${gray[900]};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Actions = styled.div`
    display: flex;
    gap: 8px;
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 24px;

    ${media(breakpoints.lg)} {
        &::-webkit-scrollbar {
            width: 16px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 8px;
            border: 4px solid transparent;
            background-clip: content-box;
            background-color: ${gray[300]};
        }

        &::-webkit-scrollbar-thumb:hover {
            background-color: ${gray[400]};
        }
    }
`;

export const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 0 0 auto;
    gap: 24px;
    height: 80px;
    padding: 0 24px;
    border-top: 1px solid ${gray[200]};

    .MuiButton-outlined {
        color: ${gray[400]};
        border-color: ${gray[300]};

        &:hover {
            color: #324475;
            border-color: #3c528c;
        }
    }

    .MuiCircularProgress-root {
        width: 24px !important;
        height: 24px !important;
    }
`;
