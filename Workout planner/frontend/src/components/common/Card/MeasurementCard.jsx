import "bootstrap/dist/css/bootstrap.min.css";

const MeasurementCard = (props) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.weight}</h5>
          <p className="card-text">{props.height}</p>
        </div>
      </div>
    </>
  );
};

export default MeasurementCard;
