import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import history from '../../config/history'
import { Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { getUserById } from '../../services/user'
import styled from 'styled-components';
import { formataData } from '../../helpers/dataHelper'
import { AiFillEye } from 'react-icons/ai';

const ShowUser = (props) => {

    const [user, setUser] = useState({})
    const [news, setNews] = useState([])
    const [notFound, setNotFound] = useState(true)
    const { id } = useParams()
    const [loading, setLoading] = useState(true)


    const handleSee = (e, n) => {
        e.preventDefault()
        history.push(`/news/${n._id}`)
    }



    useEffect(() => {
        const montaInfosUser = async (id) => {
            try {
                const usuario = await getUserById(id)
                setUser(usuario.data)
                if (usuario.data.userType === 'reporter') {
                    setNews(usuario.data.news)
                }
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


    const montaNoticias = () => {
        if (user.userType === 'reporter') {
            if (news.length > 0) {
                return (
                    < div className="mt-5" >
                        <h2>Noticias deste reporter:</h2>
                        <ListGroup>
                            {news.map((n, i) => {
                                console.log(n)
                                if (n.is_active) {
                                    return <ElementoLista key={i}>{n.title}   <Button variant="outline-info" onClick={(e) => handleSee(e, n)}  ><AiFillEye /> </Button></ElementoLista>
                                }
                                else {
                                    return ""
                                }

                            })}
                        </ListGroup>
                    </div >
                )
            }
            else {
                return (
                    < div className="mt-5" >
                        <h2>Noticias deste reporter:</h2>
                        <h3>Este reporter nao tem noticias :( </h3>
                    </div >
                )
            }
        }
        else {
            return ""
        }

    }



    const montaCorpo = () => {
        if (!loading) {
            if (notFound) {
                return (<h1>Usuario nao encontrado!</h1>)
            } else {
                return (
                    <>
                        <DivTotal>
                            <div>
                                <h1 className="mb-1 mt-3">{user.name}</h1>
                                <span>{user.email}</span>
                                <br></br>
                                <span>Entrou em: {formataData(user.createdAt)}</span>
                            </div>
                            {montaNoticias()}

                        </DivTotal>
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

const DivTotal = styled.div`

    display: flex;
    flex-direction: column;

`

const ElementoLista = styled(ListGroupItem)`
    
    display: flex;
    justify-content: space-between;

    &:hover{
        background-color: #f2f2f2;
        cursor: pointer;
    }

`


export default ShowUser