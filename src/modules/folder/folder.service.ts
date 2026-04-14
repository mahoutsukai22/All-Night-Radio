import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, name: string) {
    return this.prisma.folder.create({
      data: {
        name,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.folder.findMany({
      where: { userId },
      include: {
        stations: true,
      },
    });
  }

  async rename(folderId: string, name: string) {
    return this.prisma.folder.update({
      where: { id: folderId },
      data: { name },
    });
  }

  async delete(folderId: string) {
    return this.prisma.folder.delete({
      where: { id: folderId },
    });
  }
}