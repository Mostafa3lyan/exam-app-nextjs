import Link from 'next/link';

interface CreateOrLoginProps {
    head: string;
    link: string;
    tail: string;
}

const CreateOrLogin = (
    { head, link, tail }: CreateOrLoginProps
) => {
    return (
        <span className="text-muted-foreground text-sm flex justify-center">
            {head}{" "}
            <Link className="text-primary px-1" href={link}>
                {" "}
                {tail}
            </Link>
        </span>
    );
}

export default CreateOrLogin;
