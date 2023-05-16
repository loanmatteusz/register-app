interface InputProps {
    className?: string;
    text: string;
    type?: 'text' | 'number';
    value: any;
    readOnly?: boolean;
    onChange?: (value: any) => void;
}

export default function Input(props: InputProps) {
    return (
        <div className={`flex flex-col ${props.className}`}>
            <label
                className="mb-2"
            >{props.text}</label>
            <input
                className={`
                    border border-purple-500 rounded-lg
                    focus:outline-none bg-gray-50 px-4 py-2
                    ${props.readOnly ? '' : 'focus:bg-white'}
                `}
                type={props.type ?? 'text'}
                value={props.value}
                readOnly={props.readOnly}
                onChange={event => props.onChange?.(event.target.value)}
            />
        </div>
    );
}
