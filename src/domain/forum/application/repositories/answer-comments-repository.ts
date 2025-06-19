import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
	findById(id: string): Promise<AnswerComment | null>
	create(answer: AnswerComment): Promise<void>
	delete(answerComment: AnswerComment): Promise<void>
}
