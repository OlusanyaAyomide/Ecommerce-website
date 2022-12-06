import React from 'react'
import { Ratings } from '../../home/components'
import { StoreDetail } from '../../home/components'
import { useSelector,useDispatch } from 'react-redux'
import { convert } from '../../home/components'
import { Cartaction } from '../../store/cartslice'
import { detailaction } from '../../store/detailslice'
import { authActions } from '../../store/authslice'
import { useNavigate } from 'react-router-dom'


export default function Feedback() {
    const products = useSelector((state=>state.detail.product))
    const product = products.detail
    const {userinfo} = useSelector((state=>state.auth))
    const AffStores = products.detail.stores
    const dispatch = useDispatch()
    const popout = useSelector((state=>state.detail.popout))
    const navigate = useNavigate()
    const {loginstatus} = useSelector(({auth})=>auth)
    console.log(loginstatus)
    

    function handleCartAdd(){
        dispatch(Cartaction.addproduct({product}))  
        dispatch(detailaction.setpopout(true))
        setTimeout(()=>{
            dispatch(detailaction.setpopout(false))
        },2000)
    }

    function inWishList(){
        if (!userinfo.id){return}
        const {wishlist} = userinfo
        for (let productItem of wishlist){
            if (productItem.id === product.id){
                return true
            }
        }
        return false
    }
    function AddOrRemoveWishList(){
        if (loginstatus === 0){
            navigate("/login")
            return
        }
        if(inWishList()){
            console.log("removing")
            dispatch(authActions.setremovewishlist())
        }
        else{
            console.log("adding")
            dispatch(authActions.addwishlistloading())  
        }
    }

    function AddToCart(){
        return(
        <div className='row mt flex items-center h-[50px] fixed md:static bottom-0 w-full rounded-lg px-2 md:px-0 z-50 bg-[#5858ec]'>     
            <button className={`block w-6/12 text-white border-r h-full text-left`} onClick={AddOrRemoveWishList}><i className='fa fa-heart text-white text-lg px-4'></i>{inWishList()?"Remove item":"Add to wishlist"}</button>
            <button className='w-6/12 text-white text-left flex h-full items-center' onClick={handleCartAdd}><i className='fa fa-cart-plus text-white text-2xl px-4'></i> Add to cart</button>
            
        </div>
        )
    }
  return (
    <section className='border -mt-[2px]'>
        {popout && <div className='flex justify-center bg-[#36f736] py-2 w-full z-50 text-white fixed top-0'>
            Product succesfully added to cart succesfully
        </div>}
        <div className="row">
        <div className='w-full md:w-4/12 lg:w-3/12 bg-slate-300 md:py-2 hidden md:block'>
                <div className='bg-white container md:h-[333px]'>
                    <StoreDetail name={AffStores.name} count={AffStores.ProductCount} category={AffStores.Category}/>
                    <h1 className='font-semibold'>Product Description</h1>
                    <p>{product.desciption}</p>
                </div>
            </div>
            <div className='w-full md:w-8/12 lg:w-9/12 bg-slate-300 py-2'>
                <div className='w-full bg-white md:h-[332px]'>
                <div className='md:w-11/12 lg:w-8/12 xl:w-7/12 mx-auto'>
                <div className=' px-4 py-2 md:px-6  '>
                    <span className='inline-block text-sm rounded-md bg-[#5858ec] px-2 text-white'>Free Delivery</span>
                    <h1 className="my-2  text-xl font-[500] md:text-[24px] lg:text-[28px]">{product.name}</h1>
                   {!product.discount &&  <h1 className='font-semibold text-2xl'>₦{product.price}</h1>}
                   {product.discount && <div className='flex justify-around'>
                   <h1>
                    <span className='font-[500] text-xl line-through'>₦{product.price}</span>
                    <span className='relative left-1 bottom-2 text-xs text-[#ff3c00] font-bold'>-{product.discount}%</span>
                    </h1>
                    <h1 className='font-semibold text-2xl'>₦{convert(product.price,product.discount)}</h1>
                   </div> }
                    <h1 className='font-[500]'> + <span className='font-semibold text-sm'>₦240</span> shipping fee to your region</h1>
                    <div className='py-2'><span className=''><Ratings reviews={product.reviews} big={true} totalR={product.totalR}/></span></div>
                </div>
                <AddToCart/>
              </div>
                </div>
            </div>
            <div className='w-full md:w-4/12 lg:w-3/12 bg-slate-300 md:py-2 md:hidden'>
                <div className='bg-white container'>
                      <StoreDetail name={AffStores.name} count={AffStores.ProductCount} category={AffStores.Category}/>
                      <div className='mt-3'>
                        <h1 className='font-semibold'>Product Description</h1>
                        <p>{product.description}</p>
                      </div>
                </div>
            </div>
            
        </div>
    </section>
  )
}
