import styled from "@emotion/styled"
import React, { SetStateAction, useEffect, useState } from "react"
import useSelectCoin from "../hooks/useSelectCoin"
import { FIAT } from "../utils/FIAT.js"
const CRYPTO_APIKEY = import.meta.env.CRYPTO_APIKEY;

const MyForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: .75rem;
`

const InputSubmit = styled.input`
    margin-top: 1.5rem;
    padding: .75rem;
    border-radius: .5rem;
    border: none;
    color: #FFF;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    background-color: #56bafb;
    text-transform: uppercase;
    transition: background-color .3s ease;
    
    &:hover{
        cursor: pointer;
        background-color: #224588;
    }
`
type propsTypes = {
  handleSubmit: (arg0: any) => void;
}

function Form(props: propsTypes){
  const [cryptoObject, setCryptoObject] = useState({})
  const [localCurrency, SelectLocalCurrency] = useSelectCoin({label: "Choose your local currency", options: FIAT, name:"local-currency"})
  const [cryptoCurrency, SelectCryptoCurrency] = useSelectCoin({label: "Choose the cryptocurrency", options: cryptoObject, name:"crypto-currency"})

  useEffect(() => {
    async function getCoins(){
      type remapedCoins = {
        CoinInfo: any;
        Name: string,
        FullName: string
      }
      const res = await fetch(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${CRYPTO_APIKEY}`)
      const data = await res.json()

      if(data["Message"] === "Success"){
        const remap = await data["Data"].map((coin:remapedCoins) => (
          {id: coin.CoinInfo.Name, value: coin.CoinInfo.FullName}
        ))
        const cryptoObject = remap.reduce((obj : any, item: any) => (obj[item.id] = item.value, obj) ,{});
        setCryptoObject(cryptoObject)
      }
    }
    getCoins()
  },[])
  
  return(
        <MyForm onSubmit={e => props.handleSubmit(e)}>
          <SelectLocalCurrency/>
          <SelectCryptoCurrency/>
          <InputSubmit type="submit" value="Get Price"/>
        </MyForm>
    )
}

export default Form;