import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHelper } from 'src/helpers/message.helper';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CommentsEntity } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentRepository: Repository<CommentsEntity>,
  ) {}

  async findAllComments() {
    return await this.commentRepository.find();
  }

  async findOneComment(
    conditions: FindConditions<CommentsEntity>,
    options?: FindOneOptions<CommentsEntity>,
  ) {
    try {
      return await this.commentRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async createComment(data: CreateCommentDto) {
    try {
      const comment = this.commentRepository.create(data);
      return await this.commentRepository.save(comment);
    } catch (error) {
      throw new BadRequestException(MessageHelper.BAD_REQUEST);
    }
  }

  async updateComment(id: string, data: UpdateCommentDto) {
    try {
      const comment = await this.commentRepository.findOneOrFail({ id });
      this.commentRepository.merge(comment, data);
      return await this.commentRepository.save(comment);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deleteComment(id: string) {
    try {
      await this.commentRepository.findOneOrFail({ id });
      this.commentRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
