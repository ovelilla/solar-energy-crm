import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import useProposal from "@features/dashboard/proposal/hooks/useProposal";
import { FooterContainer, StyledFooter, Icon } from "./styles";
import { TrashCan } from "@icons";

const Footer = () => {
    const { selected } = useProposal();

    return (
        <FooterContainer>
            {selected.length > 0 && (
                <Icon>
                    <Tooltip title="Eliminar">
                        <IconButton aria-label="actions" onClick={() => {}}>
                            <TrashCan />
                        </IconButton>
                    </Tooltip>
                </Icon>
            )}

            <StyledFooter />
        </FooterContainer>
    );
};

export default Footer;
