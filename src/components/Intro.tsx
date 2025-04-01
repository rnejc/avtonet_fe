import { useNavigate } from "react-router-dom";

const Intro = () => {
    const navigate = useNavigate();

    return (
        <>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <h1 className="fw-bold">Find Your Next Car or Sell Yours</h1>
                        <p className="lead text-body-secondary">
                            Browse a wide selection of vehicles or list your own for sale. Whether you're looking for a new ride or trying to sell your car fast, you're in the right place.
                        </p>
                        <p>
                            <button onClick={() => navigate("/cars")} className="btn btn-primary btn-lg mx-2">
                                View Listings
                            </button>
                            <button onClick={() => navigate("/CarAdd")} className="btn btn-outline-secondary btn-lg mx-2">
                                Sell Your Car
                            </button>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Intro;
