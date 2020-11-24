import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import history from '../../config/history'
import { Col, Image, Badge } from 'react-bootstrap';
import { getNewById } from '../../services/new'
import styled from 'styled-components';
import { formataData } from '../../helpers/dataHelper'

const ShowNew = (props) => {

    const [noticia, setNoticia] = useState({})
    const [notFound, setNotFound] = useState(true)
    const { id } = useParams()
    const [author, setAuthor] = useState({})
    const [loading, setLoading] = useState(true)




    useEffect(() => {
        const montaInfosNoticia = async (id) => {
            try {
                const noticia = await getNewById(id)
                setNoticia(noticia.data)
                setAuthor(noticia.data.createdBy)
                setLoading(false)
                setNotFound(false)
            } catch (error) {
                console.log(error.message)
                setNotFound(true)
                setLoading(false)
            }
        }
        montaInfosNoticia(id)
        return () => { }
    }, [id])

    // console.log(noticia)


    const montaCorpo = () => {
        if (!loading) {
            if (noticia == {}) {
                return (<h1>noticia nao encontrada!</h1>)
            } else {


                const autor = author
                console.log(autor.user_name)
                return (
                    <CorpoNoticia>
                        <h1 className="mb-1 mt-3">{noticia.title}</h1>
                        <span className="mb-3">Criado por: {autor.user_name}, em {formataData(noticia.createdAt)}</span>
                        <span className="mb-3" ><Badge variant="info">{noticia.category}</Badge></span>
                        <Imagem src={noticia.photo} className="mb-3" ></Imagem>
                        <p className="mb-3">{noticia.content}</p>
                    </CorpoNoticia>
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
            <ColunaComentarios md={12}>
                <h2>Comentarios</h2>
            </ColunaComentarios>

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

const ColunaComentarios = styled(Col)`
    width: 95%;
    margin: 20px auto 20px auto;

    display: flex;
    justify-content: center;

`

const Imagem = styled(Image)`

    width : 600px;
    height: 400px;

`

const CorpoNoticia = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;


`

const CorpoComentarios = styled.div`


`

export default ShowNew