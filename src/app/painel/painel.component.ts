import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:';
  public resposta: string = '';
  public rodada: number = 0;
  public rodadaFrase: Frase;
  public progresso: number = 0;
  public tentativas: number = 3;
  @Output()  encerrarJogo = new EventEmitter;

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  console.log('Painel componente foi destruido');
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtBr === this.resposta) {
      alert('A tradução está correta');

      //trocar pergunta da rodada
      this.rodada++;

      //Progresso
      this.progresso = this.progresso + (100 / this.frases.length);
      if (this.rodada === 4) {
        this.encerrarJogo.emit('Vitoria');
      }

      //Atualiza o objeto da Rodada Frase
      this.atualizaRodada();

    } else {
      this.tentativas-- ;

      if (this.tentativas  === -1) {
        this.encerrarJogo.emit('Derrota');
      }
    }
  }

public atualizaRodada(): void {

    //Define a frase da rodadacom base  em alguma logica
  this.rodadaFrase = this.frases[this.rodada];
  //LImpa a resposta
  this.resposta = '';

}

}
