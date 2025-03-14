import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './configuration';

async function bootstrap() {
  // create app
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port,
      }
    },
  );

  // listen port app
  await app.listen();
}
bootstrap();
