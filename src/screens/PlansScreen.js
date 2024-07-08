import React, { useEffect, useState } from 'react'
import './PlansScreen.css';
import db from '../firebase';

function PlansScreen() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className='plansScreen'>

    </div>
  )
}

export default PlansScreen