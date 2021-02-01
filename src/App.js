import React, {useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate'
import './App.css'
import PerPage from './per-page'
import Search from './search'

const App = () =>{
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [copyData, setCopy] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0)
  const [searchValue,setSearchVal] = useState(" ")

  const getData = async()=>{
    const res = await fetch('https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json')

    const resData = await res.json()
    const dataSlice = resData.slice(offset*perPage, (offset*perPage)+perPage )
    const postData = dataSlice.map(pd => <div key={pd.id} className="card">
                                        <p>{pd.name}</p>
                                        <p>{pd.email}</p>
                                      </div>)
    setData(postData)
    setCopy(postData)
    setPageCount(Math.ceil(resData.length / perPage))
  }

  useEffect(()=>{
    getData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, perPage] )

  const handlePageClick = (e) =>{
    const selectedPage = e.selected
    setOffset(selectedPage)
  }

  const searchChange = (e) =>{
    const val = e.target.value.trim()
    setSearchVal(val)
 
    setData(copyData.filter((item)=>{
      const name = item.props.children[0].props.children.toLowerCase()
      const email = item.props.children[1].props.children.toLowerCase()
      return name.indexOf(val)!==-1 || email.indexOf(val)!==-1
    })) 
  }

  const changePerPage = (e) =>{
    var val = e.target.value
    if(val==="0"){val='1'}
    setPerPage(parseInt(val))
  }

  return(
    <div className="App col-lg-6 col-md-8 col-sm-10 col-10 
    offset-lg-3 offset-md-2 offset-sm-1 offset-1 my-5 body">
    <div className="top-bar">
        <PerPage value={perPage} change={changePerPage}/>
        <Search value={searchValue} change={searchChange}/>
    </div>
    {data}
     <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"} />
  </div>
  )
}

export default App;