import Menu from "@mui/material/Menu";
import { HexColorPicker } from "react-colorful";
import styled from "@emotion/styled";
import { slate, gray } from "@styles/colors";

export const MenuStyled = styled(Menu)`
    display: flex;
    flex-direction: column;
    padding: 16px;

    .MuiPaper-root {
        min-width: 320px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 8px;
    }
`;

export const ColorPicker = styled(HexColorPicker)`
    &.react-colorful {
        gap: 32px;
        width: auto;
        height: 240px;
    }

    .react-colorful__saturation {
        border-bottom: none;
        border-radius: 8px;
        box-shadow: none;
    }

    .react-colorful__saturation-pointer {
        width: 40px;
        height: 40px;
        border: 4px solid #fff;
        box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }

    .react-colorful__hue {
        height: 24px;
        border-radius: 24px;
    }

    .react-colorful__hue-pointer {
        width: 40px;
        height: 40px;
        border: 4px solid #fff;
        box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }

    .react-colorful__interactive:focus .react-colorful__pointer {
        transform: translate(-50%, -50%);
    }
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
`;
