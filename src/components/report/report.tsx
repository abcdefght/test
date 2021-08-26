import React, {useEffect, useState} from "react";
import styles from './report.scss'
import {getReportList, addReport} from "@/api/api";

type DateType = {
    year: number,
    month: number,
    day: number,
}

type ListType = {
    day: number,
    reported: boolean
}

type ReportListType = {
    id: number,
    report_time: string
}

const Report: React.FC = () => {
    const date: Date = new Date();

    const [list, setList] = useState<Array<ListType>>(() => {
        const count: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        const list: ListType[] = []
        for (let i: number = 0; i < count; i++) {
            list.push({
                day: i + 1,
                reported: false
            })
        }
        console.log(list);
        return list;
    })
    const [curDate] = useState<DateType>(() => {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDay()
        }
    })

    useEffect(() => {

        getReportList().then(res => {
            const curData: Array<ReportListType> = res.data
            const dayList: number[] = []
            for (let i: number = 0; i < curData.length; i++) {
                const [year, month, day] = curData[i].report_time.split('-').map(x => parseInt(x, 10))
                if (year === date.getFullYear() && month === date.getMonth() + 1) {
                    dayList.push(day)
                }
            }
            let temp: ListType[] = []
            for (let i: number = 1; i < list.length + 1; i++) {
                temp.push({
                    day: i,
                    reported: dayList.includes(i)
                })
            }
            setList(temp)
        }).catch(error => {
            console.log('error is', error);
        })


    }, [])

    // 打卡
    const punchClock = (index: number, active: boolean) => {
        if (!active) {
            const curList = [...list]
            list[index].reported = true;
            setList(curList)
            addReport(`${curDate.year}-${curDate.month}-${index + 1}`).then(res => {})
        }
    }

    // 时间过滤器
    const timeFilter = (value: number): string => {
        return value < 10 ? `0${value}` : `${value}`
    }

    return (
        <div className={styles['report']}>
            <div className={styles['header']}>
                {curDate.year}-{timeFilter(curDate.month)}-{timeFilter(curDate.day)}
            </div>
            <div className={styles['container']}>
                {
                    list.map(x => (
                        <div className={x.reported ? styles['active'] : ``} key={x.day}
                             onClick={() => punchClock(x.day - 1, x.reported)}>
                            {x.day}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Report;