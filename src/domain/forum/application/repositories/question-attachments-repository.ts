import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttachmentsRepository {
	findManyByQuestionId(questionID: string): Promise<QuestionAttachment[]>
}
