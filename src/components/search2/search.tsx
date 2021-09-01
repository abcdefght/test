import React, {useEffect, useState, useRef} from "react";
import styles from './search.scss'
import {search} from "@/api/api";
import {connect} from "react-redux";
import {rootStateType, setProductListAction} from "@/store";


const Search = (props) => {

    const arr: number[] = new Array(16).fill(0)
    const [keyword, setKeyWord] = useState<string>(() => {
        return props.match.params.keyword.split('+').join(' ')
    })
    const [loading, setLoading] = useState<boolean>(true)
    const {productList, setProductList} = props

    console.log(productList);


    useEffect(() => {
        getData()
    }, [props.history.location])

    const change = (e) => {
        setKeyWord(e.target.value)
    }

    // 回车键盘
    const pressUp = (e) => {
        if (e.keyCode === 13) {
            const str: string = keyword.split(' ').join('+')
            props.history.push(`/search/${str}`)
        }
    }

    const getData = () => {
        setLoading(true)
        search(keyword).then(res => {
            setLoading(false)
            const {products} = res.data
            setProductList(products)
        })
    }

    const clickMe = () => {
        const str: string = keyword.split(' ').join('+')
        props.history.push(`/search/${str}`)
    }

    const computeTime = (time: string) => {
        let time1: number = new Date(time).getTime()
        let time2: number = new Date().getTime()
        let d: number = 1000 * 60 * 60 * 24
        return Math.ceil((time2 - time1) / d)
    }

    const goTo = (id: number) => {
        props.history.push(`/product/${id}`)
    }

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                <div>
                    BestSearch
                </div>
                <div>
                    <input
                        onKeyUp={e => pressUp(e)}
                        onInput={e => change(e)} value={keyword}
                        placeholder={'Search for new products in 961K stores'}/>
                    <button onClick={clickMe}>
                        <img className={styles['img']} src={require('@/assets/search.png')} alt=""/>
                    </button>
                </div>
            </div>
            <div style={{height: '60px'}}/>
            <div className={styles['con']}>
                <div className={styles['block-3']}>
                    <div className={styles['title']}>Related new products published in the last 7 days</div>
                    {
                        loading ?
                            <div className={styles['loading']}>
                                {
                                    arr.map((x, index) => (
                                        <div key={index} className={styles['item']}>
                                            <div/>
                                            <div/>
                                        </div>
                                    ))
                                }
                            </div> :
                            <div className={styles['product-list']}>
                                {
                                    productList.map((x, index) => (
                                        <div
                                            onClick={() => goTo(x.id)}
                                            key={index}
                                            className={styles['item']}>
                                            <div>
                                                <img src={x.image} alt="#"/>
                                            </div>
                                            <div>
                                                <div>published {computeTime(x.published_at)} days ago</div>
                                                <div>{x.title}</div>
                                                <div>${x.price}</div>
                                                <div>{x.store_domain}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: rootStateType) => {
    return {
        productList: state.loginReducer.productList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProductList: productList => dispatch(setProductListAction(productList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);