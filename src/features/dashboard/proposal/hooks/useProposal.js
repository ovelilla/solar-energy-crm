import { useContext } from "react";
import ProposalContext from "@features/dashboard/proposal/context/ProposalProvider";

const useProposal = () => {
    return useContext(ProposalContext);
};

export default useProposal;
