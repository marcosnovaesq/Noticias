import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { FiUserPlus } from 'react-icons/fi';

const FormLogin = (props) => {


    const [form, setForm] = useState({})
    const history = useHistory()


    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        return
    }

    const formIsPreenchido = () => {
        return form.nome && form.email && form.senha && form.senhaConfirmacao
    }

    return (
        <Form className="p-5 " style={{ backgroundColor: '#F6F6F6' }}>
            <h3 className="mb-4 text-center"> Novo cadastro</h3>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Digite seu nome completo" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    Não vamos divulgar seu e-mail para ninguem
                    </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" />
                <Form.Text className="text-muted">
                    Nunca pediremos sua senha para nada.
                    </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirmação de Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" />
            </Form.Group>
            <Button variant="success" type="submit" block>
                Enviar <FiUserPlus className="ml-2" />
            </Button>
        </Form>
    )
}


export default FormLogin;