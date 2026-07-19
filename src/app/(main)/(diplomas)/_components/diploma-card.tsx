import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Diploma } from "@/lib/types/diplomas";

export default function DiplomaCard({ diploma }: { diploma: Diploma }) {
  return (
    <Link href={`/${diploma.id}`}>
      <Card className="group relative overflow-hidden border-0 p-0 rounded-none cursor-pointer flex flex-col items-center justify-center h-80 sm:h-96 lg:h-[28rem]">
        {diploma.image && (
          <Image
            src={diploma.image}
            alt={diploma.title}
            width={300}
            height={448}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute bottom-0 w-full p-2 sm:p-4 bg-primary/80 text-white h-auto sm:h-[5.5rem] group-hover:h-full transition-all duration-500 overflow-hidden">
          <h3 className="text-sm sm:text-lg font-semibold">{diploma.title}</h3>
          <p className="mt-1 sm:mt-2 mb-2 sm:mb-5 text-xs sm:text-sm text-gray-200">{diploma.description}</p>
        </div>
      </Card>
    </Link>
  );
}