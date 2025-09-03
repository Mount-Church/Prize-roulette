# Roleta de Prêmios (Prize Roulette)

Uma aplicação web interativa de roleta de prêmios desenvolvida com React, TypeScript e Vite. Este projeto permite que os usuários girem uma roleta virtual para ganhar prêmios aleatórios, com suporte a tema claro/escuro, animações e efeitos sonoros.

![Preview da Aplicação](public/preview.jpg)

## 🚀 Recursos

- 🎡 Interface de roleta interativa e responsiva
- 🌓 Suporte a tema claro e escuro
- 🎉 Animações de confete ao ganhar prêmios
- 🔊 Efeitos sonoros para rotação e vitória
- 📱 Design responsivo que funciona em dispositivos móveis
- ⚡ Desenvolvido com Vite para carregamento ultrarrápido
- 📱 Suporte a PWA (Progressive Web App)
- 📊 Histórico de prêmios

## 🛠️ Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- [Vite PWA](https://vite-pwa-org.netlify.app/)

## 🚀 Como executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/prize-roulette.git
   cd prize-roulette/prize-roulette
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   # ou
   pnpm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🏗️ Como construir para produção

Para criar uma versão otimizada para produção:

```bash
npm run build
# ou
yarn build
# ou
pnpm build
```

## 📦 Scripts disponíveis

- `dev` - Inicia o servidor de desenvolvimento
- `build` - Constrói a aplicação para produção
- `preview` - Pré-visualiza a build de produção localmente
- `lint` - Executa o linter no código
- `type-check` - Verifica os tipos TypeScript

## 🎨 Personalização

### Cores do tema

As cores podem ser personalizadas editando as variáveis CSS em `src/App.css`:

```css
:root {
  --primary: #7c3aed;
  --primary-light: #a78bfa;
  --background: #f9fafb;
  --card-bg: #ffffff;
  --text: #1f2937;
  --text-secondary: #6b7280;
  --success: #10b981;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
```

### Prêmios

Os prêmios podem ser personalizados editando o array `prizes` em `src/App.tsx`:

```typescript
const prizes = [
  { id: 1, name: 'Presente surpresa', color: 'bg-red-500' },
  { id: 2, name: 'Chocolate', color: 'bg-blue-500' },
  // Adicione mais prêmios conforme necessário
];
```

## 📱 PWA (Progressive Web App)

Este projeto inclui suporte a PWA, permitindo que os usuários instalem o aplicativo em seus dispositivos. A configuração do PWA pode ser encontrada em `vite.config.ts`.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [Vite](https://vitejs.dev/) por fornecer uma experiência de desenvolvimento incrivelmente rápida
- [React](https://reactjs.org/) por tornar a construção de interfaces de usuário interativas uma tarefa fácil
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) pelos belos efeitos de confete
- [Vite PWA](https://vite-pwa-org.netlify.app/) pelo suporte a PWA simplificado
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
