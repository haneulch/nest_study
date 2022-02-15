import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';

@Module({
  controllers: [ContentController],
  providers: [ContentService],
  imports: [TypeOrmModule.forFeature([Content])],
})
export class ContentModule {}
