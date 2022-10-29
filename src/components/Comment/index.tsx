import { ThumbsUp, Trash } from "phosphor-react";
import { memo, useState } from "react";
import { Avatar } from "../Avatar";
import styles from "./styles.module.scss";

interface CommentComponentProps {
  content: string;
  onDeleteComment: (content: string) => void;
}

function CommentComponent({ content, onDeleteComment }: CommentComponentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);

    console.log("delete", content);
  }

  // function handleLikeComment() {
  //   setLikeCount(likeCount + 1); // se aqui o numero de likes era 0
  //   console.log(likeCount); // Aqui o numero ainda vai ser 0, pois esse console log está sendo executado no contexto
  //   // antigo do componente
  //   // Quando o set do useState é chamado, ele cria um novo componente com o estado atualizado, ele nao aguarda o novo
  //   // componente ser gerado para continuar executando o codigo abaixo do set
  //   setLikeCount(likeCount + 1);
  // }

  // function handleLikeComment() {
  //   // O que solucionaria o caso anterior, onde eu tinha 2 setState, onde o segundo dependia do valor já atualizado
  //   // pelo primeiro, seria a criaçao de uma variavel que iria conter o valor novo, passar esse valor novo no setState
  //   // e no segundo setState, passar o valor novo que está na variável + 1
  //   // isso faria o like aumentar de 2 em dois, conforme o que é esperado

  //   const newLikeCount = likeCount + 1;

  //   setLikeCount(newLikeCount);
  //   setLikeCount(newLikeCount + 1);
  // }

  // function handleLikeComment() {
  //   // Outra forma seria usar o conceito de closure
  //   // Aqui, quando eu chamo o setLikeCount, eu posso passar uma função que no primeiro parametro possui o valor mais
  //   // atual do estado, e retorna o novo valor a ser salvo
  //   // Portanto, no primeiro setLikeCount, o state é 0, e no segundo o state é 1

  //   // Quando precisamos atualizar um valor que depende do valor anterior dela mesma, é interessante usar essa forma

  //   setLikeCount((state) => state + 1);
  //   setLikeCount((state) => state + 1);
  // }

  function handleLikeComment() {
    // Já que para atualizar o numero de likes, eu preciso do numero anterior de likes, eu preciso escrever nesse
    // formato de função
    setLikeCount((state) => state + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/gmendes0.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Gabriel Mendes</strong>
              <time
                title="28 de Outubro às 09:48"
                dateTime="2022-10-28 09:48:00"
              >
                Cerca de 2h atrás
              </time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp /> Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

export const Comment = memo(
  CommentComponent,
  (prevProps, nextProps) =>
    Object.is(prevProps.content, nextProps.content) &&
    Object.is(prevProps.onDeleteComment, nextProps.onDeleteComment)
);
