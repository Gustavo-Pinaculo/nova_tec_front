import axios from "axios";

export type EnderecoCepApi={
    "cep": string,
    "logradouro": string,
    "complemento": string,
    "unidade": string,
    "bairro": string,
    "localidade": string,
    "uf": string,
    "estado": string,
    "regiao": string,
    "ibge": string,
    "gia": string,
    "ddd": string,
    "siafi": string
}

export class EnderecosController{
    async enderecoPorCep(cep:string):Promise<[EnderecoCepApi | null,any]>{
        try{
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const dados = response.data
            if(dados.erro) return [null,dados.erro]
            return [dados,null]
        }
        catch(err){
            return [null,err]
        }
    }
}