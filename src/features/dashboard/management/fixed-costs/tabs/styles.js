import TabPanel from "@mui/lab/TabPanel";
import styled from "@emotion/styled";
import { slate } from "@styles/colors";
import { breakpoints, media } from "@styles/sizes";

export const TabContainer = styled.div`
    border-bottom: 1px solid ${slate[200]};
`;

export const StyledTabPanel = styled(TabPanel)`
    padding: 24px;

    ${media(breakpoints.md)} {
        padding: 32px;
    }
`;
