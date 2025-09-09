import { useParams } from "react-router-dom";
import { getEquipeById, getMembros, getUserByName, updateEquipe } from "../data/services/API";
import { useEffect, useState } from "react";
import CabProj from "../ui/components/_cabecalho";
import editEquipeStyle from "../ui/styles/Shared/AddEditProjUsuario.module.css";
import { redirecionar } from "./util/functions";

export default function Editar_Equipe() {
    const { id } = useParams()
    const [nome, setNome] = useState('')
    const [descricao, setDesc] = useState('')
    const [membros, setMembros] = useState([])
    
    
    useEffect(() => {
        async function fetch() {
            let eq = await getEquipeById(id)
            let me = await getMembros(id)
            setMembros(me)
            setNome(eq.nome)
            setDesc(eq.descricao)
        }
        fetch()
    }, [])

    function remover() {
        console.log('sim');

    }

    const handleClearAll = () => {
        if (window.confirm("Deseja realmente remover todos os usuários?")) {
            setMembros([]);
        }
    };

    function handleChange(event) {
        setPesquisa(event.target.value)
    }

    async function pesquisar(e) {
        e.preventDefault()
        let res = await getUserByName(pesquisa)
        document.getElementById("addMembro").value = ''
        if (!(res.nome == undefined)) {
            document.getElementById("erro").innerHTML = ''
            let item = [{ 'ID': `${res.id}`, 'nome': `${res.nome}` }, ...membros]
            setMembro(item)
            setPesquisa('')
        } else {
            document.getElementById("erro").innerHTML = "Não encontrado! Por favor digite o nome novamente"
        }
    }

    const onSave = async (e) => {
        e.preventDefault()
        console.log("Sim");
        
        // updateEquipe(id, { nome, descricao })
    }

    return (
        <div className={editEquipeStyle.paginaBody}>
            <CabProj />
            <center className={editEquipeStyle.center}>
                <h1 className={editEquipeStyle.tituloPagina}>Editar Equipe</h1>
                <form className={editEquipeStyle.form}>
                    <label>
                        <p className={editEquipeStyle.inputTipo}>Nome:</p>
                        <input
                            className={editEquipeStyle.input}
                            type="text" name="nome" defaultValue={nome}
                            placeholder="Digite o nome da equipe" required
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <br />
                    <label >
                        <p className={editEquipeStyle.inputTipo}>Descrição:</p>
                        <input
                            className={editEquipeStyle.inputPaginaPropria}
                            type="text" name="descricao" defaultValue={descricao}
                            placeholder="Digite a descrição da equipe" required
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </label>
                    <br /> <br />
                    <label >
                        <label>Membros</label> <br />
                        <table>
                            <tr>
                                <td>Nome</td>
                                <td>Papel</td>
                                <td><button onClick={handleClearAll}>Remover todos</button></td>
                            </tr>
                            {membros.map((i) => {
                                return (
                                    <tr>
                                        <td>{i.usuario.nome}</td>
                                        <td>{i.papel}</td>
                                        <td><button onClick={remover}>Excluir</button></td>
                                    </tr>
                                )
                            })}
                        </table>
                    </label>
                    <br />
                    <form >
                        <label>Adicionar membros: </label> <br />
                        <input
                            type="text" id="addMembro"
                            placeholder="Digite o nome do membro"
                            onChange={handleChange}
                        />
                        <button type="submit" onClick={pesquisar}>Pesquisar</button>
                        <br />
                        <label id="erro" />
                    </form>
                    <br /> <br />

                    <div className={editEquipeStyle.divBotoes}>
                        <button className={editEquipeStyle.formButton} type="submit" onClick={onSave}>Salvar Alterações</button>
                        <button className={editEquipeStyle.buttonReturn} type="button" onClick={(e) => redirecionar('eq')}>Cancelar</button>
                    </div>
                </form>
            </center>
        </div>
    )
}

function UserSearchAndRemove() {
    const [users, setUsers] = useState([]);           // lista de nomes cadastrados
    const [nameInput, setNameInput] = useState("");   // input para adicionar
    const [searchInput, setSearchInput] = useState(""); // input para buscar
    const [removeInput, setRemoveInput] = useState(""); // input para remover pelo nome exato
    const textareaRef = useRef(null);

    // Adiciona um usuário (ignora vazios e duplicados exatos)
    const handleAdd = () => {
        const name = nameInput.trim();
        if (!name) return;
        if (users.includes(name)) {
            alert("Nome já existe.");
            return;
        }
        setUsers(prev => [...prev, name]);
        setNameInput("");
    };

    // Filtra usuários pelo searchInput (case-insensitive)
    const filteredUsers = users.filter(u =>
        u.toLowerCase().includes(searchInput.trim().toLowerCase())
    );

    // Remove um usuário pelo nome exato (case-sensitive por default, mas aqui tratamos case-insensitive)
    const handleRemoveByName = () => {
        const target = removeInput.trim();
        if (!target) return;
        setUsers(prev => prev.filter(u => u.toLowerCase() !== target.toLowerCase()));
        setRemoveInput("");
    };

    // Remove o primeiro usuário do resultado filtrado (útil para "remover selecionado")
    //   const handleRemoveFirstFiltered = () => {
    //     if (filteredUsers.length === 0) return;
    //     const first = filteredUsers, [Object: object];
    //     setUsers(prev => prev.filter(u => u !== first));
    //   };

    // Limpa todos os usuários (opcional)
    

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
            <h2>Cadastro / Busca / Remoção de Usuários</h2>

            <div style={{ marginBottom: 12 }}>
                <input
                    type="text"
                    placeholder="Nome para adicionar"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAdd()}
                    style={{ width: "70%", padding: 8 }}
                />
                <button onClick={handleAdd} style={{ marginLeft: 8, padding: "8px 12px" }}>
                    Adicionar
                </button>
            </div>

            <div style={{ marginBottom: 12 }}>
                <input
                    type="text"
                    placeholder="Buscar por nome (filtro)"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    style={{ width: "70%", padding: 8 }}
                />
                <button
                    onClick={() => {
                        // foco no textarea para facilitar copiar/selecionar
                        textareaRef.current && textareaRef.current.focus();
                    }}
                    style={{ marginLeft: 8, padding: "8px 12px" }}
                >
                    Mostrar no Textarea
                </button>
            </div>

            <div style={{ marginBottom: 12 }}>
                <textarea
                    ref={textareaRef}
                    readOnly
                    value={filteredUsers.join("\n")}
                    rows={8}
                    style={{ width: "100%", padding: 8, resize: "vertical" }}
                />
                <small>Resultados: {filteredUsers.length} item(ns)</small>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <input
                    type="text"
                    placeholder="Nome exato para remover (ou use 'Remover selecionado')"
                    value={removeInput}
                    onChange={e => setRemoveInput(e.target.value)}
                    style={{ flex: 1, padding: 8 }}
                    onKeyDown={e => e.key === "Enter" && handleRemoveByName()}
                />
                <button onClick={handleRemoveByName} style={{ padding: "8px 12px" }}>
                    Remover por nome
                </button>
                <button onClick={handleRemoveFirstFiltered} style={{ padding: "8px 12px" }}>
                    Remover selecionado
                </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <small>Total cadastrados: {users.length}</small>
                <div>
                    <button onClick={handleClearAll} style={{ padding: "6px 10px" }}>
                        Limpar tudo
                    </button>
                </div>
            </div>
        </div>
    );
}