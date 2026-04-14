import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StationService } from '../station/station.service';

@Injectable()
export class FolderStationService {
  constructor(
    private prisma: PrismaService,
    private stationService: StationService
  ) {}

  async addToFolder(userId: string, folderId: string, stationData: any) {
    const folder = await this.prisma.folder.findFirst({
      where: { id: folderId, userId },
    });

    if (!folder) {
      throw new BadRequestException('Folder not found');
    }

    const station = await this.stationService.findOrCreate(stationData);

    // ✅ prevent duplicate
    const existing = await this.prisma.folderStation.findUnique({
      where: {
        folderId_stationId: {
          folderId,
          stationId: station.id,
        },
      },
    });

    if (existing) {
      throw new BadRequestException('Already saved');
    }

    return this.prisma.folderStation.create({
      data: {
        folderId,
        stationId: station.id,
      },
    });
  }

  async getFolderStations(userId: string, folderId: string) {
    const folder = await this.prisma.folder.findFirst({
      where: {
        id: folderId,
        userId,
      },
    });

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    return this.prisma.folderStation.findMany({
      where: { folderId },
      include: {
        station: true,
      },
    });
  }

  async removeFromFolder(userId: string, folderId: string, stationId: string) {
    const folder = await this.prisma.folder.findFirst({
      where: {
        id: folderId,
        userId,
      },
    });

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    return this.prisma.folderStation.delete({
      where: {
        folderId_stationId: {
          folderId,
          stationId,
        },
      },
    });
  }
}
