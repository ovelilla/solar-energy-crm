import Menu from "@mui/material/Menu";
import styled from "@emotion/styled";
import { slate, gray } from "@styles/colors";

export const MenuStyled = styled(Menu)`
    display: flex;
    flex-direction: column;
    padding: 8px 0;

    .MuiPaper-root {
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
    background-color: transparent;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        background-color: ${slate[50]};
    }

    &:active {
        background-color: ${slate[100]};
    }

    svg {
        width: 22px;
        height: 22px;
        color: ${gray[500]};
    }
`;

export const ColorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 40px);
    grid-template-rows: repeat(2, 40px);
    padding: 8px;
    border-top: 1px solid ${slate[200]};
`;

export const Cell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Color = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &::before {
        content: "";
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${(props) => props.color};
    }

    ${({ selected }) => {
        if (selected) {
            return `
                transform: scale(1.2);
                
                &::after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background-color: #fff;
                    transform: translate(-50%, -50%);
                }
            `;
        } else {
            return `
                &::before {
                    transition: transform 0.2s ease-in-out;
                }

                &:hover::before {
                    transform: scale(1.2);
                }
            `;
        }
    }}
`;
