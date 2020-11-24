import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import history from '../../config/history'
import { Col, Image, Badge } from 'react-bootstrap';
import { getUserById } from '../../services/user'
import styled from 'styled-components';
import { formataData } from '../../helpers/dataHelper'

const ShowUser = (props) => {

    const [user, setUser] = useState({})
    const [notFound, setNotFound] = useState(true)
    const { id } = useParams()
    const [loading, setLoading] = useState(true)




    useEffect(() => {
        const montaInfosUser = async (id) => {
            try {
                const usuario = await getUserById(id)
                setUser(usuario.data)
                setLoading(false)
                setNotFound(false)
            } catch (error) {
                console.log(error.message)
                setNotFound(true)
                setLoading(false)
            }
        }
        montaInfosUser(id)
        return () => { }
    }, [id])




    const montaCorpo = () => {
        if (!loading) {
            if (notFound) {
                return (<h1>Usuario nao encontrado!</h1>)
            } else {
                return (
                    <>
                        <div>
                            <h1 className="mb-1 mt-3">{user.name}</h1>
                            <span>{user.email}</span>
                            <br></br>
                            <span>Entrou em: {formataData(user.createdAt)}</span>
                        </div>
                    </>
                )
            }
        } else {
            return (
                <h1>Carregando...</h1>
            )
        }
    }

    return (
        <>
            <Coluna md={12} >
                {montaCorpo()}
                {/* <Coluna md={12} >
                <CorpoNoticia>
                    <h1 className="mb-3 mt-3">{noticia.title}</h1>
                    <span>Criado por: {noticia.createdBy["user_name"]}, em {noticia.createdAt}</span>
                    <Imagem src={noticia.photo} className="mb-3" ></Imagem>
                    <p className="mb-3">{noticia.content}</p>
                </CorpoNoticia>
            </Coluna> */}
            </Coluna>

        </>
    )
}

const Coluna = styled(Col)`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;

`



export default ShowUser