import Menu from "@mui/material/Menu";
import styled from "@emotion/styled";
import { slate, gray } from "@styles/colors";

export const MenuStyled = styled(Menu)`
    display: flex;
    flex-direction: column;
    padding: 8px 0;

    .MuiPaper-root {
        width: 280px;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 8px;
    }
`;

export const Item = styled.button`
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    color: ${slate[600]};
    border: none;
    background-color: ${({ selected }) => (selected ? slate[50] : "transparent")};
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        background-color: ${({ selected }) => (selected ? slate[50] : slate[100])};
    }

    &:active {
        background-color: ${({ selected }) => (selected ? slate[50] : slate[200])};
    }

    svg {
        width: 22px;
        height: 22px;
        color: ${gray[500]};
    }
`;
