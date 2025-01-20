import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Ecommerce.module.css';
import React from 'react';

const products = [
    { id: 1, name: 'Shirt', price: 20, image: '/images/shirt.jpg' },
    { id: 2, name: 'Mug', price: 10, image: '/images/mug.jpg' },
    { id: 3, name: 'Cup', price: 15, image: '/images/cup.jpg' },
    { id: 4, name: 'Hat', price: 25, image: '/images/hat.jpg' },
    { id: 5, name: 'Notebook', price: 5, image: '/images/notebook.jpg' },
];

const btcAddress = 'your-btc-address-here';
const nequiNumber = 'your-nequi-number-here';

export default function Ecommerce() {
    const [cart, setCart] = useState<
        { id: number; name: string; price: number; quantity: number }[]
    >([]);
    const [btcPrice, setBtcPrice] = useState<number | null>(null);

    useEffect(() => {
        const fetchBtcPrice = async () => {
            try {
                const response = await fetch(
                    'https://api.coindesk.com/v1/bpi/currentprice/BTC.json'
                );
                const data = await response.json();
                setBtcPrice(data.bpi.USD.rate_float);
            } catch (error) {
                console.error('Error fetching BTC price:', error);
            }
        };
        fetchBtcPrice();
    }, []);

    const addToCart = (product: { id: number; name: string; price: number }) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(
                (item) => item.id === product.id
            );
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(
                (item) => item.id === productId
            );
            if (existingProduct && existingProduct.quantity > 1) {
                return prevCart.map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return prevCart.filter((item) => item.id !== productId);
            }
        });
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>E-commerce</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <h1>STORE</h1>
            </header>

            <main className={styles.main}>
                <div className={styles.productList}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.product}>
                            <img
                                src={product.image}
                                alt={product.name}
                                className={styles.productImage}
                            />
                            <h2>{product.name}</h2>
                            <p>${product.price}</p>
                            {btcPrice && (
                                <p>
                                    {(product.price / btcPrice).toFixed(6)} BTC
                                </p>
                            )}
                            <button
                                className={styles.localButton}
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
                <div className={styles.cart}>
                    <h2>Shopping Cart</h2>
                    {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <div>
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className={styles.cartItem}
                                >
                                    <h3>{item.name}</h3>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>
                                        Price: $
                                        {item.price * item.quantity}
                                    </p>
                                    {btcPrice && (
                                        <p>
                                            Total in BTC:{' '}
                                            {(
                                                (item.price *
                                                    item.quantity) /
                                                btcPrice
                                            ).toFixed(6)}{' '}
                                            BTC
                                        </p>
                                    )}
                                    <button
                                        className={styles.localButton}
                                        onClick={() =>
                                            removeFromCart(item.id)
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <div className={styles.paymentInfo}>
                                <h3>Payment Information</h3>
                                <p>Send BTC to: {btcAddress}</p>
                                <p>Or pay with Nequi: {nequiNumber}</p>
                                <button
                                    className={styles.localButton}
                                    onClick={() =>
                                        alert(
                                            'Proceeding to payment (simulated)'
                                        )
                                    }
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
