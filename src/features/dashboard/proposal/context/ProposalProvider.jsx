import { createContext, useState } from "react";

import axios from "@config/axios";

const ProposalContext = createContext();

export const ProposalProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [proposal, setProposal] = useState({});
    const [proposals, setProposals] = useState([]);

    const readProposals = async () => {
        setLoading(true);

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2RjMzM3NWE4MTI1NDkyMDk3MTZiZCIsImlhdCI6MTY3NDQzMDE0MiwiZXhwIjoxNjc3MDIyMTQyfQ.11EcHxUJXedVbjv_CZouAqFNkaliksh6w87OXInd_BQ",
            },
        };

        try {
            const { data } = await axios.get("/proposal", config);

            console.log(data);

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
                loading,
                setLoading,
                proposal,
                setProposal,
                proposals,
                setProposals,
                readProposals,
            }}
        >
            {children}
        </ProposalContext.Provider>
    );
};

export default ProposalContext;
