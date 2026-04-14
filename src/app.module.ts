import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { FolderModule } from './modules/folder/folder.module';
import { FolderStationModule } from './modules/folder_station/folder_station.module';
import { StationModule } from './modules/station/station.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ ADD THIS
    PrismaModule,
    FolderModule,
    FolderStationModule,
    StationModule,
  ],
})
export class AppModule {}