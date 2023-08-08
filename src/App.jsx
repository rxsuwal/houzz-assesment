
import './App.css';
import { Nav, Spinner, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import AddBeerModal from './component/AddBeerModal';
import BeerList from './component/BeerList';



function App() {
  // ALL BEERS 
  const [allBeers, setallBeers] = useState({
    data: [],
    loading: true,
    error:""
  })
  // PAGINATION DATA
  const [paginate, setPaginate] = useState({
    page: 1,
    perPage: 10,
  })

  // LOAD MORE LOADER
  const [loadMoreLoader, setLoadMoreLoader] = useState(false)

  // TAB CONTROLS
  const [tabControl, setTabControl] = useState("all")

  // GET BEERS FUNCTION
  const getBeers = (async (pagination) => {
    await axios.get(`https://api.punkapi.com/v2/beers?page=${pagination.page}&per_page=${pagination.perPage}`).then(res => {
      setallBeers({...allBeers, data: allBeers.data.concat(res.data),loading:false })
    }).catch(err => {
      setallBeers({...allBeers,error:err.response.data.message,loading:false })
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
    
    const newMyBeer = myBeers.concat(data)
    
    // SORT BY NAME ASCENDING ALPHABETICALLY
    newMyBeer.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

    setMyBeers(newMyBeer)
    setAddBeerModal(false)
  }


  return (
    <div className="container-fluid">
      <div className="w-md-75 m-auto">
        <Tab.Container defaultActiveKey={tabControl}>

          {/* NAV TABS */}
          <Nav id="beer-tabs" className="bg-white sticky-top">
            <div className="container py-4 mb-2 d-flex justify-content-md-between justify-content-center gap-2 flex-wrap">
            <div className='d-flex'>
              <Nav.Item>
                <Nav.Link eventKey="all" onClick={() => setTabControl("all")}>All Beers</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                
                <Nav.Link eventKey="my" onClick={() => setTabControl("my")}>My Beers</Nav.Link>
              </Nav.Item>
            </div>

            {/* TAB CONTROL CHECK FOR ADD MY BEER */}
            {tabControl == "my" && <button className="btn btn-primary" onClick={() => setAddBeerModal(true)}>Add a New Beer</button>}

            </div>
          </Nav>
          {/* --END NAV TABS */}

          <Tab.Content className='container'>

            {/* ALL BEER TAB CONTENT*/}
            <Tab.Pane eventKey="all">

              {/* INTIAL LOAD SPINNER */}
            {allBeers.loading && <Spinner className='mx-auto d-flex my-4' />}

              {/* ALL BEER DATA */}
                {!allBeers.loading && <>
                  {!allBeers.error ? 
                  <BeerList data={allBeers.data}/>
                  :
                    <div className="text-center text-danger">
                      {allBeers.error}
                    </div>}
                    
                </>}
              {/* --END ALL BEER DATA */}


                {/* LOAD MORE SPINNER */}
              {loadMoreLoader && <Spinner className='m-auto d-flex my-4' />}

              {/* LOAD MORE */}
                {!loadMoreLoader && !allBeers.loading && 
                <button type="button" 
                        className="btn fw-bold text-primary m-auto my-4 d-flex"
                        onClick={() => loadMore()}>
                        Load More <i className="bi bi-chevron-down"></i>
                    </button>}
              {/* --END LOAD MORE */}

            </Tab.Pane>
            {/* --END ALL BEER TAB CONTENT*/}

            {/* MY BEER TAB CONTENT */}
            <Tab.Pane eventKey="my">

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
                <BeerList data={myBeers}/>
              }

              {/* --END IF MY BEERS IS EMPTY OR NOT EMPTY */}

            </Tab.Pane>
            {/* --END MY BEER TAB CONTENT */}


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

