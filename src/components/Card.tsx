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

const Card = ({ data, deleteCar }: { data: Car; deleteCar: (id: number) => void }) => {
    return (
        <div className="card shadow-sm">
            <svg className="bd-placeholder-img card-img-top" width="100%" height="225"
                 xmlns="http://www.w3.org/2000/svg" role="img"
                 aria-label="Placeholder: Thumbnail"
                 preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"/>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">No Image</text>
            </svg>
            <div className="card-body">
                <h2>{data.model}</h2>
                <p className="card-text">Year: {data.year}</p>
                <p className="card-text">Mileage: {data.mileage} km</p>
                <p className="card-text">Engine Displacement: {data.engineDisplacement}L</p>
                <p className="card-text">Transmission: {data.transmission}</p>
                <p className="card-text">Fuel Type: {data.fuelType}</p>
                <p className="card-text">Fuel Consumption: {data.fuelConsumption} L/100km</p>
                <p className="card-text">Color: {data.color}</p>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                        <button
                            onClick={() => deleteCar(data.id)}
                            type="button"
                            className="btn btn-sm btn-outline-secondary">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
