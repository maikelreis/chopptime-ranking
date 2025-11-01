import React, { useState, useEffect } from 'react';
import { Trophy, Beer, Plus, Flame, Crown, Medal, TrendingUp } from 'lucide-react';

const ChopptimeDashboard = () => {
  const ML_POR_COPO = 330;
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [copos, setCopos] = useState('');
  const [paginaAtual, setPaginaAtual] = useState('ranking'); // 'ranking' ou 'atendente'
  const [animacao, setAnimacao] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await window.storage.get('chopptime-clientes');
      if (result && result.value) {
        setClientes(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('Iniciando nova lista de clientes');
    }
  };

  const saveData = async (novosClientes) => {
    try {
      await window.storage.set('chopptime-clientes', JSON.stringify(novosClientes));
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const adicionarConsumo = () => {
    if (!nome.trim() || !copos || parseInt(copos) <= 0) return;

    const quantidade = parseInt(copos);
    const clienteExiste = clientes.find(c => c.nome.toLowerCase() === nome.trim().toLowerCase());

    let novosClientes;
    if (clienteExiste) {
      novosClientes = clientes.map(c =>
        c.nome.toLowerCase() === nome.trim().toLowerCase()
          ? { ...c, copos: c.copos + quantidade }
          : c
      );
    } else {
      novosClientes = [...clientes, { nome: nome.trim(), copos: quantidade, id: Date.now() }];
    }

    novosClientes.sort((a, b) => b.copos - a.copos);
    setClientes(novosClientes);
    saveData(novosClientes);
    
    setAnimacao(nome.trim());
    setTimeout(() => setAnimacao(null), 1000);
    
    setNome('');
    setCopos('');
  };

  const limparRanking = async () => {
    if (window.confirm('Tem certeza que deseja limpar todo o ranking?')) {
      setClientes([]);
      try {
        await window.storage.delete('chopptime-clientes');
      } catch (error) {
        console.log('Ranking limpo');
      }
    }
  };

  const topCinco = clientes.slice(0, 5);
  const totalMl = clientes.reduce((acc, c) => acc + (c.copos * ML_POR_COPO), 0);
  const totalLitros = (totalMl / 1000).toFixed(1);

  const getMedalha = (posicao) => {
    const medals = [
      { icon: Crown, color: '#FFD700', bgColor: 'from-yellow-400 to-yellow-600' },
      { icon: Trophy, color: '#C0C0C0', bgColor: 'from-gray-300 to-gray-500' },
      { icon: Medal, color: '#CD7F32', bgColor: 'from-orange-400 to-orange-600' },
      { icon: TrendingUp, color: '#FF6B6B', bgColor: 'from-red-400 to-red-600' },
      { icon: Beer, color: '#FFA500', bgColor: 'from-orange-300 to-orange-500' }
    ];
    return medals[posicao] || medals[4];
  };

  const CopoAnimado = ({ ml, maxMl, posicao, nome, isAnimado }) => {
    const porcentagem = (ml / maxMl) * 100;
    const medalha = getMedalha(posicao);
    const MedalIcon = medalha.icon;
    
    // Cores do chopp baseado na posição
    const corChopp = posicao === 0 
      ? 'from-yellow-300 via-amber-400 to-orange-500'
      : posicao === 1
      ? 'from-amber-200 via-yellow-300 to-amber-400'
      : 'from-amber-300 via-orange-400 to-amber-500';

    const litros = (ml / 1000).toFixed(1);

    return (
      <div className={`relative ${isAnimado ? 'animate-bounce' : ''}`}>
        {/* Medalha no topo */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
          <MedalIcon 
            className="w-12 h-12 drop-shadow-lg animate-pulse" 
            style={{ color: medalha.color }}
          />
        </div>

        {/* Container do Copo */}
        <div className="relative w-full h-96 flex flex-col items-center">
          {/* Nome do Cliente acima do copo */}
          <div className="mb-6 mt-4 text-center">
            <div className="text-3xl font-black text-white drop-shadow-lg">
              {nome}
            </div>
            <div className="text-lg text-yellow-200 font-bold">
              #{posicao + 1}
            </div>
          </div>

          {/* Copo SVG */}
          <div className="relative w-48 h-72">
            <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
              <defs>
                {/* Gradiente do chopp */}
                <linearGradient id={`chopp-${posicao}`} x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" className="text-amber-600" stopColor="currentColor" />
                  <stop offset="50%" className="text-amber-400" stopColor="currentColor" />
                  <stop offset="100%" className="text-yellow-300" stopColor="currentColor" />
                </linearGradient>
                
                {/* Gradiente da espuma */}
                <linearGradient id={`espuma-${posicao}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FFF8DC" stopOpacity="0.9" />
                </linearGradient>

                {/* Brilho do vidro */}
                <linearGradient id={`brilho-${posicao}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              
              {/* Corpo do copo (trapézio) */}
              <path
                d="M 60 20 L 50 280 L 150 280 L 140 20 Z"
                fill="rgba(255, 255, 255, 0.15)"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="3"
              />
              
              {/* Chopp (preenchimento animado) */}
              <clipPath id={`copo-clip-${posicao}`}>
                <path d="M 60 20 L 50 280 L 150 280 L 140 20 Z" />
              </clipPath>
              
              {/* Líquido do chopp */}
              <rect
                x="50"
                y={280 - (porcentagem * 2.6)}
                width="100"
                height={porcentagem * 2.6}
                fill={`url(#chopp-${posicao})`}
                clipPath={`url(#copo-clip-${posicao})`}
                className="transition-all duration-1000 ease-out"
              />
              
              {/* Espuma */}
              {porcentagem > 10 && (
                <>
                  <ellipse
                    cx="100"
                    cy={280 - (porcentagem * 2.6) - 5}
                    rx="45"
                    ry="12"
                    fill={`url(#espuma-${posicao})`}
                    clipPath={`url(#copo-clip-${posicao})`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <ellipse
                    cx="100"
                    cy={280 - (porcentagem * 2.6) - 15}
                    rx="40"
                    ry="10"
                    fill={`url(#espuma-${posicao})`}
                    clipPath={`url(#copo-clip-${posicao})`}
                    className="transition-all duration-1000 ease-out animate-pulse"
                  />
                </>
              )}
              
              {/* Brilho do vidro */}
              <ellipse
                cx="75"
                cy="150"
                rx="15"
                ry="60"
                fill={`url(#brilho-${posicao})`}
                opacity="0.6"
              />
              
              {/* Borda do copo por cima */}
              <path
                d="M 60 20 L 50 280 L 150 280 L 140 20 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="3"
              />
            </svg>

            {/* Valor em ML dentro do copo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-black/30 backdrop-blur-sm rounded-xl px-4 py-2">
                <div className="text-4xl font-black text-white drop-shadow-lg">
                  {ml.toLocaleString()}
                </div>
                <div className="text-xl font-bold text-yellow-300">
                  ML
                </div>
                <div className="text-lg text-white/90 mt-1">
                  ({litros}L)
                </div>
              </div>
            </div>
          </div>

          {/* Info adicional */}
          <div className="mt-20 text-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <div className="text-white font-bold">
              🍺 {(ml / ML_POR_COPO).toFixed(0)} copos
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 p-4">
      {paginaAtual === 'ranking' ? (
        /* PÁGINA DO RANKING */
        <>
          {/* Botão Flutuante Modo Atendente */}
          <button
            onClick={() => setPaginaAtual('atendente')}
            className="fixed top-6 right-6 z-50 bg-yellow-400 hover:bg-yellow-300 text-gray-900 p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-200 animate-pulse"
            title="Abrir Modo Atendente"
          >
            <Plus className="w-8 h-8" />
          </button>

          {/* Header do Ranking */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="text-center mb-6 animate-pulse">
              <div className="inline-block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 text-transparent bg-clip-text">
                <h1 className="text-6xl font-black mb-2 drop-shadow-2xl">🍺 ENCONTRINHO 🍺</h1>
              </div>
              <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-2">CHOPPTIME RANKING</h2>
              <p className="text-xl text-yellow-200 font-semibold animate-bounce">👑 QUEM MANDA NO COPO! 👑</p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4 mb-24">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center border-2 border-yellow-300">
                <Beer className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-3xl font-black text-white">{totalLitros}L</div>
                <div className="text-sm text-yellow-100">Litros Totais</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center border-2 border-yellow-300">
                <Flame className="w-8 h-8 mx-auto mb-2 text-orange-300" />
                <div className="text-3xl font-black text-white">{clientes.length}</div>
                <div className="text-sm text-yellow-100">Participantes</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center border-2 border-yellow-300">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-3xl font-black text-white">{topCinco[0] ? (topCinco[0].copos * ML_POR_COPO).toLocaleString() : 0}ml</div>
                <div className="text-sm text-yellow-100">Recorde</div>
              </div>
            </div>
          </div>

          {/* Dashboard de Ranking */}
          <div className="max-w-7xl mx-auto">
            {topCinco.length === 0 ? (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-16 text-center border-4 border-yellow-400">
                <Beer className="w-24 h-24 mx-auto mb-6 text-orange-400 opacity-50" />
                <p className="text-3xl font-bold text-gray-600">
                  Nenhum registro ainda!
                </p>
                <p className="text-xl text-gray-500 mt-2">
                  O ranking vai aparecer aqui 🍺
                </p>
              </div>
            ) : (
              <div className="flex items-end justify-center gap-4 flex-wrap">
                {[1, 0, 2, 3, 4].map((posOriginal) => {
                  if (!topCinco[posOriginal]) return null;
                  
                  const cliente = topCinco[posOriginal];
                  const ml = cliente.copos * ML_POR_COPO;
                  const maxMl = topCinco[0].copos * ML_POR_COPO;
                  const isAnimado = animacao === cliente.nome;

                  const alturasPedestal = {
                    0: 'h-32',
                    1: 'h-24',
                    2: 'h-20',
                    3: 'h-16',
                    4: 'h-12'
                  };

                  const escalas = {
                    0: 'scale-110',
                    1: 'scale-100',
                    2: 'scale-95',
                    3: 'scale-90',
                    4: 'scale-85'
                  };

                  return (
                    <div key={cliente.id} className="flex flex-col items-center">
                      <div className={`transform ${escalas[posOriginal]} transition-all duration-500`}>
                        <CopoAnimado
                          ml={ml}
                          maxMl={maxMl}
                          posicao={posOriginal}
                          nome={cliente.nome}
                          isAnimado={isAnimado}
                        />
                      </div>
                      
                      <div className={`w-48 ${alturasPedestal[posOriginal]} bg-gradient-to-b ${
                        posOriginal === 0 
                          ? 'from-yellow-400 to-yellow-600 border-4 border-yellow-300' 
                          : posOriginal === 1
                          ? 'from-gray-300 to-gray-500 border-4 border-gray-200'
                          : posOriginal === 2
                          ? 'from-orange-400 to-orange-600 border-4 border-orange-300'
                          : 'from-red-400 to-red-600 border-4 border-red-300'
                      } rounded-t-xl shadow-2xl flex items-center justify-center transition-all duration-500`}>
                        <span className="text-4xl font-black text-white drop-shadow-lg">
                          {posOriginal + 1}º
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-white/80">
            <p className="text-lg font-semibold">📍 LIDA URBANA - Rua Santana, 3397</p>
            <p className="text-sm">Encontrinho © 2025 - Todos os direitos reservados</p>
            <p className="text-sm">Produzido por MagoIT Soluções</p>
          </div>
        </>
      ) : (
        /* PÁGINA DO ATENDENTE */
        <div className="max-w-4xl mx-auto">
          {/* Botão Voltar */}
          <button
            onClick={() => setPaginaAtual('ranking')}
            className="mb-6 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-2xl">←</span> Voltar ao Ranking
          </button>

          {/* Painel do Atendente */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-yellow-400">
            <h3 className="text-3xl font-black text-orange-600 mb-6 text-center flex items-center justify-center gap-3">
              <Plus className="w-8 h-8" />
              Registrar Consumo
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2 text-lg">Nome do Cliente:</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && document.getElementById('coposInput').focus()}
                  className="w-full px-6 py-4 text-xl border-3 border-orange-300 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                  placeholder="Digite o nome..."
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-bold mb-2 text-lg">Quantidade de Copos (330ml cada):</label>
                <input
                  id="coposInput"
                  type="number"
                  value={copos}
                  onChange={(e) => setCopos(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && adicionarConsumo()}
                  className="w-full px-6 py-4 text-xl border-3 border-orange-300 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                  placeholder="Quantos copos?"
                  min="1"
                />
                {copos && (
                  <p className="text-orange-600 font-bold mt-2 text-lg">
                    = {(parseInt(copos) * ML_POR_COPO).toLocaleString()}ml ({(parseInt(copos) * ML_POR_COPO / 1000).toFixed(1)}L)
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={adicionarConsumo}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black py-5 px-8 rounded-2xl text-xl hover:from-orange-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                ✅ ADICIONAR
              </button>
              
              <button
                onClick={limparRanking}
                className="bg-red-600 text-white font-bold py-5 px-8 rounded-2xl hover:bg-red-700 transition-all duration-200 shadow-xl"
              >
                🗑️ Limpar
              </button>
            </div>

            {/* Lista Completa */}
            <div className="mt-8 pt-8 border-t-4 border-orange-300">
              <h4 className="text-2xl font-bold text-gray-700 mb-4">📋 Lista Completa:</h4>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {clientes.map((cliente, idx) => (
                  <div key={cliente.id} className="bg-orange-50 p-3 rounded-xl flex justify-between items-center">
                    <span className="font-bold text-gray-700">{idx + 1}. {cliente.nome}</span>
                    <div className="text-right">
                      <div className="text-orange-600 font-black text-lg">
                        {(cliente.copos * ML_POR_COPO).toLocaleString()}ml
                      </div>
                      <div className="text-gray-500 text-sm">
                        {cliente.copos} copos | {(cliente.copos * ML_POR_COPO / 1000).toFixed(1)}L
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChopptimeDashboard;