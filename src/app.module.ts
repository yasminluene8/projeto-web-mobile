import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransacoesModule } from './transacoes/transacoes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://yasmintuene6_db_user:QYtLBGoeREKblRx0@cluster0.mydlas4.mongodb.net/proj_aula7?retryWrites=true&w=majority'),
    TransacoesModule,
  ],
})
export class AppModule {}
