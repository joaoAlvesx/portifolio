# Portfólio — João Gonçalves

Portfólio pessoal de projetos, formação e experiências em redes, infraestrutura, software e robótica. Disponível em [portfolio.joaohomelab.site](https://portfolio.joaohomelab.site).

Construído com React, TypeScript, Vite e CSS. O site inclui temas claro e escuro, currículo público e certificado Cisco.

## Desenvolvimento

Requisitos: Node.js 20.19+ ou 22.12+ e npm.

```bash
npm ci
npm run dev
```

O servidor local abre em `http://127.0.0.1:5173`. O conteúdo do portfólio fica em `src/data.ts` e `src/Sections.tsx`; arquivos públicos ficam em `public/`. Revise os dados pessoais antes de adicionar documentos ou imagens.

## Verificação

```bash
npm run lint
npm run build
npx playwright install chromium
npm run preview
```

Em outro terminal, execute `npm test` para verificar navegação, acessibilidade e arquivos no build. As capturas são salvas em `test-results/`.
