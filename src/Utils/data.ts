import { Jogador, Propriedade } from "../types/types";

const propriedades:Array<Propriedade> = [
  {nome:"Propriedade 1", venda: 110, aluguel: 55, proprietario:-1 }, 
  {nome:"Propriedade 2", venda: 100, aluguel: 47, proprietario:-1 }, 
  {nome:"Propriedade 3", venda: 120, aluguel: 51, proprietario:-1 }, 
  {nome:"Propriedade 4", venda: 100, aluguel: 50, proprietario:-1 }, 
  {nome:"Propriedade 5", venda: 140, aluguel: 59, proprietario:-1 }, 
  {nome:"Propriedade 6", venda: 90, aluguel: 41, proprietario:-1 }, 
  {nome:"Propriedade 7", venda: 130, aluguel: 52, proprietario:-1 }, 
  {nome:"Propriedade 8", venda: 100, aluguel: 48, proprietario:-1 }, 
  {nome:"Propriedade 9", venda: 110, aluguel: 53, proprietario:-1 }, 
  {nome:"Propriedade 10", venda: 100, aluguel: 48, proprietario:-1 },  
  {nome:"Propriedade 11", venda: 130, aluguel: 54, proprietario:-1 }, 
  {nome:"Propriedade 12", venda: 100, aluguel: 47, proprietario:-1 }, 
  {nome:"Propriedade 13", venda: 120, aluguel: 56, proprietario:-1 }, 
  {nome:"Propriedade 14", venda: 140, aluguel: 50, proprietario:-1 }, 
  {nome:"Propriedade 15", venda: 100, aluguel: 43, proprietario:-1 }, 
  {nome:"Propriedade 16", venda: 110, aluguel: 57, proprietario:-1 }, 
  {nome:"Propriedade 17", venda: 120, aluguel: 48, proprietario:-1 }, 
  {nome:"Propriedade 18", venda: 100, aluguel: 50, proprietario:-1 }, 
  {nome:"Propriedade 19", venda: 110, aluguel: 51, proprietario:-1 }, 
  {nome:"Propriedade 20", venda: 120, aluguel: 49, proprietario:-1 }
];

const jogadores:Array<Jogador> = [
  {nome:"cauteloso", saldo: 300, posicao: 0}, 
  {nome:"aleatorio", saldo: 300, posicao: 0}, 
  {nome:"exigente", saldo: 300, posicao: 0}, 
  {nome:"impulsivo", saldo: 300, posicao: 0}
];

export { propriedades, jogadores }