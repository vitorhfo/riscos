# AGENTS.md — Assistente de Orçamentos

## 1. Objetivo

Este documento define as regras conhecidas para auxiliar no preenchimento,
cálculo e conferência de orçamentos.

O sistema será desenvolvido em Python.

O objetivo do sistema é:

1. Receber as informações necessárias para o orçamento.
2. Identificar e separar os itens.
3. Classificar os materiais.
4. Aplicar as regras de cálculo documentadas.
5. Auxiliar no preenchimento das planilhas.
6. Conferir os resultados.
7. Identificar divergências.
8. Entregar o orçamento preenchido para revisão humana.

IMPORTANTE:

O processo ainda está sendo aprendido.

Nunca criar ou assumir uma regra que não esteja documentada neste arquivo.

---

# 2. Responsabilidade do sistema

O sistema auxilia na preparação do orçamento.

Ele NÃO é responsável pela aprovação final.

Fluxo:

ENTRADA
    ↓
PYTHON
    ↓
PROCESSAMENTO
    ↓
PREENCHIMENTO
    ↓
VALIDAÇÕES
    ↓
ORÇAMENTO PREPARADO
    ↓
REVISÃO HUMANA
    ↓
APROVAÇÃO

A aprovação final sempre será realizada pelo usuário.

---

# 3. Regra de segurança

Quando uma informação estiver:

- ausente;
- ambígua;
- ilegível;
- inconsistente;
- diferente das regras conhecidas;
- ou não estiver documentada neste arquivo;

o sistema deve:

1. NÃO inventar informação.
2. NÃO escolher silenciosamente.
3. NÃO assumir um valor.
4. NÃO aprovar o orçamento.
5. Sinalizar a situação para revisão humana.

Status possíveis:

- PRONTO PARA REVISÃO
- DIVERGÊNCIA ENCONTRADA
- INFORMAÇÃO AUSENTE
- REGRA NÃO DOCUMENTADA

---

# 4. Unidade padrão

Todas as dimensões utilizadas no orçamento são trabalhadas em:

MILÍMETROS (mm)

Usar mm para:

- comprimento;
- largura;
- espessura;
- diâmetro;
- demais dimensões lineares.

Exemplos:

Comprimento = 1000 mm
Largura = 500 mm
Espessura = 3 mm
Diâmetro = 20 mm

O sistema não deve assumir automaticamente outra unidade.

Se a unidade encontrada não estiver clara:

SINALIZAR PARA REVISÃO HUMANA.

Não converter silenciosamente.

---

# 5. Itens do orçamento

Cada item deve ser identificado e tratado separadamente.

Para cada item, registrar as informações disponíveis.

Estrutura inicial:

ITEM
- identificação
- descrição
- quantidade
- grupo
- dimensões
- peso
- valor da matéria-prima
- demais informações necessárias

A estrutura poderá receber novos campos conforme o processo for aprendido.

---

# 6. Regra para múltiplos itens

Quando houver mais de um item, é necessário considerar a multiplicação
dos elementos no orçamento.

ATENÇÃO:

A forma exata dessa multiplicação ainda precisa ser documentada.

Antes de automatizar essa regra, descobrir:

- o que exatamente é multiplicado;
- por qual quantidade;
- em qual etapa;
- como isso influencia o peso;
- como isso influencia o custo.

Até essa regra estar completamente documentada, qualquer situação
duvidosa deve ser enviada para revisão humana.

---

# 7. Separação dos itens

Os itens devem ser separados corretamente.

Não misturar materiais diferentes como se fossem um único item.

Cada item deve manter suas próprias informações de:

- quantidade;
- dimensões;
- peso;
- grupo;
- custo;
- matéria-prima.

---

# 8. Agrupamento de materiais

Materiais semelhantes devem permanecer juntos.

Exemplos conhecidos:

- chapa com chapa;
- arame com arame;
- tubo redondo com tubo redondo;
- tubo quadrado com tubo quadrado.

Evitar misturar grupos diferentes.

Exemplo:

CHAPAS
- Item A
- Item B
- Item C

ARAMES
- Item D
- Item E

TUBOS REDONDOS
- Item F

TUBOS QUADRADOS
- Item G
- Item H

---

# 9. Classificação por grupo

Na planilha de cálculo da matéria-prima existe uma informação de GRUPO.

O grupo sinaliza o tipo de material.

Grupos identificados até o momento:

- CHAPA
- ARAME
- TUBO REDONDO
- TUBO QUADRADO

Outros grupos poderão existir.

Nunca criar um grupo novo automaticamente.

Caso apareça um material cuja classificação ainda não esteja documentada:

REGRA NÃO DOCUMENTADA

e solicitar classificação humana.

---

# 10. Planilha de cálculo

Existe uma planilha utilizada para cálculo da matéria-prima.

Ela contém informações relacionadas aos materiais utilizados no orçamento.

Entre as informações conhecidas está:

GRUPO

O grupo permite identificar se o material é:

- chapa;
- arame;
- tubo redondo;
- tubo quadrado.

Os campos exatos da planilha ainda serão mapeados.

É necessário descobrir posteriormente:

- nome de cada coluna;
- quais campos são preenchidos manualmente;
- quais campos possuem fórmula;
- quais informações vêm do PDF;
- quais informações são calculadas;
- quais informações são transferidas para outras planilhas.

---

# 11. Matéria-prima

O orçamento utiliza valores de matéria-prima.

Os valores da matéria-prima são utilizados na planilha de cálculo e/ou
na planilha de custo.

O fluxo exato ainda está sendo documentado.

Nunca assumir de onde vem um valor de matéria-prima até a origem desse
valor estar registrada neste documento.

---

<!-- # 12. IPI da matéria-prima

Regra conhecida:

O valor da matéria-prima deve receber acréscimo de:

3,25% de IPI

Fórmula:

VALOR COM IPI = VALOR DA MATÉRIA-PRIMA × 1,0325

Exemplo:

Valor da matéria-prima:
R$ 1.000,00

IPI:
3,25%

Resultado:

R$ 1.000,00 × 1,0325
= R$ 1.032,50

IMPORTANTE:

Até o momento, essa regra está documentada especificamente para
MATÉRIA-PRIMA.

Não aplicar 3,25% automaticamente em outros valores sem que uma nova
regra seja documentada.

--- -->

# 13. Planilha de custo

Existe uma planilha de custo.

Nela são informados:

- item;
- valor.

Foram identificadas duas páginas/áreas importantes:

## 13.1 Relação de Material Comprado

Utilizada para informações relacionadas aos materiais comprados.

O funcionamento completo ainda precisa ser documentado.

## 13.2 Matéria-Prima

Relacionada aos valores preenchidos na planilha de cálculo.

O fluxo exato entre:

PLANILHA DE CÁLCULO
        ↓
PLANILHA DE CUSTO
        ↓
ORÇAMENTO

ainda será mapeado.

---

# 14. Peso

O peso é uma informação crítica do orçamento.

Existe uma conferência obrigatória do peso ao final do processo.

O peso final precisa bater.

Fluxo conhecido:

PDF
    ↓
ITENS
    ↓
PLANILHA DE CÁLCULO
    ↓
PLANILHA DE CUSTO / ORÇAMENTO
    ↓
CONFERÊNCIA DO PESO

O peso informado/obtido a partir do PDF deve conferir com o peso final
utilizado no orçamento/planilha.

---

# 15. Validação do peso

Antes de considerar o orçamento pronto para revisão:

PESO DO PDF = PESO FINAL DO ORÇAMENTO

Se os valores forem iguais:

PRONTO PARA REVISÃO

Se os valores forem diferentes:

DIVERGÊNCIA ENCONTRADA

O sistema NÃO deve ignorar diferenças de peso.

Quando houver divergência:

1. parar a conclusão;
2. informar o peso esperado;
3. informar o peso calculado;
4. informar a diferença;
5. solicitar revisão humana.

Exemplo:

Peso PDF:
1.250 kg

Peso orçamento:
1.230 kg

Diferença:
20 kg

STATUS:
DIVERGÊNCIA ENCONTRADA

---

# 16. Tolerância de peso

Ainda não foi documentado se existe tolerância aceitável para diferenças
de peso.

Portanto:

NÃO assumir tolerância.

Até que exista uma regra oficial, qualquer diferença deve ser sinalizada.

REGRA PENDENTE:
Descobrir se existe tolerância de peso e, caso exista, qual é.

---

# 17. Fluxo inicial conhecido