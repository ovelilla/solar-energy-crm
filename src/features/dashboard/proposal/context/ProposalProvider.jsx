import { createContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "@config/axios";

const ProposalContext = createContext();

export const ProposalProvider = () => {
    const [pageSize, setPageSize] = useState(20);
    const [selected, setSelected] = useState([]);
    const [stateMenu, setStateMenu] = useState({ open: false, anchor: null });
    const [loading, setLoading] = useState(true);
    const [proposal, setProposal] = useState({});
    const [proposals, setProposals] = useState([]);

    const navigate = useNavigate();

    const handleOpenMenu = (e, params) => {
        e.stopPropagation();
        setStateMenu({ open: true, anchor: e.currentTarget });
        setProposal(params.row);
    };

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
        setProposal(null);
    };

    const handleClickMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleViewProposal = () => {
        navigate(`/consultas/${proposal._id}`);
    };

    const handleConsultProposal = () => {
        window.open(`${import.meta.env.VITE_LANDING_URL}/propuesta/${proposal.uuid}`, "_blank");
    };

    const readProposal = async (id) => {
        console.log(id);
        setLoading(true);
        try {
            const { data } = await axios.get("/proposal/" + id, { withCredentials: true });
            console.log(data);
            setProposal(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const readProposals = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/proposal", { withCredentials: true });
            setProposals(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <ProposalContext.Provider
            value={{
                pageSize,
                setPageSize,
                selected,
                setSelected,
                stateMenu,
                setStateMenu,
                loading,
                setLoading,
                handleOpenMenu,
                handleCloseMenu,
                handleClickMenu,
                handleViewProposal,
                handleConsultProposal,
                proposal,
                setProposal,
                proposals,
                setProposals,
                readProposal,
                readProposals,
            }}
        >
            <Outlet />
        </ProposalContext.Provider>
    );
};

export default ProposalContext;
