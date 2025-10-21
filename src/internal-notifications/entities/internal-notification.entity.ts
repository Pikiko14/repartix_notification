import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum NotificationType {
  ORDER_STATUS_UPDATED = 'order_status_updated',
  ORDER_NEWS_CREATED = 'order_news_created',
  ORDER_PAYMENT_CREATED = 'order_payment_created',
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Schema({ timestamps: true })
export class InternalNotification extends Document {
  @Prop({ required: true })
  parent_id: string; // ID del admin/empresa

  @Prop({ required: true, enum: NotificationType })
  type: NotificationType;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: Object })
  metadata: Record<string, any>; // Información adicional (order_id, reference, etc.)

  @Prop({ default: false })
  read: boolean;

  @Prop({ type: Date })
  read_at: Date;

  @Prop({ 
    type: String, 
    enum: NotificationPriority, 
    default: NotificationPriority.MEDIUM 
  })
  priority: NotificationPriority;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const InternalNotificationSchema = SchemaFactory.createForClass(InternalNotification);

