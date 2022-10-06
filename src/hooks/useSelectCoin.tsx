import {useEffect, useState} from 'react'
import styled from "@emotion/styled"

type coinHook = {
    label: string,
    options: object;
    name: string;
}

const Selector = styled.select`
  padding: 0.5rem;
  font-family: 'Lato', sans-serif;
  font-weight: 700; 
  border-radius: .5rem;
`

const Option = styled.option`
  font-family: 'Lato', sans-serif;
`

const Label = styled.label`
  font-family: 'Lato', sans-serif;
  color: white;
  font-size: 1.5rem;
`

function useSelectCoin({label, options, name}:coinHook):any {
    const [state, setState] = useState(Object.entries(options)?.at(0)?.at(0))
    function selectCoin(){
        const renderOptions = Object.entries(options)?.map(([id, value])=>{
            return(
                <Option key={id} value={id}>{value}</Option>
            )
        })

        return(
            <>
                <Label htmlFor={name}>{label}</Label>
                <Selector onChange={e => setState(e.target.value)} value={state} name={name} id={name}>
                    {renderOptions}  
                </Selector>
            </>
        )
    }
    return [state, selectCoin]
}

export default useSelectCoin