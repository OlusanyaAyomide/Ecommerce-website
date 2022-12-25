import React from 'react'
import Header from './detail/Header'
import Hero from './detail/Hero'
import Feedback from './detail/Feedback'
import { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { DetailFetch,SimilarFetch,WishListAdd,WishListRemove} from '../store/datafetch'
import Similar from './detail/Similar'
import Review from "./detail/Review"
import { detailaction } from '../store/detailslice'
import Test from '../Test'
import Footer from '../Footer'

export default function Detail() {
    const location=useLocation()
    const {render,loaded} = useSelector((state=>state.detail))
    const [first,setfirst] = useState(false)
    const curID= useSelector((state=>state.detail.curId))
    const {from} = location.state
    const Select = !first?from.id:curID
    const accessToken = useSelector((state=>state.auth.token.access))
    const {activeproduct} = useSelector((state=>state.detail))
    const dispatch = useDispatch()
    const {addwishlistloading,removewishloading} = useSelector((state=>state.auth))

    useEffect(()=>{
      dispatch(SimilarFetch(Select))
    },[curID])
    
    useEffect(()=>{  
        dispatch(DetailFetch(Select))
    },[curID])
    useEffect(()=>{
      window.scrollTo(0,0)
      setfirst(true)
      dispatch(detailaction.setrender(true))
    },[])
    useEffect(()=>{
      if(!addwishlistloading){return}
      dispatch(WishListAdd(activeproduct,accessToken))

    },[addwishlistloading])
    useEffect(()=>{
      if(!removewishloading){return}
      dispatch(WishListRemove(activeproduct,accessToken))
    },[removewishloading])
    
  return (
    <div>
   {loaded && render && <div>
        <div><Header/></div>
       <div><Hero/></div>
       <div><Feedback/></div>
       <div><Review/></div>
       <div><Similar/></div>
       <div><Footer/></div>
    </div>}
    {!loaded && <div><Test/></div>}
    </div>
  )
}
