import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';

import { FolderService } from './folder.service';
import { SupabaseAuthGuard } from '../../common/guards/auth.guard';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @UseGuards(SupabaseAuthGuard)
  @Get()
  getFolders(@Req() req) {
    return this.folderService.findAll(req.user.id);
  }

  @UseGuards(SupabaseAuthGuard)
  @Post()
  create(@Req() req, @Body() body: { name: string }) {
    return this.folderService.create(req.user.id, body.name);
  }

  @UseGuards(SupabaseAuthGuard)
  @Patch(':id')
  rename(@Param('id') id: string, @Body() body: { name: string }) {
    return this.folderService.rename(id, body.name);
  }

  @UseGuards(SupabaseAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.folderService.delete(id);
  }
}