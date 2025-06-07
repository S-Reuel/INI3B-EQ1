export default function Perfil(){
    useEffect(() => {
            async function fetch() {
                let res = await getProj()
                res == 500 ? setErrors(res) : setProj(res)
            }
            fetch()
        }, [])
}