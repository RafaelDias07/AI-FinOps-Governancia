export const company = {
  name: 'Nexa Tecnologia S.A.',
  workspace: 'Operação Brasil',
  user: 'Rafael Dias',
  initials: 'RD',
  role: 'Administrador FinOps',
};

export const providers = [
  {
    name: 'OpenAI',
    id: 'openai',
    cost: 'US$ 19.842,60',
    share: '46,2%',
    change: '+8,4%',
    status: 'Sincronizado',
    account: 'org-nexa-prod',
    lastSync: 'há 4 min',
  },
  {
    name: 'Anthropic',
    id: 'anthropic',
    cost: 'US$ 14.186,24',
    share: '33,0%',
    change: '+3,1%',
    status: 'Sincronizado',
    account: 'nexa-workspace',
    lastSync: 'há 7 min',
  },
  {
    name: 'Gemini',
    id: 'gemini',
    cost: 'US$ 8.932,06',
    share: '20,8%',
    change: '-2,7%',
    status: 'Sincronizado',
    account: 'nexa-ai-production',
    lastSync: 'há 12 min',
  },
] as const;

export const projects = [
  {
    projeto: 'Core de Produção',
    responsavel: 'Plataforma',
    provedor: 'OpenAI',
    gasto: 'US$ 9.428,12',
    tokens: '1,24 bi',
    tendencia: '+12,4%',
  },
  {
    projeto: 'Atendimento ao Cliente',
    responsavel: 'Engenharia CX',
    provedor: 'Anthropic',
    gasto: 'US$ 7.216,48',
    tokens: '842,6 mi',
    tendencia: '+4,7%',
  },
  {
    projeto: 'Inteligência Documental',
    responsavel: 'Produtos de Dados',
    provedor: 'Gemini',
    gasto: 'US$ 5.884,30',
    tokens: '693,1 mi',
    tendencia: '-1,8%',
  },
  {
    projeto: 'Ferramentas Internas',
    responsavel: 'Developer Experience',
    provedor: 'OpenAI',
    gasto: 'US$ 4.921,70',
    tokens: '521,8 mi',
    tendencia: '+18,2%',
  },
  {
    projeto: 'Copiloto de Analytics',
    responsavel: 'Business Intelligence',
    provedor: 'Anthropic',
    gasto: 'US$ 3.840,62',
    tokens: '408,2 mi',
    tendencia: '+2,3%',
  },
] as const;

export type ProviderName = (typeof providers)[number]['name'];
