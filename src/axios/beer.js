import axios from "axios"

export const getBeers = async (pagination) => {

    await axios.get(`https://api.punkapi.com/v2/beers?page=${pagination.page}&per_page=${pagination.perPage}`).then(res => {
        return res
    }).catch(err => {
        return err
    })
}