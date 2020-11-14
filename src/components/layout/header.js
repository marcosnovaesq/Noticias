import React, { useState, useContext, useEffect } from 'react'
import { Navbar, Nav, Button, Modal, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { FaChevronRight } from "react-icons/fa";
import ModalSignIn from './modalSignIn';
import UserContext from '../../context/usercontext';
import { removeToken } from '../../config/auth';
import history from '../../config/history'

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
                    <Dropdown.Item eventKey="1">Perfil</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Favoritas</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="3" onClick={(e) => handleLogout(e)}>Logout</Dropdown.Item>
                </DropdownButton>
            )
        }
    }

    return (
        <Header>

            <Navbar expand="lg" variant="dark" className="d-flex justify-content-between align-items-center">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="ml-auto">
                    {componentLoginOrName()}
                </Nav>
                <ModalSignIn show={showModal} close={closeModal} />
            </Navbar>

        </Header >
    )
}

const Header = styled.div`
    background-color: #06AA48;
`

