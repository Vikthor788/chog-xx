import { useState, useEffect } from "react";
import { seedGossip, generateRandomGossip } from "./utils/mockGossip";
import { useWallet } from "./hooks/useWallet";
import { getPersonality } from "./utils/personality";

function App() {
  const { account, holdsChog, demoChogId, connect, toggleHold } = useWallet();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("chog-gossip");
    setPosts(saved ? JSON.parse(saved) : seedGossip);
  }, []);

  useEffect(() => {
    localStorage.setItem("chog-gossip", JSON.stringify(posts));
  }, [posts]);

  const addPost = () => {
    if (!holdsChog || !newPost.trim()) return;
    const post = {
      id: Date.now(),
      chogId: demoChogId,
      text: newPost.trim(),
      timestamp: Date.now(),
      reactions: { fire: 0, skull: 0, heart: 0 },
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const react = (id, type) => {
    if (!holdsChog) return;
    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, reactions: { ...p.reactions, [type]: p.reactions[type] + 1 } }
          : p
      )
    );
  };

  const injectGossip = () => {
    setPosts([generateRandomGossip(), ...posts]);
  };

  const myPersonality = demoChogId ? getPersonality(demoChogId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0720] via-[#1a0b2e] to-black text-white">
      <header className="border-b border-purple-900/40 bg-black/50 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
              🟣
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">ChogGossip</h1>
              <p className="text-xs text-purple-300/80">Living timeline of the Chogs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {account ? (
              <div className="text-right">
                <div className="text-sm text-purple-200">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </div>
                <button
                  onClick={toggleHold}
                  className={`text-xs px-3 py-1.5 rounded-full mt-1 font-medium transition ${
                    holdsChog
                      ? "bg-emerald-600 hover:bg-emerald-500"
                      : "bg-purple-700 hover:bg-purple-600"
                  }`}
                >
                  {holdsChog ? `Chog #${demoChogId}` : "Simulate Hold"}
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-5 py-2 rounded-xl text-sm font-medium shadow-lg shadow-purple-900/40"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {holdsChog && myPersonality && (
          <div className="mb-6 bg-gradient-to-r from-purple-950/60 to-pink-950/40 border border-purple-800/50 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-3xl shadow-inner">
              🟣
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Chog #{demoChogId}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full bg-black/40 ${myPersonality.color}`}>
                  {myPersonality.emoji} {myPersonality.name}
                </span>
              </div>
              <p className="text-sm text-purple-300 mt-0.5">{myPersonality.desc}</p>
            </div>
          </div>
        )}

        <div className="bg-black/40 border border-purple-900/40 rounded-2xl p-4 mb-6 shadow-xl">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder={
              holdsChog
                ? `Post as Chog #${demoChogId} (${myPersonality?.name})...`
                : "Connect & simulate holding a Chog to post"
            }
            disabled={!holdsChog}
            className="w-full bg-transparent resize-none outline-none placeholder-purple-400/60 text-sm leading-relaxed"
            rows={3}
          />
          <div className="flex justify-between items-center mt-3">
            <button
              onClick={injectGossip}
              className="text-xs text-purple-400 hover:text-purple-200 transition"
            >
              + Inject random drama
            </button>
            <button
              onClick={addPost}
              disabled={!holdsChog || !newPost.trim()}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:hover:bg-purple-600 px-5 py-2 rounded-xl text-sm font-medium transition"
            >
              Post
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {posts.map((post) => {
            const p = getPersonality(post.chogId);
            return (
              <div
                key={post.id}
                className="bg-black/50 border border-purple-900/30 rounded-2xl p-4 hover:border-purple-700/50 transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-sm font-bold">
                      #{post.chogId}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">Chog #{post.chogId}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full bg-black/50 ${p.color}`}>
                          {p.emoji} {p.name}
                        </span>
                      </div>
                      <span className="text-xs text-purple-400">
                        {new Date(post.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-purple-100 mb-3">{post.text}</p>

                <div className="flex gap-5 text-sm text-purple-300">
                  <button
                    onClick={() => react(post.id, "fire")}
                    className="hover:text-orange-400 transition flex items-center gap-1"
                  >
                    🔥 <span>{post.reactions.fire}</span>
                  </button>
                  <button
                    onClick={() => react(post.id, "skull")}
                    className="hover:text-gray-200 transition flex items-center gap-1"
                  >
                    💀 <span>{post.reactions.skull}</span>
                  </button>
                  <button
                    onClick={() => react(post.id, "heart")}
                    className="hover:text-pink-400 transition flex items-center gap-1"
                  >
                    💜 <span>{post.reactions.heart}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
