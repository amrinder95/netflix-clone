import React, { useEffect, useState } from 'react'
import './PlansScreen.css';
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';
 
function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection('products').where('active','==', true)
    .get().then(QuerySnapshot => {
      const products = {};
      QuerySnapshot.forEach(async productDoc => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await productDoc.ref.collection
        ('prices').get();
        priceSnap.docs.forEach(price => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data()
          }
        })
      });
      setProducts(products);
    });
  }, []);

  console.log(products);

  const loadCheckout = async (priceId) => {
    const docRef = await db.collection('customers')
      .doc(user.uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    
    docRef.onSnapshot(async(snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe('pk_test_51PaJSPKlZviF2iNIHmie4uQvBBpUUMReHMGvATLHXqBw3qzDlgG85iyw13MFe2XRQm9bD6lNY3MHbJ9QH4SssEwu00SjNJn04b')
        stripe.redirectToCheckout({ sessionId });
      }
      
    })
  }

  return (
    <div className='plansScreen'>
    {Object.entries(products).map(([productId, productData]) => {
      return (
        <div className="plansScreen__plan">
          <div className="plansScreen_info">
            <h5>{productData.name}</h5>
            <h6>{productData.description}</h6>
          </div>
          <button onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button>
        </div>
      )
    })}

    </div>
  )
}

export default PlansScreen