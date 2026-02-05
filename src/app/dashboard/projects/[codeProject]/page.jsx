import ProjectDetail from "../components/ProjectDetail/ProjectDetail";

export default function StudentPage({ params }) {
  const code = params.codeProject;
  return <ProjectDetail code={code} />;
}
