'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Bell,
  Blocks,
  Building2,
  Check,
  ChevronDown,
  CircleDollarSign,
  FileKey,
  Gauge,
  HelpCircle,
  LayoutDashboard,
  Lightbulb,
  Menu,
  Settings,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { company } from '../lib/mock-data';

const navigation: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: 'Visão geral', href: '/', icon: LayoutDashboard },
  { label: 'Custos', href: '/custos', icon: CircleDollarSign },
  { label: 'Consumo', href: '/consumo', icon: Gauge },
  { label: 'Governança', href: '/governanca', icon: ShieldCheck },
  { label: 'Licenças', href: '/licencas', icon: FileKey },
  { label: 'Recomendações', href: '/recomendacoes', icon: Lightbulb },
];

const manageNavigation: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: 'Provedores', href: '/provedores', icon: Blocks },
  { label: 'Equipes', href: '/equipes', icon: Users },
  { label: 'Configurações', href: '/configuracoes', icon: Settings },
];

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const current =
    [...navigation, ...manageNavigation].find(({ href }) => href === pathname)?.label ??
    'Visão geral';

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const navContent = (
    <>
      <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
        Workspace
      </p>
      <div className="space-y-0.5">
        {navigation.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] font-medium transition ${active ? 'bg-slate-100 text-ink' : 'text-muted hover:bg-slate-50 hover:text-ink'}`}
            >
              <Icon size={16} strokeWidth={active ? 2.1 : 1.8} />
              {label}
              {label === 'Recomendações' && (
                <span className="ml-auto rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">
                  4
                </span>
              )}
            </Link>
          );
        })}
      </div>
      <p className="mb-2 mt-7 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
        Gerenciar
      </p>
      <div className="space-y-0.5">
        {manageNavigation.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] font-medium transition ${active ? 'bg-slate-100 text-ink' : 'text-muted hover:bg-slate-50 hover:text-ink'}`}
            >
              <Icon size={16} strokeWidth={active ? 2.1 : 1.8} />
              {label}
            </Link>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[224px_1fr]">
      <aside className="hidden border-r bg-white lg:flex lg:min-h-screen lg:flex-col">
        <Brand />
        <nav className="flex-1 px-3 py-5">{navContent}</nav>
        <ProfileButton
          open={profileOpen}
          onToggle={() => setProfileOpen((value) => !value)}
          onSettings={() => router.push('/configuracoes')}
          onDemo={() => setToast('Você está no ambiente demonstrativo da Nexa.')}
        />
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r bg-white transition-transform lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b pr-3">
          <Brand compact />
          <button
            aria-label="Fechar menu"
            className="rounded-md p-2 text-muted hover:bg-slate-100"
            onClick={() => setMobileOpen(false)}
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-5">{navContent}</nav>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/95 px-5 backdrop-blur md:px-8">
          <button
            aria-label="Abrir menu"
            className="mr-3 rounded-md p-2 text-muted hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={19} />
          </button>
          <div className="hidden items-center gap-2 text-xs text-muted sm:flex">
            <span>{company.name}</span>
            <span>/</span>
            <span className="font-medium text-ink">{current}</span>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <button
              aria-label="Ajuda"
              className="rounded-md p-2 text-muted hover:bg-slate-100"
              onClick={() => setHelpOpen(true)}
            >
              <HelpCircle size={17} />
            </button>
            <div className="relative">
              <button
                aria-label="Notificações"
                className="relative rounded-md p-2 text-muted hover:bg-slate-100"
                onClick={() => setNotificationsOpen((value) => !value)}
              >
                <Bell size={17} />
                <span className="absolute right-2 top-1.5 size-1.5 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
              {notificationsOpen && <Notifications onClose={() => setNotificationsOpen(false)} />}
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] px-5 py-6 md:px-8 md:py-8">{children}</main>
      </div>

      {helpOpen && (
        <Modal title="Central de ajuda" onClose={() => setHelpOpen(false)}>
          <p>
            Este é o ambiente demonstrativo da Nexa Tecnologia. Use o menu lateral para explorar
            custos, consumo, governança, licenças e recomendações.
          </p>
          <div className="mt-4 rounded-md border bg-slate-50 p-3">
            <p className="text-xs font-semibold text-ink">Precisa falar com FinOps?</p>
            <p className="mt-1 text-xs">Envie uma mensagem para finops@nexa.example</p>
          </div>
        </Modal>
      )}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-medium text-white shadow-xl">
          <Check size={15} className="text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

function Brand({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <div className={`flex h-16 items-center gap-2.5 px-5 ${compact ? '' : 'border-b'}`}>
      <span className="grid size-8 place-items-center rounded-md bg-ink text-sm font-bold text-white">
        F
      </span>
      <div>
        <p className="text-sm font-semibold leading-none">FinOps AI</p>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.13em] text-muted">
          Control plane
        </p>
      </div>
    </div>
  );
}

function ProfileButton({
  open,
  onToggle,
  onSettings,
  onDemo,
}: Readonly<{ open: boolean; onToggle: () => void; onSettings: () => void; onDemo: () => void }>) {
  return (
    <div className="relative border-t p-3">
      <button
        className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-slate-50"
        onClick={onToggle}
      >
        <span className="grid size-8 place-items-center rounded-full bg-slate-900 text-xs font-semibold text-white">
          {company.initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-semibold">{company.user}</span>
          <span className="block truncate text-[11px] text-muted">{company.name}</span>
        </span>
        <ChevronDown size={14} className="text-muted" />
      </button>
      {open && (
        <div className="absolute bottom-[72px] left-3 right-3 rounded-lg border bg-white p-1.5 shadow-xl">
          <div className="border-b px-2.5 py-2">
            <p className="text-xs font-semibold">{company.user}</p>
            <p className="mt-0.5 text-[10px] text-muted">{company.role}</p>
          </div>
          <button
            className="mt-1 flex w-full items-center gap-2 rounded px-2.5 py-2 text-left text-xs hover:bg-slate-50"
            onClick={onSettings}
          >
            <Settings size={14} />
            Configurações
          </button>
          <button
            className="flex w-full items-center gap-2 rounded px-2.5 py-2 text-left text-xs hover:bg-slate-50"
            onClick={onDemo}
          >
            <Building2 size={14} />
            Sobre o ambiente
          </button>
        </div>
      )}
    </div>
  );
}

function Notifications({ onClose }: Readonly<{ onClose: () => void }>) {
  return (
    <div className="absolute right-0 top-11 w-[320px] rounded-lg border bg-white shadow-xl">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <p className="text-xs font-semibold">Notificações</p>
        <button className="text-[10px] font-semibold text-blue-700" onClick={onClose}>
          Marcar como lidas
        </button>
      </div>
      <div className="p-2">
        <Notification
          title="Orçamento em 72%"
          text="O workspace Produção atingiu o limite de atenção."
          time="há 18 min"
        />
        <Notification
          title="7 chaves sem responsável"
          text="Atribua proprietários para concluir a governança."
          time="há 2 h"
        />
        <Notification
          title="Sincronização concluída"
          text="Gemini importou 18.204 registros de consumo."
          time="há 3 h"
        />
      </div>
    </div>
  );
}

function Notification({
  title,
  text,
  time,
}: Readonly<{ title: string; text: string; time: string }>) {
  return (
    <div className="rounded-md p-3 hover:bg-slate-50">
      <div className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-blue-600" />
        <p className="text-xs font-semibold">{title}</p>
      </div>
      <p className="mt-1 pl-3.5 text-[11px] leading-4 text-muted">{text}</p>
      <p className="mt-1 pl-3.5 text-[10px] text-slate-400">{time}</p>
    </div>
  );
}

export function Modal({
  title,
  children,
  onClose,
}: Readonly<{ title: string; children: React.ReactNode; onClose: () => void }>) {
  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/35 p-4 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-md rounded-xl border bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-sm font-semibold">{title}</h2>
          <button
            aria-label="Fechar"
            className="rounded p-1 text-muted hover:bg-slate-100"
            onClick={onClose}
          >
            <X size={17} />
          </button>
        </div>
        <div className="p-5 text-sm leading-6 text-muted">{children}</div>
      </div>
    </div>
  );
}
