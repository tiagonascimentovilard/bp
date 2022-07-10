import { Jogador, Propriedade } from "../types/types";
import { acao, acaoPosicao, getJogadoresInicio, getPropriedades, novaPosicao } from "../Utils";
import { jogadores, propriedades } from "../Utils/data";

 export default class Partida {
  
  private propriedades!:Array<Propriedade>;
  private jogadores!:Array<Jogador>;

  constructor() {
    getPropriedades().then(propriedade => this.propriedades = [...propriedade]);
    getJogadoresInicio().then(jogadore => this.jogadores = [...jogadore]);
  };

  // Executa a simulacao da partida, de no maximo 1000 rodadas
  public async rodarSimulacao() {
    let rodadas = 0;
    let jogando = jogadores.length;

    while (rodadas < 1001 && jogando > 1) {
      await Partida.rodadaJogadores();
      jogando = (jogadores.filter(jogador => jogador.saldo >= 0)).length;
      rodadas++;
    };
  
    const ranking = jogadores.sort(function (a, b) { return a.saldo < b.saldo ? 1 : -1; });
    getPropriedades().then(propriedade => this.propriedades = [...propriedade]);
    getJogadoresInicio().then(jogadore => this.jogadores = [...jogadore]);
    return ranking;
  };
  
  // Executa uma rodada para cada jogador, ou até sobrar somente 1
  private static async rodadaJogadores() {
    let vezJogador = 0;
    while (vezJogador < 4) {
      await this.rodada(vezJogador).then((total)=> {
        vezJogador++;
        if(total === 1) vezJogador = 5;
      });
    };
  };

  // Executa uma rodada para Jogador ativo (com saldo zero ou positivo)
  // Decide se compra ou não propriedade vaga, ou deve pagar aluguel
  private static async rodada(index:number) {
    if(jogadores[index].saldo >= 0){
      const posicao = await novaPosicao(jogadores[index]);
      jogadores[index].posicao = await posicao;
      await acaoPosicao(propriedades[posicao], jogadores[index]).then(acaoPropriedade => {
        if(acaoPropriedade === acao.Alugar) this.pagarAluguel(index, posicao);
        if(acaoPropriedade === acao.Comprar)  this.compraPropriedade(index, posicao);
      });
    };
    return (jogadores.filter(jogador => jogador.saldo >= 0)).length;
  };

  // Acao de pagar aluguel a proprietario 
  private static async pagarAluguel(idJog:number, idPropr:number) {
    if(propriedades[idPropr].proprietario !== -1){
      if(jogadores[idJog].nome !== jogadores[propriedades[idPropr].proprietario].nome){
        const saldoInquilino = await jogadores[idJog].saldo - propriedades[idPropr].aluguel
        const saldoLocatario = await jogadores[propriedades[idPropr].proprietario].saldo + propriedades[idPropr].aluguel;
        jogadores[idJog].saldo = await saldoInquilino;
        jogadores[propriedades[idPropr].proprietario].saldo = await saldoLocatario;
        if(saldoInquilino < 0) await this.liberarPropriedades(idJog);
      };
    };
  };
  
  // Acao de comprar propriedade 
  private static async compraPropriedade(idJog:number, idPropr:number) {
    if(propriedades[idPropr].proprietario = -1){
      const saldoComprador = await jogadores[idJog].saldo - propriedades[idPropr].venda;
      jogadores[idJog].saldo = await saldoComprador;
      propriedades[idPropr].proprietario = await idJog;
    }
  };
    
  // Libera propriedades compradas por jogador que acaba de perder (Saldo negativo)
  private static async liberarPropriedades(idJog:number) {
    await propriedades.forEach((item:Propriedade, index:number) => {
      if(item.proprietario === idJog) propriedades[index].proprietario = -1; 
    });
  };

}