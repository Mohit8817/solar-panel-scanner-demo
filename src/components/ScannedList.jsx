import { Card, Table, Badge } from "react-bootstrap";

const ScannedList = ({ panels }) => {
  return (
    <Card className="mt-3">
      <Card.Body>
        <h5>Scanned Panels</h5>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Panel Code</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {panels.map((code, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{code}</td>
                <td>
                  <Badge bg="success">Scanned</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ScannedList;
