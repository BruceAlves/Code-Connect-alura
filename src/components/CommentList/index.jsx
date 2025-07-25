import { Comment } from "../Comment";
import { ReplyModal } from "../ModalReply";
import { Replies } from "../Replies";
import styles from "./commentlist.module.css";

export const CommentList = ({ comments, slug }) => {
  return (
    <section className={styles.comments}>
      <h2>Comentários</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment comment={comment} />
            <ReplyModal comment={comment} slug={slug} />
            <Replies comment={comment} slug={slug} />
          </li>
        ))}
      </ul>
    </section>
  );
};

