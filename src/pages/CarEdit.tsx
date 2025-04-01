import React, { useEffect, useState } from "react";
import api from "../api/axios.ts";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

interface PresignedUrlResponse {
    uploadUrl: string;
    fileUrl: string;
}

interface CarUpdateData {
    model?: string;
    year?: number;
    mileage?: number;
    engineDisplacement?: number;
    fuelType?: string;
    transmission?: string;
    color?: string;
    fuelConsumption?: number;
    price?: number;
    brand?: { id: number };
    image?: string; // Add image field to allow for updating image
}

const CarEdit = () => {
    const { id } = useParams<{ id: string }>();

    // State variables to store form data
    const [uploading, setUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [image, setImage] = useState<string>(""); // Image state
    const [year, setYear] = useState<number | "">("");
    const [model, setModel] = useState<string>("");
    const [mileage, setMileage] = useState<number | "">("");
    const [engineDisplacement, setEngineDisplacement] = useState<number | "">("");
    const [fuelType, setFuelType] = useState<string>("");
    const [transmission, setTransmission] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [fuelConsumption, setFuelConsumption] = useState<number | "">("");
    const [price, setPrice] = useState<number | "">("");
    const [brandId, setBrandId] = useState<number | "">("");
    const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
    const [redirect, setRedirect] = useState(false);

    // Fetch car details on component mount
    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await api.get(`/cars/${id}`);
                if (res.status === 200) {
                    const car = res.data;
                    setModel(car.model);
                    setYear(car.year);
                    setMileage(car.mileage);
                    setEngineDisplacement(car.engineDisplacement);
                    setFuelType(car.fuelType);
                    setTransmission(car.transmission);
                    setColor(car.color);
                    setFuelConsumption(car.fuelConsumption);
                    setPrice(car.price);
                    setBrandId(car.brand?.id || "");
                    setImage(car.image || ""); // Set the existing image URL
                    setFileUrl(car.image || null); // Set the existing image file URL if available
                }
            } catch (e) {
                console.log(e);
            }
        };

        // Fetch available brands
        const fetchBrands = async () => {
            try {
                const res = await api.get("/brands");
                if (res.status === 200) {
                    setBrands(res.data);
                }
            } catch (e) {
                console.log(e);
            }
        };

        fetchCar();
        fetchBrands();
    }, [id]);

    //Upload image
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        try {
            // Step 1: Fetch presigned URL from the backend
            const res = await fetch(`http://localhost:3000/cars/presigned-image-upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
                },
            });

            if (!res.ok) {
                throw new Error('Failed to get presigned URL');
            }

            const { uploadUrl, fileUrl }: PresignedUrlResponse = await res.json();

            // Step 2: Upload the image to S3 using the presigned URL
            const uploadResponse = await axios.put(uploadUrl, file, {
                headers: {
                    'Content-Type': file.type,  // Dynamically set content type based on file type
                },
            });

            if (uploadResponse.status === 200) {
                console.log('Image uploaded successfully');
                setFileUrl(fileUrl);
                setImage(fileUrl);  // Set image URL to state
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('There was an error uploading the image.');
        } finally {
            setUploading(false);
        }
    };

    // Function to handle float inputs
    const handleFloatInput = (value: string, setter: React.Dispatch<React.SetStateAction<number | "">>) => {
        const floatValue = parseFloat(value);
        setter(isNaN(floatValue) ? "" : parseFloat(floatValue.toFixed(1))); // Ensures only 1 decimal place
    };

    // Function to handle integer inputs (for price)
    const handleIntegerInput = (value: string, setter: React.Dispatch<React.SetStateAction<number | "">>) => {
        const intValue = parseInt(value, 10);
        setter(isNaN(intValue) ? "" : intValue);
    };

    // Submit form data to update the car
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure engineDisplacement and fuelConsumption are numbers
        const data: CarUpdateData = {};

        if (model) data.model = model;
        if (year !== "") data.year = year;
        if (mileage !== "") data.mileage = mileage;
        if (engineDisplacement !== "") data.engineDisplacement = parseFloat(engineDisplacement.toString()); // Ensure engineDisplacement is a number
        if (fuelType) data.fuelType = fuelType;
        if (transmission) data.transmission = transmission;
        if (color) data.color = color;
        if (fuelConsumption !== "") data.fuelConsumption = parseFloat(fuelConsumption.toString()); // Ensure fuelConsumption is a number
        if (price !== "") data.price = price;
        if (brandId !== "") data.brand = { id: brandId };
        if (image) data.image = image; // Include image if it has been updated

        try {
            const res = await api.patch(`/cars/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res.status === 200) {
                setRedirect(true);
            }
        } catch (e) {
            console.log(e);
            console.log("Data to send:", data);
        }
    };

    // Redirect to /cars after successful update
    if (redirect) {
        return <Navigate to="/cars" />;
    }

    return (
        <div className="container">
            <form onSubmit={submit}>
                <div className="p-4 border rounded max-w-md">
                    <input type="file" onChange={handleFileChange}/>
                    {uploading && <p>Uploading...</p>}
                    {fileUrl ? (
                        <div className="mt-2">
                            <p>Current Image:</p>
                            <img
                                src={fileUrl}
                                alt="Current car image"
                                className="w-32 h-32 object-cover rounded"
                            />
                        </div>
                    ) : (
                        <p>No image uploaded yet.</p>
                    )}
                </div>
                <div className="mb-3">
                    <div className="form-label">Model</div>
                    <input
                        type="text"
                        className="form-control"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Year</div>
                    <input
                        type="number"
                        className="form-control"
                        value={year}
                        onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : "")}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Mileage</div>
                    <input
                        type="number"
                        className="form-control"
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value ? parseInt(e.target.value) : "")}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Engine Displacement</div>
                    <input
                        type="number"
                        step="0.1"
                        className="form-control"
                        value={engineDisplacement}
                        onChange={(e) => handleFloatInput(e.target.value, setEngineDisplacement)}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Fuel Type</div>
                    <input
                        type="text"
                        className="form-control"
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Transmission</div>
                    <input
                        type="text"
                        className="form-control"
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Color</div>
                    <input
                        type="text"
                        className="form-control"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Fuel Consumption (L/100km)</div>
                    <input
                        type="number"
                        step="0.1"
                        className="form-control"
                        value={fuelConsumption}
                        onChange={(e) => handleFloatInput(e.target.value, setFuelConsumption)}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Price (€)</div>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => handleIntegerInput(e.target.value, setPrice)}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Brand</div>
                    <select
                        className="form-control"
                        value={brandId}
                        onChange={(e) => setBrandId(parseInt(e.target.value))}
                    >
                        <option value="">Select brand</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                        Update Car
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CarEdit;
