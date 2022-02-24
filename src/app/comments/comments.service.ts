import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
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
    return await this.commentRepository.find({
      select: ['id', 'content', 'createdAt'],
    });
  }

  async findOneComment(conditions: FindConditions<CommentsEntity>) {
    try {
      return await this.commentRepository.findOneOrFail(conditions, {
        select: ['id', 'content', 'createdAt'],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createComment(data: CreateCommentDto) {
    const comment = this.commentRepository.create(data);
    return await this.commentRepository.save(comment);
  }

  async updateComment(id: string, data: UpdateCommentDto) {
    const comment = await this.commentRepository.findOneOrFail({ id });
    this.commentRepository.merge(comment, data);
    return await this.commentRepository.save(comment);
  }

  async deleteComment(id: string) {
    await this.commentRepository.findOneOrFail({ id });
    this.commentRepository.softDelete({ id });
  }
}
