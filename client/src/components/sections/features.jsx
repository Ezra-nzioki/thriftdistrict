import React from 'react'
import { products } from '../../products'

export const Features = () => {
    const featureImage = products[2].imageUrl;
  return (
<>
    <div  className='flex flex-col md:flex-row justify-center items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 p-10 bg-[#344F1F] text-[#F9F5F0]'>
        <div>

            <img src={featureImage} className=' rounded-2xl' />
        </div>
        <div className=' text-2xl my-1 md:text-3xl lg:mt-23 space-y-4'>
            <h2 className='font-bold'>Get yourself a fashionable drip</h2>
            <br/>
            <p>Discover unique styles at unbeatable prices in our thrift shop. 
            </p>
                <ul>
                    <li>
                        • Sustainable fashion choices   
                    </li>
                    <li>
                        • Affordable prices
                    </li>
                    <li>
                        • Unique, one-of-a-kind items
                    </li>
                    <li>
                        • Quality checked products
                    </li>
                </ul>
                 
           

        </div>
    </div>
</>
  )
}
