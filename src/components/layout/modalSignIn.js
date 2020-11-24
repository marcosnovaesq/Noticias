import React, { useState, useContext } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { FaChevronRight } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import { signIn } from '../../services/user'
import UserContext from '../../context/usercontext';
import { saveToken } from '../../config/auth';
import clientHttp from '../../config/clientHttp'

const ModalSignIn = ({ show, close }) => {

    const history = useHistory();
    const [form, setForm] = useState({})
    const { setUsuarioLogado } = useContext(UserContext)

    const trocaPagina = () => {
        close();
        history.push('/users/signup');
    }

    const handleClose = () => close();


    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        return
    }

    const clearForm = () => {
        setForm({})
    }

    const formIsPreenchido = () => {
        return form.email && form.password
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await signIn(form)
            clearForm()
            handleClose()
            saveToken(data.token)
            clientHttp.defaults.headers["x-auth-token"] = data.token;
            setUsuarioLogado(data.user)
        } catch (error) {
            console.log(error.message)
        }
    }




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
                        <Form.Control type="email" placeholder="Enter email" name="email" value={form.email || ""} onChange={(e) => handleChange(e)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={form.password || ""} onChange={(e) => handleChange(e)} />
                    </Form.Group>
                    <Button variant="success" type="submit" disabled={!formIsPreenchido()} onClick={(e) => handleSubmit(e)} block>
                        Enviar <FaChevronRight />
                    </Button>
                    <p className="text-center mt-4">

                        <Button variant="outline-primary" onClick={() => trocaPagina()} block>
                            Nao tem conta? cadastre-se
                    </Button>

                    </p>
                </Form>
            </Modal>
        </>
    )


}

export default ModalSignIn;