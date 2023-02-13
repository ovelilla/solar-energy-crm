import { useEffect } from "react";
import useProposal from "@features/dashboard/proposal/hooks/useProposal";
import Table from "@features/dashboard/proposal/inquiries/table";
import Menu from "@features/dashboard/proposal/inquiries/menu";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Inquiries = () => {
    const { readProposals } = useProposal();

    useEffect(() => {
        readProposals();
    }, []);

    return (
        <>
            <Table />
            <Menu />
            <Confirm />
            <Alert />
        </>
    );
};

export default Inquiries;
