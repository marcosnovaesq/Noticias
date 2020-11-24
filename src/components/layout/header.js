import React, { useState, useContext } from 'react';
import logo from '../../assets/default-monochrome.svg';
import { Navbar, Nav, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';
import { FaChevronRight } from "react-icons/fa";
import ModalSignIn from './modalSignIn';
import UserContext from '../../context/usercontext';
import { removeToken } from '../../config/auth';
import history from '../../config/history';


export default (props) => {

    const [showModal, setShowModal] = useState(false)
    const { usuarioLogado, setUsuarioLogado } = useContext(UserContext)


    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleLogout = () => {
        removeToken()
        setUsuarioLogado({})
        history.push('/')

    }


    const changePage = (page) => {
        history.push(`/${page}`)
    }



    const componentLoginOrName = () => {

        const usuario = usuarioLogado
        if (Object.keys(usuario).length === 0) {
            return <Button onClick={() => openModal()} variant="outline-light">Entrar <FaChevronRight /></Button>
        }
        else {
            return (
                <DropdownButton
                    menuAlign="right"
                    title={usuario.name}
                    id="dropdown-menu-align-right"
                >
                    <Dropdown.Item eventKey="1" onClick={() => changePage(`users/${usuario.id}`)} >Perfil</Dropdown.Item>
                    {usuario.userType === 'comum' ? <Dropdown.Item eventKey="2">Favoritas</Dropdown.Item> : ""}

                    {!(usuario.userType === 'comum') ? <Dropdown.Item eventKey="3" onClick={(e) => changePage('dashboard')}>Dashboard</Dropdown.Item> : ''}
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4" onClick={(e) => handleLogout(e)}>Logout</Dropdown.Item>
                </DropdownButton>
            )
        }
    }

    return (
        <Header>

            <Navbar expand="lg" variant="dark" className="d-flex justify-content-between align-items-center">
                <Navbar.Brand href="/"><img src={logo} alt="logo" style={{ height: "90px", width: "140px", backgroundColor: "transparent" }} /></Navbar.Brand>
                <Nav className="ml-auto">
                    {componentLoginOrName()}
                </Nav>
                <ModalSignIn show={showModal} close={closeModal} />
            </Navbar>

        </Header >
    )
}

const Header = styled.div`
    background-color: #2ecc71;
`

