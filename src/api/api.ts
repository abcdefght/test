import request from "@/api/request";

// 搜索
export const search = (keyword: string) => {
    return request({
        url: `/interview/keyword_search`,
        method: `POST`,
        data: {
            login_token: 'INTERVIEW_SIMPLY2021',
            search_phrase: keyword
        }
    })
}

// 根据id获取产品
export const getProductById = (productId:number) => {
    return request({
        url: `/interview/get_product_by_id`,
        method: `POST`,
        data: {
            login_token: 'INTERVIEW_SIMPLY2021',
            id: productId
        }
    })
}

// 【查询】主页信息
export const getIndex = (id: number) => {
    return request({
        url: `/index`,
        method: `get`,
        params: {id}
    })
}

// 用户登录
type loginType = {
    username: string,
    password: string
}
export const login = (data: loginType) => {
    return request({
        url: '/login',
        method: `post`,
        data
    })
}

// 校验token
export const checkToken = () => {
    return request({
        url: `/token`,
        method: `get`
    })
}

// 获取签到信息
export const getReportList = () => {
    return request({
        url: `/report`,
        method: `get`,
    })
}

// 【添加】签到信息
export const addReport = (time: string) => {
    return request({
        url: `/report`,
        method: `post`,
        data: {time}
    })
}




