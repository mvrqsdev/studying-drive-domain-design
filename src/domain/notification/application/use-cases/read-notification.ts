import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notification-repository'

interface ReadNotificationUseCaseRequest {
	recipientID: string
	notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		notification: Notification
	}
>

export class ReadNotificationUseCase {
	constructor(private notificationsRepository: NotificationsRepository) {}

	async execute({
		recipientID,
		notificationId,
	}: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
		const notification = await this.notificationsRepository.findById(notificationId)

		if (!notification) {
			return left(new ResourceNotFoundError())
		}

		if (recipientID !== notification.recipientId.toString()) {
			return left(new NotAllowedError())
		}

		notification.read()

		await this.notificationsRepository.save(notification)

		return right({
			notification,
		})
	}
}
