import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Grid, Card, Image, Text, Badge, Button, Group, Space, NumberInput, LoadingOverlay, Pagination } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import useFetchProductListing from "../services/product/useFetchProductListing";

const Home = () => {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || {});
    const wishlist = JSON.parse(localStorage.getItem("airtribe-user-wishlist"));
    const [wishlistState, setWishlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const navigate = useNavigate();
    const { products, activePage, limit, setActivePage, setLimit, loading, errorState } = useFetchProductListing(`https://fakestoreapi.com/products`);

    useEffect(() => {
        setWishlist(wishlist);
    }, [wishlist]);

    useEffect(() => {
        setActivePage(currentPage);
        setLimit(itemsPerPage);
    }, [currentPage, itemsPerPage]);

    // Helper function to update cart in localStorage
    const updateCartInLocalStorage = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleAddToCart = (product) => {
        setCart((prevCart) => {
            const updatedCart = {
                ...prevCart,
                [product.id]: {
                    ...product,
                    quantity: 1,
                    totalPrice: product.price,
                },
            };
            updateCartInLocalStorage(updatedCart); // Save to localStorage
            return updatedCart;
        });
        notifications.show({
            title: 'Added to Cart',
            message: `${product.title} has been added to your cart.`,
            color: "green",
        });
    };

    const handleQuantityChange = (productId, value) => {
        setCart((prevCart) => {
            const updatedProduct = { ...prevCart[productId], quantity: value, totalPrice: value * prevCart[productId].price };
            const updatedCart = { ...prevCart, [productId]: updatedProduct };
            updateCartInLocalStorage(updatedCart); // Save to localStorage
            return updatedCart;
        });
    };

    if (loading) {
        return <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />;
    }

    if (errorState) {
        return <h1>Error occurred: We could not fetch products...</h1>;
    }

    return (
        <>
            <Grid>
                {products?.map((product) => {
                    const cartItem = cart[product.id];
                    return (
                        <Grid.Col mah={800} key={product.id} span={{ base: 12, md: 6, lg: 3 }}>
                            <Card
                                onClick={() => {
                                    navigate(`/products/${product.id}`, {
                                        preventScrollReset: false,
                                    });
                                }}
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                            >
                                <Card.Section>
                                    <Image src={product.image} alt={product.title} height={200} fit="contain" />
                                </Card.Section>
                                 <Space h="md" />
                                <Group justify="space-between" mt="md" mb="xs">
                                    <Text fw={700}>{product.title}</Text>
                                    <Badge color="pink">{product.category}</Badge>
                                </Group>
                                <Text fz={30} fw={500}>${product.price}</Text>
                                <Space h="md" />

                                <Group align="center" gap={5} mt="md">
                                    <NumberInput
                                        value={cartItem?.quantity || 1}
                                        onChange={(value) => handleQuantityChange(product.id, value)}
                                        min={1}
                                        max={99}
                                        placeholder="Qty"
                                        styles={{ input: { width: '60px' } }}
                                    />
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                        color="purple"
                                        radius="md"
                                    >
                                        Add To Cart
                                    </Button>
                                </Group>
                            </Card>
                        </Grid.Col>
                    );
                })}
            </Grid>

            <Space h="xl" />
            <Group align="center" gap={5}>
                <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Previous</Button>
                <NumberInput
                    value={currentPage}
                    onChange={(value) => value && setCurrentPage(value)}
                    min={1}
                    styles={{ input: { width: '60px' } }}
                />
                <Button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</Button>
            </Group>
            <Group gap={5} justify="center">
                <Pagination
                    value={currentPage}
                    onChange={setCurrentPage}
                    total={Math.ceil(500 / limit)} // Adjust as needed
                />
                <Select
                    value={itemsPerPage.toString()}
                    onChange={(value) => setItemsPerPage(Number(value))}
                    placeholder="Set Limit"
                    data={['10', '20', '30', '40', '50']}
                />
            </Group>
            <Space h="xl" />
        </>
    );
};

export default Home;
