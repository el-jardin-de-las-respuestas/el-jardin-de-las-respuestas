import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config'; // 👈 Importamos ConfigService

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  async onModuleInit() {
    let retries = 5;
    while (retries) {
      try {
        await this.$connect();
        break;
      } catch (e) {
        retries--;
        if (!retries) throw e;
        console.log(`Reintentando conexión... (${retries} intentos restantes)`);
        await new Promise((res) => setTimeout(res, 3000));
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
