import Title from "./Title";

interface LayoutProps {
    title: string;
    children: any;
}

export default function Layout(props: LayoutProps) {
    return (
        <div className={`flex flex-col max-sm:min-w-[95%] w-2/3 bg-white text-gray-800 rounded-md`}>
            <Title>{props.title}</Title>
            <div className={`w-full max-sm:p-2 p-6`}>
                {props.children}
            </div>
        </div>
    );
}
