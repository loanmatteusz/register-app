import { useState } from "react";
import Client from "../core/Client";
import Input from "./Input";
import Button from "./Button";

interface FormProps {
    client: Client;
    changeClient?: (client: Client) => void;
    handleCancelForm?: () => void;
}

export default function Form(props: FormProps) {

    const id = props.client?.id;
    const [name, setName] = useState(props.client?.name ?? '');
    const [age, setAge] = useState(props.client?.age ?? null);

    return (
        <div>
            {
                id ? <Input className="mb-4" readOnly text="Code" value={id} /> : false
            }
            <Input className="mb-5" text="Name" value={name} onChange={setName} />
            <Input text="Age" type="number" value={age} onChange={setAge} />
            <div className="flex justify-end mt-7">
                <Button
                    color="blue" className="mr-2"
                    onClick={() => props.changeClient?.(new Client(name, +age, id))}
                >
                    {id ? 'Edit' : 'Save'}
                </Button>
                <Button
                    onClick={props.handleCancelForm}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}
