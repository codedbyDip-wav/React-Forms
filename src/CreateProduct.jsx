/*
=================================================
Student Details
=================================================
Name : Dipendra Chaulagain
Roll No. : 22
Contact No. : 9761715127
Address : Hetauda-5
Program : BSc CSIT
Semester : 2nd
=================================================
Task: Product Creation Form with Fake API
=================================================
*/

import { useState } from "react";
import "./CreateProduct.css";

const initialForm = {
  productName: "",
  description: "",
  category: "Electronics",
  price: "",
  stockQuantity: "",
  brand: "",
  condition: "New",
  imageUrl: "",
  availableForSale: true,
  featuredProduct: false,
};

function CreateProduct() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiId, setApiId] = useState("");

  const updateField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    if (!form.description.trim()) {
      newErrors.description = "Product description is required";
    }

    if (!form.price) {
      newErrors.price = "Price is required";
    } else if (Number(form.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (form.stockQuantity === "") {
      newErrors.stockQuantity = "Stock quantity is required";
    } else if (Number(form.stockQuantity) < 0) {
      newErrors.stockQuantity =
        "Stock quantity cannot be negative";
    }

    if (!form.brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    if (!form.imageUrl.trim()) {
      newErrors.imageUrl = "Product image URL is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setApiId("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const data = await response.json();

      console.log("Product created:", data);

      setSuccess("Product created successfully!");
      setApiId(data.id);

      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error(error);
      setErrors({
        submit: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-container">
      <div className="product-form-wrapper">

        <h1>Create Product</h1>

        <p className="product-subtitle">
          Add a new product to your store
        </p>

        {success && (
          <div className="success-message">
            <p>{success}</p>
            <p>Product ID: {apiId}</p>
          </div>
        )}

        {errors.submit && (
          <p className="error-message">
            {errors.submit}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Product Name</label>

            <input
              type="text"
              placeholder="Enter product name"
              value={form.productName}
              onChange={(e) =>
                updateField(
                  "productName",
                  e.target.value
                )
              }
            />

            {errors.productName && (
              <p className="field-error">
                {errors.productName}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Product Description</label>

            <textarea
              placeholder="Enter product description"
              value={form.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
            />

            {errors.description && (
              <p className="field-error">
                {errors.description}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              value={form.category}
              onChange={(e) =>
                updateField(
                  "category",
                  e.target.value
                )
              }
            >
              <option value="Electronics">
                Electronics
              </option>
              <option value="Clothing">
                Clothing
              </option>
              <option value="Books">
                Books
              </option>
              <option value="Grocery">
                Grocery
              </option>
              <option value="Furniture">
                Furniture
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              placeholder="Enter price"
              value={form.price}
              onChange={(e) =>
                updateField(
                  "price",
                  e.target.value
                )
              }
            />

            {errors.price && (
              <p className="field-error">
                {errors.price}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Stock Quantity</label>

            <input
              type="number"
              placeholder="Enter stock quantity"
              value={form.stockQuantity}
              onChange={(e) =>
                updateField(
                  "stockQuantity",
                  e.target.value
                )
              }
            />

            {errors.stockQuantity && (
              <p className="field-error">
                {errors.stockQuantity}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Brand</label>

            <input
              type="text"
              placeholder="Enter brand"
              value={form.brand}
              onChange={(e) =>
                updateField(
                  "brand",
                  e.target.value
                )
              }
            />

            {errors.brand && (
              <p className="field-error">
                {errors.brand}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Product Condition</label>

            <select
              value={form.condition}
              onChange={(e) =>
                updateField(
                  "condition",
                  e.target.value
                )
              }
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Refurbished">
                Refurbished
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Product Image URL</label>

            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(e) =>
                updateField(
                  "imageUrl",
                  e.target.value
                )
              }
            />

            {errors.imageUrl && (
              <p className="field-error">
                {errors.imageUrl}
              </p>
            )}
          </div>

          <div className="checkbox-group">

            <label>
              <input
                type="checkbox"
                checked={form.availableForSale}
                onChange={(e) =>
                  updateField(
                    "availableForSale",
                    e.target.checked
                  )
                }
              />
              Available for Sale
            </label>

            <label>
              <input
                type="checkbox"
                checked={form.featuredProduct}
                onChange={(e) =>
                  updateField(
                    "featuredProduct",
                    e.target.checked
                  )
                }
              />
              Featured Product
            </label>

          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Product..."
              : "Create Product"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default CreateProduct;