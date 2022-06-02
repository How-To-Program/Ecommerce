import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { clearCart } from '../redux/cartRedux'

const Success = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          username: currentUser.username,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            img: item.img,
            title: item.title,
            price: item.price,
            size: item.size,
            color: item.color,
            time: item.time
          })),
          amount: cart.total,
          address: data.billing_details.address,
          time: Date.parse(new Date())
        });
        setOrderId(res.data._id);
        dispatch(clearCart());
      } catch(err) {
        console.log(err)
      }
    };
    data && createOrder();
  }, [cart, data]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/" className="link">
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;