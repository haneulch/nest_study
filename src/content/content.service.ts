import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ResponseUtils } from '../util/response.utils';
import { SearchContentDto } from './dto/search-content.dto';

@Injectable()
export class ContentService {
  constructor(@InjectRepository(Content) private readonly contentRepository: Repository<Content>) {}

  async create(createContentDto: CreateContentDto) {
    await this.contentRepository.insert(createContentDto);
    return ResponseUtils.success('success');
  }

  async findAllByUsername(username: string) {
    const contents = await this.contentRepository.find({
      select: ['id', 'message', 'showYn'],
      where: {
        username: username,
        deleteYn: 'N',
      },
      order: { createdDt: 'DESC' },
    });
    return ResponseUtils.success('', contents);
  }

  async findOne(id: number) {
    const content = await this.contentRepository.findOne(id, { select: ['message', 'showYn'] });
    return ResponseUtils.success('', content);
  }

  async update(id: number, updateContentDto: UpdateContentDto) {
    await this.contentRepository.update(id, updateContentDto);
    return ResponseUtils.success('success');
  }

  async remove(id: number) {
    await this.contentRepository.update(id, { deleteYn: 'Y' });
    return ResponseUtils.success('success');
  }

  async report(id: number) {
    await this.contentRepository.increment({ id: id }, 'reportCount', 1);
    const content = await this.contentRepository.findOne(id);
    if (content.reportCount >= 3) {
      await this.contentRepository.update(id, { deleteYn: 'Y' });
    }
    return ResponseUtils.success('success');
  }

  async disconnect(id: number) {
    await this.contentRepository.update(id, { username: '-' });
    return ResponseUtils.success('success');
  }

  async findAll(searchContentDto: SearchContentDto) {
    const contents = await this.contentRepository.find({
      select: ['id', 'message'],
      where: {
        message: Like(`%${searchContentDto.message}%`),
        deleteYn: 'N',
        showYn: 'Y',
        ...(searchContentDto.username && { username: searchContentDto.username }),
      },
      order: { createdDt: 'DESC' },
    });
    return ResponseUtils.success('', contents);
  }
}
