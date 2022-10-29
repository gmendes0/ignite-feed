import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";

import { Avatar } from "../Avatar";
import { Comment } from "../Comment";
import styles from "./styles.module.scss";
// import { comments } from "../../../comments";

/*
{
  author: {avatar_url: string, name: string, role: string},
  published_at: Date,
  content: string
}
*/

interface PostComponentProps {
  post: {
    published_at: Date;
    author: {
      name: string;
      role: string;
      avatar_url: string;
    };
    content: Array<{
      type: "paragraph" | "link";
      content: string;
    }>;
  };
}

function PostComponent({ post }: PostComponentProps) {
  // estado - variaveis que queremos que o react monitore
  const [comments, setComments] = useState(["Post muito massa bicho!"]);
  const [newCommentText, setNewCommentText] = useState("");

  /**
   * Talvez não seja necessário o useMemo aqui
   * Muito provavelmente o custo para comparar o post é mais alto do que o custo para executar a função de formatação
   * Só estou utilizando o useMemo para fixar o conhecimento
   */
  const publishedDateFormated = useMemo(
    () =>
      format(post.published_at, "dd 'de' LLLL 'às' HH:mm'h'", { locale: ptBR }),
    [post]
  );

  /**
   * Talvez não seja necessário o useMemo aqui
   * Muito provavelmente o custo para comparar o post é mais alto do que o custo para executar a função de formatação
   * Só estou utilizando o useMemo para fixar o conhecimento
   */
  const publishedDateRelativeNow = useMemo(
    () =>
      formatDistanceToNow(post.published_at, {
        locale: ptBR,
        addSuffix: true,
      }),
    [post]
  );

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments((state) => [...state, newCommentText]);

    setNewCommentText("");
  }

  const deleteComment = useCallback(
    (commentToDelete: string) => {
      const commentsWithoutDeletedOne = comments.filter(
        (comment) => comment !== commentToDelete
      );

      console.log(comments, commentsWithoutDeletedOne);

      // imutabilidade -> as variáveis não sofrem mutação (não são alteradas na memória),
      // nós criamos um novo valor (um novo espaço na memória)
      setComments(commentsWithoutDeletedOne);
    },
    [comments]
  );

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value);
    event.target.setCustomValidity("");
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Este campo é obrigatório!");
  }

  /**
   * Nao deixa menos performático e deixa o código mais legível
   */
  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatar_url} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormated}
          dateTime={post.published_at.toISOString()}
        >
          {publishedDateRelativeNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((line) => {
          switch (line.type) {
            case "paragraph":
              return <p key={line.content}>{line.content}</p>;
            case "link":
              return (
                <p key={line.content}>
                  <a href="#">{line.content}</a>
                </p>
              );
            default:
              break;
          }
        })}
      </div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Escreva um comentário..."
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}

/**
 * Não chega a ser tão necessário nesse caso pois existem poucos posts
 */
export const Post = memo(PostComponent, (prevProps, nextProps) =>
  Object.is(prevProps.post, nextProps.post)
);
