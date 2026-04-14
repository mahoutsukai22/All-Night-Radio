import { Controller, Get } from '@nestjs/common';

@Controller('stations')
export class StationController {
  @Get('public')
  getStations() {
    return {
      message: 'Fetch from radio API in frontend instead',
    };
  }
}