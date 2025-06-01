import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as http from 'http';
import * as fs from 'fs';
import * as soap from 'soap';
import * as express from 'express';
import { createServices } from './modules/soap/soap.use.cases';
import { ExpressAdapter } from '@nestjs/platform-express';



async function bootstrap() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const server = http.createServer(expressApp);

  const app = await NestFactory.create(AppModule, adapter);
  app.useGlobalPipes(new ValidationPipe());

  const wsdlXml = fs.readFileSync('./src/modules/soap/wsdl/index.wsdl', 'utf8');

  const service = createServices(app);

  soap.listen(server, '/soap', service, wsdlXml);

  await app.init();

  server.listen(process.env.PORT || 3000, () => {
    console.log('Servers listening on port 3000');
    console.log('SOAP disponible en http://localhost:3000/soap?wsdl');
  });
}
bootstrap();
