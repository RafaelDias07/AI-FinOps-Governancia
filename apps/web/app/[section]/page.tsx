import { notFound } from 'next/navigation';
import { AppShell } from '../../components/app-shell';
import { OperationsDashboard } from '../../components/operations-dashboard';
import { SettingsDashboard } from '../../components/settings-dashboard';

const validOperationsSections = [
  'custos',
  'consumo',
  'governanca',
  'licencas',
  'recomendacoes',
  'provedores',
  'equipes',
];

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (section !== 'configuracoes' && !validOperationsSections.includes(section)) notFound();
  return (
    <AppShell>
      {section === 'configuracoes' ? (
        <SettingsDashboard />
      ) : (
        <OperationsDashboard section={section} />
      )}
    </AppShell>
  );
}
