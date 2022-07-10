import { Request, Response } from 'express';
import { Jogador } from '../types/types';
import Partida from './partida'

async function simular(req:Request, res:Response){
  try{

    const partida = new Partida();
    const ranking:Array<Jogador> = await partida.rodarSimulacao();

    res.status(200).json({
      "vencedor": ranking[0].nome , 
      "jogadores": ranking.map(jogador => jogador.nome)
    });

  } catch (err) {
    res.status(500).json({ message: 'Erro '+err});
  };
};

export { simular };