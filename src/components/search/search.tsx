import React, {useEffect, useState, useRef} from "react";
import styles from './search.scss'
import {search} from "@/api/api";
import * as echarts from 'echarts'

const Search = (props) => {

    const arr: number[] = new Array(12).fill(0)
    const arr2: number[] = new Array(4).fill(0)
    const [keyword, setKeyWord] = useState<string>(() => {
        return props.match.params.keyword.split('+').join(' ')
    })
    const [loading, setLoading] = useState<boolean>(true)
    const [productList, setProductList] = useState<Array<any>>([])

    useEffect(() => {
        getData()
    }, [])

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
            props.history.push(`/index/search/${str}`)
        }
    }

    const getData = () => {
        setLoading(true)
        search(keyword).then(res => {
            setLoading(false)
            const {product_launch_data, product_trends, products} = res.data
            const xArr: string[] = product_launch_data.map(x => x.key_as_string.toString())
            const yArr: number[] = product_launch_data.map(x => x.doc_count)
            let dom = echarts.init(document.getElementById('bar'))
            dom.setOption({
                title: {
                    text: keyword
                },
                color: ['#99CBB5'],
                tooltip: {},
                xAxis: {
                    show: false,
                    data: xArr
                },
                yAxis: {
                    show: false
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: yArr,
                    markPoint: {
                        // symbol:'none',
                        data: [
                            {type: 'max', name: '最大值'},
                        ]
                    }
                }]
            });
            for (let i: number = 0; i < product_trends.length - 1; i++) {
                const chart = echarts.init(document.getElementById(`chart-${i + 1}`))
                const {search_msv} = product_trends[i]
                const xArr2: string[] = search_msv.map(x => x.date)
                const yArr2: number[] = search_msv.map(x => x.sv)
                const option = {
                    title: {
                        text: product_trends[i].name
                    },
                    color: i % 2 === 0 ? ['#99BDDC'] : ['#99CBB5'],
                    tooltip: {},
                    xAxis: {
                        show: false,
                        type: 'category',
                        boundaryGap: false,
                        data: xArr2
                    },
                    yAxis: {
                        show: false,
                        type: 'value'
                    },
                    series: [{
                        data: yArr2,
                        type: 'line',
                        areaStyle: {}
                    }]
                };
                chart.setOption(option)
            }
            setProductList(products)
        })
    }

    const clickMe = () => {
        const str: string = keyword.split(' ').join('+')
        props.history.push(`/index/search/${str}`)
    }

    const computeTime = (time: string) => {
        let time1: number = new Date(time).getTime()
        let time2: number = new Date().getTime()
        let d: number = 1000 * 60 * 60 * 24
        return Math.ceil((time2 - time1) / d)
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
            <div className={styles['con']}>
                <div className={styles['block-1']}>
                    <div className={styles['title']}>Recent product launches</div>
                    <div style={{display: loading ? 'block' : 'none'}} className={styles['loading']}>
                        <div/>
                        <div/>
                    </div>
                    <div style={{display: loading ? 'none' : 'block'}} id={'bar'} className={styles['bar']}/>
                </div>
                <div className={styles['block-2']}>
                    <div className={styles['title']}>Related product trends</div>
                    {
                        loading ?
                            <div className={styles['loading']}>
                                <div>
                                    <div/>
                                    <div/>
                                    <div/>
                                </div>
                                <div>
                                    <div/>
                                    <div/>
                                    <div/>
                                </div>
                                <div>
                                    <div/>
                                    <div/>
                                    <div/>
                                </div>
                                <div>
                                    <div/>
                                    <div/>
                                    <div/>
                                </div>
                            </div> :
                            <div className={styles['area']}>
                                {
                                    arr2.map((x, index) => (
                                        <div key={index} id={`chart-${index + 1}`} className={styles['chart']}/>
                                    ))
                                }
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
                                        <div key={index} className={styles['item']}>
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

export default Search