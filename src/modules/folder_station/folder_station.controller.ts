import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FolderStationService } from './folder_station.service';
import { SupabaseAuthGuard } from '../../common/guards/auth.guard';

@Controller('folder-stations')
export class FolderStationController {
  constructor(private service: FolderStationService) {}

  @UseGuards(SupabaseAuthGuard)
  @Post(':folderId')
  add(
    @Req() req: any,
    @Param('folderId') folderId: string,
    @Body() body: any
  ) {
    return this.service.addToFolder(req.user.id, folderId, body);
  }

  @UseGuards(SupabaseAuthGuard)
  @Get(':folderId')
  getFolderStations(
    @Param('folderId') folderId: string,
    @Req() req: any
  ) {
    return this.service.getFolderStations(req.user.id, folderId);
  }

  @UseGuards(SupabaseAuthGuard)
  @Delete(':folderId/:stationId')
  remove(
    @Req() req: any,
    @Param('folderId') folderId: string,
    @Param('stationId') stationId: string
  ) {
    return this.service.removeFromFolder(req.user.id, folderId, stationId);
  }
}
