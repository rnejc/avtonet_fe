import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    price: number;
    brand: { id: number; name: string };
    user: { id: number };
}

const Cars = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [cars, setCars] = useState<Car[]>([]);
    const navigate = useNavigate();
    const url = "cars";

    const loadCars = async () => {
        try {
            const res = await api.get(url);
            if (res.status === 200) {
                console.log("Cars data: ", res.data);
                setCars(res.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message);
            }
        }
    };

    const deleteCar = async (id: number) => {
        const check = window.confirm("Are you sure you want to delete this car?");
        if (!check) return;

        const deleteUrl = `/cars/${id}`;
        try {
            const res = await api.delete(deleteUrl);
            if (res.status === 200) {
                console.log("Car deleted successfully");
                setCars((prevCars) => prevCars.filter((car) => car.id !== id)); // Remove deleted car from state
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editCar = (id: number) => {
        navigate(`/carEdit/${id}`);
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
                                <Card key={i} data={car} deleteCar={deleteCar} editCar={editCar} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cars;
