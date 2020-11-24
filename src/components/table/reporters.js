import React, { useState, useEffect } from 'react'
import { Table, Badge, Button } from "react-bootstrap";
import styled from 'styled-components';
import { formataStringTamanho, formataDataSemHora, capitalize } from '../../helpers/dataHelper'
import { AiFillDelete, AiFillEye } from 'react-icons/ai';
import { deleteUser } from '../../services/user'
import { FaEdit } from 'react-icons/fa';
import history from '../../config/history'

const TableReporters = ({ reporteres, changeComponent, userType, reload }) => {

    const [reporters, setReporters] = useState([])




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

    const handleEdit = (e, noticia) => {
        changeComponent('formUser')
    }

    const handleDelete = async (e, rep) => {
        try {
            const result = await deleteUser(rep._id)
            reload(Math.random())
            changeComponent('tableReporteres')
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSee = async (e, rep) => {
        history.push(`/users/${rep._id}`)
    }

    const geraAcoesButton = (rep) => {
        if (userType === 'administrador') {
            return <Td> <Button variant="outline-danger" onClick={(e) => handleDelete(e, rep)} ><AiFillDelete /></Button>  <Button variant="outline-info" onClick={(e) => handleSee(e, rep)}  ><AiFillEye /> </Button>  </Td>
        }
        else {
            return <Td><Button variant="outline-info" onClick={(e) => handleEdit(e, rep)} ><FaEdit /></Button>  <Button variant="outline-info" onClick={(e) => handleSee(e, rep)} ><AiFillEye /></Button>  </Td>
        }
    }

    const montaLinhasTabela = (reps) => {
        return (
            <tbody>
                {reps.map((reporter, i) => {
                    return (<tr key={i}>
                        <Td>{formataStringTamanho(capitalize(reporter.name))}</Td>
                        <Td>{reporter.email}</Td>
                        <Td>{formataDataSemHora(reporter.createdAt)}</Td>
                        <Td><Badge pill variant="info">{reporter.news.length}</Badge></Td>
                        <Td>{geraBadge(reporter.userType)}</Td>

                        {geraAcoesButton(reporter)}
                    </tr>)
                })}
            </tbody>
        )
    }


    useEffect(() => {
        setReporters(reporteres)
    }, [reporteres])

    return (
        <>
            <Button variant="outline-primary" onClick={() => changeComponent('panel')} className="mb-4" >Voltar</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <Th>Nome</Th>
                        <Th>Email</Th>
                        <Th>Data Inicio</Th>
                        <Th>Qtd. Noticias</Th>
                        <Th>Tipo</Th>
                        <Th>Ações</Th>
                    </tr>
                </thead>
                {montaLinhasTabela(reporteres)}
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


export default TableReporters