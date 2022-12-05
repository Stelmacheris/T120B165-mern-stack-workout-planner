import Table from "react-bootstrap/Table";

const DataTable = ({ mapData, header }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {header.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{mapData}</tbody>
    </Table>
  );
};

export default DataTable;
