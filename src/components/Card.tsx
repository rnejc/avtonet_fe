interface Car {
    id: number;
    model: string;
    year: number;
    mileage: number;
    engineDisplacement: number;
    fuelType: string;
    transmission: string;
    fuelConsumption: number;
}

const Card = ({ data }: { data: Car }) => {
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
                <h2>{data.model}</h2> {/* Display model */}
                <p className="card-text">Year: {data.year}</p> {/* Year */}
                <p className="card-text">Mileage: {data.mileage} km</p> {/* Mileage */}
                <p className="card-text">Engine Displacement: {data.engineDisplacement}L</p> {/* Engine Displacement */}
                <p className="card-text">Transmission: {data.transmission}</p> {/* Transmission */}
                <p className="card-text">Fuel Type: {data.fuelType}</p> {/* Fuel Type */}
                <p className="card-text">Fuel Consumption: {data.fuelConsumption} L/100km</p> {/* Fuel Consumption */}

                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;
