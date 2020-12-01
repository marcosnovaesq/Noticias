import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'
import styled from 'styled-components'

const BlockNormalNews = ({ common, changePage }) => {



    const [commons, setCommons] = useState([])

    const setaCommons = () => {
        setCommons(common)
    }

    const geraPanelSmall = () => {

        return (
            <>
                {commons.map((c, i) => {
                    return <Noticia key={i} onClick={() => changePage(c._id)} >
                        <div>
                            <Image src={c.photo} style={{ "height": "65px", "width": "75px" }} />
                        </div>
                        <Title>{c.title}</Title>

                    </Noticia>
                })}
            </>
        )



    }


    useEffect(() => {


        setaCommons()
        return () => { }
    }, [common])


    return (
        <ListaNoticias>
            {geraPanelSmall()}

        </ListaNoticias>
    );
}


const ListaNoticias = styled.div`
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    flex:1;
    width: 800px;
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 5px;
`

const Noticia = styled.div.attrs({
    className: 'my-1 '
})`

    border: 1px solid #2ecc71;
    border-radius: 4px;
    height: 80px;
    display: flex;
    flex-direction: row;
    padding: 5px;

    &:hover {
        transform: scale(1.02);
        cursor: pointer;
    }

`

const Title = styled.div`
    display: flex;
    margin-left: 10px;
    align-items: center;
    height: 65px;
    color: #2ecc71;
    font-size: 20px;
    font-weight: bold;

`



export default BlockNormalNews