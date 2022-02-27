import Head from 'next/head'
import Image from 'next/image'

import {sanityClient} from '../lib/sanity.server'
import {urlFor} from "../lib/sanity";
import Link from "next/link";
import {isMultiple} from "../utils";
import DashboardMap from "../components/DashboardMap"


const Home = ({properties}) => {
  return (
      <div className='bg'>
          {properties && (
              <div className="main">
                  <div className="feed-container">
                      <h1>Places to stay near you</h1>
                      <div className="feed">
                          {
                              properties.map(property=>(
                                  <Link key={property._id} href={`/property/${property.slug.current}`}>
                                      <a>
                                          <div className="card" >
                                              <img src={urlFor(property.mainImage).url()} alt=""/>
                                              <p>{property.reviews.length} review{isMultiple(property.reviews.length)}</p>
                                              <h3>{property.title}</h3>
                                            <h3>$ {property.pricePerNight} / Night</h3>
                                        </div>
                                      </a>
                                  </Link>
                              ))
                          }
                      </div>

                  </div>
                  <div className="map">
                      <DashboardMap properties={properties} />
                  </div>
              </div>
          )}
      </div>
  )
}

export const getServerSideProps = async (context) =>{
    const query = `*[_type=='property']`
    const properties=await sanityClient.fetch(query)
    if(properties?.length>0) {
        return {
            props: {
                properties
            }
        }
    }
}

export default Home
