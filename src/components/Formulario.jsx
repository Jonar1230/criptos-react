import {useEffect} from 'react'
import styled from '@emotion/styled'
import useSelectMoneda from '../hooks/useSelectMoneda'
import {monedas} from '../data/monedas'

 
const InputSubmit = styled.input`
      background-color: #9497FF;
      border:none;
      width: 100%; 
      padding: 10px;
      color: #FFF;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 20px;
      border-radius: 5px;
      transition:background-color .3s ease;
      margin-top: 30px;
      &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
      }
`

const Formulario = () => {

  const [moneda, SelectMonedas] = useSelectMoneda('Elige tu Moneda', monedas)  
  
 //cuando el componente este listo utilizaremos la API 
  useEffect(() => {
      const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            console.log(resultado.Data)
      }

      consultarAPI();
  }, [])

  return (
    <form>
      <SelectMonedas/>
      <InputSubmit 
          type='submit' 
          value="Cotizar"
      />
    </form> 
  )
} 

export default Formulario
