import '../types/types'
import { Jogador, Propriedade } from '../types/types';
import { propriedades, jogadores } from './data'

export enum acao {
  Alugar,
  Comprar,
  NaoComprar
};

function alternaJogadores(jogadores:Array<Jogador>){
  return jogadores.sort(()=> Math.random() - 0.5);
};

async function getJogadoresInicio(){
  const jogadoresAlternada:Array<Jogador> = alternaJogadores(jogadores);
  return jogadoresAlternada;
};

async function getPropriedades() {
  return propriedades;
};

async function jogarDado(){
  return Math.floor(Math.random() * 6) + 1;
};

async function novaPosicao(jogador:Jogador){
  return await jogarDado().then(num =>{
    const novoIndex = num + jogador.posicao;
    return novoIndex > 19 ? novoIndex - 20 : novoIndex;
  })
};

async function acaoPosicao(propriedade:Propriedade, jogador:Jogador){
  if(propriedade.proprietario === -1){
    const saldoPosCompra = jogador.saldo - propriedade.venda;
    switch(jogador.nome) {
      case "impulsivo":
        return saldoPosCompra >= 0 ? acao.Comprar : acao.NaoComprar;
      case "exigente":
        return (saldoPosCompra >= 0 && propriedade.aluguel > 50) ? acao.Comprar : acao.NaoComprar;
      case "cauteloso":
        return (saldoPosCompra - 80) >= 0 ? acao.Comprar : acao.NaoComprar;
      case "aleatorio":
        return await jogarDado() > 3 ? acao.Alugar : acao.NaoComprar;
    };
  }else{
    return acao.Alugar;
  };
};


export { getJogadoresInicio, getPropriedades, novaPosicao, acaoPosicao }