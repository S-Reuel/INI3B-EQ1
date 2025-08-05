import { useParams } from "react-router-dom";
import CabProj from "../ui/components/_cabecalho";

export default function Sprints() {
    const { id } = useParams()
    if (localStorage.getItem('authToken')) {
        return (
            <>
                <CabProj />
            </>
        )
    } else {
        return (redirecionar('login'))
    }
}