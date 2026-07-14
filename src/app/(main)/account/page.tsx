import { userService } from "@/services/profile.service";
import AccountForm from "./_components/account-form";

export default async function Page() {

    const data = await userService.getProfile();

    return (
        <>
            <AccountForm {...data?.payload?.user} />
        </>
    );
}