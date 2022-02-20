import React, { useState, useEffect } from "react";
import '../styles/comment/style.css'

const BASE_URL = "https://kr-carrot-kotlin.herokuapp.com/api";

interface Comment {
    id: Number,
    writer: String,
    content: String,
    regDate: String,
}

interface CommentProp {
    comment: Comment,
}

function Comments() {
    
    const [comments, setComments] = useState<Comment[]>()

    useEffect(() => {
        refreshComments();
    }, [])

    const refreshComments = () => {
        window.fetch(`${BASE_URL}/comments`)
        .then(response => response.json())
        .then(json => {
            setComments(json);
            console.log(json)
        })
    }

    return (
        <div className="root d-col align-items-center font-comment">
            <h1 className="comment-title">방명록</h1>
            <CommentInput onRefresh={refreshComments} />
            <div className="d-col comment-frame">
                { comments?.map((value, index) => <CommentComp comment={value} />) }
            </div>
        </div>
    )
}

function CommentComp(prop: CommentProp) {
    const { comment } = prop;
    return (
        <div className="d-col mb-2 comment-background">
            <div className="d-row mb-1">
                <div className="mr-1 comment-writer">{comment.writer}</div>
                <div className="comment-date">{comment.regDate}</div>
            </div>
            <div className="d-row">
                <div className="comment-content">{comment.content}</div>
            </div>
        </div>
    )
}

function CommentInput({onRefresh}: {onRefresh: () => void}) {
    
    const [writer, setWriter] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [content, setContent] = useState<string>();

    const saveComment = (e: any) => {
        e.preventDefault();

        window.fetch(`${BASE_URL}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                writer: writer,
                password: password,
                content: content,
            }),
        }).then(response => {
            setWriter("");
            setPassword("");
            setContent("");
            onRefresh();
            if (response.status !== 201) console.log("save comment error");
        });
    }

    return (
        <div className="comment-input justify-self-start">
            <form onSubmit={saveComment}>
                <div className="d-row mb-2">
                    <div className="mr-2">
                        <label className="mr-1" htmlFor="writer">작성자</label>
                        <input id="writer" name="writer" onChange={(e) => setWriter(e.target.value)} value={writer} />
                    </div>
                    <div>
                        <label className="mr-1" htmlFor="password">비밀번호</label>
                        <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                </div>
                <textarea className="comment-text" id="content" name="content" onChange={(e) => setContent(e.target.value)} value={content} />
                <div className="d-row justify-content-end">
                    <button type="submit">등록</button>
                </div>
            </form>
        </div>
    )
}

export default Comments;