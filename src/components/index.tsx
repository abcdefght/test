import React, {useState} from "react";
import styles from './index.scss'

const Index = (props) => {

    const [keyword, setKeyWord] = useState<string>('')

    const change = (e) => {
        setKeyWord(e.target.value)
    }

    // 回车键盘
    const pressUp = (e) => {
        if (e.keyCode === 13 && keyword.length > 0) {
            const str: string = keyword.split(' ').join('+')
            props.history.push(`/index/search/${str}`)
        }
    }

    const clickMe = () => {
        if (keyword.length > 0) {
            const str: string = keyword.split(' ').join('+')
            props.history.push(`/index/search/${str}`)
        }
    }


    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                BestSearch
            </div>
            <div className={styles['con']}>
                <div>Search Trends</div>
                <div>
                    <input onKeyUp={e => pressUp(e)} onInput={(e) => change(e)} value={keyword}
                           placeholder={'Search for new products in 961K stores'}/>
                    <button onClick={clickMe}>
                        <img className={styles['img']} src={require('@/assets/search.png')} alt=""/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Index;
