import React, { useState } from 'react'
import { Navbar, Nav, Button, Modal } from 'react-bootstrap'
import styled from 'styled-components'
import { FaChevronRight } from "react-icons/fa";
import ModalSignIn from './modalSignIn';

export default (props) => {

    const [showModal, setShowModal] = useState(false)


    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <Header>

            <Navbar expand="lg" variant="dark" className="d-flex justify-content-between align-items-center">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="ml-auto">
                    <Button onClick={() => openModal()} variant="outline-light">Entrar <FaChevronRight /></Button>
                </Nav>
                <ModalSignIn show={showModal} close={closeModal} />
            </Navbar>

        </Header >
    )
}

const Header = styled.div`
    background-color: #06AA48;
`

