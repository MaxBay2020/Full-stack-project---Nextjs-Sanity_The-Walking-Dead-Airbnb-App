import {sanityClient} from "../../lib/sanity.server";
import {isMultiple} from "../../utils";
import Image from "../../components/Image";
import Review from "../../components/Review";
import Map from "../../components/Map";
import Link from 'next/link'
import Head from "next/head";

    const Property = ({title, location, propertyType,
                      mainImage, images, pricePerNight,
                      beds, bedrooms, description, host, reviews
                  }) => {
    const reviewAmount=reviews.length
    return (
        <div className='container'>
            <Head>
                <title>Airbnb - {title}</title>
                <meta name='keywords' content={title} />
                <meta name='description' content={description} />
            </Head>
            <h1><b>{title}</b></h1>
            <p>{reviewAmount} review{isMultiple(reviewAmount)}</p>

            <div className="images-section">
                <Image identifier='main-image' image={mainImage} />
                <div className="sub-images-section">
                    {
                        images.map(image => (
                            <Image key={image._key} identifier='image' image={image} />
                        ))
                    }
                </div>
            </div>

            <div className="section">
                <div className="information">
                    <h2><b>{propertyType} hosted by {host?.name}</b></h2>
                    <h4>{bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed{isMultiple(beds)}</h4>
                    <hr/>
                    <h4><b>Enhanced Clean</b></h4>
                    <p>This host is committed to Airbnb's 5-step enhanced cleaning process</p>
                    <h4><b>Amenities for everyday living</b></h4>
                    <p>This host has equipped this place for long stays - kitchen, shampoo, conditioner, hairdryer</p>
                    <h4><b>House rules</b></h4>
                    <p>This place is not suitable for pets and the host does not allow parties or smoking</p>
                </div>
                <div className='price-box'>
                    <h2>$ {pricePerNight}</h2>
                    <h4>{reviewAmount} review{isMultiple(reviewAmount)}</h4>
                    <Link href='/'><div className="button">Go HomePage</div></Link>
                </div>
            </div>

            <hr/>

            <h4>{description}</h4>
            <hr/>
            <h2>{reviewAmount} review{isMultiple(reviewAmount)}</h2>
            {reviewAmount>0 && reviews.map(review => <Review key={review._id} review={review} />)}
            <hr/>

            <h2>Location</h2>
            <Map location={location} />

        </div>
    );
}

export const getServerSideProps = async (context) => {
    const {slug} = context.query

    const query = `*[_type=='property' && slug.current == $slug ][0]{
        title, location, propertyType, mainImage, images, pricePerNight, beds,
        bedrooms, description, id, host->{
            _id, name, slug, image
        },
        reviews[]{
            ...,
            traveller->{
                _id, name, slug, image
            }
        }
    }`
    const property = await sanityClient.fetch(query, {slug})

    if(!property){
        return {
            props: null,
            notFound: true
        }
    }else{
        const {
            title, location, propertyType,
            mainImage, images, pricePerNight,
            beds, bedrooms, description, host, reviews
        } = property

        return {
            props: {
                title, location, propertyType,
                mainImage, images, pricePerNight,
                beds, bedrooms, description, host, reviews
            }
        }
    }

}

export default Property;
