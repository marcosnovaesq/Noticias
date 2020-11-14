import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { FiUserPlus } from 'react-icons/fi';
import { signUp } from '../../services/user'
import history from '../../config/history'

const FormLogin = (props) => {


    const [form, setForm] = useState({})


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
        return form.name && form.email && form.password && form.passwordConf
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        try {
            const { data } = await signUp(form)
            console.log(data)
            clearForm()
            history.push("/")
        } catch (error) {
            console.log(error.message)
        }
    }



    return (
        <Form className="p-5 " style={{ backgroundColor: '#F6F6F6' }}>
            <h3 className="mb-4 text-center"> Novo cadastro</h3>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Digite seu nome completo" name="name" value={form.name || ""} onChange={(e) => handleChange(e)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={form.email || ""} onChange={(e) => handleChange(e)} />
                <Form.Text className="text-muted">
                    Não vamos divulgar seu e-mail para ninguem
                    </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" name="password" value={form.password || ""} onChange={(e) => handleChange(e)} />
                <Form.Text className="text-muted">
                    Nunca pediremos sua senha para nada.
                    </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirmação de Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" name="passwordConf" value={form.passwordConf || ""} onChange={(e) => handleChange(e)} />
            </Form.Group>
            <Button variant="success" type="submit" disabled={!formIsPreenchido()} onClick={(e) => handleSubmit(e)} block>
                Enviar <FiUserPlus className="ml-2" />
            </Button>
        </Form>
    )
}


export default FormLogin;