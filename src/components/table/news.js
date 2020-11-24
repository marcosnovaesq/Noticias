import React, { useState, useEffect } from 'react'
import { Table, Badge, ButtonGroup, ToggleButton, Button } from "react-bootstrap";
import styled from 'styled-components';
import { formataStringTamanho, formataDataSemHora, capitalize } from '../../helpers/dataHelper'
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa'
import { toggleActivation, toggleHighlight, deleteNew } from '../../services/new'
import { AiFillDelete, AiFillEye } from 'react-icons/ai';
import swal from 'sweetalert';
import history from '../../config/history'

const TableNews = ({ news, changeComponent, setNew, userType, reload }) => {

    const [noticias, setNoticias] = useState([])


    const parseDestaque = (destaque, id) => {
        const text = destaque ? "Sim" : "Nao"
        return userType === 'reporter' ? text : <ButtonGroup toggle className="mr-3 ml-0">
            <ToggleButton
                type="checkbox"
                variant={Boolean(destaque) ? 'success' : 'danger'}
                name="highlight"
                onChange={(e) => toggle(e, id, 'highlight')}
                checked={Boolean(destaque)}
            >
                {Boolean(destaque) ? < FaCheck /> : <FaTimes />}
                {text}
            </ToggleButton>
        </ButtonGroup>
    }


    const toggle = async (e, id, type) => {
        e.preventDefault()
        try {
            swal({
                title: "Tem certeza?",
                text: "mudanças no destaque e no ativo das noticias vao refletir na pagina principal",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async (willToggle) => {
                    if (willToggle) {
                        type === 'highlight' ? await toggleHighlight(id) : await toggleActivation(id)
                        reload(Math.random())
                        swal("Mudança feita!", {
                            icon: "success",
                        });
                    } else {
                        swal("Nada mudou!", {
                            icon: "info",
                        });
                    }
                });

        } catch (error) {
            console.log(error.message)
        }

    }


    const parseAtivo = (ativo, id) => {
        const text = ativo ? "Ativo" : "Inativo"

        return userType === 'reporter' ? text : <ButtonGroup toggle className="mr-3 ml-0">
            <ToggleButton
                type="checkbox"
                variant={Boolean(ativo) ? 'success' : 'danger'}
                name="isActive"
                onChange={(e) => toggle(e, id, 'active')}
                checked={Boolean(ativo)}
            >
                {Boolean(ativo) ? < FaCheck /> : <FaTimes />}
                {text}
            </ToggleButton>
        </ButtonGroup>
    }


    const handleEdit = (e, noticia) => {
        changeComponent('formNew')
        setNew(noticia)
    }

    const handleDelete = async (e, noticia) => {
        try {
            swal({
                title: "Tem certeza?",
                text: "Noticias excluidas podem deixar de aparecer na pagina principal",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async (willDelete) => {
                    if (willDelete) {
                        const result = await deleteNew(noticia._id)
                        reload(Math.random())
                        swal("Noticia excluida!", {
                            icon: "success",
                        });
                    } else {
                        swal("A exclusao foi cancelada!", {
                            icon: "info",
                        });
                    }
                });

        } catch (error) {
            console.log(error.message)
        }


    }

    const handleSee = (e, noticia) => {
        e.preventDefault()
        history.push(`/news/${noticia._id}`)

    }

    const geraAcoesButton = (noticia) => {
        if (userType === 'administrador') {
            return <Td> <Button variant="outline-danger" onClick={(e) => handleDelete(e, noticia)} ><AiFillDelete /></Button>  <Button variant="outline-info" onClick={(e) => handleSee(e, noticia)}  ><AiFillEye /> </Button>  </Td>
        }
        else {
            return <Td><Button variant="outline-info" onClick={(e) => handleEdit(e, noticia)} ><FaEdit /></Button>  <Button variant="outline-info" onClick={(e) => handleEdit(e, noticia)} ><AiFillEye /></Button>  </Td>
        }
    }


    const montaLinhasTabela = (noticias) => {
        return (
            <tbody>
                {noticias.map((noticia, i) => {
                    return (<tr key={i}>
                        <Td>{formataStringTamanho(capitalize(noticia.title))}</Td>
                        <Td><Badge variant="info">{noticia.category}</Badge></Td>
                        <Td>{parseDestaque(noticia.highlight, noticia._id)}</Td>
                        <Td>{parseAtivo(noticia.is_active, noticia._id)}</Td>
                        <Td>{noticia.createdBy.user_name}</Td>
                        <Td>{formataDataSemHora(noticia.createdAt)}</Td>
                        {geraAcoesButton(noticia)}
                    </tr>)
                })}
            </tbody>
        )
    }


    useEffect(() => {
        setNoticias(news)
    }, [news])

    return (
        <>
            <Button variant="outline-primary" onClick={() => changeComponent('panel')} className="mb-4" >Voltar</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <Th>Titulo</Th>
                        <Th>Categoria</Th>
                        <Th>Destaque</Th>
                        <Th>Ativa</Th>
                        <Th>Autor</Th>
                        <Th>Data Criaçao</Th>
                        <Th>Ações</Th>
                    </tr>
                </thead>
                {montaLinhasTabela(noticias)}
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


export default TableNews