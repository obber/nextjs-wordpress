import { useMutation } from "@tanstack/react-query";

export const useSubscribeMutation = () =>
  useMutation({
    mutationFn: subscribeToNewsletter,
  });

interface SubscribeToNewsletterParameters {
  email: string;
}

async function subscribeToNewsletter({
  email,
}: SubscribeToNewsletterParameters): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to subscribe");
  }

  return response.json();
}
