
import { getPaths, getTechnologies } from '@/app/actions';
import InterviewWizard from '@/components/Home/InterviewWizard';

export default async function InterviewSetup() {
  const paths = await getPaths();
  const technologies = await getTechnologies();

  return (
    <InterviewWizard 
      paths={paths}
      technologies={technologies}
    />
  );
}
