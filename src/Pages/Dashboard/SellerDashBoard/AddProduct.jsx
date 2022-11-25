import React from "react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const submitProduct = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const condition = form.condition.value;
    const originalPrice = form.originalPrice.value;
    const resalePrice = form.resalePrice.value;
    const used = form.used.value;
    const picture = form.picture.value;
    const phone = form.phone.value;
    const location = form.location.value;
    const categorieName = form.categorieName.value;
    const description = form.description.value;

    const productDetails = {
      name,
      condition,
      originalPrice,
      resalePrice,
      picture,
      phone,
      location,
      categorieName,
      description,
      used,
    };

    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("product added successfully");
        }
      });
  };
  return (
    <div className='lg:w-2/3 mx-auto'>
      <h2 className='text-3xl text-center mt-10 mb-5'>Add Product</h2>
      <form onSubmit={submitProduct} className='grid gap-y-4 p-5'>
        <input
          required
          type='text'
          name='name'
          placeholder='Product Name'
          className='input input-bordered input-accent w-full'
        />
        <select
          required
          name='condition'
          className='select select-accent w-full'
        >
          <option value='excellent'>excellent</option>
          <option value='good'>good</option>
          <option value='fair'>fair</option>
        </select>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4'>
          <input
            type='number'
            required
            name='originalPrice'
            placeholder='Original Price'
            className='input input-bordered input-accent w-full'
          />
          <input
            type='number'
            required
            name='resalePrice'
            placeholder='Resale Price'
            className='input input-bordered input-accent w-full'
          />
          <input
            type='number'
            required
            name='used'
            placeholder='Used in Years'
            className='input input-bordered input-accent w-full'
          />
          <input
            type='text'
            required
            name='picture'
            placeholder='Image Url'
            className='input input-bordered input-accent w-full'
          />
        </div>
        <input
          type='number'
          required
          name='phone'
          placeholder='Contact Number'
          className='input input-bordered input-accent w-full'
        />
        <select
          required
          name='location'
          className='select select-accent w-full'
        >
          <option value='Dhaka'>Dhaka</option>
          <option value='Chittagong'>Chittagong</option>
          <option value='Rangpur'>Rangpur</option>
        </select>
        <select
          required
          name='categorieName'
          className='select select-accent w-full'
        >
          <option value='Analog Watches'>Analog Watches</option>
          <option value='Digital Watches'>Digital Watches</option>
          <option value='Mechanical Watches'>Mechanical Watches</option>
        </select>
        <textarea
          name='description'
          className='textarea textarea-accent'
          placeholder='Description'
        ></textarea>
        <input
          type='submit'
          value='submit'
          className='input input-bordered input-accent w-full bg-accent text-white'
        />
      </form>
    </div>
  );
};

export default AddProduct;
