import ResetPasswordForm from "./_components/reset-password";

export default function Page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) return <p>Invalid or missing reset link.</p>;

  return <ResetPasswordForm token={token} />;
}