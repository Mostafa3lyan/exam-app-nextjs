import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Diploma } from "@/lib/types/diplomas";

export default function DiplomaCard({ diploma }: { diploma: Diploma }) {
  return (
    <Link href={`/diplomas/${diploma.id}`}>
      <Card className="group relative overflow-hidden border-0 p-0 rounded-none cursor-pointer flex flex-col items-center justify-center">
        {diploma.image && (
          <Image
            src={diploma.image}
            alt={diploma.title}
            width={300}
            height={448}
            className="w-full h-[28rem] object-cover"
          />
        )}

        <div className="absolute bottom-3 w-11/12 p-2 bg-primary/80 text-white h-[5.5rem] group-hover:h-80 transition-all duration-500 overflow-hidden">
          <h3 className="text-lg font-semibold">{diploma.title}</h3>
          <p className="mt-2 mb-5 text-sm text-gray-200">{diploma.description}</p>
        </div>
      </Card>
    </Link>
  );
}