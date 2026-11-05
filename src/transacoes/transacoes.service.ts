import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao, TransacaoDocument } from './transacao.schema';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name) private transacaoModel: Model<TransacaoDocument>,
  ) {}

  async criar(dados: Transacao): Promise<Transacao> {
    const novaTransacao = new this.transacaoModel(dados);
    return novaTransacao.save();
  }

  async obterHistoricoEMetricas() {
    const transacoes = await this.transacaoModel.find().exec();

    let saldoTotal = 0;
    let totalDespesas = 0;
    let totalGastoImpulso = 0;

    const historico = transacoes.map((t) => {
      const valor = t.valor;

      if (t.tipo === 'receita') {
        saldoTotal += valor;
      } else if (t.tipo === 'despesa') {
        saldoTotal -= valor;
        totalDespesas += valor;

        if (t.consumoConsciente === false) {
          totalGastoImpulso += valor;
        }
      }

      return {
        id: t._id,
        descricao: t.descricao,
        valor: t.valor,
        tipo: t.tipo,
        categoria: t.categoria,
        consumoConsciente: t.consumoConsciente,
      };
    });

    return {
      historico,
      metricas: {
        saldoTotal,
        totalDespesas,
        totalGastoImpulso,
      },
    };
  }
}

