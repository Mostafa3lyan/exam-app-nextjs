import { examService } from "@/services/exam.service";
import ExamSession from "./_components/exam-session";
import { questionService } from "@/services/questions.service";

export default async function ExamStartPage({
  params,
}: {
  params: { id: string };
}) {
  const [questionsData, examData] = await Promise.all([
    questionService.getByExam(params.id),
    examService.getById(params.id),
  ]);

  return (
    <ExamSession
      questions={questionsData.payload.questions}
      exam={examData.payload.exam}
    />
  );
}