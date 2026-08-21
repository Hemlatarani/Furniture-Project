import Breadcrumb from '../../../common/Breadcrumb'
import ProductCart from '../../../common/ProductCart'
import { categoryapi, productApi } from '../../../api-service/homeservice'

export default async function LivingCategoryPage({ params }) {
    let { slug } = await params

    let categoryData = await categoryapi()
    let category = categoryData.find((cat) => cat.categoryName.toLowerCase().replace(/\s+/g, '-') === slug)

    let products = []
    let imagePath = ''

    if (category) {
        let res = await productApi(category._id)
        products = res.productid || []
        imagePath = res.staticPath || ''
    }

    return (
        <>
            <Breadcrumb pageName={slug.replace(/-/g, ' ').toUpperCase()} />
            <div className='max-w-[1270px] mx-auto my-10'>
                {products.length === 0 ? (
                    <p className='text-center text-gray-500'>No products found.</p>
                ) : (
                    <div className='grid grid-cols-3 gap-5'>
                        {products.map((data, index) => (
                            <ProductCart key={index} data={data} imagePath={imagePath} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
