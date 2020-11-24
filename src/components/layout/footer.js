import React from 'react'
import logo from '../../assets/default-monochrome.svg';
import styled from 'styled-components'


export default (props) => {
    return (
        <Footer>
            <img src={logo} alt="logo" style={{ height: "90px", width: "140px", backgroundColor: "transparent" }} />
        </Footer >
    )
}

const Footer = styled.div`
    background-color:  #2ecc71;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
`
