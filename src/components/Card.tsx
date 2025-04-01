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
    user?: { id: number }; // Optional to avoid crashes if user data is missing
}

const Card = ({ data, deleteCar, editCar }: {
    data: Car;
    deleteCar: (id: number) => void;
    editCar: (id: number) => void;
}) => {
    const loggedInUserId = parseInt(localStorage.getItem("userId") || "0", 10); // Ensure it's a number

    console.log("Logged-in user ID:", loggedInUserId);
    console.log("Car owner ID:", data.user?.id);

    const isOwner = data.user?.id === loggedInUserId;

    return (
        <div className="card shadow-sm">
            <svg className="bd-placeholder-img card-img-top" width="100%" height="225"
                 xmlns="http://www.w3.org/2000/svg" role="img"
                 aria-label="Placeholder: Thumbnail"
                 preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">No Image</text>
            </svg>
            <div className="card-body">
                <h2>{data.model}</h2>
                <p className="card-text">Year: {data.year}</p>
                <p className="card-text">Mileage: {data.mileage} km</p>
                <p className="card-text">Price: {data.price} €</p>

                {/* Display brand name */}
                <small className="text-muted" style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
                    {data.brand.name}
                </small>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        {isOwner && ( // Only show buttons if the user owns the car
                            <>
                                <button
                                    onClick={() => editCar(data.id)}
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary">
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteCar(data.id)}
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary">
                                    Delete
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
