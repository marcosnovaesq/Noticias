import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { FaChevronRight } from "react-icons/fa";
import { useHistory } from 'react-router-dom';


const ModalSignIn = ({ show, close }) => {

    const history = useHistory();

    const trocaPagina = () => {
        close();
        history.push('/users/signup');
    }

    const handleClose = () => close();
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <button type="button" className="close text-right mr-4 mt-4" onClick={handleClose} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <Form className="p-4">
                    <h3 className="mb-4 text-center"> Logar na Plataforma</h3>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="success" type="submit" block>
                        Enviar <FaChevronRight />
                    </Button>
                    <p className="text-center mt-4"><a onClick={() => trocaPagina()} href="#"> Nao tem conta? cadastre-se</a></p>
                </Form>
            </Modal>
        </>
    )


}

export default ModalSignIn;