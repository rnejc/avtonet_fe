import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card.tsx";
import api from "../api/axios.ts";

interface Car {
    id: number;
    model: string;
    year: number;
    mileage: number;
    engineDisplacement: number;
    fuelType: string;
    transmission: string;
    fuelConsumption: number;
    color: string;
}

const Cars = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [cars, setCars] = useState<Car[]>([]);
    const url = "cars";

    const loadCars = async () => {
        try {
            const res = await api.get(url);
            if (res.status === 200) {
                console.log(res.data);
                setCars(res.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message);
            }
        }
    };

    useEffect(() => {
        loadCars();
    }, []);

    return (
        <>
            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div className="col">
                            {cars.map((car, i) => (
                                <Card key={i} data={car} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cars;
