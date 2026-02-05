import StudentDetail from "../components/StudentDetail";

export default function StudentPage({ params }) {
  const ced = params.cedStudent;
  return <StudentDetail ced={ced} />;
}
