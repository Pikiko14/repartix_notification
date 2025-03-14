export interface NotificationFactoryInterface {
  sendNotification(payload: any): Promise<void>;
}
