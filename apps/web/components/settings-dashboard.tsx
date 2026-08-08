'use client';

import { useState } from 'react';
import { Check, Save } from 'lucide-react';

export function SettingsDashboard() {
  const [saved, setSaved] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [timezone, setTimezone] = useState('America/Sao_Paulo');
  const [emails, setEmails] = useState(true);
  function save(event: React.FormEvent) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  }
  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-[-0.03em]">Configurações</h1>
        <p className="mt-1 text-sm text-muted">
          Preferências do workspace e controles da organização.
        </p>
      </div>
      <form onSubmit={save} className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="panel p-5">
          <h2 className="text-sm font-semibold">Preferências gerais</h2>
          <p className="mt-1 text-xs text-muted">
            Configurações usadas nos relatórios e dashboards.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Nome da organização">
              <input defaultValue="Nexa Tecnologia S.A." className="input" />
            </Field>
            <Field label="Workspace">
              <input defaultValue="Operação Brasil" className="input" />
            </Field>
            <Field label="Moeda de apresentação">
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                className="input bg-white"
              >
                <option value="USD">Dólar americano (USD)</option>
                <option value="BRL">Real brasileiro (BRL)</option>
              </select>
            </Field>
            <Field label="Fuso horário">
              <select
                value={timezone}
                onChange={(event) => setTimezone(event.target.value)}
                className="input bg-white"
              >
                <option value="America/Sao_Paulo">Brasília (UTC−03:00)</option>
                <option value="UTC">UTC</option>
              </select>
            </Field>
          </div>
          <div className="mt-6 border-t pt-5">
            <label className="flex items-center justify-between gap-4">
              <span>
                <span className="block text-xs font-semibold">Resumo semanal por e-mail</span>
                <span className="mt-1 block text-[11px] text-muted">
                  Receba custos, alertas e recomendações toda segunda-feira.
                </span>
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={emails}
                onClick={() => setEmails((value) => !value)}
                className={`relative h-6 w-11 rounded-full transition ${emails ? 'bg-blue-600' : 'bg-slate-300'}`}
              >
                <span
                  className={`absolute top-1 size-4 rounded-full bg-white transition ${emails ? 'left-6' : 'left-1'}`}
                />
              </button>
            </label>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-xs font-semibold text-white"
            >
              <Save size={14} />
              Salvar alterações
            </button>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="panel p-5">
            <p className="metric-label">Plano atual</p>
            <p className="mt-3 text-lg font-semibold">Enterprise Demo</p>
            <p className="mt-2 text-xs leading-5 text-muted">
              Até 1.000 usuários, provedores ilimitados e retenção configurável.
            </p>
          </div>
          <div className="panel p-5">
            <p className="text-xs font-semibold">Segurança</p>
            <ul className="mt-3 space-y-2 text-[11px] text-muted">
              <li className="flex gap-2">
                <Check size={13} className="text-emerald-600" />
                Criptografia de credenciais ativa
              </li>
              <li className="flex gap-2">
                <Check size={13} className="text-emerald-600" />
                Isolamento multi-tenant ativo
              </li>
              <li className="flex gap-2">
                <Check size={13} className="text-emerald-600" />
                Trilha de auditoria ativa
              </li>
            </ul>
          </div>
        </aside>
      </form>
      {saved && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-medium text-white shadow-xl">
          <Check size={15} className="text-emerald-400" />
          Configurações salvas com sucesso.
        </div>
      )}
    </>
  );
}

function Field({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <label className="text-xs font-semibold">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}
