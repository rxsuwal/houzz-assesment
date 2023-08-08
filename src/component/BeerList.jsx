import React from 'react'
import { ProductCard } from './ProductCard'

function BeerList(props) {
    return (
        <div className="row g-4 mb-4">
            {
                props.data.map((a) => {
                    return (
                        <div className="col-xl-6" key={a.id}>
                            <ProductCard data={a} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BeerList