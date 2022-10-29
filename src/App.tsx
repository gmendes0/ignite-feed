import { Header } from "./components/Header";
import { Post } from "./components/Post";

import "./styles/global.scss";
import styles from "./App.module.scss";
import { Sidebar } from "./components/Sidebar";

import { posts } from "../posts";

/*
{
  author: {avatar_url: string, name: string, role: string},
  published_at: Date,
  content: string
}
*/

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </main>
      </div>
    </>
  );
}
