import { getPaths, getTechnologies, getDifficulties } from '@/app/actions';
import SettingsDashboard from '@/components/Admin/SettingsDashboard';

export default async function SettingsPage() {
  const paths = await getPaths();
  const technologies = await getTechnologies();
  const difficulties = await getDifficulties();

  return (
    <SettingsDashboard 
      initialPaths={paths}
      initialTechnologies={technologies}
      initialDifficulties={difficulties}
    />
  );
}
