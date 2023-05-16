import Client from "./Client";

export default interface ClientRepository {
    getClients(): Promise<Client[]>;
    save(client: Client): Promise<Client>;
    delete(client: Client): Promise<void>;
}
