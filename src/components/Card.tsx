import {Link} from "react-router-dom";

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
    user?: { id: number };
    image?: string;
}

const Card = ({ data, deleteCar, editCar }: {
    data: Car;
    deleteCar: (id: number) => void;
    editCar: (id: number) => void;
}) => {
    const loggedInUserId = parseInt(localStorage.getItem("userId") || "0", 10);
    const isOwner = data.user?.id === loggedInUserId;

    return (
        <div className="card shadow-sm">
            {/* ✅ Show image if available, otherwise use placeholder */}
            {data.image ? (
                <img
                    src={data.image}
                    alt={data.model}
                    className="card-img-top"
                    style={{width: "100%", height: "225px", objectFit: "cover"}}
                />
            ) : (
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225"
                     xmlns="http://www.w3.org/2000/svg" role="img"
                     aria-label="Placeholder: Thumbnail"
                     preserveAspectRatio="xMidYMid slice" focusable="false">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c"/>
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">No Image</text>
                </svg>
            )}

            <div className="card-body">
                <h2>{data.model}</h2>
                <p className="card-text">Year: {data.year}</p>
                <p className="card-text">Mileage: {data.mileage} km</p>
                <p className="card-text">Price: {data.price} €</p>

                <small className="text-muted" style={{position: 'absolute', right: '10px', bottom: '10px'}}>
                    {data.brand.name}
                </small>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        {/* View button for all users */}
                        <Link to={`/car-details/${data.id}`} className="btn btn-sm btn-outline-secondary">
                            View
                        </Link>
                        {isOwner && (
                            <>
                                <button onClick={() => editCar(data.id)} type="button"
                                        className="btn btn-sm btn-outline-primary">Edit
                                </button>
                                <button onClick={() => deleteCar(data.id)} type="button"
                                        className="btn btn-sm btn-outline-danger">Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
