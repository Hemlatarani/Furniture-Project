import OrderDetails from '../../my-dashboard/OrderWdetails'

export default function OrderDetailsPage({ params }) {
    return <OrderDetails id={params.id} />
}
