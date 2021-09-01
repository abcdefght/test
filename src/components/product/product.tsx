import React, {useEffect, useState, useRef} from "react";
import styles from './product.scss'
import {getProductById, search} from "@/api/api";
import {rootStateType, setProductListAction} from "@/store";
import {connect} from "react-redux";

const Product = (props) => {

    const arr: number[] = new Array(16).fill(0)
    const [keyword, setKeyWord] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [title, setTitle] = useState<string>('')
    const {productList, setProductList} = props

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
        const productId: number = parseInt(props.match.params.productId, 10)
        getProductById(productId).then(res => {
            setTitle(res.data.data.title)
            if (productList.length === 0) {
                search(res.data.data.title).then(res2 => {
                    const {products} = res2.data
                    setProductList(products)
                    setLoading(false)
                })
            } else {
                setLoading(false)
            }
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
                <div className={styles['block']}>
                    {
                        loading ?
                            <div className={styles['block-loading']}>
                                <div/>
                                <div>
                                    <div/>
                                    <div/>
                                    <div/>
                                    <div/>
                                    <div/>
                                </div>
                            </div> :
                            <div className={styles['block-data']}>
                                {title}
                            </div>
                    }
                </div>
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
                                        <div onClick={() => goTo(x.id)} key={index} className={styles['item']}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);