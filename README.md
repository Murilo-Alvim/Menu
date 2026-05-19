# Sabor & Arte — Cardápio Digital

Aplicação web de cardápio digital para restaurantes, com personalização de pratos, carrinho interativo e checkout direto pelo WhatsApp. Construída em React + Vite + Tailwind CSS, com foco em experiência mobile-first, dark mode e animações cuidadosas.

> Este é um projeto-vitrine: substituindo o conteúdo de `src/data/menu.json` ele se transforma no cardápio de qualquer restaurante.

## Demo

[![Vercel](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)](https://vercel.com)

Para rodar localmente:

```bash
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173`.

## Funcionalidades

### Cardápio e pedido
- Catálogo organizado em categorias com navegação horizontal sticky
- Carrossel de "Destaques" no topo do cardápio
- Busca por nome/descrição e filtros combináveis por tag (vegetariano, vegano, sem glúten, chef recomenda)
- Modal de detalhe por prato com seleção de tamanho, adicionais opcionais, campo de observações (200 caracteres) e contador de quantidade
- Carrinho lateral persistente em `localStorage`, com suporte a múltiplas linhas do mesmo prato com customizações distintas
- Checkout em duas etapas: revisão do carrinho → formulário do cliente
- Formulário com nome, telefone, modo (entrega ou retirada), endereço, complemento, forma de pagamento (PIX, cartão, dinheiro com troco) e observações gerais
- Envio do pedido pelo WhatsApp com mensagem formatada incluindo cliente, endereço, itens com customizações, subtotal, taxa de entrega e total

### Conteúdo institucional
- Seção "Sobre o chef" com foto e biografia
- Seção de depoimentos com nota em estrelas
- FAQ em accordion animado
- Seção de serviços (fácil de pedir, entrega rápida, qualidade)
- Seção de contato com cartões de endereço/horário/telefone e CTA do WhatsApp

### Experiência
- Hero full-screen com título em animação letra-por-letra, parallax, Ken Burns no fundo, blobs flutuantes coloridos e seta de scroll animada
- Header transparente sobre o hero que ganha fundo opaco após scroll
- Dark mode com toggle, persistência em `localStorage` e respeito ao `prefers-color-scheme`
- Atalhos no hero (Cardápio, Destaques, Sobre, Contato)
- Botão flutuante "voltar ao topo" e botão grande "voltar ao início" no fim da página
- Animação "fly to cart": a imagem do prato voa até o ícone do carrinho ao adicionar
- Toasts de confirmação no topo da tela
- Skeleton de carregamento nas imagens
- Mobile-first com barra de carrinho flutuante exibida quando há itens

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (`darkMode: 'class'`)
- **framer-motion** — animações e transições
- **lucide-react** — biblioteca de ícones
- Dados estáticos em `src/data/menu.json` (sem backend)

## Como personalizar

Todo o conteúdo está em [`src/data/menu.json`](src/data/menu.json):

```jsonc
{
  "restaurant": {
    "name": "Nome do restaurante",
    "phone": "5511999999999",   // DDI + DDD + número, só dígitos
    "address": "Rua, número - Cidade/UF",
    "hours": "Ter a Dom · 18h às 23h",
    "coverImage": "https://...",
    "deliveryFee": 8.0,
    "deliveryTime": "40-55 min"
  },
  "chef": { "name": "...", "title": "...", "bio": "...", "photo": "..." },
  "categories": [
    { "id": "entradas", "name": "Entradas", "icon": "🥗" }
  ],
  "items": [
    {
      "id": "prato-x",
      "categoryId": "entradas",
      "name": "Nome do prato",
      "description": "Descrição curta para o card",
      "longDescription": "Descrição completa exibida no modal",
      "price": 28.9,
      "image": "https://...",
      "tags": ["vegetariano"],
      "featured": true,
      "sizes": [{ "id": "p", "label": "P", "priceDelta": 0 }],
      "extras": [{ "id": "queijo", "name": "Queijo extra", "price": 5.0 }]
    }
  ],
  "testimonials": [...],
  "faqs": [...]
}
```

Tags reconhecidas (com cores próprias): `vegetariano`, `vegano`, `sem glúten`, `chef recomenda`. Outras tags são exibidas com estilo neutro.

## Estrutura do projeto

```
src/
├── components/
│   ├── About.jsx              # Seção sobre o chef
│   ├── BackToStartButton.jsx  # Botão grande "voltar ao início"
│   ├── BackToTop.jsx          # Botão flutuante de voltar ao topo
│   ├── Cart.jsx               # Drawer do carrinho (lista + checkout)
│   ├── CategoryNav.jsx        # Navegação horizontal por categorias
│   ├── CheckoutForm.jsx       # Formulário multi-step
│   ├── Contact.jsx            # Seção de contato
│   ├── FAQ.jsx                # Accordion de perguntas frequentes
│   ├── FeaturedCarousel.jsx   # Carrossel de destaques
│   ├── FlyToCartLayer.jsx     # Camada da animação fly-to-cart
│   ├── FloatingCart.jsx       # Barra flutuante mobile do carrinho
│   ├── Header.jsx             # Header sticky adaptativo
│   ├── Hero.jsx               # Seção de boas-vindas
│   ├── ItemDetailModal.jsx    # Modal de personalização do prato
│   ├── MenuItem.jsx           # Card de prato
│   ├── MenuSection.jsx        # Agrupamento por categoria
│   ├── SearchBar.jsx          # Busca e chips de filtro
│   ├── Services.jsx           # Seção de serviços
│   ├── Testimonials.jsx       # Cards de depoimentos
│   └── Toasts.jsx             # Sistema de toasts
├── context/
│   ├── CartContext.jsx        # Estado do carrinho + persistência
│   ├── ThemeContext.jsx       # Dark mode + persistência
│   └── UIContext.jsx          # Toasts e fly-to-cart
├── data/
│   └── menu.json              # Cardápio e dados do restaurante
├── utils/
│   └── format.js              # Formatador BRL + builder da mensagem WhatsApp
├── App.jsx
├── main.jsx
└── index.css
```

## Scripts

| Comando            | Descrição                                |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Inicia o servidor de desenvolvimento     |
| `npm run build`    | Gera o build de produção em `dist/`      |
| `npm run preview`  | Serve o build de produção localmente     |

## Roadmap

- [ ] PWA com instalação no celular e cache offline
- [ ] Deploy automatizado (Vercel/Netlify)
- [ ] Modo administrativo simples para editar o JSON pela UI
- [ ] Integração com gateway de pagamento (opcional)
- [ ] Tradução para outros idiomas

## Autor

**Murilo Alvim** — [github.com/Murilo-Alvim](https://github.com/Murilo-Alvim)

## Licença

Distribuído sob a licença MIT.
