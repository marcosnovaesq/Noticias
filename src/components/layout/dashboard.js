import React, { useState, useContext, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import UserContext from '../../context/usercontext'
import history from '../../config/history'
import { BsPlus, BsFillEyeFill } from 'react-icons/bs';
import { AiFillWarning } from 'react-icons/ai'
import FormNews from '../form/news'

const DashBoard = (props) => {
    const { usuarioLogado, setUsuarioLogado } = useContext(UserContext)
    const [showForm, setShowForm] = useState(false)
    const [noticiaAtual, setNoticiaAtual] = useState({})

    const mudaPage = (rota) => {
        history.push(`${rota}`)
    }


    const montaPanel = () => {
        const usuario = usuarioLogado
        if (usuario.userType == "reporter") {
            return (
                <>
                    <Col md={6}>
                        <DivActionCreate onClick={() => setShowForm(!showForm)}>
                            <BsPlus className="mx-3" style={{ "fontSize": "50px" }}></BsPlus>
                            <h2>Criar noticia</h2>
                        </DivActionCreate>
                    </Col>
                    <Col md={6}>
                        <DivActionSee>
                            <BsFillEyeFill className="mx-3" style={{ "fontSize": "50px" }}></BsFillEyeFill>
                            <h2>Minhas Noticias </h2>
                        </DivActionSee>
                    </Col>
                </>
            )
        }
        else if (usuario.userType == "administrador") {
            return (
                <>
                    <Col md={6}>
                        <DivActionSee >
                            <BsFillEyeFill className="mx-3" style={{ "fontSize": "30px" }}></BsFillEyeFill>
                            <h3>Todas as noticias </h3>
                        </DivActionSee>
                    </Col>
                    <Col md={6}>
                        <DivActionSee >
                            <BsFillEyeFill className="mx-3" style={{ "fontSize": "30px" }}></BsFillEyeFill>
                            <h3>Usuarios </h3>
                        </DivActionSee>

                    </Col>
                    <Col md={6}>
                        <DivActionSee >
                            <BsFillEyeFill className="mx-3" style={{ "fontSize": "30px" }}></BsFillEyeFill>
                            <h3>Reporteres </h3>
                        </DivActionSee>
                    </Col>
                </>
            )
        }
        else {
            return (
                <>
                    <Col md={6}>
                        <DivActionWarn>
                            <AiFillWarning className="mx-3" style={{ "fontSize": "50px" }}></AiFillWarning>
                            <h3>Voce nao devia estar aqui</h3>
                        </DivActionWarn>
                    </Col>

                </>
            )
        }
    }

    montaPanel()

    return (<ContainerPage>
        <Row>
            {showForm ?
                <ContainerForm>
                    <FormNews showF={setShowForm} noticia={noticiaAtual}></FormNews>
                </ContainerForm> :
                <ContainerButtons>
                    {montaPanel()}
                </ContainerButtons>}


        </Row>


    </ContainerPage>)
}


const ContainerPage = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    margin-top: 50px;
`

const ContainerButtons = styled.div`
    width: 500px;
    height:auto;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 180px;

`

const ContainerForm = styled.div`

`


const DivActionCreate = styled.div`
    height: 200px;
    background-color: #2ecc71;
    padding: 10px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #ecf0f1;
    &:hover {
        cursor: pointer;
    }
`

const DivActionSee = styled.div`
    height: 200px;
    background-color: #3498db;
    flex: 1;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #ecf0f1;
    &:hover {
        cursor: pointer;
    }
`

const DivActionWarn = styled.div`
    height: 100%;
    background-color: #f39c12;
    width: 100%;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #ecf0f1;
`


export default DashBoard;
