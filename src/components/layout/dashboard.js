import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import styled from 'styled-components'


const DashBoard = (props) => {

    return (<ContainerPage><Row><ContainerButtons><h1>DashBoard </h1></ContainerButtons></Row></ContainerPage>)
}


const ContainerPage = styled.div`
    width: 100%;
    height: 500px;
    background-color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ContainerButtons = styled.div`
    width: 500px;
    height:400px;
    background-color: yellow;
`



export default DashBoard;

// .attrs({
//     className: 'col-md'
// })