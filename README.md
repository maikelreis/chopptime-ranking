# 🍺 Chopptime Ranking - Encontrinho

Sistema de ranking interativo para competição de consumo de chopp no bar Encontrinho.

![Banner](https://img.shields.io/badge/Status-Ativo-success) ![Versão](https://img.shields.io/badge/Versão-1.0-blue) ![Licença](https://img.shields.io/badge/Licença-MIT-yellow)

## 📋 Sobre o Projeto

O **Chopptime Ranking** é um dashboard gamificado que exibe em tempo real o ranking dos maiores consumidores de chopp do bar. O sistema foi desenvolvido para criar uma experiência divertida e competitiva entre os clientes, incentivando o engajamento e tornando a experiência no bar mais dinâmica.

### ✨ Características Principais

- 🏆 **Pódio Animado**: Visualização estilo olímpico com os Top 5 consumidores
- 🍺 **Copos Interativos**: Representação visual em copos que enchem conforme o consumo
- 📊 **Estatísticas em Tempo Real**: Total de litros, participantes e recordes
- 🎨 **Design Vibrante**: Cores personalizadas do Encontrinho (laranja e vermelho)
- 💾 **Persistência de Dados**: Informações salvas localmente no navegador
- 📱 **Responsivo**: Funciona em TVs, tablets e smartphones

## 🎯 Funcionalidades

### Página do Ranking (Pública)
- Visualização do Top 5 em formato de pódio
- Atualização automática a cada 5 segundos
- Estatísticas gerais (litros totais, participantes, recorde)
- Medalhas e troféus para os primeiros colocados
- Animações quando novos consumos são adicionados

### Modo Atendente (Gestão)
- Interface simples para lançamento de consumos
- Entrada por número de copos (330ml cada)
- Conversão automática para mililitros e litros
- Lista completa de todos os participantes
- Função de limpar ranking
- Acesso via botão flutuante (+) no canto superior direito

## 🚀 Como Usar

### Instalação

1. **Download do arquivo**
   ```bash
   # Baixe o arquivo index.html
   ```

2. **Hospedagem no Netlify (Recomendado)**
   - Acesse: https://app.netlify.com/drop
   - Arraste o arquivo `index.html`
   - Pronto! Seu site estará no ar

3. **Outras opções de hospedagem gratuita**
   - Vercel (https://vercel.com)
   - GitHub Pages
   - Firebase Hosting

### Configuração no Bar

1. **Tela Principal (TV/Monitor para clientes)**
   - Abra a URL do site
   - Deixe na página do ranking
   - Coloque em tela cheia (F11)

2. **Tela do Atendente (Computador/Tablet)**
   - Abra a mesma URL em outra aba/dispositivo
   - Clique no botão (+) no canto superior direito
   - Lance os consumos conforme os pedidos

### Operação Diária

1. **Registrar Consumo**
   - Digite o nome do cliente
   - Informe a quantidade de copos
   - Clique em "Adicionar"

2. **Visualizar Ranking**
   - Os dados aparecem automaticamente na tela principal
   - O ranking é atualizado em tempo real

3. **Limpar Dados**
   - No modo atendente, clique em "Limpar"
   - Confirme a ação
   - Use ao final do evento/dia

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da aplicação
- **CSS3**: Estilos e animações
- **JavaScript (Vanilla)**: Lógica e interatividade
- **Tailwind CSS**: Framework de estilos utilitários
- **LocalStorage API**: Persistência de dados no navegador
- **SVG**: Ícones e gráficos vetoriais

## 📊 Sistema de Pontuação

- **1 copo = 330ml**
- **Ranking baseado em mililitros (ml) totais**
- **Conversão automática para litros**
- **Ordenação decrescente (maior consumo primeiro)**

## 🎨 Identidade Visual

### Cores Principais
- **Laranja**: `#ea580c` (Primária)
- **Vermelho**: `#dc2626` (Secundária)
- **Amarelo**: `#fbbf24` (Destaques e medalhas)

### Medalhas do Pódio
- 🥇 **1º Lugar**: Coroa Dourada + Pedestal alto amarelo
- 🥈 **2º Lugar**: Troféu Prateado + Pedestal médio cinza
- 🥉 **3º Lugar**: Medalha Bronze + Pedestal laranja
- 📈 **4º-5º Lugares**: Pedestais vermelhos menores

## 🔧 Personalização

### Alterar Capacidade do Copo
```javascript
// Linha 18 do código
const ML_POR_COPO = 330; // Altere para o valor desejado
```

### Modificar Informações do Bar
```javascript
// No footer do HTML, procure por:
📍 LIDA URBANA - Rua Santana, 3397
Encontrinho © 2024
```

### Ajustar Top N do Ranking
```javascript
// Linha que define topCinco
const topCinco = clientes.slice(0, 5); // Altere o 5 para quantidade desejada
```

## 📱 Responsividade

O sistema se adapta automaticamente para:
- 📺 **TVs e Monitores**: Layout horizontal com pódio completo
- 💻 **Desktops**: Visualização otimizada
- 📱 **Tablets e Smartphones**: Layout responsivo empilhado

## 🔒 Privacidade e Segurança

- ✅ Dados armazenados apenas no navegador local
- ✅ Nenhuma informação enviada para servidores externos
- ✅ Sem rastreamento de usuários
- ✅ Sem coleta de dados pessoais sensíveis
- ⚠️ Dados são perdidos ao limpar cache do navegador

## 🐛 Solução de Problemas

### O ranking não atualiza
- Verifique se ambas as abas estão abertas na mesma URL
- Limpe o cache do navegador (Ctrl+Shift+Del)
- Recarregue a página (Ctrl+F5)

### Tela em branco
- Aguarde alguns segundos para o Tailwind CSS carregar
- Verifique a conexão com internet (para CDNs)
- Abra o Console (F12) e verifique erros

### Dados perdidos
- Os dados estão no localStorage do navegador
- Não limpe o cache/dados do site
- Para backup, use sempre o mesmo dispositivo

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Créditos

**Desenvolvido para**: Bar Encontrinho  
**Local**: LIDA URBANA - Rua Santana, 3397  
**Cidade**: Gravataí, RS - Brasil

## 🤝 Contribuindo

Sugestões e melhorias são sempre bem-vindas!

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte:
- 📧 Email: [maikel_reis@hotmail.com]
- 📱 WhatsApp: [51-994511486]

## 🎉 Agradecimentos

Obrigado a todos os clientes do Encontrinho que participam e tornam as noites mais divertidas! 🍺

---

**Feito com ❤️ e muito 🍺 para o Encontrinho**

#Chopp #Ranking #Gamificação #BarTech