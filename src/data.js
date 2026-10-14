import { Bone, Cat, Dog, Droplets, PackageOpen, Rabbit, ShieldPlus, Sparkles } from 'lucide-react'

export const categories = [
  { id: 'caes', name: 'Cães', eyebrow: 'Pet', description: 'Alimentação, petiscos, higiene e acessórios.', icon: Dog, tone: 'sage' },
  { id: 'gatos', name: 'Gatos', eyebrow: 'Pet', description: 'Nutrição, areia, petiscos e cuidados.', icon: Cat, tone: 'sand' },
  { id: 'equinos', name: 'Equinos', eyebrow: 'Horse', description: 'Alimentação, suplementos e cuidados.', icon: ShieldPlus, tone: 'amber' },
  { id: 'outros', name: 'Outros animais', eyebrow: 'Cuidados', description: 'Produtos para outras espécies atendidas.', icon: Rabbit, tone: 'olive' },
  { id: 'piscina', name: 'Piscina', eyebrow: 'A confirmar', description: 'Linha de limpeza e manutenção sob confirmação.', icon: Droplets, tone: 'water' },
]

export const products = [
  { id: 'nutricao-caes-adultos', name: 'Nutrição para cães adultos', animal: 'Cães', category: 'Alimentação', size: 'Peso a confirmar', icon: Dog, tone: 'sage', description: 'Opções para diferentes portes, fases e necessidades. Consulte as linhas disponíveis.' },
  { id: 'petiscos-caes', name: 'Petiscos e recompensas', animal: 'Cães', category: 'Petiscos', size: 'Tamanho a confirmar', icon: Bone, tone: 'amber', description: 'Alternativas para rotina, treino e momentos de cuidado.' },
  { id: 'nutricao-gatos', name: 'Nutrição para gatos', animal: 'Gatos', category: 'Alimentação', size: 'Peso a confirmar', icon: Cat, tone: 'sand', description: 'Consulte opções por fase de vida e necessidades específicas.' },
  { id: 'higiene-gatos', name: 'Higiene para gatos', animal: 'Gatos', category: 'Higiene', size: 'Tamanho a confirmar', icon: Sparkles, tone: 'cream', description: 'Itens para uma rotina mais limpa, confortável e prática.' },
  { id: 'alimentacao-equinos', name: 'Alimentação para equinos', animal: 'Equinos', category: 'Alimentação', size: 'Peso a confirmar', icon: ShieldPlus, tone: 'forest', description: 'Produtos para diferentes rotinas e objetivos. Consulte a equipe.' },
  { id: 'suplementos-equinos', name: 'Suplementos para equinos', animal: 'Equinos', category: 'Suplementos', size: 'Tamanho a confirmar', icon: PackageOpen, tone: 'amber', description: 'Linha de suporte e cuidados com indicação e composição a consultar.' },
  { id: 'outros-animais', name: 'Cuidados para outros animais', animal: 'Outros animais', category: 'Cuidados', size: 'Informação a confirmar', icon: Rabbit, tone: 'olive', description: 'Conte à equipe qual animal e produto você procura.' },
  { id: 'linha-piscina', name: 'Linha para piscina', animal: 'Piscina', category: 'Tratamento', size: 'Categoria a confirmar', icon: Droplets, tone: 'water', description: 'Disponibilidade desta linha comercial a confirmar com a loja.', pending: true },
]
