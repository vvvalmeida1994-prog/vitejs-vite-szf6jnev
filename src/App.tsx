import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  FileText, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Mail, 
  Lock, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ShieldAlert 
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForACCApp2026",
  authDomain: "acc-consultoria.firebaseapp.com",
  projectId: "acc-consultoria",
  storageBucket: "acc-consultoria.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: Article[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        docs.push({
          id: docSnap.id,
          title: data.title,
          content: data.content,
          date: data.date
        });
      });
      setArticles(docs);
    });
    return () => unsubscribe();
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1994') {
      setIsAdmin(true);
      setShowPinModal(false);
      setPinInput('');
    } else {
      alert('PIN Incorreto!');
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    await addDoc(collection(db, 'articles'), {
      title: newTitle,
      content: newContent,
      date: new Date().toLocaleDateString('pt-PT'),
      createdAt: new Date()
    });

    setNewTitle('');
    setNewContent('');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem a certeza que deseja eliminar este artigo?')) {
      await deleteDoc(doc(db, 'articles', id));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Cabeçalho */}
      <header className="border-b border-neutral-800 bg-neutral-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#d32f2f] text-white font-black text-2xl px-3 py-1 rounded tracking-wider">
              ACC
            </div>
            <div className="text-left leading-tight">
              <h1 className="font-bold text-sm tracking-wider uppercase text-white">
                AUDITORIA, CONTABILIDADE
              </h1>
              <p className="text-sm text-white font-bold tracking-wider uppercase">
                E CONSULTORIA
              </p>
            </div>
          </div>
          <a 
            href="#contactos" 
            className="bg-[#d32f2f] hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition"
          >
            Falar Connosco
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center max-w-4xl mx-auto flex-1 flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">
          O seu negócio <span className="text-[#d32f2f]">tem números?</span><br />
          Está a dar-lhes a devida atenção?
        </h2>
        <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
          Deixe a contabilidade connosco e dedique-se ao que faz melhor: <strong className="text-white">fazer o seu negócio crescer!</strong>
        </p>
      </section>

      {/* Secção de Vantagens */}
      <section className="bg-neutral-900/50 py-12 border-y border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8 text-left">
          <div className="flex items-center gap-4 bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
            <CheckCircle2 className="w-12 h-12 text-[#d32f2f] shrink-0" />
            <div>
              <h4 className="text-xl font-black uppercase text-white">POUPE DINHEIRO</h4>
              <p className="text-neutral-400 text-sm">Otimização do rigor fiscal</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
            <Clock className="w-12 h-12 text-[#d32f2f] shrink-0" />
            <div>
              <h4 className="text-xl font-black uppercase text-white">POUPE TEMPO</h4>
              <p className="text-neutral-400 text-sm">Mais tempo para a sua gestão</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
            <TrendingUp className="w-12 h-12 text-[#d32f2f] shrink-0" />
            <div>
              <h4 className="text-xl font-black uppercase text-white">DECIDA COM CONFIANÇA</h4>
              <p className="text-neutral-400 text-sm">Com base em informações reais e atuais</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
            <ShieldAlert className="w-12 h-12 text-[#d32f2f] shrink-0" />
            <div>
              <h4 className="text-xl font-black uppercase text-white">EVITE SURPRESAS</h4>
              <p className="text-neutral-400 text-sm">Prazos e obrigações cumpridos a 100%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Secção de Novidades / Notícias */}
      <section className="py-16 max-w-4xl mx-auto px-4 w-full">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-white">Novidades & Publicações</h3>
          {isAdmin && (
            <button 
              onClick={() => setIsAdmin(false)} 
              className="text-xs text-neutral-400 hover:text-white border border-neutral-700 px-3 py-1 rounded"
            >
              Sair do Painel Admin
            </button>
          )}
        </div>

        {/* Formulário Admin */}
        {isAdmin && (
          <form onSubmit={handlePublish} className="bg-neutral-900 p-6 rounded-2xl border border-[#d32f2f] mb-12 text-left">
            <h4 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#d32f2f]" /> Nova Publicação
            </h4>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Título da publicação..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-[#d32f2f]"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Escreva aqui a novidade..."
                rows={4}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-[#d32f2f]"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#d32f2f] hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold text-sm transition"
            >
              PUBLICAR
            </button>
          </form>
        )}

        {/* Lista de Artigos */}
        <div className="space-y-6">
          {articles.length === 0 ? (
            <p className="text-neutral-500 text-center py-8">
              Nenhum artigo publicado ainda. Faça login no rodapé para publicar.
            </p>
          ) : (
            articles.map((art) => (
              <article key={art.id} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-left relative">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-white">{art.title}</h4>
                  {isAdmin && (
                    <button 
                      onClick={() => handleDelete(art.id)}
                      className="text-neutral-500 hover:text-red-500 transition p-1"
                      title="Eliminar artigo"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-[#d32f2f] mb-4 font-semibold">{art.date}</p>
                <p className="text-neutral-300 text-sm whitespace-pre-line leading-relaxed">{art.content}</p>
              </article>
            ))
          )}
        </div>
      </section>

      {/* Contactos e Escritórios (EXATAMENTE COMO NA IMAGEM) */}
      <section id="contactos" className="bg-neutral-950 py-16 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 text-left">
            
            {/* Tarrafal */}
            <div className="bg-neutral-900/90 p-8 rounded-2xl border border-neutral-800/80 shadow-lg">
              <h4 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#d32f2f]" /> Sede - Tarrafal
              </h4>
              <div className="space-y-4 text-white text-lg font-medium">
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#d32f2f] shrink-0" /> 
                  <span>935 425 8 / 955 262 8</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#d32f2f] shrink-0" /> 
                  <span>266 106 0</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#d32f2f] shrink-0" /> 
                  <span>acc.acclda@sapo.cv</span>
                </p>
              </div>
            </div>

            {/* Praia */}
            <div className="bg-neutral-900/90 p-8 rounded-2xl border border-neutral-800/80 shadow-lg">
              <h4 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#d32f2f]" /> Filial - Praia
              </h4>
              <div className="space-y-4 text-white text-lg font-medium">
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#d32f2f] shrink-0" /> 
                  <span>935 425 8 / 955 262 8</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#d32f2f] shrink-0" /> 
                  <span>acc.acclda@sapo.cv</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-neutral-950 border-t border-neutral-800/60 py-8 text-center text-xs text-neutral-400 relative">
        <p>© {new Date().getFullYear()} ACC – Auditoria, Contabilidade e Consultoria.</p>
        
        {/* Botão de Admin no Canto Inferior */}
        <button 
          onClick={() => setShowPinModal(true)}
          className="absolute right-6 bottom-6 text-neutral-600 hover:text-neutral-300 transition p-2"
          title="Acesso Reservado"
        >
          <Lock className="w-4 h-4" />
        </button>
      </footer>

      {/* Modal de PIN do Admin */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl max-w-xs w-full text-center">
            <Lock className="w-10 h-10 text-[#d32f2f] mx-auto mb-4" />
            <h4 className="text-lg font-bold mb-2 text-white">Painel de Gestão ACC</h4>
            <p className="text-xs text-neutral-400 mb-4">Introduza o PIN de acesso:</p>
            <form onSubmit={handleAdminLogin}>
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="****"
                className="w-full text-center text-2xl tracking-widest bg-neutral-950 border border-neutral-700 text-white rounded-lg p-2 mb-4 focus:outline-none focus:border-[#d32f2f]"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="w-1/2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-2 rounded-lg text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-[#d32f2f] hover:bg-red-700 text-white py-2 rounded-lg text-sm font-bold"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}