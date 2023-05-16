import { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";
import ClientRepository from "../core/client-repository";
import ClientCollection from "../firebase/database/client-collection";

export default function Home() {

  const clientRepository: ClientRepository = new ClientCollection();

  const [client, setClient] = useState<Client>(Client.void());
  const [clients, setClients] = useState<Client[]>([]);
  const [visible, setVisible] = useState<'table' | 'form'>('table');


  function getAllClients() {
    clientRepository.getClients().then(clients => {
      setClients(clients);
      setVisible('table');
    });
  }

  useEffect(getAllClients, []);

  function clientSelected(client: Client) {
    setClient(client);
    setVisible('form');
  }

  async function clientDeleted(client: Client) {
    await clientRepository.delete(client);
    getAllClients();
  }

  async function saveClient(client: Client) {
    await clientRepository.save(client);
    getAllClients();
  }

  function handleCancelForm() {
    setVisible('table');
  }

  function newClient() {
    setClient(Client.void());
    setVisible('form');
  }

  return (
    <div className={`flex h-screen justify-center items-center text-white`}>
      <Layout title="Simple Register">
        {
          visible === 'table'
            ? (
              <>
                <div className={`flex justify-end`}>
                  <Button onClick={newClient} className={`mb-2`}>New Client</Button>
                </div>
                <Table
                  clients={clients}
                  clientSelected={clientSelected}
                  clientDeleted={clientDeleted}
                />
              </>
            ) : (
              <Form changeClient={saveClient} handleCancelForm={handleCancelForm} client={client} />
            )
        }
      </Layout>
    </div>
  );
}
