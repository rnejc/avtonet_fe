import { useEffect, useState } from "react";
import api from "../api/axios.ts";
import * as React from "react";
import { Navigate } from "react-router-dom";

const CarAdd = () => {
    const [year, setYear] = useState<number | "">("");
    const [model, setModel] = useState<string>("");
    const [mileage, setMileage] = useState<number | "">("");
    const [engineDisplacement, setEngineDisplacement] = useState<number | "">("");
    const [fuelType, setFuelType] = useState<string>("");
    const [transmission, setTransmission] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [fuelConsumption, setFuelConsumption] = useState<number | "">("");
    const [brandId, setBrandId] = useState<number | "">("");
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

    const handleFloatInput = (value: string, setter: React.Dispatch<React.SetStateAction<number | "">>) => {
        const floatValue = parseFloat(value);
        setter(isNaN(floatValue) ? "" : parseFloat(floatValue.toFixed(1))); // Ensures only 1 decimal place
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            model,
            year: year !== "" ? year : null,
            mileage: mileage !== "" ? mileage : null,
            engineDisplacement: engineDisplacement !== "" ? engineDisplacement : null,
            fuelType,
            transmission,
            color,
            fuelConsumption: fuelConsumption !== "" ? fuelConsumption : null,
            brand: {
                id: brandId !== "" ? brandId : null,
            },
        };

        try {
            const url = "/cars";
            const res = await api.post(url, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
                },
            });

            if (res.status === 201) {
                setRedirect(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

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
                    Add Car
                </button>
            </form>
        </div>
    );
};

export default CarAdd;
