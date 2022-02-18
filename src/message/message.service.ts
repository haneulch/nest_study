import { Injectable } from '@nestjs/common';
import { CreateMessageReqDto } from './dto/create-message.req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { ResponseUtils } from '../util/response.utils';

@Injectable()
export class MessageService {
  constructor(@InjectRepository(Message) private readonly messageRepository: Repository<Message>) {}

  async create(param: CreateMessageReqDto) {
    await this.messageRepository.insert(param);
    return ResponseUtils.success();
  }

  async findAll(contentId: number) {
    const messages = await this.messageRepository.find({
      select: ['id', 'userId', 'message'],
      where: { contentId: contentId, deleteYn: 'N' },
      order: { createdDt: 'DESC' },
    });
    return ResponseUtils.success(messages);
  }

  async remove(id: number) {
    await this.messageRepository.update(id, { deleteYn: 'Y' });
    return ResponseUtils.success();
  }

  async report(id: number) {
    await this.messageRepository.increment({ id: id }, 'reportCount', 1);
    const message = await this.messageRepository.findOne({ id: id });
    if (message.reportCount >= 3) {
      await this.messageRepository.update(id, { deleteYn: 'Y' });
    }
    return ResponseUtils.success();
  }
}
