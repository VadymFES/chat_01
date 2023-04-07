import React from "react";
import styles from "./AddMessage.module.scss";

export default function AddMessage() {
    return (
<section className={styles.new_message}>
    <input type="text" className={styles.message_input}/>
</section>
    );
    }