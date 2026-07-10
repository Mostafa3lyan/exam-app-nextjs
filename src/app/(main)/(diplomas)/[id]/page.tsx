import DiplomaExamList from "./_components/diploma-exam-list";

export default function DiplomaPage({ params }: { params: { id: string } }) {

  return (
    <DiplomaExamList
      id={params.id}
    />
  );
}