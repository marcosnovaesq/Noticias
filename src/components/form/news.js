import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { FiUserPlus } from 'react-icons/fi';

const FormNews = (props) => {


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
            <h3 className="mb-4 text-center"> Nova notícia</h3>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Titulo</Form.Label>
                <Form.Control type="text" placeholder="Digite o conteudo" />
            </Form.Group>
            <Form.Group size="sm" controlId="formBasicContent">
                <Form.Label>Conteudo</Form.Label>
                <Form.Control style={{ height: 200 }} as="textarea" placeholder="Digie o conteudo da materia" />
            </Form.Group>

            <Form.Group controlId="formBasicPhoto">
                <Form.Label>Foto</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
            <Form.Group controlId="formBasicCategory">
                <Form.Label>Categorias</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" />
            </Form.Group>
            <Button variant="success" type="submit" block>
                Enviar <FiUserPlus className="ml-2" />
            </Button>
        </Form>
    )
}


export default FormNews;