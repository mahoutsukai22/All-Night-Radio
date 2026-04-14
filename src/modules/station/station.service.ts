import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StationService {
  constructor(private prisma: PrismaService) {}

  async findOrCreate(data: {
    name: string;
    streamUrl: string;
    country?: string;
    favicon?: string;
  }) {
    const existing = await this.prisma.station.findUnique({
      where: {
        name_streamUrl: {
          name: data.name,
          streamUrl: data.streamUrl,
        },
      },
    });

    if (existing) return existing;

    return this.prisma.station.create({
      data,
    });
  }
}