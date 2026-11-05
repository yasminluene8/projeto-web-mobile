import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { Transacao } from './transacao.schema';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @Post()
  async cadastrar(@Body() dadosTransacao: Transacao) {
    return this.transacoesService.criar(dadosTransacao);
  }

  @Get()
  async listarTudo() {
    return this.transacoesService.obterHistoricoEMetricas();
  }
}

