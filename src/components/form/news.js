import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { FiUserPlus } from 'react-icons/fi';
import styled from 'styled-components';
import { updateNew, createNew } from '../../services/new'


const FormNews = ({ noticia, changeComponent, reload }) => {

    const [form, setForm] = useState({})
    const [updatePhoto, setUpdatePhoto] = useState(false)
    const [imgPreview, setImgPreview] = useState()
    const [isUpdate, setIsUpdate] = useState(false)

    const typeReq = (data) => isUpdate ? updateNew(noticia._id, data) : createNew(data)




    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        return;
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            let file = event.target.files[0];
            reader.onloadend = () => {
                setForm({
                    ...form,
                    'photo': file
                });
                setImgPreview(reader.result)
                setUpdatePhoto(true)
            };
            reader.readAsDataURL(file);
        }
    };


    const isNotValid = () => {
        return !(form.title && form.content && form.photo && form.category)
    }


    const buttonText = () => {
        const text = isUpdate ? "Atualizar" : "Criar"
        return text
    }

    const removePhoto = () => {
        setUpdatePhoto(false)
        setForm({
            ...form,
            photo: ""
        })
    }

    const clearForm = () => {
        setForm({})
        setImgPreview("")
        setUpdatePhoto(false)
    }

    const submitForm = (e) => {
        e.preventDefault()

        let data = new FormData()

        Object.keys(form)
            .forEach(key => data.append(key, form[key]))

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        typeReq(data, config)
            .then((res) => {
                clearForm()
                changeComponent('tableNews')
                reload(Math.random())
            })
            .catch((err) => console.log(`Erro ao cadastrar noticia.`))
    }

    useEffect(() => {

        if (Object.keys(noticia).length > 0) {
            setIsUpdate(true)
            setForm(noticia)
            setImgPreview(noticia.photo)
            setUpdatePhoto(true)
        }

    }, [noticia])

    return (
        <Form className="p-5 " style={{ backgroundColor: '#F6F6F6' }}>
            <Button variant="outline-primary" onClick={() => changeComponent('panel')}>Voltar</Button>
            <h3 className="mb-4 text-center"> Nova notícia</h3>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Titulo</Form.Label>
                <Form.Control type="text" placeholder="Digite o conteudo" name="title" onChange={(e) => handleChange(e)} value={form.title || ''} />
            </Form.Group>
            <Form.Group size="sm" controlId="formBasicContent">
                <Form.Label>Conteudo</Form.Label>
                <Form.Control style={{ height: 200 }} as="textarea" placeholder="Digie o conteudo da materia" name="content" onChange={(e) => handleChange(e)} value={form.content || ""} />
            </Form.Group>

            <Form.Group className="mt-4 pl-0" as={Col} md={4} >
                {updatePhoto ? (
                    <Picture>
                        <img src={imgPreview} alt="imagem escolhida" />
                        <span onClick={removePhoto}>Remover</span>
                    </Picture>
                ) : (
                        <input name="photo" type="file" onChange={(e) => onImageChange(e)} />
                    )}
            </Form.Group>

            <Form.Group controlId="formBasicCategory">
                <Form.Label>Categorias</Form.Label>
                <Form.Control type="text" placeholder="Digite a categoria" name="category" onChange={(e) => handleChange(e)} value={form.category || ""} />
            </Form.Group>
            <Button variant="success" type="submit" disabled={isNotValid()} onClick={(e) => submitForm(e)} block>
                {buttonText()} <FiUserPlus className="ml-2" />
            </Button>
        </Form>
    )
}

const Picture = styled.div`

    display: flex;
    flex-direction: column;

    img{
        max-width: 400px;
        max-height: 400px;
    }

    span{
        cursor: pointer;
        color: #ccc;
        &:hover{
            color: red
        }
    }


`


export default FormNews;