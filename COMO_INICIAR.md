# Como iniciar o agente de orçamentos

1. Coloque as planilhas e os arquivos de origem nas pastas `ORCAMENTO` e
   `REFERENCIA`, conforme sua organização habitual.
2. Abra esta pasta `raw` no Codex ou volte ao chat que trabalha nela.
3. Envie a mensagem abaixo:

> Leia o AGENTS.md e o REGRAS_ORCAMENTO.md desta pasta. Os arquivos já estão em ORCAMENTO e REFERENCIA. Execute a tarefa do agente: crie e teste o script Python para preencher as duas planilhas, sem alterar a markup.

O `AGENTS.md` guarda as instruções do agente. O `REGRAS_ORCAMENTO.md` é uma
cópia do documento de regras que você forneceu. Eles não executam sozinhos.
O script Python será criado quando você enviar o pedido acima e houver dados
suficientes para mapear o preenchimento.

A markup continuará reservada para seu preenchimento manual. Por padrão,
o script deverá gerar cópias preenchidas em `SAIDA`, preservando os originais.

Formato de instruções utilizado:
[documentação oficial do AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
