import { Card } from "@/components/ui/card";
import Image from "next/image";
import diplomaImg from "../../../../public/Item (1).svg";

const Diplomas = () => {
    return (
        <div className="grid grid-cols-3 mx-1 gap-2.5">
            {Array.from({ length: 6 }).map((_, index) => (
                <Card
                    key={index}
                    className="flex items-center justify-center"
                >
                    <Image
                        src={diplomaImg}
                        alt="Diploma"
                        className="w-full h-auto object-contain"
                    />
                </Card>
            ))}
        </div>
    );
};

export default Diplomas;