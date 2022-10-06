import styled from "@emotion/styled"
import HeroImage from "./assets/crypto-hero.png"
import Form from "./components/Form"
import { useState} from "react"
import Results from "./components/Results"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 2rem 0;
  min-height: 100vh;
  justify-content: space-around;
  background-color: #2D3047;
  @media (max-width: 668px){
    flex-direction: column;
  }
`

const Hero = styled.img`
  width: 30%;
  flex-grow: 0;
  object-fit: contain;
  @media (max-width: 668px) {
    width: 80%;
  }
`

const MainContainer = styled.div`
  width: 30%;
  @media (max-width: 668px){
    width: 80%;
  }
`


const Title = styled.h1`
  color: white;
  font-family: 'Lato', sans-serif;
  font-size: 2.5rem;
  text-decoration: underline;
  text-decoration-color: #56bafb ;
`

function App() {
  const [valuation, setValuation] = useState<object>({})
  
  type valuationType = {PRICE:string,
    HIGHDAY: string,
    LOWDAY: string,
    LASTUPDATE: string, 
    CHANGEPCTDAY: string,
    }
  

  function handleSubmit(event:React.BaseSyntheticEvent):void{
    event.preventDefault();
    const localCurrency = event.target["local-currency"].value;
    const cryptoCurrency = event.target["crypto-currency"].value;
    async function getData(){
      const res = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${localCurrency}`)
      const data = await res.json()
      const displayData = data.DISPLAY[cryptoCurrency][localCurrency];
      setValuation(displayData)
      console.log(displayData)
    }
    getData()
  }

  return (
    <Container>
      <Hero src={HeroImage}/>
      <MainContainer>
        <Title>Get the price of the best cryptos</Title>
        <Form handleSubmit={handleSubmit}/>
        {Object.keys(valuation).length ? <Results valuation={valuation as valuationType}/> : null}
      </MainContainer>
    </Container>
  )
}

export default App
