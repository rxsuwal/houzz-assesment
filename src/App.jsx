
import './App.css';
import { Button, Card, Col, Modal, Nav, OverlayTrigger, Row, Spinner, Tab, Tabs, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useId, useState } from 'react';
import axios from "axios";
import { ProductCard } from './component/ProductCard';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { addBeerValidation } from './utils/validation';
import AddBeerModal from './component/AddBeerModal';



function App() {
  // ALL BEERS 
  const [allBeers, setallBeers] = useState({
    data: [],
    loading: true
  })
  // PAGINATION DATA
  const [paginate, setPaginate] = useState({
    page: 1,
    perPage: 2,
  })

  // LOAD MORE LOADER
  const [loadMoreLoader, setLoadMoreLoader] = useState(false)

  // TAB CONTROLS
  const [tabControl, setTabControl] = useState("first")

  // GET BEERS FUNCTION
  const getBeers = (async (pagination) => {
    await axios.get(`https://api.punkapi.com/v2/beers?page1=${pagination.page}&per_page=${pagination.perPage}`).then(res => {
      setallBeers({ data: allBeers.data.concat(res.data), loading: false })
    }).catch(err => {
      console.log(err)
      setallBeers({ data: err.response.data.message, loading: false })
    }).then(() => {
      setLoadMoreLoader(false)
    })
  })

  // LOAD MORE BEERS
  const loadMore = () => {
    setLoadMoreLoader(true)
    setPaginate({ ...paginate, page: paginate.page + 1 })
    getBeers(paginate)
  }

  // INTIAL RENDER
  useEffect(() => {
    getBeers(paginate)
  }, [])



  // MY BEERS
  const [myBeers, setMyBeers] = useState([])

  // ADD MY BEER
  const [addBeerModal, setAddBeerModal] = useState(false)
  const addMyBeer = (data) => {
    setMyBeers(myBeers.concat(data))
    setAddBeerModal(false)
  }




  return (
    <div className="container">
      <div className="w-md-75 m-auto">
        <Tab.Container defaultActiveKey={tabControl}>
          <Nav id="beer-tabs" className="my-4 justify-content-between">
            <div className='d-flex'>
              <Nav.Item>
                <Nav.Link eventKey="first" onClick={() => setTabControl("first")}>All Beers</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" onClick={() => setTabControl("second")}>My Beers</Nav.Link>
              </Nav.Item>
            </div>
            {tabControl == "second" && <button className="btn btn-primary" onClick={() => setAddBeerModal(true)}>Add a New Beer</button>}

          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className="row gy-4 gx-5">
                {allBeers.loading && <Spinner className='m-auto my-4' />}

                {!allBeers.loading && <>
                  {!allBeers.data?.isArray ?

                    <>
                      {
                        allBeers.data?.map((a) => {
                          return (
                            <div className="col-xl-6" key={a.id}>
                              <ProductCard data={a} />
                            </div>
                          )
                        })
                      }

                      {loadMoreLoader && <Spinner className='m-auto my-4' />}
                      {!loadMoreLoader && <button type="button" class="btn fw-bold text-primary m-auto my-4"
                        onClick={() => loadMore()}>
                        Load More <i class="bi bi-chevron-down"></i>
                      </button>}

                    </>
                    : allBeers.data}

                </>}
              </div>

            </Tab.Pane>
            <Tab.Pane eventKey="second">

              {/* IF MY BEERS IS EMPTY OR NOT EMPTY */}
              {myBeers.length == 0 ?
                <div className='bg-light d-flex align-items-center justify-content-center flex-column'
                  style={{ height: "200px" }} >
                  <div>
                    Nothing to see yet.

                  </div>
                  <div>
                    <a role='button' onClick={()=>setAddBeerModal(true)} className='link link-primary'>Click here</a>
                    <span className="ps-2">to add your first beer!</span>

                  </div>
                </div> :
                <div className="row g-4">
                  {
                    myBeers.map((a) => {
                      return (
                        <div className="col-xl-6" key={a.id}>
                          <ProductCard data={a} />
                        </div>
                      )
                    })
                  }
                </div>
              }

            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
      <AddBeerModal show={addBeerModal} close={() => setAddBeerModal(false)} onSubmit={addMyBeer} />
    </div>
  );
}

export default App;




// const AddBeerModal = (props) => {
  
// }

