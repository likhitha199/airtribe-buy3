import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Group, Stack, Image } from "@mantine/core";
const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const params = useParams();
    console.log(params);
    const { productid } = params;

    useEffect(() => {
        fetch(`https://fakestoreapi.in/api/products/${productid}`)
        .then(res => res.json())
        .then(res => setProduct(res.product))
    },[productid])

    return ( 
        <Group>
            <Image
                width={300}
                height={300}
                radius="md"
                src={product?.image}
            />
            <Stack>
                <h1>Product Name</h1>
                <p>{product?.title}</p>
                <h2>Product Description</h2>
                <p>{product?.description}</p>
            </Stack>
        </Group>
     );
}
 
export default ProductDetails;