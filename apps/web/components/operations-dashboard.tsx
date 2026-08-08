'use client';

import { useMemo, useState } from 'react';
import { Check, Download, Filter, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Modal } from './app-shell';
import { ProviderLogo } from './provider-logo';
import type { ProviderName } from '../lib/mock-data';

type Row = Record<string, string>;
type SectionConfig = {
  title: string;
  description: string;
  action: string;
  metrics: Array<{ label: string; value: string; detail: string }>;
  columns: Array<{ key: string; label: string; align?: 'right' }>;
  rows: Row[];
};

const sections: Record<string, SectionConfig> = {
  custos: {
    title: 'Custos',
    description: 'Analise gastos, alocação e tendências entre provedores.',
    action: 'Criar orçamento',
    metrics: [
      { label: 'Gasto no período', value: 'US$ 42.960,90', detail: '+7,2% vs. período anterior' },
      { label: 'Orçamento mensal', value: 'US$ 60.000,00', detail: '71,6% utilizado' },
      { label: 'Previsão do mês', value: 'US$ 57.840,00', detail: 'Dentro do orçamento' },
    ],
    columns: [
      { key: 'projeto', label: 'Projeto' },
      { key: 'provedor', label: 'Provedor' },
      { key: 'centro', label: 'Centro de custo' },
      { key: 'custo', label: 'Custo', align: 'right' },
      { key: 'orcamento', label: 'Orçamento', align: 'right' },
      { key: 'variacao', label: 'Variação', align: 'right' },
    ],
    rows: [
      {
        projeto: 'Core de Produção',
        provedor: 'OpenAI',
        centro: 'CC-1042 · Plataforma',
        custo: 'US$ 9.428,12',
        orcamento: 'US$ 12.000,00',
        variacao: '+12,4%',
      },
      {
        projeto: 'Atendimento ao Cliente',
        provedor: 'Anthropic',
        centro: 'CC-2031 · CX',
        custo: 'US$ 7.216,48',
        orcamento: 'US$ 9.500,00',
        variacao: '+4,7%',
      },
      {
        projeto: 'Inteligência Documental',
        provedor: 'Gemini',
        centro: 'CC-3014 · Dados',
        custo: 'US$ 5.884,30',
        orcamento: 'US$ 8.000,00',
        variacao: '-1,8%',
      },
      {
        projeto: 'Ferramentas Internas',
        provedor: 'OpenAI',
        centro: 'CC-1058 · DevEx',
        custo: 'US$ 4.921,70',
        orcamento: 'US$ 5.500,00',
        variacao: '+18,2%',
      },
      {
        projeto: 'Copiloto de Analytics',
        provedor: 'Anthropic',
        centro: 'CC-3020 · BI',
        custo: 'US$ 3.840,62',
        orcamento: 'US$ 5.000,00',
        variacao: '+2,3%',
      },
    ],
  },
  consumo: {
    title: 'Consumo',
    description: 'Acompanhe tokens, requisições, modelos e eficiência operacional.',
    action: 'Configurar alerta',
    metrics: [
      { label: 'Tokens processados', value: '4,82 bi', detail: '+11,8% no período' },
      { label: 'Requisições', value: '18,4 mi', detail: '99,96% de sucesso' },
      { label: 'Latência mediana', value: '842 ms', detail: '-6,4% de melhoria' },
    ],
    columns: [
      { key: 'modelo', label: 'Modelo' },
      { key: 'provedor', label: 'Provedor' },
      { key: 'tokens', label: 'Tokens', align: 'right' },
      { key: 'requisicoes', label: 'Requisições', align: 'right' },
      { key: 'latencia', label: 'Latência p50', align: 'right' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      {
        modelo: 'GPT-5.2',
        provedor: 'OpenAI',
        tokens: '1,42 bi',
        requisicoes: '5,8 mi',
        latencia: '780 ms',
        status: 'Saudável',
      },
      {
        modelo: 'Claude Sonnet 4.5',
        provedor: 'Anthropic',
        tokens: '1,16 bi',
        requisicoes: '4,2 mi',
        latencia: '910 ms',
        status: 'Saudável',
      },
      {
        modelo: 'Gemini 2.5 Pro',
        provedor: 'Gemini',
        tokens: '982 mi',
        requisicoes: '3,9 mi',
        latencia: '820 ms',
        status: 'Saudável',
      },
      {
        modelo: 'GPT-5 mini',
        provedor: 'OpenAI',
        tokens: '744 mi',
        requisicoes: '3,6 mi',
        latencia: '410 ms',
        status: 'Saudável',
      },
      {
        modelo: 'Claude Haiku 4.5',
        provedor: 'Anthropic',
        tokens: '514 mi',
        requisicoes: '900 mil',
        latencia: '330 ms',
        status: 'Atenção',
      },
    ],
  },
  governanca: {
    title: 'Governança',
    description: 'Controle responsáveis, chaves, projetos e riscos de acesso.',
    action: 'Cadastrar política',
    metrics: [
      { label: 'Chaves monitoradas', value: '184', detail: '177 com proprietário' },
      { label: 'Itens pendentes', value: '7', detail: 'Requerem atribuição' },
      { label: 'Cobertura de governança', value: '96,2%', detail: '+3,1 p.p. neste mês' },
    ],
    columns: [
      { key: 'recurso', label: 'Recurso' },
      { key: 'provedor', label: 'Provedor' },
      { key: 'proprietario', label: 'Proprietário' },
      { key: 'escopo', label: 'Escopo' },
      { key: 'risco', label: 'Risco' },
      { key: 'atividade', label: 'Última atividade' },
    ],
    rows: [
      {
        recurso: 'sk-prod-core-•••7A2F',
        provedor: 'OpenAI',
        proprietario: 'Marina Alves',
        escopo: 'Produção',
        risco: 'Baixo',
        atividade: 'há 3 min',
      },
      {
        recurso: 'cx-assistant-prod',
        provedor: 'Anthropic',
        proprietario: 'Lucas Rocha',
        escopo: 'Atendimento',
        risco: 'Baixo',
        atividade: 'há 11 min',
      },
      {
        recurso: 'gemini-document-ai',
        provedor: 'Gemini',
        proprietario: 'Bianca Lima',
        escopo: 'Dados',
        risco: 'Médio',
        atividade: 'há 28 min',
      },
      {
        recurso: 'sk-legacy-•••19BC',
        provedor: 'OpenAI',
        proprietario: 'Não atribuído',
        escopo: 'Desconhecido',
        risco: 'Alto',
        atividade: 'há 2 dias',
      },
      {
        recurso: 'analytics-copilot',
        provedor: 'Anthropic',
        proprietario: 'Felipe Costa',
        escopo: 'BI',
        risco: 'Baixo',
        atividade: 'há 46 min',
      },
    ],
  },
  licencas: {
    title: 'Licenças',
    description: 'Gerencie contratos corporativos e cobertura de assentos.',
    action: 'Importar licenças',
    metrics: [
      { label: 'Licenças contratadas', value: '620', detail: '3 produtos corporativos' },
      { label: 'Assentos atribuídos', value: '554', detail: '89,4% de ocupação' },
      { label: 'Custo mensal', value: 'US$ 16.760', detail: 'US$ 27,03 por assento' },
    ],
    columns: [
      { key: 'produto', label: 'Produto' },
      { key: 'provedor', label: 'Provedor' },
      { key: 'contratadas', label: 'Contratadas', align: 'right' },
      { key: 'atribuidas', label: 'Atribuídas', align: 'right' },
      { key: 'custo', label: 'Custo mensal', align: 'right' },
      { key: 'renovacao', label: 'Renovação' },
    ],
    rows: [
      {
        produto: 'ChatGPT Enterprise',
        provedor: 'OpenAI',
        contratadas: '280',
        atribuidas: '261',
        custo: 'US$ 8.400',
        renovacao: '15 jan 2027',
      },
      {
        produto: 'Claude Enterprise',
        provedor: 'Anthropic',
        contratadas: '190',
        atribuidas: '174',
        custo: 'US$ 5.700',
        renovacao: '2 mar 2027',
      },
      {
        produto: 'Gemini Enterprise',
        provedor: 'Gemini',
        contratadas: '150',
        atribuidas: '119',
        custo: 'US$ 2.660',
        renovacao: '28 fev 2027',
      },
    ],
  },
  recomendacoes: {
    title: 'Recomendações',
    description: 'Priorize economias mensuráveis e melhorias de governança.',
    action: 'Recalcular análises',
    metrics: [
      { label: 'Economia potencial', value: 'US$ 6.240', detail: 'Por mês' },
      { label: 'Ações abertas', value: '4', detail: '2 de alta prioridade' },
      { label: 'Economia realizada', value: 'US$ 18.920', detail: 'Nos últimos 90 dias' },
    ],
    columns: [
      { key: 'recomendacao', label: 'Recomendação' },
      { key: 'categoria', label: 'Categoria' },
      { key: 'impacto', label: 'Impacto estimado', align: 'right' },
      { key: 'prioridade', label: 'Prioridade' },
      { key: 'responsavel', label: 'Responsável' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      {
        recomendacao: 'Migrar classificação para GPT-5 mini',
        categoria: 'Otimização de modelo',
        impacto: 'US$ 2.480/mês',
        prioridade: 'Alta',
        responsavel: 'Plataforma',
        status: 'Aberta',
      },
      {
        recomendacao: 'Remover 31 licenças Gemini ociosas',
        categoria: 'Licenças',
        impacto: 'US$ 1.860/mês',
        prioridade: 'Alta',
        responsavel: 'FinOps',
        status: 'Em análise',
      },
      {
        recomendacao: 'Consolidar jobs de embeddings',
        categoria: 'Arquitetura',
        impacto: 'US$ 1.120/mês',
        prioridade: 'Média',
        responsavel: 'Dados',
        status: 'Aberta',
      },
      {
        recomendacao: 'Aplicar cache semântico no suporte',
        categoria: 'Eficiência',
        impacto: 'US$ 780/mês',
        prioridade: 'Média',
        responsavel: 'Engenharia CX',
        status: 'Planejada',
      },
    ],
  },
  provedores: {
    title: 'Provedores',
    description: 'Administre contas, sincronizações e cobertura de dados.',
    action: 'Conectar provedor',
    metrics: [
      { label: 'Provedores ativos', value: '3', detail: 'Todos sincronizados' },
      { label: 'Contas conectadas', value: '5', detail: '3 produção · 2 sandbox' },
      { label: 'Última sincronização', value: 'há 4 min', detail: 'OpenAI · custos e consumo' },
    ],
    columns: [
      { key: 'provedor', label: 'Provedor' },
      { key: 'conta', label: 'Conta principal' },
      { key: 'projetos', label: 'Projetos', align: 'right' },
      { key: 'registros', label: 'Registros no mês', align: 'right' },
      { key: 'sincronizacao', label: 'Última sincronização' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      {
        provedor: 'OpenAI',
        conta: 'org-nexa-prod',
        projetos: '12',
        registros: '8,4 mi',
        sincronizacao: 'há 4 min',
        status: 'Sincronizado',
      },
      {
        provedor: 'Anthropic',
        conta: 'nexa-workspace',
        projetos: '8',
        registros: '5,1 mi',
        sincronizacao: 'há 7 min',
        status: 'Sincronizado',
      },
      {
        provedor: 'Gemini',
        conta: 'nexa-ai-production',
        projetos: '11',
        registros: '4,9 mi',
        sincronizacao: 'há 12 min',
        status: 'Sincronizado',
      },
    ],
  },
  equipes: {
    title: 'Equipes',
    description: 'Organize responsáveis, centros de custo e orçamento.',
    action: 'Nova equipe',
    metrics: [
      { label: 'Equipes ativas', value: '14', detail: 'Em 6 diretorias' },
      { label: 'Pessoas monitoradas', value: '438', detail: '92% com centro de custo' },
      { label: 'Maior consumo', value: 'Plataforma', detail: 'US$ 12.840 no período' },
    ],
    columns: [
      { key: 'equipe', label: 'Equipe' },
      { key: 'lider', label: 'Liderança' },
      { key: 'pessoas', label: 'Pessoas', align: 'right' },
      { key: 'centro', label: 'Centro de custo' },
      { key: 'gasto', label: 'Gasto no período', align: 'right' },
      { key: 'orcamento', label: 'Uso do orçamento', align: 'right' },
    ],
    rows: [
      {
        equipe: 'Plataforma',
        lider: 'Marina Alves',
        pessoas: '46',
        centro: 'CC-1042',
        gasto: 'US$ 12.840',
        orcamento: '78%',
      },
      {
        equipe: 'Engenharia CX',
        lider: 'Lucas Rocha',
        pessoas: '38',
        centro: 'CC-2031',
        gasto: 'US$ 8.920',
        orcamento: '69%',
      },
      {
        equipe: 'Produtos de Dados',
        lider: 'Bianca Lima',
        pessoas: '31',
        centro: 'CC-3014',
        gasto: 'US$ 7.480',
        orcamento: '74%',
      },
      {
        equipe: 'Business Intelligence',
        lider: 'Felipe Costa',
        pessoas: '24',
        centro: 'CC-3020',
        gasto: 'US$ 4.220',
        orcamento: '58%',
      },
      {
        equipe: 'Developer Experience',
        lider: 'Renata Souza',
        pessoas: '19',
        centro: 'CC-1058',
        gasto: 'US$ 3.940',
        orcamento: '82%',
      },
    ],
  },
};

export function OperationsDashboard({ section }: Readonly<{ section: string }>) {
  const config = sections[section];
  const [search, setSearch] = useState('');
  const [provider, setProvider] = useState('Todos os provedores');
  const [modal, setModal] = useState<'action' | 'details' | null>(null);
  const [selected, setSelected] = useState<Row | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const filteredRows = useMemo(
    () =>
      config?.rows.filter(
        (row) =>
          Object.values(row).join(' ').toLowerCase().includes(search.toLowerCase()) &&
          (provider === 'Todos os provedores' || row.provedor === provider),
      ) ?? [],
    [config, provider, search],
  );
  if (!config) return null;

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }
  const exportRows = () => {
    const data = [
      config.columns.map((column) => column.label),
      ...filteredRows.map((row) => config.columns.map((column) => row[column.key] ?? '')),
    ];
    const csv = data.map((row) => row.map((cell) => `"${cell}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${section}-nexa.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    flash('Arquivo exportado com sucesso.');
  };

  return (
    <>
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.03em]">{config.title}</h1>
          <p className="mt-1 text-sm text-muted">{config.description}</p>
        </div>
        <button
          className="flex items-center justify-center gap-2 rounded-md bg-ink px-3.5 py-2.5 text-xs font-semibold text-white hover:bg-slate-800"
          onClick={() => setModal('action')}
        >
          <Plus size={14} />
          {config.action}
        </button>
      </div>
      <section className="grid gap-3 md:grid-cols-3">
        {config.metrics.map((metric) => (
          <div className="panel p-5" key={metric.label}>
            <p className="metric-label">{metric.label}</p>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.035em] tabular">
              {metric.value}
            </p>
            <p className="mt-2 text-[11px] text-muted">{metric.detail}</p>
          </div>
        ))}
      </section>
      <section className="panel mt-4 overflow-hidden">
        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1 lg:max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar nesta visão..."
              className="h-9 w-full rounded-md border bg-white pl-9 pr-3 text-xs placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Filter
                size={13}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <select
                value={provider}
                onChange={(event) => setProvider(event.target.value)}
                className="h-9 appearance-none rounded-md border bg-white pl-8 pr-8 text-xs font-medium"
              >
                <option>Todos os provedores</option>
                <option>OpenAI</option>
                <option>Anthropic</option>
                <option>Gemini</option>
              </select>
            </div>
            <button
              className="flex h-9 items-center gap-2 rounded-md border bg-white px-3 text-xs font-medium hover:bg-slate-50"
              onClick={() => {
                setSearch('');
                setProvider('Todos os provedores');
              }}
            >
              <SlidersHorizontal size={13} />
              Limpar filtros
            </button>
            <button
              className="flex h-9 items-center gap-2 rounded-md border bg-white px-3 text-xs font-medium hover:bg-slate-50"
              onClick={exportRows}
            >
              <Download size={13} />
              Exportar
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b bg-slate-50/70 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">
                {config.columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-4 py-3 first:pl-5 ${column.align === 'right' ? 'text-right' : ''}`}
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-5 py-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, index) => (
                <tr
                  key={`${Object.values(row)[0]}-${index}`}
                  className="border-b last:border-0 hover:bg-slate-50/50"
                >
                  {config.columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-3.5 first:pl-5 ${column.align === 'right' ? 'text-right tabular' : ''}`}
                    >
                      {column.key === 'provedor' ? (
                        <ProviderCell value={row[column.key]} />
                      ) : ['status', 'risco', 'prioridade'].includes(column.key) ? (
                        <Status value={row[column.key] ?? ''} />
                      ) : (
                        <span
                          className={`text-xs ${column === config.columns[0] ? 'font-semibold text-ink' : 'text-muted'}`}
                        >
                          {row[column.key]}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-5 py-3.5 text-right">
                    <button
                      className="text-[11px] font-semibold text-blue-700 hover:text-blue-900"
                      onClick={() => {
                        setSelected(row);
                        setModal('details');
                      }}
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRows.length === 0 && (
                <tr>
                  <td
                    colSpan={config.columns.length + 1}
                    className="px-5 py-14 text-center text-xs text-muted"
                  >
                    Nenhum resultado encontrado para os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t px-5 py-3 text-[11px] text-muted">
          <span>{filteredRows.length} registros exibidos</span>
          <span>Dados atualizados há 4 minutos</span>
        </div>
      </section>
      {modal === 'action' && (
        <Modal title={config.action} onClose={() => setModal(null)}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setModal(null);
              flash('Ação registrada no ambiente demonstrativo.');
            }}
          >
            <label className="text-xs font-semibold text-ink">Nome ou identificação</label>
            <input
              required
              placeholder="Digite um nome"
              className="mt-2 h-10 w-full rounded-md border px-3 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <label className="mt-4 block text-xs font-semibold text-ink">Responsável</label>
            <select className="mt-2 h-10 w-full rounded-md border bg-white px-3 text-xs">
              <option>Marina Alves</option>
              <option>Lucas Rocha</option>
              <option>Bianca Lima</option>
            </select>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-md border px-3 py-2 text-xs font-semibold text-ink"
                onClick={() => setModal(null)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-ink px-3 py-2 text-xs font-semibold text-white"
              >
                Salvar
              </button>
            </div>
          </form>
        </Modal>
      )}
      {modal === 'details' && selected && (
        <Modal title="Detalhes do registro" onClose={() => setModal(null)}>
          <dl className="space-y-3">
            {Object.entries(selected).map(([key, value]) => (
              <div
                key={key}
                className="grid grid-cols-[120px_1fr] gap-3 border-b pb-2 last:border-0"
              >
                <dt className="text-[11px] font-semibold capitalize text-ink">{key}</dt>
                <dd className="text-xs text-muted">{value}</dd>
              </div>
            ))}
          </dl>
        </Modal>
      )}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-medium text-white shadow-xl">
          <Check size={15} className="text-emerald-400" />
          {toast}
        </div>
      )}
    </>
  );
}

function isProvider(value: string | undefined): value is ProviderName {
  return value === 'OpenAI' || value === 'Anthropic' || value === 'Gemini';
}

function ProviderCell({ value }: Readonly<{ value: string | undefined }>) {
  if (!isProvider(value)) return <span className="text-xs text-muted">{value}</span>;
  return (
    <span className="flex items-center gap-2 text-xs font-medium">
      <ProviderLogo name={value} size="sm" />
      {value}
    </span>
  );
}
function Status({ value }: Readonly<{ value: string }>) {
  const positive = ['Saudável', 'Baixo', 'Sincronizado', 'Planejada'].includes(value);
  const danger = ['Alto', 'Alta', 'Aberta'].includes(value);
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${positive ? 'bg-emerald-50 text-emerald-700' : danger ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}
    >
      {value}
    </span>
  );
}
