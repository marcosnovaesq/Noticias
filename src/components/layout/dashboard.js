import React, { useState, useContext, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import UserContext from '../../context/usercontext'
import history from '../../config/history'
import { BsPlus, BsFillEyeFill } from 'react-icons/bs';
import { AiFillWarning } from 'react-icons/ai'
import FormNews from '../form/news'
import TableNews from '../table/news'
import TableUsers from '../table/users'
import { getAllNews, getNewsFromReporter } from '../../services/new'
import { getAll, getAllReporteres } from '../../services/user'
import TableReporters from '../table/reporters'
import FormSpecialUser from '../form/formSpecialUser'




const DashBoard = (props) => {
    const { usuarioLogado } = useContext(UserContext)
    const [showActiveComponent, setShowActiveComponent] = useState('panel')
    const [noticiaAtual, setNoticiaAtual] = useState({})
    const [usuarioAtual, setUsuarioAtual] = useState({})
    const [noticias, setNoticias] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [reporters, setReporters] = useState([])
    const [reloadNews, setReloadNews] = useState(-5)




    const mudaPage = (rota) => {
        history.push(`${rota}`)
    }

    const pegaNoticias = async (user) => {
        try {

            const { data } = user.userType === 'reporter' ? await getNewsFromReporter(user.id) : await getAllNews()
            setNoticias(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const pegaUsuarios = async () => {
        try {

            const { data } = await getAll()
            setUsuarios(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const pegaReporters = async () => {
        try {

            const { data } = await getAllReporteres()
            setReporters(data)
        } catch (error) {
            console.log(error.message)
        }
    }



    const montaPanel = () => {
        const usuario = usuarioLogado
        if (usuario.userType === "reporter") {
            return (
                <>
                    <Col md={6}>
                        <DivActionCreate onClick={() => setShowActiveComponent('formNew')}>
                            <BsPlus className="mx-3" style={{ "fontSize": "50px" }}></BsPlus>
                            <h2>Criar noticia</h2>
                        </DivActionCreate>
                    </Col>
                    <Col md={6}>
                        <DivActionSee onClick={() => setShowActiveComponent('tableNews')}>
                            <BsFillEyeFill className="mx-3" style={{ "fontSize": "50px" }}  ></BsFillEyeFill>
                            <h2>Minhas Noticias </h2>
                        </DivActionSee>
                    </Col>
                </>
            )
        }
        else if (usuario.userType === "administrador") {
            return (
                <>
                    <Col md={6}>
                        <DivActionSee onClick={() => setShowActiveComponent('tableNews')} >
                            <BsFillEyeFill className="mx-3" style={{ "fontSize": "30px" }}></BsFillEyeFill>
                            <h3>Todas as noticias </h3>
                        </DivActionSee>
                    </Col>
                    <Col md={6}>
                        <DivActionSee onClick={() => setShowActiveComponent('tableUsers')}>
                            <BsFillEyeFill className="mx-3" style={{ "fontSize": "30px" }}></BsFillEyeFill>
                            <h3>Usuarios </h3>
                        </DivActionSee>

                    </Col>
                    <Col md={6}>
                        <DivActionSee onClick={() => setShowActiveComponent('tableReporteres')} className="mt-2">
                            <BsFillEyeFill className="mx-3" style={{ "fontSize": "30px" }}></BsFillEyeFill>
                            <h3>Reporteres </h3>
                        </DivActionSee>
                    </Col>
                    <Col md={6}>
                        <DivActionCreate onClick={() => setShowActiveComponent('formUser')} className="mt-2" >
                            <BsPlus className="mx-3" style={{ "fontSize": "50px" }}></BsPlus>
                            <h2>Criar usuario</h2>
                        </DivActionCreate>
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

    const showComponent = () => {
        switch (showActiveComponent) {
            case 'panel':
                return <ContainerButtons> {montaPanel()}</ContainerButtons>
            case 'tableNews':
                return <TableNews news={noticias} reload={setReloadNews} changeComponent={setShowActiveComponent} setNew={setNoticiaAtual} userType={usuarioLogado.userType} ></TableNews>
            case 'formNew':
                return <ContainerForm><FormNews changeComponent={setShowActiveComponent} noticia={noticiaAtual} usuarioId={usuarioLogado._id} reload={setReloadNews} ></FormNews></ContainerForm>
            case 'formUser':
                return <ContainerForm><FormSpecialUser changeComponent={setShowActiveComponent} user={usuarioAtual} reload={setReloadNews} ></FormSpecialUser></ContainerForm>
            case 'tableUsers':
                return <TableUsers users={usuarios} reload={setReloadNews} changeComponent={setShowActiveComponent} setNew={setNoticiaAtual} userType={usuarioLogado.userType} ></TableUsers>
            case 'tableReporteres':
                return <TableReporters reporteres={reporters} reload={setReloadNews} changeComponent={setShowActiveComponent} setNew={setNoticiaAtual} userType={usuarioLogado.userType} ></TableReporters>
            default:
                return <h1>Ocorreu um erro</h1>
        }
    }

    useEffect(() => {
        pegaNoticias(usuarioLogado)
        pegaUsuarios()
        pegaReporters()
    }, [usuarioLogado, reloadNews])

    return (<ContainerPage>
        <Row>
            {showComponent()}
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
