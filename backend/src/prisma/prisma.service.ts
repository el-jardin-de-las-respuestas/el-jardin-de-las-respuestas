import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config'; // 👈 Importamos ConfigService

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
