import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import Error from './Error'
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

const Formulario = ({setMonedas}) => {

  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  //utilizacion del hook personalizado, devuelve un state (valor seleccionado) y un selector con las opciones enviadas
  const [moneda, SelectMonedas] = useSelectMoneda('Elige tu Moneda', monedas)  
  const [criptomoneda, SelectCriptomoneda] = useSelectMoneda('Elige tu Criptomoneda', criptos)   
  
 //cuando el componente este listo utilizaremos la API 
  useEffect(() => {
      const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            //console.log(resultado.Data)

            //creamos un array solo con la info que necesitamos
            //utilizamos map en vez de each para crear el arreglo
            const arrayCriptos = resultado.Data.map( cripto => {
                 const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName 
                 } 
                 return objeto
                 //console.log(objeto)
            })
           
            //guardamos el array en un state
            setCriptos(arrayCriptos)
            //console.log(arrayCriptos)

      }

      consultarAPI();
  }, [])


  const handleSubmit = e  => {
      e.preventDefault()

      if([moneda, criptomoneda].includes('')){
          //console.log('ERROR') 
          setError(true)
          return 
      }

      setError(false) //en caso de que pase la validacion se quita el mensaje
      setMonedas({
          moneda,
          criptomoneda 
      })
  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form
          onSubmit={handleSubmit}
      >
        <SelectMonedas/>
        <SelectCriptomoneda/>
        <InputSubmit 
            type='submit' 
            value="Cotizar"
        />
      </form> 
    </>
  )
} 

export default Formulario
