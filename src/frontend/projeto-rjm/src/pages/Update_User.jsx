import { updateUser } from "../data/services/API"

export default function Update(prosp) {
    

    const onSave = async (e) => {
        e.preventDefault()
        let res = updateUser(prosp.id, {nome, email, password, user_git, excluido})
        if(res.error == ""){
            
        } else {
            
        }
        
    }
   
}