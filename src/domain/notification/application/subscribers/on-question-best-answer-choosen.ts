/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: não precisa do getAggregateId ainda */
import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionBestAnswerChoosenEvent } from '@/domain/forum/enterprise/events/question-best-answer-choosen-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnQuestionBestAnswerChoosen implements EventHandler {
	constructor(
		private answersRepository: AnswersRepository,
		private sendNotification: SendNotificationUseCase,
	) {
		this.setupSubscriptions()
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendQuestionBestAnswerNotification.bind(this),
			QuestionBestAnswerChoosenEvent.name,
		)
	}

	private async sendQuestionBestAnswerNotification({
		question,
		bestAnswerId,
		getAggregateId,
	}: QuestionBestAnswerChoosenEvent) {
		const answer = await this.answersRepository.findById(bestAnswerId.toString())

		if (answer) {
			await this.sendNotification.execute({
				recipientId: answer.authorId.toString(),
				title: 'Sua resposta foi escolhida!',
				content: `A resposta que você enviou em "${question.title.substring(0, 20).concat('...')}" foi escolhida pelo autor!`,
			})
		}
		// const question = await this.questionsRepository.findById(answer.questionId.toString())
		// if (question) {
		// 	await this.sendNotification.execute({
		// 		recipientId: question.authorId.toString(),
		// 		title: `Nova resposta em "${question.title.substring(0, 40).concat('...')}"`,
		// 		content: answer.excerpt,
		// 	})
		// }
	}
}
