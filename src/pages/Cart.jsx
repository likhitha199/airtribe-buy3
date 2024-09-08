import { useState, useEffect } from "react";
import { Card, Image, Text, Button, Group, NumberInput, Space, Stack, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || {});
  const [totalAmount, setTotalAmount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const total = Object.values(cart).reduce((acc, item) => acc + item.totalPrice, 0);
    setTotalAmount(total - discount);
  }, [cart, discount]);

  const handleQuantityChange = (productId, value) => {
    setCart((prevCart) => {
      const cartItem = prevCart[productId];
      if (!cartItem || !cartItem.price) {
        return prevCart;
      }
      const updatedProduct = {
        ...cartItem,
        quantity: value,
        totalPrice: value * cartItem.price,
      };
      const updatedCart = { ...prevCart, [productId]: updatedProduct };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleApplyCoupon = () => {
    if (appliedCoupon) {
      notifications.show({
        title: 'Coupon Already Applied',
        message: 'A coupon has already been applied.',
        color: "red",
      });
      return;
    }

    // Dummy logic for coupon validation
    if (couponCode === 'DISCOUNT10') {
      setDiscount(totalAmount * 0.1); // 10% discount
      setAppliedCoupon(true);
      notifications.show({
        title: 'Coupon Applied',
        message: 'A 10% discount has been applied to your total amount.',
        color: "green",
      });
    } else {
      notifications.show({
        title: 'Invalid Coupon',
        message: 'The coupon code you entered is not valid.',
        color: "red",
      });
    }
  };

  const handleCheckout = () => {
    notifications.show({
      title: 'Proceed to Checkout',
      message: 'Redirecting to the payment gateway...',
      color: "blue",
    });
  
    // Redirect to payment page
    navigate("/payment", { state: { totalAmount } });
  };

  const cartItems = Object.values(cart);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((product) => (
            <Card key={product.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Group align="center" spacing="xl">
                <Image src={product.image} alt={product.title} width={100} height={100} />
                <Stack spacing={5}>
                  <Text fw={700}>{product.title}</Text>
                  <Text>${product.totalPrice.toFixed(2)}</Text>
                  <Group align="center" spacing={5}>
                    <NumberInput
                      value={product?.quantity || 1}
                      onChange={(value) => handleQuantityChange(product.id, value)}
                      min={1}
                      max={99}
                      placeholder="Qty"
                      styles={{ input: { width: '60px' } }}
                    />
                    <Button color="red" onClick={() => handleRemoveFromCart(product.id)}>
                      Remove
                    </Button>
                  </Group>
                </Stack>
              </Group>
            </Card>
          ))}
          
          <Space h="md" />

          {/* Coupon Code Input */}
          <Group align="center" spacing={5}>  
          <TextInput
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(event) => setCouponCode(event.currentTarget.value)}
            styles={{ input: { width: '200px' } }}
          />
          <Button onClick={handleApplyCoupon} color="green" ml="sm">
            Apply Coupon
          </Button>
          </Group>

          <Space h="md" />

          {/* Total Amount and Checkout */}
          <Text fw={700} fz={24}>Total: ${totalAmount.toFixed(2)}</Text>
          <Button onClick={handleCheckout} color="blue" size="lg">
            Proceed to Checkout
          </Button>
        </>
      ) : (
        <Text>Your cart is empty.</Text>
      )}
      <Space h="xl" />
    </div>
  );
}
