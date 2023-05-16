import Client from '../../core/Client';
import ClientRepository from '../../core/client-repository';
import { database } from '../config';
import firestore, {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';


export default class ClientCollection implements ClientRepository {
 
  #conversor = {
    toFirestore: (client: Client) => {
      return {
        nome: client.name,
        idade: client.age,
      }
    },
    fromFirestore: (
      snapshot: firestore.QueryDocumentSnapshot,
      options: firestore.SnapshotOptions,
      ) => {
        const dados = snapshot.data(options);
        return new Client(dados.nome, dados.idade, snapshot.id);
      },
    }
    
  #clientCollection = collection(database, 'clients').withConverter(this.#conversor);
 
  async save(client: Client): Promise<Client> {
    if (client?.id) {
      await setDoc(
        doc(database, 'clients', client.id).withConverter(this.#conversor),
        client,
      )
      return client;
    } else {
      const docRef = await addDoc(
        this.#clientCollection,
        client,
      );
      const doc = await getDoc(docRef);
      return doc.data();
    }
  }
 
  async delete(client: Client): Promise<void> {
    return await deleteDoc(doc(database, 'clients', client.id));
  }
 
  async getClients(): Promise<Client[]> {
    const clientsCol = this.#clientCollection;
    const clientsSnapshot = await getDocs(clientsCol);
    const clientsList = clientsSnapshot.docs.map((doc) => doc.data()) ?? [];
    return clientsList;
  }
}
