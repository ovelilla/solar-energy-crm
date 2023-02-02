import Menu from "@mui/material/Menu";
import useHeader from "@hooks/useHeader";
import { Header, Avatar, Body, Footer, StyledLink } from "./styles";
import { Signout, User, UserCircle, Setting } from "@icons";

const Profile = () => {
    const { anchorProfile, setAnchorProfile } = useHeader();

    return (
        <Menu
            anchorEl={anchorProfile}
            id="profile-menu"
            open={Boolean(anchorProfile)}
            onClose={() => setAnchorProfile(null)}
            onClick={() => setAnchorProfile(null)}
            MenuListProps={{
                component: "nav",
                sx: {
                    padding: "0",
                    fontSize: "14px",
                },
            }}
            sx={{
                "& .MuiPaper-root": {
                    width: "280px",
                    borderRadius: "8px",
                    boxShadow: "rgba(0, 0, 0, 0.20) 0px 3px 8px",
                },
            }}
        >
            <Header>
                <Avatar>
                    <User />
                </Avatar>
            </Header>

            <Body>
                <StyledLink to="/cuenta">
                    <UserCircle />
                    <span>Cuenta</span>
                </StyledLink>

                <StyledLink to="/ajustes">
                    <Setting />
                    <span>Ajustes</span>
                </StyledLink>
            </Body>

            <Footer>
                <StyledLink to="/logout">
                    <Signout />
                    <span>Logout</span>
                </StyledLink>
            </Footer>
        </Menu>
    );
};

export default Profile;
