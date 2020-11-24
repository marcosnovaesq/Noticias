import React, { useState, useEffect } from 'react'
import { Table, Badge, Button } from "react-bootstrap";
import styled from 'styled-components';
import { formataStringTamanho, formataDataSemHora, capitalize } from '../../helpers/dataHelper'
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete, AiFillEye } from 'react-icons/ai';
import { deleteUser } from '../../services/user';
import history from '../../config/history'

const TableUsers = ({ users, changeComponent, setNew, userType, reload }) => {

    const [usuarios, setUsuarios] = useState([])




    const geraBadge = (userType) => {
        switch (userType) {
            case 'comum':
                return <Badge variant="info">{userType}</Badge>
            case 'reporter':
                return <Badge variant="success">{userType}</Badge>
            case 'administrador':
                return <Badge variant="warning">{userType}</Badge>
            default:
                break;
        }
    }

    const handleEdit = (e, user) => {
        changeComponent('formUser')
    }

    const handleDelete = async (e, user) => {
        try {
            const result = await deleteUser(user._id)
            reload(Math.random())
            changeComponent('tableUsers')
        } catch (error) {
            console.log(error.message)
        }


    }

    const handleSee = async (e, u) => {
        history.push(`/users/${u._id}`)
    }

    const geraAcoesButton = (u) => {
        if (userType === 'administrador') {
            return <Td> <Button variant="outline-danger" onClick={(e) => handleDelete(e, u)} ><AiFillDelete /></Button>  <Button variant="outline-info" onClick={(e) => handleSee(e, u)}  ><AiFillEye /> </Button>  </Td>
        }
        else {
            return <Td><Button variant="outline-info" onClick={(e) => handleEdit(e, u)} ><FaEdit /></Button>  <Button variant="outline-info" onClick={(e) => handleEdit(e, u)} ><AiFillEye /></Button>  </Td>
        }
    }

    const montaLinhasTabela = (uses) => {
        return (
            <tbody>
                {uses.map((user, i) => {
                    return (<tr key={i}>
                        <Td>{formataStringTamanho(capitalize(user.name))}</Td>
                        <Td>{user.email}</Td>
                        <Td>{formataDataSemHora(user.createdAt)}</Td>
                        <Td>{geraBadge(user.userType)}</Td>

                        {geraAcoesButton(user)}
                    </tr>)
                })}
            </tbody>
        )
    }


    useEffect(() => {
        setUsuarios(users)
    }, [users])

    return (
        <>
            <Button variant="outline-primary" onClick={() => changeComponent('panel')} className="mb-4" >Voltar</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <Th>Nome</Th>
                        <Th>Email</Th>
                        <Th>Data Inicio</Th>
                        <Th>Tipo</Th>
                        <Th>Ações</Th>
                    </tr>
                </thead>
                {montaLinhasTabela(usuarios)}
            </Table>
        </>
    )
}

const Th = styled.th`
    text-align: center;
`
const Td = styled.td`
    text-align: center;
`


export default TableUsers