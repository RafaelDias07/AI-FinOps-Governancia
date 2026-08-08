'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  MoreHorizontal,
} from 'lucide-react';
import { projects, providers } from '../lib/mock-data';
import { ProviderLogo } from './provider-logo';

const costSeries = [
  28, 31, 29, 35, 33, 38, 42, 40, 48, 45, 52, 56, 53, 59, 62, 58, 65, 68, 64, 70, 74, 72, 78, 81,
  79, 84, 88, 86,
];

function Sparkline() {
  const points = costSeries
    .map((value, index) => `${(index / (costSeries.length - 1)) * 100},${100 - value}`)
    .join(' ');
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="h-[210px] w-full overflow-visible"
      aria-label="Tendência diária de custos"
    >
      <defs>
        <linearGradient id="cost-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[15, 35, 55, 75, 95].map((y) => (
        <line
          key={y}
          x1="0"
          x2="100"
          y1={y}
          y2={y}
          stroke="#EEF0F2"
          strokeWidth="0.55"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <polygon points={`0,100 ${points} 100,100`} fill="url(#cost-fill)" />
      <polyline
        points={points}
        fill="none"
        stroke="#2563EB"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OverviewDashboard() {
  const [period, setPeriod] = useState('Últimos 30 dias');
  const [periodOpen, setPeriodOpen] = useState(false);
  const [chartMenu, setChartMenu] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function exportReport() {
    const rows = [
      ['Projeto', 'Responsável', 'Provedor', 'Gasto', 'Tokens', 'Tendência'],
      ...projects.map((item) => [
        item.projeto,
        item.responsavel,
        item.provedor,
        item.gasto,
        item.tokens,
        item.tendencia,
      ]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'relatorio-finops-nexa.csv';
    anchor.click();
    URL.revokeObjectURL(url);
    setToast('Relatório exportado com sucesso.');
  }

  return (
    <>
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
              AMBIENTE DEMO
            </span>
            <span className="text-[11px] text-muted">Nexa Tecnologia S.A.</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-[-0.03em]">Visão geral</h1>
          <p className="mt-1 text-sm text-muted">
            Custos, consumo e governança de toda a operação de IA.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <button
              className="flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-xs font-medium shadow-panel"
              onClick={() => setPeriodOpen((value) => !value)}
            >
              <CalendarDays size={14} />
              {period}
              <ChevronDown size={13} className="text-muted" />
            </button>
            {periodOpen && (
              <div className="absolute right-0 top-11 z-20 w-44 rounded-lg border bg-white p-1.5 shadow-xl">
                {['Últimos 7 dias', 'Últimos 30 dias', 'Trimestre atual'].map((option) => (
                  <button
                    key={option}
                    className="flex w-full items-center justify-between rounded px-2.5 py-2 text-left text-xs hover:bg-slate-50"
                    onClick={() => {
                      setPeriod(option);
                      setPeriodOpen(false);
                      setToast(`Período alterado para ${option.toLowerCase()}.`);
                    }}
                  >
                    {option}
                    {period === option && <Check size={13} className="text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            aria-label="Exportar relatório"
            title="Exportar CSV"
            className="rounded-md border bg-white p-2 text-muted shadow-panel hover:bg-slate-50"
            onClick={exportReport}
          >
            <Download size={15} />
          </button>
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Custo total"
          value="US$ 42.960,90"
          delta="7,2%"
          detail="vs. período anterior"
          positive={false}
        />
        <Metric
          label="Total de tokens"
          value="4,82 bi"
          delta="11,8%"
          detail="vs. período anterior"
          positive={false}
        />
        <Metric
          label="Requisições de API"
          value="18,4 mi"
          delta="9,3%"
          detail="vs. período anterior"
          positive={false}
        />
        <Metric
          label="Custo por 1 mi tokens"
          value="US$ 8,91"
          delta="4,1%"
          detail="ganho de eficiência"
          positive
        />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.75fr)]">
        <div className="panel min-w-0 p-5">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold">Evolução de custos</p>
              <p className="mt-1 text-xs text-muted">Gasto diário consolidado entre provedores</p>
            </div>
            <div className="relative">
              <button
                aria-label="Opções do gráfico"
                className="rounded p-1 text-muted hover:bg-slate-100"
                onClick={() => setChartMenu((value) => !value)}
              >
                <MoreHorizontal size={17} />
              </button>
              {chartMenu && (
                <div className="absolute right-0 top-8 z-20 w-44 rounded-lg border bg-white p-1.5 shadow-xl">
                  <button
                    className="w-full rounded px-2.5 py-2 text-left text-xs hover:bg-slate-50"
                    onClick={() => {
                      setChartMenu(false);
                      setToast('Visualização agrupada por dia.');
                    }}
                  >
                    Agrupar por dia
                  </button>
                  <button
                    className="w-full rounded px-2.5 py-2 text-left text-xs hover:bg-slate-50"
                    onClick={() => {
                      setChartMenu(false);
                      exportReport();
                    }}
                  >
                    Baixar dados
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex flex-col justify-between pb-3 pr-3 text-[10px] tabular text-muted">
              <span>US$ 2 mil</span>
              <span>US$ 1,5 mil</span>
              <span>US$ 1 mil</span>
              <span>US$ 500</span>
              <span>US$ 0</span>
            </div>
            <div className="ml-14">
              <Sparkline />
              <div className="mt-2 flex justify-between text-[10px] tabular text-muted">
                <span>10 jul</span>
                <span>17 jul</span>
                <span>24 jul</span>
                <span>31 jul</span>
                <span>7 ago</span>
              </div>
            </div>
          </div>
        </div>
        <div className="panel p-5">
          <div className="mb-5">
            <p className="text-sm font-semibold">Distribuição por provedor</p>
            <p className="mt-1 text-xs text-muted">Participação no gasto do período</p>
          </div>
          <div className="mb-6 flex h-2 overflow-hidden rounded-full bg-slate-100">
            <span className="w-[46.2%] bg-[#17191C]" />
            <span className="w-[33%] bg-[#D97757]" />
            <span className="w-[20.8%] bg-[#7B61D1]" />
          </div>
          <div className="space-y-4">
            {providers.map((provider) => (
              <div
                key={provider.name}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3"
              >
                <ProviderLogo name={provider.name} />
                <div>
                  <p className="text-xs font-semibold">{provider.name}</p>
                  <p className="mt-0.5 text-[11px] tabular text-muted">{provider.share} do gasto</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold tabular">{provider.cost}</p>
                  <p
                    className={`mt-0.5 text-[11px] tabular ${provider.change.startsWith('-') ? 'text-emerald-600' : 'text-red-600'}`}
                  >
                    {provider.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel mt-4 overflow-hidden">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <p className="text-sm font-semibold">Projetos com maior gasto</p>
            <p className="mt-1 text-xs text-muted">Ranking por custo total dos provedores</p>
          </div>
          <Link href="/custos" className="text-xs font-semibold text-blue-700 hover:text-blue-800">
            Ver todos os projetos
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b bg-slate-50/60 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">
                <th className="px-5 py-3">Projeto</th>
                <th className="px-4 py-3">Responsável</th>
                <th className="px-4 py-3">Provedor</th>
                <th className="px-4 py-3 text-right">Gasto</th>
                <th className="px-4 py-3 text-right">Tokens</th>
                <th className="px-5 py-3 text-right">Tendência</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((row) => (
                <tr key={row.projeto} className="border-b last:border-0 hover:bg-slate-50/50">
                  <td className="px-5 py-3.5 text-xs font-semibold">{row.projeto}</td>
                  <td className="px-4 py-3.5 text-xs text-muted">{row.responsavel}</td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-2 text-[11px] font-medium">
                      <ProviderLogo name={row.provedor} size="sm" />
                      {row.provedor}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right text-xs font-semibold tabular">
                    {row.gasto}
                  </td>
                  <td className="px-4 py-3.5 text-right text-xs tabular text-muted">
                    {row.tokens}
                  </td>
                  <td
                    className={`px-5 py-3.5 text-right text-xs font-medium tabular ${row.tendencia.startsWith('-') ? 'text-emerald-600' : 'text-red-600'}`}
                  >
                    {row.tendencia}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-3">
        <StatusCard
          label="Chaves sem responsável"
          value="7"
          detail="Em 3 contas de provedores"
          action="Revisar chaves"
          href="/governanca"
          tone="amber"
        />
        <StatusCard
          label="Uso do orçamento"
          value="71,6%"
          detail="US$ 42,9 mil de US$ 60 mil"
          action="Ver custos"
          href="/custos"
          tone="blue"
        />
        <StatusCard
          label="Economia potencial"
          value="US$ 6.240"
          detail="4 recomendações abertas"
          action="Revisar economia"
          href="/recomendacoes"
          tone="green"
        />
      </section>
      <p className="mt-5 text-right text-[10px] text-muted">
        Dados demonstrativos · Última atualização há 4 minutos
      </p>
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-medium text-white shadow-xl">
          <Check size={15} className="text-emerald-400" />
          {toast}
        </div>
      )}
    </>
  );
}

function Metric({
  label,
  value,
  delta,
  detail,
  positive,
}: Readonly<{ label: string; value: string; delta: string; detail: string; positive: boolean }>) {
  const Icon = positive ? ArrowDownRight : ArrowUpRight;
  return (
    <div className="panel p-5">
      <p className="metric-label">{label}</p>
      <p className="mt-3 text-[26px] font-semibold leading-none tracking-[-0.04em] tabular">
        {value}
      </p>
      <div className="mt-4 flex items-center gap-1.5 text-[11px]">
        <span
          className={`flex items-center gap-0.5 font-semibold ${positive ? 'text-emerald-600' : 'text-red-600'}`}
        >
          <Icon size={12} />
          {delta}
        </span>
        <span className="text-muted">{detail}</span>
      </div>
    </div>
  );
}

function StatusCard({
  label,
  value,
  detail,
  action,
  href,
  tone,
}: Readonly<{
  label: string;
  value: string;
  detail: string;
  action: string;
  href: string;
  tone: 'amber' | 'blue' | 'green';
}>) {
  const tones = { amber: 'bg-amber-500', blue: 'bg-blue-600', green: 'bg-emerald-600' };
  return (
    <div className="panel flex items-center gap-4 p-4">
      <span className={`h-10 w-1 rounded-full ${tones[tone]}`} />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-muted">{label}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-semibold tabular">{value}</span>
          <span className="truncate text-[10px] text-muted">{detail}</span>
        </div>
      </div>
      <Link href={href} className="whitespace-nowrap text-[11px] font-semibold text-blue-700">
        {action}
      </Link>
    </div>
  );
}
