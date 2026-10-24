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
  ShieldAlert,
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDj9g45TrlKxpQMqYkcWX_SxaEl1k57TX4',
  authDomain: 'acc-contabilidade.firebaseapp.com',
  projectId: 'acc-contabilidade',
  storageBucket: 'acc-contabilidade.firebasestorage.app',
  messagingSenderId: '69104588374',
  appId: '1:69104588374:web:9f8db8a7de0eb173228df7',
  measurementId: 'G-C3ELM0ZH6B',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [pin, setPin] = useState('');
  const [articles, setArticles] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'artigos'), orderBy('data', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arts = [];
      snapshot.forEach((doc) => {
        arts.push({ id: doc.id, ...doc.data() });
      });
      setArticles(arts);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '0000') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setPin('');
    } else {
      alert('PIN Incorreto');
    }
  };

  const publicarArtigo = async (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;
    try {
      await addDoc(collection(db, 'artigos'), {
        titulo: newTitle,
        conteudo: newContent,
        data: new Date().toISOString(),
      });
      setNewTitle('');
      setNewContent('');
      alert('Publicado com sucesso!');
    } catch (error) {
      alert('Erro ao publicar.');
    }
  };

  const apagarArtigo = async (id) => {
    if (window.confirm('Tem a certeza?')) {
      await deleteDoc(doc(db, 'artigos', id));
    }
  };

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white font-sans">
      <header className="fixed top-0 w-full bg-[#141414] border-b border-red-700/30 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tighter">
              <span className="text-white">a</span>
              <span className="text-[#d32f2f]">c</span>
              <span className="text-white">c</span>
            </h1>
            <div className="leading-tight ml-2 border-l border-red-700 pl-2">
              <p className="text-[10px] uppercase font-bold text-gray-300">
                Auditoria
              </p>
              <p className="text-[10px] uppercase font-bold text-[#d32f2f]">
                Contabilidade
              </p>
              <p className="text-[10px] uppercase font-bold text-gray-300">
                Consultoria
              </p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 font-semibold text-sm">
            <a href="#vantagens" className="hover:text-[#d32f2f]">
              VANTAGENS
            </a>
            <a href="#novidades" className="hover:text-[#d32f2f]">
              NOVIDADES
            </a>
            <a href="#contactos" className="hover:text-[#d32f2f]">
              CONTACTOS
            </a>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
          O seu negócio <span className="text-[#d32f2f]">tem números?</span>
        </h2>
        <h3 className="text-2xl md:text-4xl font-bold text-[#d32f2f] mb-8">
          Está a dar-lhes a devida atenção?
        </h3>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Deixe a contabilidade connosco e dedique-se ao que faz melhor:{' '}
          <strong className="text-white">fazer o seu negócio crescer!</strong>
        </p>
      </section>

      <section
        id="vantagens"
        className="py-20 bg-[#141414] border-y border-red-900/30"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="flex items-center gap-6">
            <CheckCircle2 className="w-16 h-16 text-[#d32f2f]" />
            <div>
              <h4 className="text-2xl font-black uppercase">Poupe Dinheiro</h4>
              <p className="text-gray-400">Otimização fiscal rigorosa</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Clock className="w-16 h-16 text-[#d32f2f]" />
            <div>
              <h4 className="text-2xl font-black uppercase">Poupe Tempo</h4>
              <p className="text-gray-400">Mais tempo para a sua gestão</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <TrendingUp className="w-16 h-16 text-[#d32f2f]" />
            <div>
              <h4 className="text-2xl font-black uppercase">
                Decida com Confiança
              </h4>
              <p className="text-gray-400">
                Com base em informações reais e atuais
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <ShieldAlert className="w-16 h-16 text-[#d32f2f]" />
            <div>
              <h4 className="text-2xl font-black uppercase">Evite Surpresas</h4>
              <p className="text-gray-400">
                Prazos e obrigações cumpridos a 100%
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="novidades" className="py-20 max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12 border-b border-red-900/30 pb-4">
          <h3 className="text-3xl font-black uppercase text-[#d32f2f]">
            Novidades
          </h3>
          {isAdmin && (
            <button
              onClick={() => setIsAdmin(false)}
              className="bg-gray-800 px-4 py-2 rounded text-sm"
            >
              Sair
            </button>
          )}
        </div>

        {isAdmin && (
          <form
            onSubmit={publicarArtigo}
            className="bg-[#141414] p-6 border border-[#d32f2f] rounded mb-12 flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Título"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-[#1f1f1f] p-3 rounded"
              required
            />
            <textarea
              placeholder="Conteúdo..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="bg-[#1f1f1f] p-3 rounded h-32"
              required
            />
            <button
              type="submit"
              className="bg-[#d32f2f] text-white font-bold py-3 rounded"
            >
              PUBLICAR
            </button>
          </form>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {articles.length === 0 ? (
            <p className="text-gray-500 italic">
              Nenhum artigo publicado ainda. Faça login no rodapé para publicar.
            </p>
          ) : (
            articles.map((artigo) => (
              <div
                key={artigo.id}
                className="bg-[#141414] p-6 border border-gray-800 rounded relative"
              >
                {isAdmin && (
                  <button
                    onClick={() => apagarArtigo(artigo.id)}
                    className="absolute top-4 right-4 text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <h4 className="text-xl font-bold mb-2">{artigo.titulo}</h4>
                <p className="text-sm text-[#d32f2f] mb-4">
                  {new Date(artigo.data).toLocaleDateString('pt-PT')}
                </p>
                <p className="text-gray-400 whitespace-pre-wrap">
                  {artigo.conteudo}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      <section id="contactos" className="py-20 bg-[#141414]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="bg-[#1f1f1f] p-8 border border-gray-800 rounded">
            <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <MapPin className="text-[#d32f2f]" /> Sede - Tarrafal
            </h4>
            <p className="flex items-center gap-3 mb-3">
              <Phone className="text-[#d32f2f] w-5 h-5" /> 935 425 8 / 955 262 8
            </p>
            <p className="flex items-center gap-3 mb-3">
              <Phone className="text-[#d32f2f] w-5 h-5" /> 266 106 0
            </p>
            <p className="flex items-center gap-3">
              <Mail className="text-[#d32f2f] w-5 h-5" /> acc.acclda@sapo.cv
            </p>
          </div>
          <div className="bg-[#1f1f1f] p-8 border border-gray-800 rounded">
            <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <MapPin className="text-[#d32f2f]" /> Filial - Praia
            </h4>
            <p className="flex items-center gap-3 mb-3">
              <Phone className="text-[#d32f2f] w-5 h-5" /> 935 425 8 / 955 262 8
            </p>
            <p className="flex items-center gap-3">
              <Mail className="text-[#d32f2f] w-5 h-5" /> acc.acclda@sapo.cv
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-black py-8 border-t border-red-900/30 text-center relative">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} ACC - Auditoria, Contabilidade e
          Consultoria.
        </p>
        {!isAdmin && (
          <div className="absolute bottom-6 right-6">
            <button onClick={() => setShowAdminLogin(!showAdminLogin)}>
              <Lock className="w-5 h-5 text-gray-800 hover:text-gray-500" />
            </button>
            {showAdminLogin && (
              <form
                onSubmit={handleLogin}
                className="absolute bottom-8 right-0 bg-[#1f1f1f] p-4 flex gap-2 rounded border border-gray-700"
              >
                <input
                  type="password"
                  placeholder="PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="bg-black text-white p-2 w-24 text-center border border-gray-700"
                />
                <button
                  type="submit"
                  className="bg-[#d32f2f] text-white px-4 font-bold rounded"
                >
                  OK
                </button>
              </form>
            )}
          </div>
        )}
      </footer>
    </div>
  );
}
