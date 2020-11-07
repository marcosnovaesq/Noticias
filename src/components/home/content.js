import React from 'react'
import { Container, Row } from 'react-bootstrap'
import styled from 'styled-components'


export default (props) => {
    return (
        <MainContent className="h-100 w-100">
            <Container>
                <Row>
                    <BlocoImagens>
                        <BlocoImgLarge>

                        </BlocoImgLarge>
                        <BlocoDuasImagens>
                            <ImgPequena></ImgPequena>
                            <ImgPequena></ImgPequena>
                        </BlocoDuasImagens>
                    </BlocoImagens>
                </Row>
                <Row>
                    <ListaNoticias>
                        <Noticia></Noticia>
                        <Noticia></Noticia>
                        <Noticia></Noticia>
                        <Noticia></Noticia>
                        <Noticia></Noticia>
                        <Noticia></Noticia>
                        <Noticia></Noticia>

                    </ListaNoticias>
                </Row>
            </Container>
        </MainContent >
    )
}

const MainContent = styled.div`
    padding-top: 50px;
    padding-bottom: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F6F6F6;
`

const BlocoImagens = styled.div.attrs({
    className: 'd-none d-md-flex'
})`
    display: flex;
    flex-direction: row;
    height: 500px;
    width: 1200px;
    
`

const BlocoImgLarge = styled.div`
    background-color: green;
    flex: 1;
    margin: 5px;
`
const BlocoDuasImagens = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

`
const ImgPequena = styled.div`
    flex: 1;
    background-color: yellow;
    margin: 5px;
`

const ListaNoticias = styled.div`
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    flex:1;
    width: 800px;
    height: 1000px;
    display: flex;
    flex-direction: column;
    padding: 5px;
`

const Noticia = styled.div.attrs({
    className: 'my-1 '
})`
    flex: 1;
    background-color: yellow;
    height: 80px;
`