import { Module } from '@nestjs/common';
import { FolderStationService } from './folder_station.service';
import { FolderStationController } from './folder_station.controller';
import { StationModule } from '../station/station.module'; // ✅ IMPORT

@Module({
  controllers: [FolderStationController],
  providers: [FolderStationService],
  imports: [StationModule], // ✅ VERY IMPORTANT
})
export class FolderStationModule {}
