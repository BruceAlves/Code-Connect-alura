"use client";

import { useRef, useState } from "react"; import { Modal } from "../Modal";
import styles from "./replymodal.module.css";
import { Textarea } from "../Textarea";
import { SubmitButton } from "../SubmitButton";
import { Comment } from "../Comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Error from "@/app/error";



export const ReplyModal = ({ comment, slug }) => {
  const modalRef = useRef(null);
  const queryclient = useQueryClient();
  const [text, setText] = useState("");

  const openModal = () => {
    setText("");
    modalRef.current.openModal();
  };

  const closeModal = () => {
    modalRef.current.closeModal();
  };

  const replyMutation = useMutation({
    mutationFn: (commentData) => {
      return fetch(`http://localhost:3000/api/comment/${comment.id}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData)
      }).then((response) => {
        if (!response.Ok) {
          throw new Error(`HTTP error status: ${response.status}`)
        }
        return response.json()
      })
    },
    onSuccess: () => {
      closeModal();
      queryclient.invalidateQueries(["Post", slug])
    }, onError: (error, variables) => {
      console.error(
        `Erro ao salvar resposta ao comentário para o slug: ${variables.slug}`,
        { error }
      );
    },
  })

  const onSubmitCommentReply = (event) => {
    event.preventDefault();

    replyMutation.mutate({ comment, text });
  };


  return (
    <>
      <Modal ref={modalRef}>
        <form onSubmit={onSubmitCommentReply}>
          <div className={styles.body}>
            <Comment comment={comment} />
          </div>
          <div className={styles.divider}></div>
          <Textarea
            required
            rows={8}
            name="text"
            placeholder="Digite aqui..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className={styles.footer}>
            <SubmitButton>Responder</SubmitButton>
          </div>
        </form>
      </Modal>
      <button className={styles.btn} onClick={openModal}>
        Responder
      </button>
    </>
  );
};
