import React, { useEffect, useState } from "react";
import api from "../api/axios.ts";
import { Navigate, useParams } from "react-router-dom";


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
}

const CarEdit = () => {
    const { id } = useParams<{ id: string }>();

    // State variables to store form data
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
                    <div className="form-label">Car Brand</div>
                    <select
                        className="form-control"
                        value={brandId}
                        onChange={(e) => setBrandId(e.target.value ? parseInt(e.target.value) : "")}
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
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default CarEdit;
