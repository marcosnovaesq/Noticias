import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FiUserPlus } from 'react-icons/fi';
import { updateUser, createSpecialUser } from '../../services/user'
import history from '../../config/history'

const FormSpecialUser = ({ changeComponent, user, reload }) => {


    const [form, setForm] = useState({
        "userType": 'administrador'
    })
    const [isUpdate, setIsUpdate] = useState(false)

    const typeReq = (data) => isUpdate ? updateUser(user._id, data) : createSpecialUser(data)

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
        try {
            const { data } = await typeReq(form)
            clearForm()
            reload(Math.random())
            changeComponent('tableUsers')
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
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" name="password" value={form.password || ""} onChange={(e) => handleChange(e)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirmação de Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" name="passwordConf" value={form.passwordConf || ""} onChange={(e) => handleChange(e)} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Papel do Usuario</Form.Label>
                <Form.Control as="select" name="userType" onChange={(e) => handleChange(e)} >
                    <option value='administrador' >administrador</option>
                    <option value='reporter' >reporter</option>
                </Form.Control>
            </Form.Group>
            <Button variant="success" type="submit" disabled={!formIsPreenchido()} onClick={(e) => handleSubmit(e)} block>
                Enviar <FiUserPlus className="ml-2" />
            </Button>
        </Form>
    )
}


export default FormSpecialUser;