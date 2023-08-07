
import './App.css';
import { Button, Card, Col, Nav, OverlayTrigger, Row, Spinner, Tab, Tabs, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useId, useState } from 'react';
import axios from "axios";
import { ProductCard } from './component/ProductCard';



function App() {

  const [allBeers, setallBeers] = useState({
    data: [],
    loading: true
  })

  const [paginate, setPaginate] = useState({
    page: 1,
    perPage: 2,
  })

  const [loadMoreLoader, setLoadMoreLoader] = useState(false)


  const getBeers = (async (pagination) => {
    await axios.get(`https://api.punkapi.com/v2/beers?page=${pagination.page}&per_page=${pagination.perPage}`).then(res => {
      setallBeers({ data: allBeers.data.concat(res.data), loading: false })
    }).catch(err => {
      setallBeers({ data: err.response.data, loading: false })
    }).then(() => {
      setLoadMoreLoader(false)
    })
  })

  useEffect(() => {
    getBeers(paginate)
  }, [])



  const loadMore = () => {
    setLoadMoreLoader(true)
    setPaginate({ ...paginate, page: paginate.page + 1 })
    getBeers(paginate)
  }


  return (
    <div className="container">
      <div className="w-md-75 m-auto">
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
                {allBeers.loading && <Spinner className='m-auto my-4' />}

                {!allBeers.loading && <>
                  {!allBeers.data.isArray ?

                    <>
                      {
                        allBeers.data?.map((a) => {
                          return (
                            <div className="col-xl-6 mb-4" key={a.id}>
                              <ProductCard data={a} />
                            </div>
                          )
                        })
                      }


                      {loadMoreLoader && <Spinner className='m-auto my-4' />}
                      {!loadMoreLoader && <button type="button" class="btn fw-bold text-primary m-auto"
                        onClick={() => loadMore()}>
                        Load More <i class="bi bi-chevron-down fw-bolder"></i>
                      </button>}

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

