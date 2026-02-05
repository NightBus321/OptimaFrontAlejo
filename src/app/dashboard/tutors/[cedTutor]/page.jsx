import TutorDetail from "../components/TutorDetail";

export default function TutorPage({ params }) {
  const ced = params.cedTutor;
  return <TutorDetail ced={ced} />
}
