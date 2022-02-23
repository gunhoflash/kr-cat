import { useState, useEffect, useCallback, FormEventHandler, useRef } from "react";
import '../styles/comment/style.css'

const BASE_URL = "https://kr-carrot-kotlin.herokuapp.com/api";

const setRefValue = (ref: any, value: any) => {
  if (ref.current) {
    ref.current.value = value;
  }
};

interface Comment {
  id: Number;
  writer: String;
  content: String;
  regDate: String;
}

interface CommentProps {
  comment: Comment;
}

function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);

  const refreshComments = useCallback(() => {
    window.fetch(`${BASE_URL}/comments`)
      .then(response => response.json())
      .then(json => setComments(json.content));
  }, []);

  useEffect(refreshComments, [refreshComments]);

  return (
    <div className="root flex flex-col items-center font-comment">
      <h1 className="comment-title">방명록</h1>
      <CommentInput onRefresh={refreshComments} />
      <div className="flex flex-col comment-frame">
        {comments?.map((v, i) => <CommentComp key={i} comment={v} />)}
      </div>
    </div>
  );
}

function CommentComp(props: CommentProps) {
  const { comment } = props;
  return (
    <div className="flex flex-col mb-4 comment-background">
      <div className="flex flex-row mb-2">
        <div className="mr-2 comment-writer">{comment.writer}</div>
        <div className="comment-date">{comment.regDate}</div>
      </div>
      <div className="flex flex-row">
        <div className="comment-content">{comment.content}</div>
      </div>
    </div>
  );
}

function CommentInput({ onRefresh }: { onRefresh: () => void }) {
  const writerInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);

  const saveComment: FormEventHandler<HTMLFormElement> = useCallback(e => {
    e.preventDefault();

    window.fetch(`${BASE_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        writer: writerInputRef.current?.value,
        password: passwordInputRef.current?.value,
        content: contentInputRef.current?.value,
      }),
    }).then(response => {
      setRefValue(writerInputRef, "");
      setRefValue(passwordInputRef, "");
      setRefValue(contentInputRef, "");
      onRefresh();
      if (response.status !== 201) console.log("save comment error");
    });
  }, [onRefresh]);

  return (
    <div className="comment-input justify-self-start">
      <form onSubmit={saveComment}>
        <div className="flex flex-row mb-4">
          <div className="mr-4">
            <label className="mr-2" htmlFor="writer">작성자</label>
            <input ref={writerInputRef} name="writer" />
          </div>
          <div>
            <label className="mr-2" htmlFor="password">비밀번호</label>
            <input ref={passwordInputRef} name="password" type="password" />
          </div>
        </div>
        <textarea ref={contentInputRef} name="content" className="comment-text" />
        <div className="flex flex-row justify-end">
          <button type="submit">등록</button>
        </div>
      </form>
    </div>
  );
}

export default Comments;
