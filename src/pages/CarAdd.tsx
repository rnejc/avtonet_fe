import { useEffect, useState } from "react";
import api from "../api/axios.ts";
import * as React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

interface PresignedUrlResponse {
    uploadUrl: string;
    fileUrl: string;
}

const CarAdd = () => {
    const [uploading, setUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [image, setImage] = useState<string>("");
    const [year, setYear] = useState<number | "">("");
    const [model, setModel] = useState<string>("");
    const [mileage, setMileage] = useState<number | "">("");
    const [engineDisplacement, setEngineDisplacement] = useState<number | "">("");
    const [fuelType, setFuelType] = useState<string>("");
    const [transmission, setTransmission] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [fuelConsumption, setFuelConsumption] = useState<number | "">("");
    const [price, setPrice] = useState<number | "">("");
    const [brandId, setBrandId] = useState<number | null>(null); // Change to null instead of ""
    const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        // Fetch available car brands from the backend
        const fetchBrands = async () => {
            const url = "/brands";
            try {
                const res = await api.get(url);
                if (res.status === 200) {
                    setBrands(res.data);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchBrands();
    }, []);

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


    const handleFloatInput = (value: string, setter: React.Dispatch<React.SetStateAction<number | "">>) => {
        const floatValue = parseFloat(value);
        setter(isNaN(floatValue) ? "" : parseFloat(floatValue.toFixed(1))); // Ensures only 1 decimal place
    };

    const handleIntegerInput = (value: string, setter: React.Dispatch<React.SetStateAction<number | "">>) => {
        const intValue = parseInt(value, 10);
        setter(isNaN(intValue) ? "" : intValue);
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if brandId is selected
        if (brandId === null) {
            alert("Please select a brand.");
            return;
        }

        const data = {
            image,  // The image URL you obtained after the upload
            model,
            year: year !== "" ? year : null,
            mileage: mileage !== "" ? mileage : null,
            engineDisplacement: engineDisplacement !== "" ? engineDisplacement : null,
            fuelType,
            transmission,
            color,
            fuelConsumption: fuelConsumption !== "" ? fuelConsumption : null,
            price: price !== "" ? price : null,
            brand: {
                id: brandId !== null ? brandId : null, // Ensure null if not selected
            },
        };

        try {
            const url = "/cars";
            const res = await api.post(url, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res.status === 201) {
                setRedirect(true);
            }
        } catch (e) {
            console.error('Error creating car:', e);
            alert('Error creating car.');
        }
    };

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
                            <p>Uploaded Image Preview:</p>
                            <img
                                src={fileUrl}
                                alt="Uploaded car image"
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
                        placeholder="Enter car model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                <div className="form-label">Year</div>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter car year"
                        value={year}
                        onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : "")}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Mileage</div>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter mileage"
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
                        placeholder="Enter engine displacement"
                        value={engineDisplacement}
                        onChange={(e) => handleFloatInput(e.target.value, setEngineDisplacement)}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Fuel Type</div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter fuel type"
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Transmission</div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter transmission type"
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Color</div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter car color"
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
                        placeholder="Enter fuel consumption"
                        value={fuelConsumption}
                        onChange={(e) => handleFloatInput(e.target.value, setFuelConsumption)}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Price (€)</div>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter price in EUR"
                        value={price}
                        onChange={(e) => handleIntegerInput(e.target.value, setPrice)}
                    />
                </div>
                <div className="mb-3">
                    <div className="form-label">Car Brand</div>
                    <select
                        className="form-control"
                        value={brandId ?? ""} // Ensure null/"" for empty selection
                        onChange={(e) => setBrandId(e.target.value ? parseInt(e.target.value) : null)} // Set null when empty
                    >
                        <option value="">Select car brand...</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Car
                </button>
            </form>
        </div>
    );
};

export default CarAdd;
