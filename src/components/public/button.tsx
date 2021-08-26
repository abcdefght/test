import React from "react";
import styles from './button.scss'

const Button:React.FC=(props)=>{

    const {children}=props;

    return (
        <button className={styles['btn']}>
            {children}
        </button>
    )
}

export default Button;
