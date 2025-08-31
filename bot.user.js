
  
  let activeBots = 0;
  const MAX_BOTS = 30;
  let currentServer = null;
  
  // Função global para iniciar bots no servidor específico
  window.startBotsOnServer = function(count = 10, server) {
    if (!server) {
      console.error('❌ Nenhum servidor especificado');
      return;
    }
    
    currentServer = server;
    
    if (activeBots >= MAX_BOTS) {
      console.log('⚠️ Limite máximo de bots atingido');
      return;
    }
    
    console.log(`🤖 Iniciando ${count} bots no servidor: ${server}`);
    
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        if (activeBots < MAX_BOTS) {
          createBot(server);
          activeBots++;
        }
      }, i * 800); // Delay menor para spawn mais rápido
    }
  };
  
  function createBot(server) {
    const botId = 'bot-' + Date.now() + '-' + Math.random().toString(36).substr(2, 3);
    
    const bot = {
      id: botId,
      server: server,
      connected: false,
      status: 'creating',
      ws: null
    };
    
    console.log(`➕ Criando bot ${botId} para ${server}`);
    
    // Iniciar conexão WebSocket real
    connectBot(bot);
  }
  
  function connectBot(bot) {
    try {
      // Gerar token temporário (simulado)
      const tempToken = generateTempToken();
      
      // Conectar ao WebSocket do servidor
      bot.ws = new WebSocket(`wss://${bot.server}/?token=${tempToken}`);
      
      bot.ws.onopen = function() {
        console.log(`✅ Bot ${bot.id} conectado ao ${bot.server}`);
        bot.connected = true;
        bot.status = 'connected';
        
        // Simular spawn do bot
        setTimeout(() => {
          simulateBotSpawn(bot);
        }, 1000);
      };
      
      bot.ws.onerror = function(error) {
        console.error(`❌ Erro na conexão do bot ${bot.id}:`, error);
        bot.connected = false;
        bot.status = 'error';
      };
      
      bot.ws.onclose = function() {
        console.log(`🔌 Bot ${bot.id} desconectado`);
        bot.connected = false;
        bot.status = 'disconnected';
        activeBots--;
      };
      
    } catch (error) {
      console.error(`❌ Falha ao conectar bot ${bot.id}:`, error);
      bot.status = 'failed';
    }
  }
  
  function generateTempToken() {
    // Token temporário simulado
    return 'temp_token_' + Math.random().toString(36).substr(2, 16);
  }
  
  function simulateBotSpawn(bot) {
    if (!bot.connected) return;
    
    console.log(`🎮 Bot ${bot.id} spawnou no jogo`);
    
    // Comportamento do bot - movimento
    setInterval(() => {
      if (bot.connected) {
        // Simular movimento (ângulo aleatório)
        const randomAngle = Math.random() * Math.PI * 2;
        simulateBotAction(bot, 'move', randomAngle);
      }
    }, 3000 + Math.random() * 4000);
    
    // Comportamento do bot - chat
    setInterval(() => {
      if (bot.connected) {
        const messages = [
          "Hello moofuckerssw",
          "iam abdo slave", 
          "search Youtube abdo moomoo io",
          "GitHub powered bots!",
          "Playing on " + bot.server,
          "Auto bot here!",
          "Follow my creator",
          "MooMoo.io ftw!"
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        simulateBotAction(bot, 'chat', randomMsg);
      }
    }, 8000 + Math.random() * 7000);
  }
  
  function simulateBotAction(bot, action, data) {
    if (!bot.connected) return;
    
    switch(action) {
      case 'move':
        console.log(`🎯 Bot ${bot.id} movendo para ângulo: ${data.toFixed(2)}`);
        break;
      case 'chat':
        console.log(`💬 Bot ${bot.id}: ${data}`);
        break;
      case 'attack':
        console.log(`⚔️ Bot ${bot.id} atacando`);
        break;
    }
  }
  
  // Função para parar todos os bots
  window.stopBots = function() {
    console.log('🛑 Parando todos os bots...');
    activeBots = 0;
    // Fechar todas as conexões WebSocket
    // Nota: Não podemos fechar conexões de outros scripts diretamente
  };
  
  // Função para verificar status
  window.getBotStatus = function() {
    return {
      active: activeBots,
      max: MAX_BOTS,
      server: currentServer,
      status: 'running'
    };
  };
  
  console.log('🚀 Servidor de bots carregado do GitHub!');
  console.log('Use: startBotsOnServer(quantidade, "servidor.moomoo.io")');
  console.log('Use: stopBots() para parar');
  console.log('Use: getBotStatus() para ver status');
  

