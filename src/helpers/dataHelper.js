

const formataStringTamanho = (value) => {
    if (value.length > 15) {
        const parteValue = value.substr(0, 15)
        return `${parteValue}...`
    }
    return value

}



const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const formataData = (data) => {
    let dia = data.substring(0, 10).split('-').reverse().join('/')
    let hora = data.substring(11, 16)
    let resposta = dia + " às " + hora
    return resposta
}

const formataDataSemHora = (data) => {
    let dia = data.substring(0, 10).split('-').reverse().join('/')
    return dia
}


export {
    formataStringTamanho,
    formataData,
    capitalize,
    formataDataSemHora
}