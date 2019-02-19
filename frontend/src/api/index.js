import axios from 'axios'

export const loadCoverage = () => {
    return axios({
        url: '/ui/plugin/api_coverage/getCoverage'
    })
}

export const loadAPIList = () => {
    return axios({
        url: '/ui/plugin/api_coverage/getTest'
    })
}

export const loadBaseInfo = () => {
    return axios({
        url: '/ui/plugin/api_coverage/baseInfo'
    })
}

export const clearResult = () => {
    return axios({
        url: '/ui/plugin/api_coverage/clearResult'
    })
}

export const loadFilters = () => {
    return axios({
        url: '/ui/plugin/api_coverage/getFilterConf'
    })
}

export const saveResult = (data) => {
    return axios({
        url: '/ui/plugin/api_coverage/saveResult',
        method: 'POST',
        data: {result_name: data}
    })
} 

export const setFilters = (filters) => {
    return axios({
        url: '/ui/plugin/api_coverage/setFilterConf',
        method: 'POST',
        data: {filters: filters}
    })
}