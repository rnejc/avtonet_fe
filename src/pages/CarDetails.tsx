import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    brand: { name: string };
    user: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
    };
    image?: string;
}

const CarDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<Car | null>(null);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const res = await api.get(`/cars/${id}`);
                console.log("Fetched car details:", res.data);
                setCar(res.data);
            } catch (error) {
                console.error("Error fetching car details:", error);
            }
        };

        fetchCarDetails();
    }, [id]);

    if (!car) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-center gap-3">
                {/* Car Details Card */}
                <div className="card shadow-sm" style={{ maxWidth: "400px" }}>
                    {car.image ? (
                        <img
                            src={car.image}
                            alt={car.model}
                            className="card-img-top"
                            style={{ width: "100%", height: "225px", objectFit: "cover" }}
                        />
                    ) : (
                        <svg
                            className="bd-placeholder-img card-img-top"
                            width="100%"
                            height="225"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Placeholder: Thumbnail"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                        >
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#55595c" />
                            <text x="50%" y="50%" fill="#eceeef" dy=".3em">No Image</text>
                        </svg>
                    )}

                    <div className="card-body">
                        <h2 className="card-title">{car.model}</h2>
                        <p className="card-text"><strong>Year:</strong> {car.year}</p>
                        <p className="card-text"><strong>Mileage:</strong> {car.mileage} km</p>
                        <p className="card-text"><strong>Engine Displacement:</strong> {car.engineDisplacement} L</p>
                        <p className="card-text"><strong>Fuel Type:</strong> {car.fuelType}</p>
                        <p className="card-text"><strong>Fuel Consumption:</strong> {car.fuelConsumption} L/100km</p>
                        <p className="card-text"><strong>Transmission:</strong> {car.transmission}</p>
                        <p className="card-text"><strong>Color:</strong> {car.color}</p>
                        <h4 className="card-text"><strong>Price:</strong> {car.price} €</h4>


                        <small className="text-muted d-block text-end mt-2 bg-light p-1 rounded">
                            {car.brand.name}
                        </small>

                    </div>
                </div>

                {/* Seller Information Card */}
                <div className="card shadow-sm" style={{maxWidth: "400px"}}>
                    <div className="card-body text-center">
                        <h2 className="card-title">Seller Information</h2>

                        {/* Bootstrap Default Profile Picture */}
                        <div className="d-flex justify-content-center mb-3">
                            <i className="bi bi-person-circle" style={{fontSize: "120px", color: "#6c757d"}}></i>
                        </div>

                        <p className="card-text"><strong>Name:</strong> {car.user.firstName} {car.user.lastName}</p>
                        <p className="card-text"><strong>Email:</strong> {car.user.email}</p>
                        <p className="card-text"><strong>Phone:</strong> {car.user.phoneNumber}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
