import { Injectable } from '@nestjs/common';
import { Content } from './entities/content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ResponseUtils } from '../util/response.utils';
import { SearchContentReqDto } from './dto/search-content.req.dto';
import { UpdateContentReqDto } from './dto/update-content.req.dto';
import { CreateContentReqDto } from './dto/create-content.req.dto';

@Injectable()
export class ContentService {
  constructor(@InjectRepository(Content) private readonly contentRepository: Repository<Content>) {}

  async create(param: CreateContentReqDto) {
    await this.contentRepository.insert(param);
    return ResponseUtils.success();
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
    return ResponseUtils.success(contents);
  }

  async findOne(id: number) {
    const content = await this.contentRepository.findOne(id, { select: ['message', 'showYn'] });
    return ResponseUtils.success(content);
  }

  async update(id: number, param: UpdateContentReqDto) {
    await this.contentRepository.update(id, param);
    return ResponseUtils.success();
  }

  async remove(id: number) {
    await this.contentRepository.update(id, { deleteYn: 'Y' });
    return ResponseUtils.success();
  }

  async report(id: number) {
    await this.contentRepository.increment({ id: id }, 'reportCount', 1);
    const content = await this.contentRepository.findOne(id);
    if (content.reportCount >= 3) {
      await this.contentRepository.update(id, { deleteYn: 'Y' });
    }
    return ResponseUtils.success();
  }

  async disconnect(id: number) {
    await this.contentRepository.update(id, { userId: '-' });
    return ResponseUtils.success();
  }

  async findAll(param: SearchContentReqDto) {
    const contents = await this.contentRepository.find({
      select: ['id', 'message'],
      where: {
        message: Like(`%${param.message}%`),
        deleteYn: 'N',
        showYn: 'Y',
        ...(param.userId && { userId: param.userId }),
      },
      order: { createdDt: 'DESC' },
    });
    return ResponseUtils.success(contents);
  }
}
