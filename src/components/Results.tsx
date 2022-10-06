import styled from '@emotion/styled'

type resultTypes = {
    valuation: {PRICE:string,
    CHANGEPCTDAY: string,
    HIGHDAY: string,
    LOWDAY: string,
    LASTUPDATE: string
    };
}

const Text = styled.p`
    color: white;
    font-family: 'Lato', sans-serif;
    letter-spacing: 0.02rem;
`
const Span = styled.span`
    font-weight: 700;
`

function Results(props:resultTypes) {   
    const {PRICE, HIGHDAY, LOWDAY, LASTUPDATE, CHANGEPCTDAY} = props.valuation
    const variationColor = CHANGEPCTDAY.includes("-") ? "red" : "green"

    return (
        <Text>The current price is: <Span>{PRICE}</Span>.<br/>
        The low of the day was <Span>{LOWDAY}</Span> and the high of <Span>{HIGHDAY}</Span> with a change in the last 24 hours of <Span style={{color: variationColor}}>{CHANGEPCTDAY}</Span>%.<br/>
        Updated: <Span>{LASTUPDATE}</Span></Text>
    )
}

export default Results