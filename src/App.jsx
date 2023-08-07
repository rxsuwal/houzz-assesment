
import './App.css';
import { Button, Card, Col, Nav, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect, useId, useState } from 'react';
import axios from "axios"
import { getBeers } from './axios/beer';



function App() {

  const [allBeers, setallBeers] = useState({
    data: [],
    loading: true
  })

  const [paginate, setPaginate] = useState({
    page: 1,
    perPage: 2,
  })

  const getBeers = (async (pagination) => {
    await axios.get(`https://api.punkapi.com/v2/beers?page=${pagination.page}&per_page=${pagination.perPage}`).then(res => {
      setallBeers({ data: allBeers.data.concat(res.data), loading: false })
    }).catch(err => {
      setallBeers({ data: err.response.data, loading: false })
    })
  })

  useEffect(() => {
    getBeers(paginate)
  }, [])


  const loadMore = () => {
    setPaginate({ ...paginate, page: paginate.page + 1 })
    getBeers(paginate)
  }


  return (
    <div className="container">
      <div className="w-75 m-auto">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Nav variant="pills" className=" mb-4">
            <Nav.Item>
              <Nav.Link eventKey="first">Tab 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Tab 2</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="first">

              <div className="row">
                {allBeers.loading && <Spinner className='m-auto' />}

                {!allBeers.loading && <>
                  {!allBeers.data.isArray ?

                    <>
                      {
                        allBeers.data?.map((a) => {
                          return (
                            <div className="col-xl-6 mb-4 h-100" key={a.id}>
                              <ProductCard data={a} />
                            </div>
                          )
                        })
                      }
                      <button type="button" class="btn fw-bold text-primary m-auto"
                        onClick={() => loadMore()}>
                        Load More
                      </button>

                    </>
                    : allBeers?.data}

                </>}
              </div>

            </Tab.Pane>
            <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default App;

export function ProductCard(props) {
  return (
    <a href='#' class="card flex-row border border-0 align-items-center shadow">
      <img src={props.data.image_url}
        style={{ height: "100px", objectFit: "contain" }}
        class="card-img-top w-25" alt="product" />
      <div class="card-body w-75">
        <h5 class="card-title">{props.data.name}</h5>
        <h6 className='text-warning'>{props.data.tagline}</h6>
        <p class="card-text">
          {props.data.description}
        </p>
      </div>
    </a >
  )
}
