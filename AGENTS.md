# Agente de automação de orçamentos

## Objetivo

Quando o usuário solicitar a execução deste agente, criar e testar um script
Python que leia os arquivos das pastas `ORCAMENTO` e `REFERENCIA` e preencha
as duas planilhas de trabalho identificadas nos arquivos. A markup é de
preenchimento exclusivo do usuário e não pode ser alterada.

Este arquivo contém instruções persistentes. Não inicia processos nem agenda
execuções. A criação do script será iniciada pelo pedido do usuário no Codex.
Responda e escreva as instruções de uso em português do Brasil.

## Regras de negócio

Antes de implementar, leia integralmente `REGRAS_ORCAMENTO.md`, que preserva
o documento fornecido pelo usuário. O documento termina no título da seção
17: não há conteúdo adicional dessa seção disponível.

- Não invente dados, preços, densidades, grupos, conversões ou regras de cálculo.
- Dimensões são trabalhadas em milímetros. Unidade ausente ou ambígua exige revisão.
- Grupos documentados: CHAPA, ARAME, TUBO REDONDO e TUBO QUADRADO.
- O IPI documentado é de 3,25% sobre matéria-prima: valor base × 1,0325.
  Confirme a origem do valor e se ele já inclui IPI antes de aplicar o acréscimo.
  Não aplique IPI duas vezes nem o estenda a outras categorias.
- A multiplicação por quantidades ainda não foi documentada completamente.
  Preserve fórmulas existentes e registre o que elas fazem; não crie uma regra
  geral de multiplicação sem confirmação do usuário.
- Compare o peso do PDF com o peso final do orçamento, na mesma unidade e
  abrangência. Qualquer diferença deve ser informada, sem tolerância presumida.
- Não declare o orçamento pronto se faltarem informações, houver divergências
  ou depender de regras não documentadas. A aprovação final é sempre humana.

## Proteção da markup

Identifique arquivos, abas e áreas de markup antes de qualquer gravação.
Considere variações como MARKUP, Mark Up e Mark-up e confirme pelo conteúdo.
Não preencha, limpe, reformate ou substitua células, fórmulas ou campos de markup.
Se estiver em arquivo separado, não grave nesse arquivo. Se estiver em uma aba
ou área de uma planilha de trabalho, preserve seu conteúdo e apresentação.
Não limpe valores de markup já existentes. Se não for possível delimitar ou
preservar a área com segurança, peça apenas a informação necessária.

## Trabalho a executar quando solicitado

1. Inspecione novamente as duas pastas e seus arquivos. Na preparação inicial,
   em 05/10/2026, ambas estavam vazias; não presuma que continuam vazias.
   Ignore temporários do Excel e não reutilize saídas anteriores como entrada.
2. Identifique fontes, modelos, as duas planilhas de destino e a markup a partir
   dos arquivos reais. Não presuma que cada pasta contém exatamente uma planilha.
   Se houver múltiplos candidatos sem indicação clara, solicite a identificação.
3. Mapeie abas, cabeçalhos, células editáveis, fórmulas, unidades, vínculos e
   correspondências entre origem e destino. Registre esse mapeamento em um
   arquivo legível, com evidências dos arquivos e células utilizados.
4. Implemente o que estiver documentado e verificável. Para pendências, informe
   o arquivo, item/campo e a informação necessária. Não transforme ausência em
   zero e não use valores demonstrativos como se fossem dados do orçamento.
5. Crie `preencher_orcamentos.py` com caminhos relativos à própria pasta do
   script, para funcionar mesmo quando iniciado de outro diretório no Windows.
   Use bibliotecas Python adequadas ao formato real; não converta formatos
   perdendo macros, fórmulas, vínculos ou objetos silenciosamente.
6. Ofereça um modo de conferência sem gravação. Gere as planilhas preenchidas
   em `SAIDA/<identificador-da-execucao>/`, preservando os arquivos de origem.
   Só implemente sobrescrita dos originais se o usuário pedir expressamente.
7. Preserve fórmulas, estilos e estrutura dos modelos. Não substitua fórmulas
   por valores fixos. Diferencie leitura de valores em cache de recálculo real;
   informe quando o recálculo no Excel não puder ser validado.
8. Gere relatório de preenchimentos, fontes, campos pendentes e conferência
   de peso. Use os status documentados: PRONTO PARA REVISÃO,
   DIVERGÊNCIA ENCONTRADA, INFORMAÇÃO AUSENTE ou REGRA NÃO DOCUMENTADA.
9. Teste em cópias: dados ausentes, duplicidades/ambiguidade de correspondência,
   divergência de peso, repetição da execução, preservação de fórmulas e markup.
   Verifique que arquivos de origem não mudaram e que a markup foi preservada.
10. Entregue o script, `requirements.txt` e instruções simples para instalar
    dependências e executar. Valide com os arquivos reais quando disponíveis.
    Explique exatamente o que foi testado e qualquer limitação restante.

## Se os arquivos ainda não estiverem disponíveis

Informe quais entradas faltam e solicite que sejam colocadas nas duas pastas.
Não crie um preenchimento fictício, não afirme ter validado os modelos e não
fique monitorando as pastas. Aguarde uma nova solicitação do usuário.
