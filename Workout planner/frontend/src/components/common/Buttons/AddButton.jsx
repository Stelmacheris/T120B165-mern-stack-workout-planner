import Button from "react-bootstrap/Button";

const AddButton = ({ text, addHandler }) => {
  return (
    <div className="d-flex justify-content-end">
      <Button onClick={addHandler} className="m-5" variant="primary" size="lg">
        {text}
      </Button>
    </div>
  );
};

export default AddButton;
