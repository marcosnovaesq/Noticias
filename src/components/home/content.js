import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { getAllNews } from '../../services/new'
import PanelHighlight from './panelHighlight'
import BlockNormalNews from './blockNormalNews'
import history from '../../config/history'


export default (props) => {

    const [highlightLarge, setHighlightLarge] = useState({})
    const [highlightSmalls, setHighlightSmalls] = useState([])

    const [commonNew, setCommonNew] = useState([])

    const goToNew = (id) => {
        history.push(`/news/${id}`)
    }


    useEffect(() => {
        let pegaNoticias = async () => {
            try {
                const { data } = await getAllNews()
                const highlightNews = data.filter((noticia) => noticia.highlight && noticia.is_active)
                const commonNews = data.filter((noticia) => !noticia.highlight && noticia.is_active)
                const sortedHighlights = highlightNews.slice().sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                const large = sortedHighlights[0]
                const pequenas = sortedHighlights.slice(1)
                setHighlightLarge(large)
                setHighlightSmalls(pequenas)
                setCommonNew(commonNews)
            } catch (error) {
                console.log(error.message)
            }
        }
        pegaNoticias()
    }, [])

    return (
        <MainContent className="h-100 w-100">
            <Container>
                <Row>
                    <PanelHighlight changePage={goToNew} highlightL={highlightLarge} highlightS={highlightSmalls}></PanelHighlight>
                </Row>
                <Row>
                    <BlockNormalNews changePage={goToNew} common={commonNew} ></BlockNormalNews>
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


