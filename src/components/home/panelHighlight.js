import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card } from 'react-bootstrap'


const PanelHighlight = ({ highlightL, highlightS, changePage }) => {

    const [imgLarge, setImgLarge] = useState({})
    const [imgsPequenas, setImgsPequenas] = useState([])


    // let mapeiaHighlight = () => {
    //     const sortedHighlights = highlights.slice().sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    //     const large = sortedHighlights[0]
    //     const pequenas = sortedHighlights.slice(1)
    //     setImgLarge(large)
    //     setImgsPequenas(pequenas)
    // }



    const setaHigh = () => {
        setImgLarge(highlightL)
        setImgsPequenas(highlightS)
    }
    // style={{ "maxHeight": "100%", "maxWidth": "100%" }}
    const geraImgLarge = () => {
        return (
            <Card className="text-white d-flex flex-column" style={{ "height": "100%" }} onClick={() => changePage(imgLarge._id)} >

                <Card.Img src={imgLarge.photo} style={{ "height": "490px", "width": "565px" }} alt="Card image" />

                <Card.ImgOverlay>
                    <Card.Title style={{ "marginTop": "70%", "fontSize": "40px", "fontWeight": "bolder", "color": "white" }}>{imgLarge.title}</Card.Title>
                </Card.ImgOverlay>
            </Card>)
    }

    const geraPanelSmall = () => {
        const primeira = imgsPequenas[0]
        const segunda = imgsPequenas[1]
        return (
            <>
                <ImgPequena>
                    {primeira ? <Card className="bg-white text-white" style={{ "height": "100%" }} onClick={() => changePage(primeira._id)} >

                        <Card.Img src={primeira.photo} style={{ "height": "240px", "width": "555px" }} alt="Card image" />

                        <Card.ImgOverlay>
                            <Card.Title style={{ "marginTop": "100px", "fontSize": "40px", "fontWeight": "bolder", "color": "white" }} >{primeira.title}</Card.Title>
                        </Card.ImgOverlay>
                    </Card> : ""}
                </ImgPequena>
                <ImgPequena>
                    {segunda ? <Card className="bg-dark text-white" style={{ "height": "100%" }} onClick={() => changePage(segunda._id)}  >

                        <Card.Img src={segunda.photo} style={{ "height": "240px", "width": "555px" }} alt="Card image" />

                        <Card.ImgOverlay>
                            <Card.Title style={{ "marginTop": "100px", "fontSize": "40px", "fontWeight": "bolder", "color": "white" }} >{segunda.title}</Card.Title>
                        </Card.ImgOverlay>
                    </Card> : ""}
                </ImgPequena>
            </>)
    }


    useEffect(() => {
        setaHigh()
        return () => { }
    }, [highlightL, highlightS])

    return (
        <BlocoImagens>
            <BlocoImgLarge>
                {geraImgLarge()}
            </BlocoImgLarge>
            <BlocoDuasImagens>
                {geraPanelSmall()}
            </BlocoDuasImagens>
        </BlocoImagens>
    );
}


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

    &:hover {
        transform: scale(1.02);
        cursor: pointer;
    }
    
    
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

    &:hover {
        transform: scale(1.02);
        cursor: pointer;
    }
`

export default PanelHighlight