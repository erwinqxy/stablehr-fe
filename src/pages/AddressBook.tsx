import { Button, Group, Modal, Table } from "@mantine/core";
import { Page } from "../Page";
import addressBook from "../resources/data/addressBook.json"
import { useState } from "react";


const AddEmployee = () => {
    const [opened, setOpened] = useState(false);
  
    return (
      <>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Create employee"
        >
          {/* Modal content */}
          <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12
        }}
          >
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 12
            }}>
                <label>Name</label>
                <input type="text"/>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 12
            }}>
                <label>Address</label>
                <input type="text"/>
            </div>
            <button
                style={{
                    display: 'flex',
                    width: 50,
                    alignSelf: "flex-end"
                }}
            >Add</button>
          </form>
        </Modal>
  
        <Group position="right">
          <Button onClick={() => setOpened(true)}>Add New Address</Button>
        </Group>
      </>
    );
  }
  

const AddressPage: React.FC = () => {
const rows = addressBook.addresses.map(({name, address}) =>(
    <tr key={name}>
    <td style={{
        fontWeight: 700
    }}>{name}</td>
    <td>{address}</td>
  </tr>
))

    return ( <Page title={"Addresses"} description="Find your employee's wallet address!" >
        <div
        style={{
        display: "flex",
        flexDirection: "column",
        gap: 25
        }}
        >

    <AddEmployee/>

          <Table horizontalSpacing="lg" verticalSpacing="md">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    </div>

    </Page> );
}
 
export default AddressPage;