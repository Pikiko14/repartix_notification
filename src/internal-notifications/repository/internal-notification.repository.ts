import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InternalNotification } from '../entities/internal-notification.entity';
import { CreateInternalNotificationDto } from '../dto/create-internal-notification.dto';

@Injectable()
export class InternalNotificationRepository {
  private readonly logger = new Logger(InternalNotificationRepository.name);

  constructor(
    @InjectModel(InternalNotification.name)
    private readonly notificationModel: Model<InternalNotification>,
  ) {}

  async create(createDto: CreateInternalNotificationDto): Promise<InternalNotification> {
    const notification = new this.notificationModel(createDto);
    return await notification.save();
  }

  async findByParentId(
    parent_id: string,
    unreadOnly: boolean = false,
    page: number = 1,
    limit: number = 20,
  ): Promise<{ notifications: InternalNotification[]; total: number }> {
    const query: any = { parent_id };
    
    if (unreadOnly) {
      query.read = false;
    }

    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      this.notificationModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.notificationModel.countDocuments(query).exec(),
    ]);

    return { notifications: notifications as any, total };
  }

  async markAsRead(notification_id: string, parent_id: string): Promise<InternalNotification> {
    return await this.notificationModel
      .findOneAndUpdate(
        { _id: notification_id, parent_id },
        { read: true, read_at: new Date() },
        { new: true },
      )
      .exec();
  }

  async markAllAsRead(parent_id: string): Promise<number> {
    const result = await this.notificationModel
      .updateMany(
        { parent_id, read: false },
        { read: true, read_at: new Date() },
      )
      .exec();
    return result.modifiedCount;
  }

  async countUnread(parent_id: string): Promise<number> {
    return await this.notificationModel
      .countDocuments({ parent_id, read: false })
      .exec();
  }

  async deleteById(notification_id: string, parent_id: string): Promise<boolean> {
    const result = await this.notificationModel
      .deleteOne({ _id: notification_id, parent_id })
      .exec();
    return result.deletedCount > 0;
  }
}

