import { submissionService } from "@/services/submissions.service";
import SubmissionResult from "./_components/submission-result";
import { examService } from "@/services/exam.service";


export default async function SubmissionPage({
  params,
}: {
  params: { id: string };
}) {

  const data = await submissionService.getById(params.id);
  const examData = await examService.getById(data.payload.submission.examId);

  return (
    <SubmissionResult result={data.payload} examData={examData.payload} />
  );
}