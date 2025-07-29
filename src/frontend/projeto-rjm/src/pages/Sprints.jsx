import { useParams } from "react-router-dom";
import CabProj from "../ui/components/_cabecalho";

export default function Sprints(){
    const {id} = useParams()
    return(
        <>
            <CabProj />
        </>
    )
}