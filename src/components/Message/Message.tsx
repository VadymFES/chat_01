import React from "react";

export default function Message({ author, message }: { author: string; message: string }) {
    return (
        <p>
        <i>{author}</i>: {message}
      </p>
    );
    }