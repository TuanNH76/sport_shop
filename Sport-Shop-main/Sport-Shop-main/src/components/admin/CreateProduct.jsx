import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";  
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { productsCreate } from "../../features/productsSlice";
const CreateProduct = () => {

    const dispatch = useDispatch();

    const [productImg, setProductImg] = useState("");
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");


    console.log(productImg); 
    
    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];
        TransformFileData(file);
    };
    
    const TransformFileData = (file) => {
        const reader = new FileReader();
    
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setProductImg(reader.result);
          };
        } else {
          setProductImg("");
        }
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        dispatch(
          productsCreate({
            name,
            brand,
            price,
            desc,
            image: productImg,
          })
        );
    };

    return (
        <StyledCreateProduct>
            <StyledForm onSubmit={handleSubmit}>
                <h3>Create a Product</h3>
                <input 
                    type = "file" 
                    accept="image/*" 
                    onChange={handleProductImageUpload}
                    required
                />
                <select
                    onChange={(e) => setBrand(e.target.value)}
                    required
                >
                    <option value="">Select Brand</option>
                    <option value="Adidas">Adidas</option>
                    <option value="Nike">Nike</option>
                    <option value="Puma">Puma</option>
                    <option value="New Balance">New Balance</option>
                    <option value="Converse">Converse</option>
                    <option value="Skechers">Skechers</option>
                    <option value="Vans">Vans</option>
                    <option value="other">Other</option>
                </select>
                <input 
                    type="text"
                    placeholder="name"
                    onChange={(e)=>setName(e.target.value)}
                    required
                />
                <input 
                    type="number"
                    placeholder="Price"
                    onChange={(e)=>setPrice(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="Short Description"
                    onChange={(e)=>setDesc(e.target.value)}
                    required
                />
                <PrimaryButton type="submit">
                    Submit
                </PrimaryButton>

            </StyledForm>
            <ImagePreview>
            {productImg ? (
                <>
                    <img src={productImg} alt="error!" />
                </>
            ) : (
                <p>Product image upload preview will appear here!</p>
            )}
            </ImagePreview>
        </StyledCreateProduct> 
    );
}
 
export default CreateProduct ;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;